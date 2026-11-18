import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "dark" | "light";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[3px] px-6 py-3 font-display text-[0.9375rem] font-semibold tracking-[-0.005em] transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    dark: "bg-turq-500 text-navy-950 hover:bg-turq-400 shadow-[0_10px_30px_-12px_rgb(8_183_169/0.55)]",
    light: "bg-navy-900 text-white hover:bg-navy-700 shadow-[0_10px_30px_-14px_rgb(11_26_42/0.6)]",
  },
  secondary: {
    dark: "border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.04]",
    light: "border border-navy-900/20 text-navy-900 hover:border-navy-900/60 hover:bg-navy-900/[0.03]",
  },
  ghost: {
    dark: "px-0 text-white hover:text-turq-300 min-h-11",
    light: "px-0 text-navy-900 hover:text-turq-700 min-h-11",
  },
};

export function buttonClasses({
  variant = "primary",
  tone = "dark",
  className,
}: { variant?: Variant; tone?: Tone; className?: string } = {}) {
  return cn(base, variants[variant][tone], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1"
      strokeWidth={1.75}
    />
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  arrow?: boolean;
  icon?: ReactNode;
  external?: boolean;
}

export function ButtonLink({
  variant = "primary",
  tone = "dark",
  className,
  arrow = true,
  icon,
  external,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, tone, className });
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && !icon ? <Arrow /> : null}
    </>
  );
  if (external) {
    return (
      <a href={String(href)} className={classes} target="_blank" rel="noopener noreferrer" {...(props as ComponentProps<"a">)}>
        {content}
        <span className="sr-only"> (si apre in una nuova scheda)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
