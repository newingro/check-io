import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { PageHero } from "./PageHero";
import { siteConfig } from "@/config/site";

const dateFormatter = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" });

export function LegalPage({ title, path, label, children }: { title: string; path: string; label: string; children: ReactNode }) {
  return (
    <>
      <PageHero
        eyebrow="Informazioni legali"
        title={title}
        breadcrumb={{ label, href: path }}
        description={`Ultimo aggiornamento: ${dateFormatter.format(new Date(`${siteConfig.legal.lastUpdated}T12:00:00Z`))}`}
      />
      <section className="bg-white py-16 md:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            {!siteConfig.legal.reviewedByCounsel ? (
              <div className="mb-12 flex gap-3 border-l-2 border-turq-500 bg-paper p-5 text-[0.9375rem] leading-relaxed text-navy-900">
                <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turq-700" strokeWidth={1.75} />
                <p>
                  Documento in fase di finalizzazione: alcune informazioni sul titolare del trattamento e sui fornitori
                  verranno integrate a breve. Per qualsiasi richiesta puoi contattarci ai recapiti indicati.
                </p>
              </div>
            ) : null}
            <div className="prose-legal">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
