import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";
import { FieldError } from "./fields";
import { PrivacyNotice } from "./FormFeedback";

export function PrivacyCheckbox({ id, registration, error }: { id: string; registration: UseFormRegisterReturn; error?: string }) {
  return (
    <div>
      <div className="flex items-start gap-3.5">
        <input
          id={id}
          type="checkbox"
          {...registration}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(`${id}-note`, error && `${id}-error`)}
          aria-required="true"
          className={cn(
            "mt-0.5 size-5 shrink-0 cursor-pointer rounded-[2px] border accent-turq-600",
            error ? "border-danger" : "border-line",
          )}
        />
        <div>
          <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-relaxed text-navy-900">
            <PrivacyNotice />
            <span aria-hidden="true" className="ml-0.5 text-turq-700">
              *
            </span>
          </label>
          <p id={`${id}-note`} className="mt-1 text-sm text-slate">
            Useremo i tuoi dati esclusivamente per rispondere a questa richiesta. Nessuna iscrizione a newsletter o comunicazioni promozionali.
          </p>
        </div>
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}
