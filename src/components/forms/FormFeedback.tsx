"use client";

import { useEffect, useRef } from "react";
import { CircleAlert, CircleCheck, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { phoneHref, whatsappHref } from "@/lib/contact";

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex gap-3 rounded-[3px] border border-danger/30 bg-danger-soft p-5 text-sm leading-relaxed text-navy-900">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" strokeWidth={1.75} />
      <div>
        <p className="font-medium">{message}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          <a href={phoneHref} className="inline-flex min-h-10 items-center gap-2 font-semibold text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900">
            <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {siteConfig.contact.phone.display}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 font-semibold text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900"
          >
            <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Scrivici su WhatsApp
            <span className="sr-only"> (si apre in una nuova scheda)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function FormErrorSummary({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <p role="alert" className="flex items-center gap-2 text-sm font-medium text-danger">
      <CircleAlert aria-hidden="true" className="size-4" strokeWidth={2} />
      {count === 1 ? "Controlla il campo evidenziato." : `Controlla i ${count} campi evidenziati.`}
    </p>
  );
}

export function FormSuccess({
  title,
  reference,
  children,
  onReset,
}: {
  title: string;
  reference: string;
  children: React.ReactNode;
  onReset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  return (
    <div role="status" className="border border-turq-500/40 bg-white p-8 md:p-10">
      <CircleCheck aria-hidden="true" className="size-10 text-turq-600" strokeWidth={1.5} />
      <h3 ref={headingRef} tabIndex={-1} className="heading-3 mt-6 text-[1.5rem] text-navy-900 outline-none">
        {title}
      </h3>
      <div className="mt-4 space-y-3 leading-relaxed text-slate">{children}</div>
      <p className="mt-6 text-sm text-slate">
        Codice di riferimento: <span className="tabular font-semibold text-navy-900">{reference}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex min-h-11 items-center font-display text-sm font-semibold text-turq-700 underline decoration-turq-700/40 underline-offset-4 hover:decoration-turq-700"
      >
        Invia un&apos;altra richiesta
      </button>
    </div>
  );
}

export function PrivacyNotice() {
  return (
    <>
      Ho preso visione dell&apos;
      <a href="/privacy-policy" target="_blank" rel="noopener" className="font-medium text-turq-700 underline underline-offset-4">
        informativa sulla privacy
        <span className="sr-only"> (si apre in una nuova scheda)</span>
      </a>
      .
    </>
  );
}
