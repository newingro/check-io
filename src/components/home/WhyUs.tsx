import { ButtonLink } from "@/components/ui/Button";
import { benefits } from "@/content/home";

export function WhyUs() {
  return (
    <section aria-labelledby="perche-title" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32" data-reveal>
            <p className="eyebrow">Perché scegliere CHECK-iO</p>
            <h2 id="perche-title" className="heading-2 mt-5 text-navy-900">
              Più tranquillità per te. Più attenzione alla tua proprietà.
            </h2>
            <p className="lead mt-6 text-slate">
              Affidare un immobile significa delegare tempo e decisioni operative, non il controllo. Per questo il nostro
              lavoro si basa su metodo, comunicazione e trasparenza.
            </p>
            <ButtonLink href="/proprietari" variant="secondary" tone="light" className="mt-10">
              Scopri il servizio per i proprietari
            </ButtonLink>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
              className="group grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-8 last:border-b md:grid-cols-[4.5rem_1fr] md:py-10"
            >
              <span className="tabular pt-1 font-display text-sm font-semibold text-slate transition-colors duration-500 group-hover:text-turq-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="heading-3 text-[1.25rem] text-navy-900 md:text-[1.375rem]">{benefit.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-slate">{benefit.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
