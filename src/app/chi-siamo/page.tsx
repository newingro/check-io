import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { LogoImage } from "@/components/layout/Logo";
import { siteConfig } from "@/config/site";
import { aboutPrinciples } from "@/content/about";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Chi siamo",
  description:
    "CHECK-iO è il brand di property management di Immobiliare Monte Olimpo S.r.l.: organizzazione, cura dell'immobile e strumenti digitali per la gestione degli affitti brevi.",
  path: "/chi-siamo",
});

export default function AboutPage() {
  const team = siteConfig.team;
  return (
    <>
      <PageHero
        eyebrow="Chi siamo"
        title="Un nuovo modo di vivere la gestione immobiliare."
        breadcrumb={{ label: "Chi siamo", href: "/chi-siamo" }}
        art={{ form: "struttura", camera: { yaw: -0.3, pitch: 0.42 } }}
        description="CHECK-iO è il brand dedicato al property management di Immobiliare Monte Olimpo S.r.l. Il nostro approccio unisce organizzazione, attenzione al dettaglio e strumenti digitali per semplificare la gestione delle proprietà destinate agli affitti brevi."
      />

      {/* Il brand */}
      <section aria-labelledby="brand-title" className="bg-white py-24 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-reveal>
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-line bg-paper p-10 sm:p-16">
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgb(11_26_42/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(11_26_42/0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
              <div className="relative w-full max-w-md">
                <LogoImage variant="full" tone="dark" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="eyebrow">Il nostro nome</p>
            <h2 id="brand-title" className="heading-2 mt-5 text-navy-900">
              Ogni soggiorno inizia da una porta che si apre.
            </h2>
            <p className="lead mt-6 text-slate">
              Il nome CHECK-iO richiama il momento dell&apos;arrivo, il primo contatto tra l&apos;ospite e la casa. Nel
              simbolo, una porta si apre all&apos;interno di un cerchio: un riferimento all&apos;accoglienza e alla cura con
              cui accompagniamo ogni soggiorno, per conto di chi ci affida il proprio immobile.
            </p>
          </div>
        </div>
      </section>

      {/* Principi */}
      <section aria-labelledby="principi-title" className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Il nostro approccio</p>
            <h2 id="principi-title" className="heading-2 mt-5 text-navy-900">
              Sei principi che guidano ogni gestione.
            </h2>
          </div>
          <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {aboutPrinciples.map((principle, index) => (
              <li key={principle.title} className="bg-paper p-7 md:p-10" data-reveal style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}>
                <span className="tabular font-display text-[2.5rem] leading-none font-extralight text-turq-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-3 mt-8 text-navy-900">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{principle.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team: visibile solo con contenuti verificati */}
      {team.length > 0 ? (
        <section aria-labelledby="team-title" className="bg-white py-24 md:py-32">
          <div className="container-site">
            <p className="eyebrow">Le persone</p>
            <h2 id="team-title" className="heading-2 mt-5 text-navy-900">
              Il team
            </h2>
            <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <li key={member.name}>
                  {member.photo ? (
                    <Image src={member.photo} alt={`Ritratto di ${member.name}`} width={480} height={600} className="aspect-[4/5] w-full object-cover" />
                  ) : null}
                  <h3 className="heading-3 mt-6 text-navy-900">{member.name}</h3>
                  <p className="text-sm text-turq-700">{member.role}</p>
                  {member.bio ? <p className="mt-3 leading-relaxed text-slate">{member.bio}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Società */}
      <section aria-labelledby="societa-title" className="bg-white py-20 md:py-24">
        <div className="container-site">
          <div className="grid gap-8 border border-line p-8 md:grid-cols-12 md:items-center md:p-12" data-reveal>
            <div className="md:col-span-8">
              <p className="eyebrow">La società</p>
              <h2 id="societa-title" className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-navy-900">
                {siteConfig.name} è un nome commerciale di {siteConfig.company.legalName}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate">
                La società titolare del marchio è il riferimento per contratti, rendiconti e comunicazioni ufficiali con i
                proprietari.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <ButtonLink href="/contatti#consulenza" variant="primary" tone="light">
                Parla con noi
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
