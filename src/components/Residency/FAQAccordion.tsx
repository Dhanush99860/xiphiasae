// src/components/Residency/FAQAccordion.tsx
// Elegant, accessible FAQ accordion (UI only). JSON-LD should be injected at page level.
"use client";

import * as React from "react";

type FAQ = { q: string; a: string };

export default function FAQSection({ faqs }: { faqs?: FAQ[] }) {
  // ❗ Never put hooks after an early return
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  // Stable slugs for #hash deep links
  const slugs = React.useMemo(() => (faqs ?? []).map((f) => slugify(f.q)), [faqs]);

  // Open matching hash on load / change
  React.useEffect(() => {
    const applyHash = () => {
      const hash = decodeURIComponent(
        (typeof window !== "undefined" ? window.location.hash : "").replace("#", "")
      );
      if (!hash) return;
      const idx = slugs.indexOf(hash);
      if (idx >= 0) setOpenIndex(idx);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [slugs]);

  const onToggle = React.useCallback(
    (idx: number) => {
      setOpenIndex((cur) => {
        const next = cur === idx ? null : idx;
        if (typeof window !== "undefined" && window.history?.replaceState) {
          const nextHash = next === null ? "" : `#${slugs[next]}`;
          const url = nextHash
            ? `${window.location.pathname}${window.location.search}${nextHash}`
            : `${window.location.pathname}${window.location.search}`;
          window.history.replaceState(null, "", url);
        }
        return next;
      });
    },
    [slugs]
  );

  // Now it’s safe to bail out
  if (!faqs?.length) return null;

  return (
    <section id="faq" role="region" aria-label="Frequently asked questions" className="mt-5">
      <div className="overflow-visible rounded-2xl bg-white border border-gold/45 divide-y divide-gold/5">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}-${slugs[i]}`;
          const buttonId = `faq-button-${i}-${slugs[i]}`;

          return (
            <div
              key={panelId}
              className={`px-4 sm:px-5 border-l-2 transition-colors ${isOpen ? "border-gold" : "border-transparent"}`}
            >
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => onToggle(i)}
                  className={[
                    "group flex w-full items-center justify-between gap-3 py-4 sm:py-5 text-left text-[15px] sm:text-base font-semibold rounded-lg hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition",
                    isOpen ? "text-gold" : "text-ink",
                  ].join(" ")}
                >
                  <span className="pr-2">{f.q}</span>
                  <Chevron
                    className={[
                      "h-5 w-5 shrink-0 text-gold transition-transform duration-300",
                      isOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={[
                  "grid transition-all duration-300 ease-out motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="pb-4 sm:pb-5 text-[15px] leading-7 text-ink/55 whitespace-pre-line">
                    {f.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* helpers */
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}