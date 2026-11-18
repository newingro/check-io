import { MessageCircle } from "lucide-react";
import { ArchitecturalArt } from "@/components/art/ArchitecturalArt";
import { ButtonLink } from "@/components/ui/Button";
import { primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { phoneHref, whatsappHref } from "@/lib/contact";

interface FinalCtaProps {
  title?: string;
  text?: string;
}

export function FinalCta({
  title = "Il prossimo passo per valorizzare il tuo immobile inizia qui.",
  text = "Raccontaci la tua proprietà. Valuteremo insieme le soluzioni di gestione più adatte alle tue esigenze.",
}: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-finale-title" className="on-dark relative isolate overflow-hidden bg-navy-950 py-28 text-white md:py-36 lg:py-44">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_80%_50%,black,transparent_70%)]" />
      <div aria-hidden="true" className="absolute top-1/2 right-[-10%] -z-20 size-[50rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(8_183_169/0.16),transparent_60%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-30%] -z-10 aspect-square w-[44rem] -translate-y-1/2 opacity-35 md:right-[-12%] lg:right-[-2%] lg:w-[46rem] lg:opacity-80"
      >
        <ArchitecturalArt form="simbolo" id="cta" animate={false} camera={{ yaw: -0.38, pitch: 0.22 }} />
      </div>
      <div className="container-site">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow eyebrow-dark">Inizia da qui</p>
          <h2 id="cta-finale-title" className="heading-2 mt-6 text-white md:text-[3.5rem]">
            {title}
          </h2>
          <p className="lead mt-6 max-w-xl text-white/70">{text}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href={primaryCta.href} variant="primary" tone="dark">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={whatsappHref()}
              external
              variant="secondary"
              tone="dark"
              icon={<MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />}
            >
              Scrivici su WhatsApp
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-white/55">
            Preferisci parlarne a voce? Chiamaci al{" "}
            <a href={phoneHref} className="font-medium text-white underline decoration-turq-500/60 underline-offset-4 transition-colors hover:decoration-turq-400">
              {siteConfig.contact.phone.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
