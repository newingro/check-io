"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, Info, RotateCcw } from "lucide-react";
import {
  calculateSimulation,
  clampToLimits,
  EXAMPLE_SIMULATION,
  formatCurrency,
  formatNumber,
  SIMULATION_LIMITS,
  validateSimulation,
  type SimulationInput,
} from "@/lib/calculator";
import { saveSimulation } from "@/lib/simulation-handoff";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { AnimatedNumber } from "./AnimatedNumber";

type Key = keyof SimulationInput;

const FIELDS: {
  key: Key;
  label: string;
  unit: string;
  hint: string;
  valueText: (n: number) => string;
  rangeLabel: (n: number) => string;
}[] = [
  {
    key: "nightlyRate",
    label: "Tariffa media per notte",
    unit: "€",
    hint: "Prezzo medio ipotetico applicato per notte.",
    valueText: (n) => `${formatNumber(n)} euro per notte`,
    rangeLabel: (n) => `${formatNumber(n)} €`,
  },
  {
    key: "occupancy",
    label: "Tasso di occupazione previsto",
    unit: "%",
    hint: "Quota dei giorni disponibili in cui l'immobile risulta occupato.",
    valueText: (n) => `${formatNumber(n)} per cento`,
    rangeLabel: (n) => `${formatNumber(n)}%`,
  },
  {
    key: "availableDays",
    label: "Giorni disponibili nell'anno",
    unit: "giorni",
    hint: "Giorni in cui l'immobile è offerto in locazione.",
    valueText: (n) => `${formatNumber(n)} ${n === 1 ? "giorno" : "giorni"}`,
    rangeLabel: (n) => `${formatNumber(n)} ${n === 1 ? "giorno" : "giorni"}`,
  },
  {
    key: "commission",
    label: "Commissione di gestione CHECK-iO",
    unit: "%",
    hint: "Percentuale indicativa compresa tra il 10% e il 15%.",
    valueText: (n) => `${formatNumber(n)} per cento`,
    rangeLabel: (n) => `${formatNumber(n)}%`,
  },
];

const toRaw = (input: SimulationInput) =>
  Object.fromEntries(Object.entries(input).map(([k, v]) => [k, String(v).replace(".", ",")])) as Record<Key, string>;

const parse = (raw: string) => {
  const normalized = raw.replace(/\s/g, "").replace(",", ".");
  if (normalized === "") return Number.NaN;
  return Number(normalized);
};

const parseAll = (raw: Record<Key, string>) =>
  Object.fromEntries((Object.keys(raw) as Key[]).map((k) => [k, parse(raw[k])])) as unknown as SimulationInput;

export function RevenueSimulator({ ctaHref = "/proprietari#valutazione" }: { ctaHref?: string }) {
  const uid = useId();
  const [state, setState] = useState(() => ({ raw: toRaw(EXAMPLE_SIMULATION), lastValid: EXAMPLE_SIMULATION }));
  const { raw } = state;
  const values = useMemo(() => parseAll(raw), [raw]);
  const errors = validateSimulation(values);
  const valid = Object.keys(errors).length === 0;
  const effective = valid ? values : state.lastValid;
  const result = calculateSimulation(effective);
  const isExample = (Object.keys(EXAMPLE_SIMULATION) as Key[]).every((k) => values[k] === EXAMPLE_SIMULATION[k]);

  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    const id = window.setTimeout(() => {
      setAnnouncement(
        valid
          ? `Ricavi lordi annui ipotetici ${formatCurrency(result.grossRevenue)}. Commissione stimata ${formatCurrency(result.managementFee)}. Importo residuo prima degli altri costi ${formatCurrency(result.remainingBeforeCosts)}.`
          : "Alcuni valori non sono validi: correggili per aggiornare la simulazione.",
      );
    }, 900);
    return () => window.clearTimeout(id);
  }, [valid, result.grossRevenue, result.managementFee, result.remainingBeforeCosts]);

  const setValue = (key: Key, value: string) =>
    setState((prev) => {
      const nextRaw = { ...prev.raw, [key]: value };
      const parsed = parseAll(nextRaw);
      const ok = Object.keys(validateSimulation(parsed)).length === 0;
      return { raw: nextRaw, lastValid: ok ? parsed : prev.lastValid };
    });

  const reset = () => setState({ raw: toRaw(EXAMPLE_SIMULATION), lastValid: EXAMPLE_SIMULATION });

  const normalize = (key: Key) => {
    const n = parse(raw[key]);
    const fallback = state.lastValid[key];
    const next = Number.isFinite(n) ? clampToLimits(key, key === "availableDays" ? Math.round(n) : n) : fallback;
    setValue(key, String(next).replace(".", ","));
  };

  const feeShare = result.grossRevenue > 0 ? (result.managementFee / result.grossRevenue) * 100 : effective.commission;

  return (
    <div className="grid overflow-hidden border border-white/10 lg:grid-cols-12">
      {/* Parametri */}
      <div className="bg-navy-900/70 p-6 sm:p-8 lg:col-span-7 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/75">
            <span aria-hidden="true" className={cn("size-1.5 rounded-full", isExample ? "bg-white/50" : "bg-turq-400")} />
            {isExample ? "Valori di esempio: modificali con i tuoi" : "Scenario personalizzato"}
          </p>
          <button
            type="button"
            onClick={reset}
            disabled={isExample}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white disabled:opacity-40"
          >
            <RotateCcw aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Ripristina esempio
          </button>
        </div>

        <div className="mt-8 space-y-9">
          {FIELDS.map((field) => {
            const limit = SIMULATION_LIMITS[field.key];
            const inputId = `${uid}-${field.key}`;
            const labelId = `${inputId}-label`;
            const hintId = `${inputId}-hint`;
            const errorId = `${inputId}-error`;
            const error = errors[field.key];
            const sliderValue = Number.isFinite(values[field.key]) ? clampToLimits(field.key, values[field.key]) : limit.min;
            const fill = ((sliderValue - limit.min) / (limit.max - limit.min)) * 100;
            return (
              <div key={field.key}>
                <label id={labelId} htmlFor={inputId} className="block font-display text-[0.9375rem] font-semibold text-white">
                  {field.label}
                </label>
                <p id={hintId} className="mt-1 text-sm text-white/55">
                  {field.hint}
                </p>
                <div className="mt-4 flex items-center gap-4 sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <input
                      type="range"
                      min={limit.min}
                      max={limit.max}
                      step={limit.step}
                      value={sliderValue}
                      onChange={(e) => setValue(field.key, e.target.value.replace(".", ","))}
                      aria-labelledby={labelId}
                      aria-valuetext={field.valueText(sliderValue)}
                      className="range w-full"
                      style={{ "--fill": `${fill}%` } as CSSProperties}
                    />
                    <div className="tabular mt-0.5 flex justify-between text-xs text-white/60" aria-hidden="true">
                      <span>{field.rangeLabel(limit.min)}</span>
                      <span>{field.rangeLabel(limit.max)}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 self-start">
                    <input
                      id={inputId}
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={raw[field.key]}
                      onChange={(e) => setValue(field.key, e.target.value)}
                      onBlur={() => normalize(field.key)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={cn(hintId, error && errorId)}
                      className={cn(
                        "tabular h-12 w-[5.25rem] rounded-[3px] border bg-navy-950 px-3 text-right font-display text-lg font-semibold text-white transition-colors focus:border-turq-400 focus:outline-none sm:w-24",
                        error ? "border-[#f97066]" : "border-white/15 hover:border-white/30",
                      )}
                    />
                    <span className="w-10 text-sm text-white/60">{field.unit === "giorni" ? "gg" : field.unit}</span>
                  </div>
                </div>
                {error ? (
                  <p id={errorId} className="mt-2 text-sm text-[#fda29b]">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Risultati */}
      <div className="flex flex-col bg-white p-6 text-navy-900 sm:p-8 lg:col-span-5 lg:p-12">
        <p className="eyebrow text-turq-700!">Scenario ipotetico annuo</p>
        <div className={cn("mt-8 transition-opacity", !valid && "opacity-50")} aria-hidden={!valid || undefined}>
          <p className="text-sm font-medium text-slate">Ricavi lordi annui ipotetici</p>
          <p className="tabular mt-2 font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none font-semibold tracking-[-0.04em]">
            <AnimatedNumber value={result.grossRevenue} format={formatCurrency} />
          </p>
          <p className="mt-3 text-sm text-slate">
            Su <span className="tabular font-medium text-navy-900">{formatNumber(result.occupiedNights)}</span> notti
            occupate stimate
          </p>

          <div className="mt-8 flex h-2 overflow-hidden rounded-full bg-mist" aria-hidden="true">
            <span className="h-full bg-turq-500 transition-[width] duration-500" style={{ width: `${100 - feeShare}%` }} />
            <span className="h-full bg-navy-900 transition-[width] duration-500" style={{ width: `${feeShare}%` }} />
          </div>

          <dl className="mt-6 divide-y divide-line border-y border-line">
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="flex items-center gap-2.5 text-sm text-slate">
                <span aria-hidden="true" className="size-2 rounded-full bg-navy-900" />
                Commissione di gestione stimata ({formatNumber(effective.commission)}%)
              </dt>
              <dd className="tabular font-display text-lg font-semibold">
                <AnimatedNumber value={result.managementFee} format={formatCurrency} />
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="flex items-center gap-2.5 text-sm text-slate">
                <span aria-hidden="true" className="size-2 rounded-full bg-turq-500" />
                Importo residuo prima degli altri costi
              </dt>
              <dd className="tabular font-display text-lg font-semibold">
                <AnimatedNumber value={result.remainingBeforeCosts} format={formatCurrency} />
              </dd>
            </div>
          </dl>
        </div>
        {!valid ? (
          <p className="mt-4 text-sm font-medium text-danger" role="status">
            Correggi i valori evidenziati per aggiornare la simulazione.
          </p>
        ) : null}

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>

        <div className="mt-8 flex gap-3 rounded-[3px] bg-paper p-4 text-[0.8125rem] leading-relaxed text-slate">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-turq-700" strokeWidth={1.75} />
          <p>
            Questa simulazione ha esclusivamente finalità illustrative. Non costituisce una previsione, una garanzia di
            reddito o un preventivo. Non comprende necessariamente commissioni dei portali, pulizie, manutenzioni, utenze,
            imposte, costi fiscali e altri oneri.
          </p>
        </div>

        <Link
          href={ctaHref}
          onClick={() => {
            if (valid) saveSimulation(values);
          }}
          className={buttonClasses({ variant: "primary", tone: "light", className: "mt-8 w-full text-center" })}
        >
          Richiedi una valutazione personalizzata
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" strokeWidth={1.75} />
        </Link>
        <p className="mt-3 text-center text-xs text-slate">
          I valori della simulazione potranno essere allegati alla richiesta come informazioni indicative.
        </p>
      </div>
    </div>
  );
}
