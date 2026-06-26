// src/components/Shared/RiskCompliance.tsx
import React from "react";

type Props = {
  /** Short, plain-text risk statements. Rendered as a readable list. */
  riskNotes?: string[];
  /** Plain-text compliance reminders / regulatory notes. */
  complianceNotes?: string[];
  className?: string;
  title?: string; // default: "Risk & compliance"
};

/**
 * RiskCompliance — professional, readable callouts
 * ------------------------------------------------
 * • Server-component friendly (no hooks)
 * • Neutral white surface; amber accent for Risk, blue accent for Compliance
 * • Accessible: semantic regions, headings, lists, focus styles
 * • Responsive: single column → two columns; print-friendly
 * • SEO: JSON-LD ItemLists for risk/compliance notes
 * • No external icon libs (inline SVGs only)
 */
export default function RiskCompliance({
  riskNotes = [],
  complianceNotes = [],
  className = "",
  title = "Risk & compliance",
}: Props) {
  if (!riskNotes.length && !complianceNotes.length) return null;

  const sectionId = "risk-compliance";

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
      className={[
        "relative overflow-hidden",
        "rounded-2xl p-5 md:p-6 lg:p-8",
        "bg-white border border-gold/45 print:shadow-none",
        className,
      ].join(" ")}
    >
      <BackgroundGraphics />

      {/* Header */}
      <header className="relative mb-4 md:mb-5">
        <div className="flex items-center gap-2 text-[12px] text-gold">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-medium uppercase tracking-[0.2em]">Disclosure</span>
        </div>
        <h2
          id={`${sectionId}-title`}
          className="mt-2 font-sora text-lg md:text-xl font-semibold tracking-tight text-ink"
        >
          {title}
        </h2>
        <p className="mt-1 text-sm text-ink/55">
          Please read carefully. These notes are informational and do not
          constitute legal or financial advice.
        </p>
      </header>

      {/* Columns */}
      <div className="relative grid gap-4 md:grid-cols-2">
        {/* Risk */}
        {riskNotes.length ? (
          <article
            aria-labelledby={`${sectionId}-risk`}
            role="note"
            className="rounded-xl p-4 border border-gold/45 bg-sand/50"
          >
            <div className="flex items-center justify-between gap-2">
              <h3
                id={`${sectionId}-risk`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <AlertIcon className="h-4 w-4 text-gold" />
                Risk notes
              </h3>
              <span className="inline-flex items-center gap-1 rounded-md bg-sand/50 px-2 py-0.5 text-[11px] font-medium text-ink/70 border border-gold/45">
                {riskNotes.length} item{riskNotes.length === 1 ? "" : "s"}
              </span>
            </div>

            <ul className="mt-2 space-y-2" role="list">
              {riskNotes.map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  className="flex items-start gap-2 text-[15px] leading-7"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-gold"
                  />
                  <span className="text-ink/70">
                    {n}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        {/* Compliance */}
        {complianceNotes.length ? (
          <article
            aria-labelledby={`${sectionId}-compliance`}
            role="note"
            className="rounded-xl p-4 border border-gold/45 bg-sand/50"
          >
            <div className="flex items-center justify-between gap-2">
              <h3
                id={`${sectionId}-compliance`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <ShieldIcon className="h-4 w-4 text-gold" />
                Compliance
              </h3>
              <span className="inline-flex items-center gap-1 rounded-md bg-sand/50 px-2 py-0.5 text-[11px] font-medium text-ink/70 border border-gold/45">
                {complianceNotes.length} item
                {complianceNotes.length === 1 ? "" : "s"}
              </span>
            </div>

            <ul className="mt-2 space-y-2" role="list">
              {complianceNotes.map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  className="flex items-start gap-2 text-[15px] leading-7"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-gold"
                  />
                  <span className="text-ink/70">
                    {n}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}
      </div>

      {/* Fine print */}
      <footer className="relative mt-4">
        <p className="text-[12px] text-ink/45">
          Program rules change periodically. Always consult the official source
          and independent counsel.
        </p>
      </footer>

      {/* SEO: JSON-LD (two ItemLists under hasPart) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toJsonLd(riskNotes, complianceNotes)),
        }}
      />
    </section>
  );
}

/* ---------------- Background (light grid + neutral glows) ---------------- */
function BackgroundGraphics() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 print:hidden"
    >
      <div className="absolute -top-24 -left-20 h-56 w-56 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="rc-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0v24"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rc-grid)" />
      </svg>
    </div>
  );
}

/* ---------------- Icons (inline, no deps) ---------------- */

function AlertIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M10 3l8 14H2L10 3z" />
      <path d="M10 8v4M10 15h.01" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ---------------- SEO JSON-LD ---------------- */

function toJsonLd(risk: string[], compliance: string[]) {
  const makeList = (name: string, arr: string[]) => ({
    "@type": "ItemList",
    name,
    itemListElement: arr.map((text, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "CreativeWork", name: text },
    })),
  });

  const parts = [];
  if (risk.length) parts.push(makeList("Risk notes", risk));
  if (compliance.length) parts.push(makeList("Compliance notes", compliance));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    name: "Risk & compliance",
    hasPart: parts,
  } as const;
}
