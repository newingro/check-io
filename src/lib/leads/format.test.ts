import { test } from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, leadHtml, leadSubject, sanitizeLine } from "./format.ts";
import type { Lead } from "../validation/lead.ts";

const lead: Lead = {
  type: "consulenza",
  data: {
    fullName: "<b>Mario</b>",
    email: "mario@example.com",
    phone: "+39 351 000 0000",
    location: "Roma",
    requestType: "commissioni",
    preferredTime: "indifferente",
    contactMethod: "whatsapp",
    message: "Ciao <script>alert(1)</script>",
    privacy: true,
  },
};

test("escapeHtml neutralizza i caratteri speciali", () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
});

test("l'email HTML non contiene markup inserito dall'utente", () => {
  const html = leadHtml(lead, "CK-TEST", new Date("2026-01-01T10:00:00Z"));
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("Vorrei conoscere le commissioni"));
});

test("l'oggetto non contiene caratteri di controllo", () => {
  const subject = leadSubject({ ...lead, data: { ...lead.data, fullName: "Mario\r\nBcc: x@y.z" } }, "CK-1");
  assert.ok(!/[\r\n]/.test(subject));
  assert.equal(sanitizeLine("a\u0000b\nc"), "a b c");
});
