"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { phoneHref } from "@/lib/contact";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error.digest ?? "errore di rendering");
  }, [error]);

  return (
    <section className="on-dark flex min-h-[80svh] items-center bg-navy-950 pt-32 pb-20 text-white">
      <div className="container-site">
        <p className="eyebrow eyebrow-dark">Si è verificato un errore</p>
        <h1 className="heading-1 mt-5 max-w-2xl text-white">Qualcosa non ha funzionato.</h1>
        <p className="lead mt-6 max-w-xl text-white/70">
          Non è stato possibile caricare questa pagina. Riprova tra qualche istante: se il problema persiste puoi
          contattarci per telefono.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className={buttonClasses({ variant: "primary", tone: "dark" })}>
            Riprova
          </button>
          <Link href="/" className={buttonClasses({ variant: "secondary", tone: "dark" })}>
            Torna alla home
          </Link>
          <a href={phoneHref} className={buttonClasses({ variant: "ghost", tone: "dark", className: "sm:ml-4" })}>
            Chiamaci
          </a>
        </div>
      </div>
    </section>
  );
}
