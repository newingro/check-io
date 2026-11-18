import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CHECK-iO | Property Management e Gestione Affitti Brevi",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.company.legalName }],
  creator: siteConfig.company.legalName,
  publisher: siteConfig.company.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#06111d",
  colorScheme: "light",
};

/** Abilita le animazioni di reveal solo quando JavaScript è disponibile. */
const enableJsClass = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableJsClass }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#contenuto"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-[3px] bg-turq-500 px-4 py-3 font-display text-sm font-semibold text-navy-950 transition-transform focus:translate-y-0"
        >
          Vai al contenuto principale
        </a>
        <Header />
        <main id="contenuto" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <RevealObserver />
      </body>
    </html>
  );
}
