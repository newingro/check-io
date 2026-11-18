import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ValueSection } from "@/components/home/ValueSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { CommissionSection } from "@/components/home/CommissionSection";
import { SimulatorSection } from "@/components/calculator/SimulatorSection";
import { WhyUs } from "@/components/home/WhyUs";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata({
  title: "CHECK-iO | Property Management e Gestione Affitti Brevi",
  absoluteTitle: true,
  description:
    "CHECK-iO offre servizi di property management per proprietari immobiliari: prenotazioni, prezzi dinamici, ospiti, pulizie e gestione operativa. Richiedi una consulenza.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <ValueSection />
      <ServicesOverview />
      <ProcessTimeline />
      <CommissionSection />
      <SimulatorSection />
      <WhyUs />
      <FinalCta />
    </>
  );
}
