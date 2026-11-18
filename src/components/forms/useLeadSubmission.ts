"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LeadApiResponse, LeadErrorCode } from "@/lib/validation/lead";

export type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; code?: LeadErrorCode; fieldErrors?: Record<string, string[]> };

const NETWORK_ERROR =
  "Non è stato possibile inviare la richiesta: verifica la connessione e riprova, oppure contattaci per telefono o su WhatsApp.";

function newSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function useLeadSubmission(type: "consulenza" | "valutazione") {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const startedAt = useRef(0);
  const submissionId = useRef("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
    submissionId.current = newSubmissionId();
  }, []);

  const submit = useCallback(
    async (data: unknown) => {
      if (inFlight.current) return;
      inFlight.current = true;
      setState({ status: "submitting" });
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            data,
            meta: {
              hp: honeypotRef.current?.value ?? "",
              startedAt: startedAt.current || Date.now(),
              submissionId: submissionId.current || newSubmissionId(),
            },
          }),
        });
        const body = (await response.json().catch(() => null)) as LeadApiResponse | null;
        if (response.ok && body?.ok && body.reference) {
          setState({ status: "success", reference: body.reference });
          submissionId.current = newSubmissionId();
        } else {
          setState({
            status: "error",
            message: body?.message ?? NETWORK_ERROR,
            code: body?.code,
            fieldErrors: body?.fieldErrors,
          });
        }
      } catch {
        setState({ status: "error", message: NETWORK_ERROR });
      } finally {
        inFlight.current = false;
      }
    },
    [type],
  );

  const reset = useCallback(() => {
    setState({ status: "idle" });
    startedAt.current = Date.now();
  }, []);

  return { state, submit, reset, honeypotRef };
}
