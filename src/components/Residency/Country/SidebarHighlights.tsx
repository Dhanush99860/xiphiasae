// src/components/SidebarHighlights.tsx
// Refined UI/UX with primary (blue) accents, light/dark theme support,
// accessible semantics, microdata (SEO), and responsive polish.
// Signature unchanged: ({ points }: { points?: string[] })

import * as React from "react";
import SectionHeader from "./SectionHeader";
import { CheckCircle2 } from "lucide-react";

export default function SidebarHighlights({ points }: { points?: string[] }) {
  if (!Array.isArray(points) || points.length === 0) return null;

  return (
    <section
      aria-labelledby="highlights-title"
      className="relative"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Decorative gold glows (non-interactive) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-gold/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-gold/5 blur-2xl"
      />

      <meta itemProp="name" content="Program highlights" />
      <meta
        itemProp="itemListOrder"
        content="https://schema.org/ItemListOrderAscending"
      />

      <SectionHeader
        eyebrow="Highlights"
        title="Why founders choose this"
      />

      <ul
        className="mt-4 grid grid-cols-1 gap-2.5 sm:gap-3"
        role="list"
        aria-describedby="highlights-subtext"
      >
        <span id="highlights-subtext" className="sr-only">
          Key reasons this program is attractive for founders
        </span>

        {points.map((pt, idx) => (
          <li
            key={idx}
            tabIndex={0}
            className={[
              "group relative overflow-hidden rounded-xl",
              // Card surface
              "bg-white",
              // Subtle border
              "border border-gold/45 hover:border-gold/65",
              // Spacing & interaction
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
            ].join(" ")}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-label={`Highlight ${idx + 1}: ${pt}`}
          >
            <meta itemProp="position" content={String(idx + 1)} />

            {/* Hover glow accent */}
            <div
              className="
                pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full
                bg-gold/15 opacity-0
                blur-2xl group-hover:opacity-100 transition-opacity duration-300
              "
              aria-hidden
            />

            <div className="relative grid grid-cols-[auto,1fr,auto] items-start gap-3 p-3.5">
              {/* Leading icon badge */}
              <span
                className="
                  mt-0.5 grid h-8 w-8 place-items-center shrink-0 rounded-full
                  bg-sand/50
                  border border-gold/45
                "
                aria-hidden
              >
                <CheckCircle2 className="h-4.5 w-4.5 text-gold" />
              </span>

              {/* Copy */}
              <p
                className="min-w-0 text-14 sm:text-[15px] leading-6 text-ink/70 break-words hyphens-auto"
                itemProp="name"
              >
                {pt}
              </p>

              {/* Index pill */}
              <span
                className="
                  ml-2 mt-0.5 inline-flex items-center justify-center
                  rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums
                  bg-sand/50 text-gold border border-gold/45
                "
                aria-label={`Highlight ${idx + 1}`}
              >
                {idx + 1}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
