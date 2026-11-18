import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculateSimulation,
  clampToLimits,
  EXAMPLE_SIMULATION,
  formatCurrency,
  validateSimulation,
} from "./calculator.ts";

test("calcola notti, ricavi, commissione e residuo secondo le formule dichiarate", () => {
  const result = calculateSimulation({ nightlyRate: 100, occupancy: 60, availableDays: 300, commission: 12 });
  assert.equal(result.occupiedNights, 180);
  assert.equal(result.grossRevenue, 18000);
  assert.equal(result.managementFee, 2160);
  assert.equal(result.remainingBeforeCosts, 15840);
});

test("gestisce valori decimali senza errori di arrotondamento", () => {
  const result = calculateSimulation({ nightlyRate: 87.5, occupancy: 65, availableDays: 365, commission: 12.5 });
  // 365 × 0,65 = 237,25 notti; 237,25 × 87,5 = 20.759,375 €
  assert.equal(result.occupiedNights, 237.25);
  assert.equal(result.grossRevenue, 20759.38);
  assert.equal(result.managementFee, 2594.92);
  assert.equal(result.remainingBeforeCosts, 18164.45);
  assert.ok(Math.abs(result.grossRevenue - (result.managementFee + result.remainingBeforeCosts)) < 0.02);
});

test("occupazione nulla produce ricavi nulli", () => {
  const result = calculateSimulation({ nightlyRate: 150, occupancy: 0, availableDays: 200, commission: 15 });
  assert.deepEqual(result, { occupiedNights: 0, grossRevenue: 0, managementFee: 0, remainingBeforeCosts: 0 });
});

test("commissione ai limiti del 10% e del 15%", () => {
  const base = { nightlyRate: 200, occupancy: 50, availableDays: 100 };
  assert.equal(calculateSimulation({ ...base, commission: 10 }).managementFee, 1000);
  assert.equal(calculateSimulation({ ...base, commission: 15 }).managementFee, 1500);
});

test("la validazione segnala valori fuori dai limiti", () => {
  assert.deepEqual(validateSimulation(EXAMPLE_SIMULATION), {});
  const errors = validateSimulation({ nightlyRate: 5, occupancy: 120, availableDays: 0, commission: 9 });
  assert.deepEqual(Object.keys(errors).sort(), ["availableDays", "commission", "nightlyRate", "occupancy"]);
  assert.ok(validateSimulation({ ...EXAMPLE_SIMULATION, nightlyRate: Number.NaN }).nightlyRate);
});

test("clampToLimits riporta i valori negli intervalli ammessi", () => {
  assert.equal(clampToLimits("occupancy", 140), 100);
  assert.equal(clampToLimits("commission", 4), 10);
  assert.equal(clampToLimits("availableDays", Number.NaN), 1);
});

test("formattazione valutaria italiana", () => {
  const formatted = formatCurrency(18000).replace(/\s/g, " ");
  assert.equal(formatted, "18.000 €");
  assert.equal(formatCurrency(1234.6).replace(/\s/g, " "), "1.235 €");
});
