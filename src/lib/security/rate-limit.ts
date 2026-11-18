/**
 * Rate limiter a finestra scorrevole in memoria.
 *
 * Su Vercel (Fluid Compute) le istanze vengono riutilizzate, quindi offre una
 * protezione di base contro invii ripetuti. Per una protezione distribuita
 * aggiungere una regola di rate limiting nel Vercel Firewall.
 */
export interface RateLimiter {
  check: (key: string, now?: number) => { allowed: boolean; retryAfterSeconds: number };
}

export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    check(key, now = Date.now()) {
      const windowStart = now - windowMs;
      const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
      if (recent.length >= limit) {
        hits.set(key, recent);
        const retryAfterSeconds = Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000));
        return { allowed: false, retryAfterSeconds };
      }
      recent.push(now);
      hits.delete(key);
      hits.set(key, recent);
      if (hits.size > maxKeys) {
        const oldest = hits.keys().next().value;
        if (oldest !== undefined) hits.delete(oldest);
      }
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}

/** Memoria a scadenza per riconoscere invii duplicati dello stesso modulo. */
export function createRecentSet(ttlMs: number, maxSize = 5000) {
  const entries = new Map<string, { at: number; value: string }>();
  return {
    get(key: string, now = Date.now()) {
      const entry = entries.get(key);
      if (!entry) return undefined;
      if (now - entry.at > ttlMs) {
        entries.delete(key);
        return undefined;
      }
      return entry.value;
    },
    set(key: string, value: string, now = Date.now()) {
      entries.set(key, { at: now, value });
      if (entries.size > maxSize) {
        const oldest = entries.keys().next().value;
        if (oldest !== undefined) entries.delete(oldest);
      }
    },
  };
}
