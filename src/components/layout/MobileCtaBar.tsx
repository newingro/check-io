"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { primaryCta } from "@/config/navigation";
import { whatsappHref } from "@/lib/contact";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Barra di contatto rapido per smartphone, visibile dopo la hero. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hidden = pathname.startsWith("/contatti");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-18px_rgb(11_26_42/0.45)] transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={visible ? undefined : true}
      inert={!visible}
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <Link href={primaryCta.href} className={buttonClasses({ variant: "primary", tone: "light", className: "flex-1" })}>
          {primaryCta.label}
        </Link>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrivici su WhatsApp (si apre in una nuova scheda)"
          className={buttonClasses({ variant: "secondary", tone: "light", size: "icon", className: "shrink-0" })}
        >
          <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </a>
      </div>
    </div>
  );
}
