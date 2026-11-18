"use client";

import { useEffect, useState } from "react";

const BUILD_YEAR = Number(process.env.NEXT_PUBLIC_BUILD_YEAR) || 2026;

/** Anno corrente: il prerender usa l'anno di build, il browser lo aggiorna se è cambiato. */
export function CurrentYear() {
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => {
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()));
    return () => cancelAnimationFrame(id);
  }, []);
  return <>{year}</>;
}
