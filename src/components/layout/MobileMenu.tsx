"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { mainNavigation, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { phoneHref, whatsappHref } from "@/lib/contact";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav";
import { LogoImage } from "./Logo";

export function MobileMenu({ tone, pathname }: { tone: "light" | "dark"; pathname: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-[3px] border transition-colors lg:hidden",
          tone === "dark" ? "border-white/20 text-white hover:border-white/50" : "border-navy-900/15 text-navy-900 hover:border-navy-900/40",
        )}
        aria-label="Apri il menu di navigazione"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-menu-overlay fixed inset-0 z-[60] bg-navy-950/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="mobile-menu-panel on-dark fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col overflow-y-auto bg-navy-950 text-white shadow-2xl outline-none"
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between px-5 sm:px-8">
            <Link href="/" onClick={close} className="w-[128px]" aria-label="CHECK-iO — Torna alla home">
              <LogoImage tone="light" />
            </Link>
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-[3px] border border-white/20 text-white transition-colors hover:border-white/50"
              aria-label="Chiudi il menu"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu di navigazione</Dialog.Title>

          <nav aria-label="Navigazione mobile" className="px-5 pt-6 sm:px-8">
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {mainNavigation.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center gap-4 py-3 font-display text-xl font-medium tracking-[-0.02em] transition-colors",
                        active ? "text-white" : "text-white/75 hover:text-white",
                      )}
                    >
                      <span className="tabular w-6 font-sans text-xs font-medium text-turq-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                      {active ? <span className="ml-auto size-1.5 rounded-full bg-turq-500" aria-hidden="true" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto space-y-5 px-5 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
            <Link href={primaryCta.href} onClick={close} className={buttonClasses({ variant: "primary", tone: "dark", className: "w-full" })}>
              {primaryCta.label}
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={phoneHref} className={buttonClasses({ variant: "secondary", tone: "dark", size: "compact" })}>
                <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
                Chiama
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "secondary", tone: "dark", size: "compact" })}
              >
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
                WhatsApp
                <span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </div>
            <p className="text-center text-sm text-white/55">{siteConfig.contact.phone.display}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
