import type { ServiceIcon as IconName } from "@/content/services";
import { cn } from "@/lib/cn";

const paths: Record<IconName, { base: string; accent: string }> = {
  listing: {
    base: "M4.5 5.5h23a1 1 0 0 1 1 1v19a1 1 0 0 1-1 1h-23a1 1 0 0 1-1-1v-19a1 1 0 0 1 1-1zM3.5 11h25M8.5 16.5h9M8.5 21h12",
    accent: "M23.5 15.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z",
  },
  calendar: {
    base: "M5.5 6.5h21a1 1 0 0 1 1 1v19a1 1 0 0 1-1 1h-21a1 1 0 0 1-1-1v-19a1 1 0 0 1 1-1zM4.5 12.5h23M10.5 4v5M21.5 4v5M9.5 17.5h3M9.5 22h3M15.5 17.5h3",
    accent: "M18.5 22.5l2 2 4-4.5",
  },
  pricing: {
    base: "M4 27.5h24M4 27.5V5M5 22l6-6 5 4 9.5-10",
    accent: "M20.5 9.5h5.5V15",
  },
  keys: {
    base: "M4 28h24M9 28V9.5L23 5.5V28",
    accent: "M18.5 16.5v3",
  },
  guest: {
    base: "M5 7.5h15.5A1.5 1.5 0 0 1 22 9v8.5a1.5 1.5 0 0 1-1.5 1.5H12l-4.5 4v-4H5a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 5 7.5zM8 12.5h10M8 15.5h6",
    accent: "M25 12h1.5a1.5 1.5 0 0 1 1.5 1.5V22a1.5 1.5 0 0 1-1.5 1.5H26V27l-4-3.5h-6.5",
  },
  cleaning: {
    base: "M4.5 17.5h17v10h-17zM4.5 22.5h17M8.5 17.5v-2.5h9v2.5",
    accent: "M25 4v7M21.5 7.5h7M13 6v3.5M11.25 7.75h3.5",
  },
  maintenance: {
    base: "M20 4.5a6 6 0 0 0-5.6 8.1L4.9 22.1a2.3 2.3 0 0 0 3.2 3.2l9.5-9.5A6 6 0 0 0 25.7 10l-3.4 3.4-3-.7-.7-3 3.4-3.4A6 6 0 0 0 20 4.5z",
    accent: "M6.75 23.25h.01",
  },
  report: {
    base: "M8 4.5h11l5.5 5.5v17.5H8zM19 4.5V10h5.5",
    accent: "M12.5 23.5v-4M16.25 23.5v-7.5M20 23.5v-3",
  },
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  const icon = paths[name];
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8", className)}
    >
      <path d={icon.base} />
      <path d={icon.accent} className="text-turq-500" stroke="currentColor" strokeWidth={name === "maintenance" ? 3 : 1.5} />
    </svg>
  );
}
