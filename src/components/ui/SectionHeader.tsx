import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)} data-reveal>
      {eyebrow ? <p className={cn("eyebrow", tone === "dark" && "eyebrow-dark")}>{eyebrow}</p> : null}
      <Heading
        id={id}
        className={cn("heading-2 mt-5", tone === "dark" ? "text-white" : "text-navy-900")}
      >
        {title}
      </Heading>
      {description ? (
        <div className={cn("lead mt-6", tone === "dark" ? "text-white/70" : "text-slate", align === "center" && "mx-auto max-w-2xl")}>
          {description}
        </div>
      ) : null}
      {children}
    </div>
  );
}
