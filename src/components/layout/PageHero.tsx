import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { ArchitecturalArt } from "@/components/art/ArchitecturalArt";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import type { Camera, FormName } from "@/lib/scene/geometry";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb: { label: string; href: string };
  art?: { form: FormName; camera?: Partial<Camera> };
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, breadcrumb, art, children }: PageHeroProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: breadcrumb.label, item: `${siteConfig.url}${breadcrumb.href}` },
    ],
  };

  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 pt-32 pb-20 text-white md:pt-40 md:pb-28">
      <JsonLd data={breadcrumbData} />
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(8_183_169/0.16),transparent_65%)]"
      />
      {art ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[-18%] -z-10 hidden aspect-square w-[min(46rem,62vw)] -translate-y-[44%] opacity-70 md:block lg:right-[-6%] lg:opacity-100"
        >
          <ArchitecturalArt form={art.form} id={`hero-${art.form}`} camera={art.camera} />
        </div>
      ) : null}
      <div className="container-site">
        <nav aria-label="Percorso di navigazione" className="animate-fade">
          <ol className="flex items-center gap-2 text-sm text-white/55">
            <li>
              <Link href="/" className="inline-flex min-h-10 items-center transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" strokeWidth={1.75} />
            </li>
            <li>
              <span aria-current="page" className="text-white/85">
                {breadcrumb.label}
              </span>
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-dark mt-8 animate-rise [animation-delay:80ms]">{eyebrow}</p>
          <h1 className="heading-1 mt-5 animate-lift text-white">{title}</h1>
          {description ? (
            <div className="lead mt-6 max-w-2xl animate-rise text-white/70 [animation-delay:260ms]">{description}</div>
          ) : null}
          {children ? <div className="mt-10 animate-rise [animation-delay:360ms]">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
