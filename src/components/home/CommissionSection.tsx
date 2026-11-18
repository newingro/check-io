import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { commissionNotes } from "@/content/home";

export function CommissionSection({ id = "commissioni" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-paper py-24 md:py-32 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">Commissioni</p>
          <h2 id={`${id}-title`} className="heading-2 mt-5 text-navy-900">
            Una gestione chiara, fin dall&apos;inizio.
          </h2>

          <div className="mt-12 border-t border-navy-900 pt-10 md:mt-16">
            <p className="font-display leading-none font-semibold tracking-[-0.055em] text-navy-900">
              <span aria-hidden="true" className="tabular inline-flex items-start text-[clamp(4.75rem,3rem+9vw,9.5rem)]">
                10<span className="mx-[0.04em] text-turq-500">–</span>15
                <span className="mt-[0.12em] text-[0.42em] tracking-normal text-turq-600">%</span>
              </span>
              <span className="sr-only">Dal 10% al 15%</span>
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-navy-900/80">
              Commissione di gestione indicativa, definita in base all&apos;immobile e ai servizi concordati.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-end" data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
          <div className="border border-line bg-white p-7 shadow-[0_30px_60px_-40px_rgb(11_26_42/0.35)] md:p-10">
            <p className="leading-relaxed text-slate">
              Le condizioni economiche vengono definite attraverso una proposta personalizzata. Eventuali costi operativi,
              commissioni dei portali, imposte e servizi aggiuntivi sono specificati separatamente secondo gli accordi
              contrattuali.
            </p>
            <ul className="mt-8 space-y-4 border-t border-line pt-8">
              {commissionNotes.map((note) => (
                <li key={note} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-navy-900">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-turq-500/15 text-turq-700">
                    <Check aria-hidden="true" className="size-3" strokeWidth={2.5} />
                  </span>
                  {note}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contatti?richiesta=commissioni#consulenza" variant="primary" tone="light" className="mt-10 w-full sm:w-auto">
              Richiedi una consulenza
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
