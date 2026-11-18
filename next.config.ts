import type { NextConfig } from "next";

const isProduction = process.env.VERCEL_ENV === "production" || (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production");
// La toolbar di Vercel viene caricata solo nelle anteprime.
const vercelLive = isProduction ? "" : " https://vercel.live";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${vercelLive}${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob:${vercelLive} https://vercel.com`,
  `font-src 'self' data:${vercelLive}`,
  `connect-src 'self'${vercelLive}${vercelLive ? " wss://ws-us3.pusher.com" : ""}`,
  `frame-src${vercelLive || " 'none'"}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  env: {
    // Anno di build per il copyright (aggiornato lato client se necessario).
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/servizio", destination: "/servizi", permanent: true },
      { source: "/services", destination: "/servizi", permanent: true },
      { source: "/proprietario", destination: "/proprietari", permanent: true },
      { source: "/about", destination: "/chi-siamo", permanent: true },
      { source: "/contatto", destination: "/contatti", permanent: true },
      { source: "/contact", destination: "/contatti", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/cookie", destination: "/cookie-policy", permanent: true },
      { source: "/cookies", destination: "/cookie-policy", permanent: true },
    ];
  },
};

export default nextConfig;
