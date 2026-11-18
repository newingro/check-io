"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import {
  CONTACT_METHODS,
  consultationSchema,
  PREFERRED_TIMES,
  REQUEST_TYPES,
  type ConsultationData,
  type ConsultationInput,
} from "@/lib/validation/lead";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { describedBy, Field, FieldError, Honeypot, inputClasses, SelectChevron } from "./fields";
import { FormError, FormErrorSummary, FormSuccess } from "./FormFeedback";
import { PrivacyCheckbox } from "./PrivacyCheckbox";
import { useLeadSubmission } from "./useLeadSubmission";

const defaultValues: ConsultationInput = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  requestType: "" as ConsultationInput["requestType"],
  preferredTime: "indifferente",
  contactMethod: "telefono",
  message: "",
  privacy: false,
};

export function ConsultationForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const { state, submit, reset: resetSubmission, honeypotRef } = useLeadSubmission("consulenza");
  const [invalidCount, setInvalidCount] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<ConsultationInput, unknown, ConsultationData>({
    resolver: zodResolver(consultationSchema),
    defaultValues,
    mode: "onTouched",
  });

  // Preselezione della tipologia da link interni (es. ?richiesta=commissioni).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("richiesta");
    const match = REQUEST_TYPES.find((option) => option.value === param);
    if (match) setValue("requestType", match.value);
  }, [setValue]);

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      for (const [field, messages] of Object.entries(state.fieldErrors)) {
        if (field in defaultValues) setError(field as keyof ConsultationInput, { message: messages[0] });
      }
    }
  }, [state, setError]);

  if (state.status === "success") {
    return (
      <FormSuccess
        title="Richiesta ricevuta. Grazie!"
        reference={state.reference}
        onReset={() => {
          reset(defaultValues);
          resetSubmission();
        }}
      >
        <p>
          Abbiamo ricevuto la tua richiesta di consulenza. Ti ricontatteremo con la modalità e nella fascia oraria indicate,
          compatibilmente con la disponibilità, per fissare un primo confronto sul tuo immobile.
        </p>
      </FormSuccess>
    );
  }

  const submitting = state.status === "submitting";

  return (
    <form
      noValidate
      aria-labelledby="consulenza-form-title"
      onSubmit={handleSubmit(
        (data) => {
          setInvalidCount(0);
          return submit(data);
        },
        (errs) => setInvalidCount(Object.keys(errs).length),
      )}
      className="relative space-y-7"
    >
      <Honeypot inputRef={honeypotRef} />
      <p className="text-sm text-slate">
        I campi contrassegnati con <span className="text-turq-700">*</span> sono obbligatori.
      </p>

      <Field id={id("fullName")} label="Nome e cognome" required error={errors.fullName?.message}>
        <input
          id={id("fullName")}
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={describedBy(id("fullName"), { error: !!errors.fullName })}
          className={inputClasses(!!errors.fullName)}
          {...register("fullName")}
        />
      </Field>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={id("email")} label="Email" required error={errors.email?.message}>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy(id("email"), { error: !!errors.email })}
            className={inputClasses(!!errors.email)}
            {...register("email")}
          />
        </Field>
        <Field id={id("phone")} label="Numero di telefono" required error={errors.phone?.message}>
          <input
            id={id("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy(id("phone"), { error: !!errors.phone })}
            className={inputClasses(!!errors.phone)}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={id("location")} label="Località dell'immobile" required hint="Comune o zona." error={errors.location?.message}>
          <input
            id={id("location")}
            type="text"
            autoComplete="address-level2"
            aria-required="true"
            aria-invalid={errors.location ? true : undefined}
            aria-describedby={describedBy(id("location"), { hint: true, error: !!errors.location })}
            className={inputClasses(!!errors.location)}
            {...register("location")}
          />
        </Field>
        <Field id={id("requestType")} label="Tipologia della richiesta" required hint="Seleziona l'opzione più vicina." error={errors.requestType?.message}>
          <div className="relative">
            <select
              id={id("requestType")}
              aria-required="true"
              aria-invalid={errors.requestType ? true : undefined}
              aria-describedby={describedBy(id("requestType"), { hint: true, error: !!errors.requestType })}
              className={inputClasses(!!errors.requestType, "appearance-none pr-11")}
              {...register("requestType")}
            >
              <option value="" disabled>
                Seleziona…
              </option>
              {REQUEST_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>
      </div>

      <fieldset>
        <legend className="text-[0.9375rem] font-medium text-navy-900">
          Come preferisci essere ricontattato?<span aria-hidden="true" className="ml-0.5 text-turq-700">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {CONTACT_METHODS.map((option) => (
            <label
              key={option.value}
              className="relative flex min-h-12 cursor-pointer items-center justify-center rounded-[3px] border border-line bg-white px-3 text-center text-[0.9375rem] font-medium text-navy-900 transition-colors hover:border-navy-900/30 has-[:checked]:border-turq-600 has-[:checked]:bg-turq-500/[0.07] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-turq-500/20"
            >
              <input type="radio" value={option.value} className="sr-only" {...register("contactMethod")} />
              {option.label}
            </label>
          ))}
        </div>
        <FieldError id={id("contactMethod")} error={errors.contactMethod?.message} />
      </fieldset>

      <Field
        id={id("preferredTime")}
        label="Fascia oraria preferita per il ricontatto"
        required
        hint="Ti ricontatteremo nella fascia indicata, compatibilmente con la disponibilità."
        error={errors.preferredTime?.message}
      >
        <div className="relative">
          <select
            id={id("preferredTime")}
            aria-required="true"
            aria-invalid={errors.preferredTime ? true : undefined}
            aria-describedby={describedBy(id("preferredTime"), { hint: true, error: !!errors.preferredTime })}
            className={inputClasses(!!errors.preferredTime, "appearance-none pr-11")}
            {...register("preferredTime")}
          >
            {PREFERRED_TIMES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
      </Field>

      <Field id={id("message")} label="Messaggio" required hint="Raccontaci brevemente l'immobile e cosa ti serve." error={errors.message?.message}>
        <textarea
          id={id("message")}
          rows={5}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy(id("message"), { hint: true, error: !!errors.message })}
          className={inputClasses(!!errors.message, "resize-y")}
          {...register("message")}
        />
      </Field>

      <PrivacyCheckbox id={id("privacy")} registration={register("privacy")} error={errors.privacy?.message} />

      <div className="space-y-4 border-t border-line pt-7">
        {state.status === "error" ? <FormError message={state.message} /> : <FormErrorSummary count={invalidCount && Object.keys(errors).length} />}
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting || undefined}
          className={buttonClasses({ variant: "primary", tone: "light", className: cn("w-full sm:w-auto sm:min-w-64") })}
        >
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={2} />
              Invio in corso…
            </>
          ) : (
            "Invia la richiesta di consulenza"
          )}
        </button>
        <p className="sr-only" aria-live="polite">
          {submitting ? "Invio della richiesta in corso." : ""}
        </p>
      </div>
    </form>
  );
}
