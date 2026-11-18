import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

const WORDMARK = { width: 1337, height: 309 };
const FULL = { width: 1337, height: 404 };

interface LogoProps {
  variant?: "wordmark" | "full";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

/** Logo ufficiale CHECK-iO (asset raster originale, nessuna modifica alle geometrie). */
export function LogoImage({ variant = "wordmark", tone = "dark", className, priority }: LogoProps) {
  const dims = variant === "wordmark" ? WORDMARK : FULL;
  const src = `/brand/logo-${variant}${tone === "light" ? "-white" : ""}.png`;
  return (
    <Image
      src={src}
      alt={variant === "wordmark" ? "CHECK-iO" : "CHECK-iO Property Management"}
      width={dims.width}
      height={dims.height}
      priority={priority}
      sizes="(min-width: 768px) 220px, 160px"
      className={cn("h-auto w-full", className)}
    />
  );
}

export function LogoLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label="CHECK-iO — Torna alla home">
      {children}
    </Link>
  );
}
