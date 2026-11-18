"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavigation, primaryCta } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { LogoImage, LogoLink } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav";
import { ArrowRight } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "group/header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)]",
        scrolled
          ? "border-b border-navy-900/[0.07] bg-white/[0.88] shadow-[0_8px_30px_-20px_rgb(11_26_42/0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className={cn("container-site flex items-center justify-between gap-6 transition-[height] duration-500", scrolled ? "h-[68px]" : "h-[76px] lg:h-[88px]")}>
        <LogoLink className="relative w-[128px] sm:w-[140px] xl:w-[152px]">
          <span className={cn("block transition-opacity duration-500", scrolled ? "opacity-0" : "opacity-100")}>
            <LogoImage tone="light" priority />
          </span>
          <span className={cn("absolute inset-0 transition-opacity duration-500", scrolled ? "opacity-100" : "opacity-0")}>
            <LogoImage tone="dark" />
          </span>
        </LogoLink>

        <nav aria-label="Navigazione principale" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1.5">
            {mainNavigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-2.5 font-display text-[0.875rem] font-medium tracking-[-0.005em] transition-colors duration-300 xl:px-3 xl:text-[0.9375rem]",
                      "after:absolute after:inset-x-2.5 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-turq-500 after:transition-transform after:duration-500 after:ease-[var(--ease-out-expo)] hover:after:scale-x-100 xl:after:inset-x-3",
                      active && "after:scale-x-100",
                      scrolled
                        ? active
                          ? "text-navy-900"
                          : "text-navy-900/70 hover:text-navy-900"
                        : active
                          ? "text-white"
                          : "text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={primaryCta.href}
            className={buttonClasses({
              variant: "primary",
              tone: scrolled ? "light" : "dark",
              size: "sm",
              className: "max-sm:hidden",
            })}
          >
            <span className="xl:hidden">Consulenza</span>
            <span className="hidden xl:inline">{primaryCta.label}</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" strokeWidth={1.75} />
          </Link>
          <MobileMenu tone={scrolled ? "light" : "dark"} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
