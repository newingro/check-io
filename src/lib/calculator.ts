/**
 * Simulatore di redditività: funzioni pure e verificabili.
 *
 * I valori prodotti sono esclusivamente illustrativi: non rappresentano
 * previsioni, garanzie di reddito o preventivi.
 */

export interface SimulationInput {
  /** Tariffa media per notte in euro. */
  nightlyRate: number;
  /** Tasso di occupazione previsto, in percentuale (0–100). */
  occupancy: number;
  /** Giorni disponibili alla locazione nell'anno (1–365). */
  availableDays: number;
  /** Commissione di gestione CHECK-iO in percentuale (10–15). */
  commission: number;
}

export interface SimulationResult {
  occupiedNights: number;
  grossRevenue: number;
  managementFee: number;
  remainingBeforeCosts: number;
}

export interface FieldLimit {
  min: number;
  max: number;
  step: number;
}

export const SIMULATION_LIMITS: Record<keyof SimulationInput, FieldLimit> = {
  nightlyRate: { min: 20, max: 2000, step: 5 },
  occupancy: { min: 0, max: 100, step: 1 },
  availableDays: { min: 1, max: 365, step: 1 },
  commission: { min: 10, max: 15, step: 0.5 },
};

/**
 * Valori di esempio, dichiaratamente ipotetici: non derivano da medie di
 * mercato e servono solo a mostrare il funzionamento del simulatore.
 */
export const EXAMPLE_SIMULATION: SimulationInput = {
  nightlyRate: 100,
  occupancy: 60,
  availableDays: 300,
  commission: 12,
};

export function isWithinLimits(field: keyof SimulationInput, value: number): boolean {
  const limit = SIMULATION_LIMITS[field];
  return Number.isFinite(value) && value >= limit.min && value <= limit.max;
}

export function clampToLimits(field: keyof SimulationInput, value: number): number {
  const limit = SIMULATION_LIMITS[field];
  if (!Number.isFinite(value)) return limit.min;
  return Math.min(limit.max, Math.max(limit.min, value));
}

export function validateSimulation(input: SimulationInput): Partial<Record<keyof SimulationInput, string>> {
  const errors: Partial<Record<keyof SimulationInput, string>> = {};
  for (const key of Object.keys(SIMULATION_LIMITS) as (keyof SimulationInput)[]) {
    if (!isWithinLimits(key, input[key])) {
      const { min, max } = SIMULATION_LIMITS[key];
      errors[key] = `Inserisci un valore tra ${formatNumber(min)} e ${formatNumber(max)}.`;
    }
  }
  return errors;
}

/**
 * Notti occupate = giorni disponibili × occupazione / 100
 * Ricavi lordi ipotetici = notti occupate × tariffa media
 * Commissione di gestione = ricavi lordi ipotetici × percentuale / 100
 * Importo residuo prima degli altri costi = ricavi lordi − commissione
 */
export function calculateSimulation(input: SimulationInput): SimulationResult {
  const occupiedNights = (input.availableDays * input.occupancy) / 100;
  const grossRevenue = occupiedNights * input.nightlyRate;
  const managementFee = (grossRevenue * input.commission) / 100;
  const remainingBeforeCosts = grossRevenue - managementFee;
  return {
    occupiedNights: roundTo(occupiedNights, 2),
    grossRevenue: roundTo(grossRevenue, 2),
    managementFee: roundTo(managementFee, 2),
    remainingBeforeCosts: roundTo(remainingBeforeCosts, 2),
  };
}

function roundTo(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

const currencyFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  // In italiano CLDR non raggruppa i numeri di 4 cifre: forziamo "1.235 €".
  useGrouping: "always",
});

const numberFormatter = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1, useGrouping: "always" });

export function formatCurrency(value: number): string {
  return currencyFormatter.format(Math.round(value));
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}
