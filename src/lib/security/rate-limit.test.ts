import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter, createRecentSet } from "./rate-limit.ts";

test("blocca oltre il limite e sblocca allo scadere della finestra", () => {
  const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
  assert.equal(limiter.check("ip", 0).allowed, true);
  assert.equal(limiter.check("ip", 100).allowed, true);
  const blocked = limiter.check("ip", 200);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 1);
  assert.equal(limiter.check("altro-ip", 200).allowed, true);
  assert.equal(limiter.check("ip", 1101).allowed, true);
});

test("il set recente scade dopo il TTL", () => {
  const set = createRecentSet(1000);
  set.set("id", "CK-1", 0);
  assert.equal(set.get("id", 500), "CK-1");
  assert.equal(set.get("id", 1500), undefined);
});
