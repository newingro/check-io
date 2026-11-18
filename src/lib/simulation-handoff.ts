import type { SimulationInput } from "./calculator";

const STORAGE_KEY = "checkio:simulation";
export const SIMULATION_EVENT = "checkio:simulation";

/** Conserva temporaneamente (solo nella scheda corrente) i valori della simulazione. */
export function saveSimulation(input: SimulationInput) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  } catch {
    // Archiviazione non disponibile: il passaggio dei valori è facoltativo.
  }
  window.dispatchEvent(new CustomEvent<SimulationInput>(SIMULATION_EVENT, { detail: input }));
}

export function loadSimulation(): SimulationInput | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<SimulationInput>;
    if (
      typeof value.nightlyRate === "number" &&
      typeof value.occupancy === "number" &&
      typeof value.availableDays === "number" &&
      typeof value.commission === "number"
    ) {
      return value as SimulationInput;
    }
  } catch {
    // ignorato
  }
  return null;
}

export function clearSimulation() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignorato
  }
}
