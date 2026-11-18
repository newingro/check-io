import { siteConfig } from "@/config/site";

/** Dati strutturati Organization + WebSite costruiti solo con dati verificati. */
export function organizationJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.company.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/brand/logo-full.png`,
      width: 1337,
      height: 404,
    },
    description: siteConfig.description,
    telephone: siteConfig.contact.phone.e164,
    areaServed: { "@type": "Country", name: "Italia" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone.e164,
      contactType: "customer service",
      areaServed: "IT",
      availableLanguage: ["Italian"],
    },
  };
  if (siteConfig.company.vatNumber) organization.vatID = siteConfig.company.vatNumber;
  if (siteConfig.contact.email) organization.email = siteConfig.contact.email;
  if (siteConfig.company.registeredOffice) organization.address = siteConfig.company.registeredOffice;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: siteConfig.language,
        publisher: { "@id": orgId },
      },
    ],
  };
}
