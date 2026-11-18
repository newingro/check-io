import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pillars } from "@/content/home";

export function ValueSection() {
  return (
    <section id="valore" aria-labelledby="valore-title" className="bg-paper py-24 md:py-32 lg:py-40">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow">Il valore di CHECK-iO</p>
            <h2 id="valore-title" className="heading-2 mt-5 text-navy-900">
              La tua proprietà, nelle mani giuste.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="lead text-slate">
              Gestire un immobile destinato agli affitti brevi richiede tempo, organizzazione e attenzione costante.
              CHECK-iO ti affianca nella gestione operativa, aiutandoti a valorizzare la proprietà e a semplificare ogni
              attività.
            </p>
            <Link
              href="/chi-siamo"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 font-display text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:text-turq-700"
            >
              Il nostro approccio
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <ol className="relative mt-16 grid md:mt-24 md:grid-cols-3">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
          <span aria-hidden="true" data-reveal-line className="absolute top-0 left-0 h-px w-full bg-navy-900" />
          {pillars.map((pillar, index) => (
            <li
              key={pillar.number}
              data-reveal
              style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
              className="border-line pt-10 pb-6 max-md:not-first:border-t md:pr-10 md:not-first:border-l md:not-first:pl-10"
            >
              <span className="tabular block font-display text-[3.5rem] leading-none font-extralight tracking-[-0.04em] text-turq-600 md:text-[4.5rem]">
                {pillar.number}
              </span>
              <h3 className="heading-3 mt-8 text-[1.375rem] text-navy-900">{pillar.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-slate">{pillar.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
