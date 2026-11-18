import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

export function describedBy(id: string, opts: { hint?: boolean; error?: boolean }) {
  return [opts.hint && `${id}-hint`, opts.error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

export function inputClasses(invalid?: boolean, className?: string) {
  return cn(
    "block w-full min-h-12 rounded-[3px] border bg-white px-4 py-3 text-base text-navy-900 placeholder:text-slate/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4",
    invalid
      ? "border-danger focus:border-danger focus:ring-danger/15"
      : "border-line hover:border-navy-900/30 focus:border-turq-600 focus:ring-turq-500/15",
    className,
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="text-[0.9375rem] font-medium text-navy-900">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-turq-700">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-sm font-normal text-slate">(facoltativo)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-slate">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
      {error}
    </p>
  );
}

export function SelectChevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Campo trappola invisibile per i bot: le persone non lo vedono né lo raggiungono. */
export function Honeypot({ inputRef }: { inputRef: React.Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Lascia vuoto questo campo
        <input ref={inputRef} type="text" name="hp_check" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
