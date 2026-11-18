import { test } from "node:test";
import assert from "node:assert/strict";
import { FORM_NAMES, getForms, projectForm, SEGMENT_COUNT } from "./geometry.ts";

test("tutte le forme hanno lo stesso numero di segmenti", () => {
  const forms = getForms();
  for (const name of FORM_NAMES) {
    assert.equal(forms[name].length, SEGMENT_COUNT, name);
  }
});

test("la proiezione resta entro il riquadro", () => {
  for (const name of FORM_NAMES) {
    const lines = projectForm(name, 800);
    assert.ok(lines.length > 40, `${name}: ${lines.length}`);
    for (const l of lines) {
      for (const n of [l.x1, l.y1, l.x2, l.y2]) {
        assert.ok(n > -50 && n < 850, `${name} fuori riquadro: ${n}`);
      }
    }
  }
});

test("la transizione parte dalla forma iniziale e arriva a quella finale", async () => {
  const { heightRanks, morphFrame } = await import("./geometry.ts");
  const forms = getForms();
  const from = forms.residenza;
  const to = forms.citta;
  const out = Array.from({ length: SEGMENT_COUNT }, () => [0, 0, 0, 0, 0, 0] as [number, number, number, number, number, number]);
  const flat = (segs: typeof from) => segs.map(([a, b]) => [...a, ...b]);
  morphFrame(from, to, heightRanks(from), heightRanks(to), 0, out);
  out.forEach((row, i) => row.forEach((n, j) => assert.ok(Math.abs(n - flat(from)[i][j]) < 1e-9)));
  morphFrame(from, to, heightRanks(from), heightRanks(to), 1, out);
  out.forEach((row, i) => row.forEach((n, j) => assert.ok(Math.abs(n - flat(to)[i][j]) < 1e-9)));
  morphFrame(from, to, heightRanks(from), heightRanks(to), 0.5, out);
  assert.ok(out.every((r) => r[0] === r[3] && r[1] === r[4] && r[2] === r[5]), "a metà transizione le linee sono contratte");
});
