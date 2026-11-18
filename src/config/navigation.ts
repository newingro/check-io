export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Per i proprietari", href: "/proprietari" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "FAQ", href: "/faq" },
  { label: "Contatti", href: "/contatti" },
];

export const legalNavigation: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const primaryCta = {
  label: "Prenota una consulenza",
  href: "/contatti#consulenza",
} as const;

export const evaluationCta = {
  label: "Richiedi una valutazione",
  href: "/proprietari#valutazione",
} as const;
