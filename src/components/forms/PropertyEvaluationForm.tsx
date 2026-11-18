"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, LoaderCircle, X } from "lucide-react";
import {
  evaluationSchema,
  PROPERTY_TYPES,
  RENTAL_STATUSES,
  type EvaluationData,
  type EvaluationInput,
} from "@/lib/validation/lead";
import { formatCurrency, formatNumber, type SimulationInput } from "@/lib/calculator";
import { clearSimulation, loadSimulation, SIMULATION_EVENT } from "@/lib/simulation-handoff";
import { buttonClasses } from "@/components/ui/Button";
import { describedBy, Field, FieldError, Honeypot, inputClasses, SelectChevron } from "./fields";
import { FormError, FormErrorSummary, FormSuccess } from "./FormFeedback";
import { PrivacyCheckbox } from "./PrivacyCheckbox";
import { useLeadSubmission } from "./useLeadSubmission";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  municipality: "",
  propertyType: "" as EvaluationInput["propertyType"],
  bedrooms: undefined as unknown as number,
  beds: undefined as unknown as number,
  rentalStatus: "" as EvaluationInput["rentalStatus"],
  message: "",
  privacy: false,
} satisfies EvaluationInput;

export function PropertyEvaluationForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const { state, submit, reset: resetSubmission, honeypotRef } = useLeadSubmission("valutazione");
  const [invalidCount, setInvalidCount] = useState(0);
  const [simulation, setSimulation] = useState<SimulationInput | null>(null);
  const [attachSimulation, setAttachSimulation] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EvaluationInput, unknown, EvaluationData>({
    resolver: zodResolver(evaluationSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    const stored = loadSimulation();
    const frame = requestAnimationFrame(() => {
      if (stored) setSimulation(stored);
    });
    const onSimulation = (event: Event) => {
      setSimulation((event as CustomEvent<SimulationInput>).detail);
      setAttachSimulation(true);
    };
    window.addEventListener(SIMULATION_EVENT, onSimulation);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(SIMULATION_EVENT, onSimulation);
    };
  }, []);

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      for (const [field, messages] of Object.entries(state.fieldErrors)) {
        if (field in defaultValues) setError(field as keyof EvaluationInput, { message: messages[0] });
      }
    }
  }, [state, setError]);

  if (state.status === "success") {
    return (
      <FormSuccess
        title="Richiesta di valutazione ricevuta."
        reference={state.reference}
        onReset={() => {
          reset(defaultValues);
          resetSubmission();
        }}
      >
        <p>
          Grazie per averci raccontato il tuo immobile. Analizzeremo le informazioni ricevute e ti ricontatteremo per
          approfondire caratteristiche, obiettivi e possibili modalità di gestione.
        </p>
      </FormSuccess>
    );
  }

  const submitting = state.status === "submitting";
  const removeSimulation = () => {
    clearSimulation();
    setSimulation(null);
  };

  return (
    <form
      noValidate
      aria-labelledby="valutazione-form-title"
      onSubmit={handleSubmit(
        (data) => {
          setInvalidCount(0);
          return submit({ ...data, simulation: attachSimulation && simulation ? simulation : undefined });
        },
        (errs) => setInvalidCount(Object.keys(errs).length),
      )}
      className="relative space-y-7"
    >
      <Honeypot inputRef={honeypotRef} />
      <p className="text-sm text-slate">
        I campi contrassegnati con <span className="text-turq-700">*</span> sono obbligatori.
      </p>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={id("firstName")} label="Nome" required error={errors.firstName?.message}>
          <input
            id={id("firstName")}
            type="text"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={describedBy(id("firstName"), { error: !!errors.firstName })}
            className={inputClasses(!!errors.firstName)}
            {...register("firstName")}
          />
        </Field>
        <Field id={id("lastName")} label="Cognome" required error={errors.lastName?.message}>
          <input
            id={id("lastName")}
            type="text"
            autoComplete="family-name"
            aria-required="true"
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={describedBy(id("lastName"), { error: !!errors.lastName })}
            className={inputClasses(!!errors.lastName)}
            {...register("lastName")}
          />
        </Field>
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
        <Field id={id("phone")} label="Telefono" required error={errors.phone?.message}>
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

      <div className="border-t border-line pt-7">
        <p className="font-display text-xs font-bold tracking-[0.2em] text-slate uppercase">L&apos;immobile</p>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={id("municipality")} label="Comune dell'immobile" required error={errors.municipality?.message}>
          <input
            id={id("municipality")}
            type="text"
            autoComplete="address-level2"
            aria-required="true"
            aria-invalid={errors.municipality ? true : undefined}
            aria-describedby={describedBy(id("municipality"), { error: !!errors.municipality })}
            className={inputClasses(!!errors.municipality)}
            {...register("municipality")}
          />
        </Field>
        <Field id={id("propertyType")} label="Tipologia di immobile" required error={errors.propertyType?.message}>
          <div className="relative">
            <select
              id={id("propertyType")}
              aria-required="true"
              aria-invalid={errors.propertyType ? true : undefined}
              aria-describedby={describedBy(id("propertyType"), { error: !!errors.propertyType })}
              className={inputClasses(!!errors.propertyType, "appearance-none pr-11")}
              {...register("propertyType")}
            >
              <option value="" disabled>
                Seleziona…
              </option>
              {PROPERTY_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>
        <Field id={id("bedrooms")} label="Numero di camere" required hint="Camere da letto." error={errors.bedrooms?.message}>
          <input
            id={id("bedrooms")}
            type="number"
            inputMode="numeric"
            min={0}
            max={30}
            step={1}
            aria-required="true"
            aria-invalid={errors.bedrooms ? true : undefined}
            aria-describedby={describedBy(id("bedrooms"), { hint: true, error: !!errors.bedrooms })}
            className={inputClasses(!!errors.bedrooms, "tabular")}
            {...register("bedrooms", { valueAsNumber: true })}
          />
        </Field>
        <Field id={id("beds")} label="Numero di posti letto" required hint="Ospiti accoglibili." error={errors.beds?.message}>
          <input
            id={id("beds")}
            type="number"
            inputMode="numeric"
            min={1}
            max={60}
            step={1}
            aria-required="true"
            aria-invalid={errors.beds ? true : undefined}
            aria-describedby={describedBy(id("beds"), { hint: true, error: !!errors.beds })}
            className={inputClasses(!!errors.beds, "tabular")}
            {...register("beds", { valueAsNumber: true })}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="text-[0.9375rem] font-medium text-navy-900">
          Stato attuale dell&apos;immobile<span aria-hidden="true" className="ml-0.5 text-turq-700">*</span>
        </legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {RENTAL_STATUSES.map((option) => (
            <label
              key={option.value}
              className="relative flex min-h-12 cursor-pointer items-center justify-center rounded-[3px] border border-line bg-white px-3 text-center text-[0.9375rem] font-medium text-navy-900 transition-colors hover:border-navy-900/30 has-[:checked]:border-turq-600 has-[:checked]:bg-turq-500/[0.07] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-turq-500/20"
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                aria-describedby={errors.rentalStatus ? `${id("rentalStatus")}-error` : undefined}
                {...register("rentalStatus")}
              />
              {option.label}
            </label>
          ))}
        </div>
        <FieldError id={id("rentalStatus")} error={errors.rentalStatus?.message} />
      </fieldset>

      <Field id={id("message")} label="Messaggio" hint="Informazioni utili: posizione, stato, disponibilità, obiettivi." error={errors.message?.message}>
        <textarea
          id={id("message")}
          rows={4}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy(id("message"), { hint: true, error: !!errors.message })}
          className={inputClasses(!!errors.message, "resize-y")}
          {...register("message")}
        />
      </Field>

      {simulation ? (
        <div className="rounded-[3px] border border-turq-500/35 bg-turq-500/[0.05] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Calculator aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turq-700" strokeWidth={1.75} />
              <div>
                <p className="font-display text-[0.9375rem] font-semibold text-navy-900">Simulazione disponibile</p>
                <p className="mt-1 text-sm text-slate">
                  Tariffa {formatCurrency(simulation.nightlyRate)}/notte · Occupazione {formatNumber(simulation.occupancy)}% ·{" "}
                  {formatNumber(simulation.availableDays)} giorni · Commissione {formatNumber(simulation.commission)}%
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeSimulation}
              className="-m-2 inline-flex size-10 shrink-0 items-center justify-center text-slate transition-colors hover:text-navy-900"
              aria-label="Rimuovi la simulazione"
            >
              <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-navy-900">
            <input
              type="checkbox"
              checked={attachSimulation}
              onChange={(e) => setAttachSimulation(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-turq-600"
            />
            Allega questi valori alla richiesta come informazioni indicative (non verificate).
          </label>
        </div>
      ) : null}

      <PrivacyCheckbox id={id("privacy")} registration={register("privacy")} error={errors.privacy?.message} />

      <div className="space-y-4 border-t border-line pt-7">
        {state.status === "error" ? <FormError message={state.message} /> : <FormErrorSummary count={invalidCount && Object.keys(errors).length} />}
        <button
          type="submit"
          disabled={submitting}
          className={buttonClasses({ variant: "primary", tone: "light", className: "w-full sm:w-auto sm:min-w-64" })}
        >
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={2} />
              Invio in corso…
            </>
          ) : (
            "Richiedi la valutazione"
          )}
        </button>
        <p className="sr-only" aria-live="polite">
          {submitting ? "Invio della richiesta in corso." : ""}
        </p>
      </div>
    </form>
  );
}
