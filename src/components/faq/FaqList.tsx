import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/cn";

/** Accordion accessibile basato su <details>/<summary>: funziona anche senza JavaScript. */
export function FaqList({ items, headingLevel = "h3", className }: { items: FaqItem[]; headingLevel?: "h2" | "h3"; className?: string }) {
  const Heading = headingLevel;
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors hover:text-turq-700 md:py-7 [&::-webkit-details-marker]:hidden">
            <Heading className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-navy-900 md:text-[1.1875rem]">
              {item.question}
            </Heading>
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-navy-900 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:border-turq-500 group-open:bg-turq-500 group-open:text-navy-950"
            >
              <Plus className="size-3.5" strokeWidth={2} />
            </span>
          </summary>
          <div className="max-w-3xl pr-10 pb-7 leading-relaxed text-slate [&_p+p]:mt-3">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
