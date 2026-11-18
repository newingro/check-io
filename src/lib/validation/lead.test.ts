import { test } from "node:test";
import assert from "node:assert/strict";
import { consultationSchema, evaluationSchema, leadRequestSchema } from "./lead.ts";

const validConsultation = {
  fullName: "Maria Rossi",
  email: "maria.rossi@example.com",
  phone: "+39 351 000 0000",
  location: "Firenze",
  requestType: "affidare-immobile",
  preferredTime: "mattina",
  contactMethod: "telefono",
  message: "Vorrei informazioni sulla gestione del mio appartamento.",
  privacy: true,
};

const validEvaluation = {
  firstName: "Luca",
  lastName: "Bianchi",
  email: "luca@example.com",
  phone: "3510000000",
  municipality: "Bari",
  propertyType: "appartamento",
  bedrooms: 2,
  beds: 4,
  rentalStatus: "non-affittato",
  message: "",
  privacy: true,
};

test("accetta una richiesta di consulenza valida", () => {
  assert.equal(consultationSchema.safeParse(validConsultation).success, true);
});

test("rifiuta privacy non confermata, email e telefono non validi", () => {
  const result = consultationSchema.safeParse({
    ...validConsultation,
    privacy: false,
    email: "non-valida",
    phone: "abc",
  });
  assert.equal(result.success, false);
  const fields = result.error!.issues.map((i) => i.path[0]).sort();
  assert.deepEqual(fields, ["email", "phone", "privacy"]);
});

test("rifiuta tipologie di richiesta non previste", () => {
  assert.equal(consultationSchema.safeParse({ ...validConsultation, requestType: "hack" }).success, false);
});

test("accetta una valutazione valida con simulazione allegata", () => {
  const result = evaluationSchema.safeParse({
    ...validEvaluation,
    simulation: { nightlyRate: 100, occupancy: 60, availableDays: 300, commission: 12 },
  });
  assert.equal(result.success, true);
});

test("rifiuta numeri non interi o fuori intervallo nella valutazione", () => {
  assert.equal(evaluationSchema.safeParse({ ...validEvaluation, bedrooms: 2.5 }).success, false);
  assert.equal(evaluationSchema.safeParse({ ...validEvaluation, beds: 0 }).success, false);
  assert.equal(evaluationSchema.safeParse({ ...validEvaluation, bedrooms: Number.NaN }).success, false);
});

test("la richiesta completa richiede metadati coerenti", () => {
  const ok = leadRequestSchema.safeParse({
    type: "consulenza",
    data: validConsultation,
    meta: { hp: "", startedAt: 1700000000000, submissionId: "a1b2c3d4-e5f6" },
  });
  assert.equal(ok.success, true);
  const bad = leadRequestSchema.safeParse({
    type: "consulenza",
    data: validConsultation,
    meta: { startedAt: 1, submissionId: "<script>" },
  });
  assert.equal(bad.success, false);
});
