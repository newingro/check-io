import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/proprietari", priority: 0.9, changeFrequency: "monthly" },
  { path: "/servizi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contatti", priority: 0.8, changeFrequency: "yearly" },
  { path: "/chi-siamo", priority: 0.7, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${siteConfig.contentUpdatedAt}T00:00:00Z`);
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
