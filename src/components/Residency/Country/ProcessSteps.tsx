// src/components/ProcessSteps.tsx
// Professional, immigration-site–ready process timeline.
// - Clean, authoritative UI with primary accents (light/dark)
// - Mobile-first responsive layout, no layout shift
// - A11y: clear semantics, headings, focus rings, readable labels
// - SEO: schema.org HowTo JSON-LD + anchor URLs per step
// - Backward-compatible signature & single-string fallback
"use client";

import React, { useId } from "react";
import { Clock, FileText, CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

type Step =
  | string
  | {
      title: string;
      description?: string;
      /** Optional meta displayed as compact chips */
      duration?: string; // e.g., "2–4 weeks", "10 days", "3 months"
      docs?: string; // e.g., "Passport, Police certificate"
      outcome?: string; // e.g., "File submitted", "Approval granted"
    };

export default function ProcessSteps({
  steps,
  heading = "How it works",
}: {
  steps?: Step[] | string;
  heading?: string | null;
}) {
  if (!steps || (Array.isArray(steps) && steps.length === 0)) return null;

  // ---------- Single paragraph fallback (keeps old API working) ----------
  if (!Array.isArray(steps) && typeof steps === "string") {
    const uid = useId();
    return (
      <section
        id="process"
        aria-labelledby={`process-heading-${uid}`}
        className="scroll-mt-28"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Process
          </span>
          <h3
            id={`process-heading-${uid}`}
            className="font-sora text-21 sm:text-24 font-semibold text-ink"
          >
            {heading}
          </h3>
        </div>
        <div className="mt-2 text-14 sm:text-16 leading-7 whitespace-pre-line text-ink/70">
          {steps}
        </div>
      </section>
    );
  }

  // ---------- Rich steps ----------
  const list = steps as Step[];
  const uid = useId();
  const headingId = heading ? `process-heading-${uid}` : undefined;

  // Normalize & prune empties for SEO + UI
  const items = list
    .map((raw, i) => normalize(raw, i))
    .filter((s) => s.title && s.title.trim().length > 0);

  if (items.length === 0) return null;

  // Build JSON-LD (HowTo)
  const jsonLd = buildHowToLd(heading || "Process", items, uid);

  return (
    <section
      id="process"
      role="region"
      aria-labelledby={heading ? headingId : undefined}
      className="relative scroll-mt-28"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      {/* Subtle, trustworthy background graphics (primary glows + dotted grid) */}
      <DecorativeBackground />

      {/* Header */}
      <div className="relative z-10 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Process
          </span>
          {heading ? (
            <h3 id={headingId} className="font-sora text-21 sm:text-24 font-semibold text-ink">
              {heading}
            </h3>
          ) : null}
          <span
            className="ml-auto hidden sm:inline-flex items-center rounded-full px-2.5 py-1 text-[11px] border border-gold/45 text-ink/45"
            aria-label={`${items.length} step${items.length > 1 ? "s" : ""} total`}
          >
            {items.length} step{items.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Timeline list */}
      <ol
        className="relative z-10 space-y-4 sm:space-y-5"
        aria-label="Application steps"
        itemProp="step"
      >
        {items.map((step, i) => {
          const n = i + 1;
          const isLast = i === items.length - 1;
          const palette = paletteByIndex(i);
          const stepId = `step-${uid}-${n}`;
          const anchor = `#${stepId}`;

          return (
            <li
              key={`${step.title}-${i}`}
              className="relative print:break-inside-avoid"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              {/* Left rail + marker */}
              <div className="absolute left-0 top-0 h-full w-8 sm:w-10">
                {!isLast && (
                  <span
                    className="absolute left-4 sm:left-5 top-6 bottom-0 w-px bg-gold/30"
                    aria-hidden
                  />
                )}
                <a
                  href={anchor}
                  id={stepId}
                  aria-label={`Step ${n} of ${items.length}`}
                  className={[
                    "absolute left-0 top-1 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center select-none",
                    "rounded-full text-[12px] font-semibold tabular-nums ring-2 ring-midnight",
                    palette.dotBg,
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  ].join(" ")}
                  itemProp="url"
                >
                  {n}
                </a>
              </div>

              {/* Card */}
              <article
                aria-labelledby={`${stepId}-title`}
                className={[
                  "ml-10 sm:ml-12 rounded-2xl p-4 sm:p-5",
                  "bg-white",
                  "border transition",
                  "hover:border-gold/65",
                  palette.cardRing,
                ].join(" ")}
              >
                {/* Thin accent bar */}
                <span
                  className={[
                    "block h-1 w-16 rounded-full",
                    palette.accentBar,
                  ].join(" ")}
                  aria-hidden
                />

                {/* Title */}
                <h4
                  id={`${stepId}-title`}
                  className="mt-2 font-sora text-[16px] sm:text-[18px] font-semibold leading-6 text-ink"
                  itemProp="name"
                >
                  <span className="sr-only">Step {n}: </span>
                  {step.title}
                </h4>

                {/* Description */}
                {step.description ? (
                  <p
                    className="mt-2 text-[14px] sm:text-[15px] leading-7 text-ink/55"
                    itemProp="text"
                  >
                    {step.description}
                  </p>
                ) : null}

                {/* Meta chips (Outcome / Avg time / Docs) */}
                {step.outcome || step.duration || step.docs ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <MetaChip
                      icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                      label={step.outcome || "Guided"}
                    />
                    {step.duration ? (
                      <MetaChip
                        icon={<Clock className="h-3.5 w-3.5" />}
                        label={step.duration}
                      />
                    ) : null}
                    {step.docs ? (
                      <MetaChip
                        icon={<FileText className="h-3.5 w-3.5" />}
                        label={step.docs}
                      />
                    ) : null}
                  </div>
                ) : null}

                {/* Microdata extensions (invisible) */}
                {step.durationISO ? (
                  <meta itemProp="timeRequired" content={step.durationISO} />
                ) : null}
                {step.outcome ? (
                  <meta itemProp="result" content={step.outcome} />
                ) : null}
                {step.docs ? (
                  <meta itemProp="tool" content={step.docs} />
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>

      {/* JSON-LD (SEO). Safe to inline in a client component. */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </section>
  );
}

/* ---------- Decorative background (subtle, trustworthy) ---------- */

function DecorativeBackground() {
  return (
    <>
      {/* soft gold glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-gold/5 blur-3xl"
      />
      {/* dotted grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
      >
        <defs>
          <pattern
            id="proc-grid"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.1" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#proc-grid)"
          className="text-gold/60"
        />
      </svg>
      {/* top gloss (mobile legibility) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-pearl/[0.04] to-transparent"
      />
    </>
  );
}

/* ---------- Helpers & UI bits ---------- */

function normalize(
  s: Step,
  index: number,
): {
  title: string;
  description?: string;
  duration?: string;
  durationISO?: string;
  docs?: string;
  outcome?: string;
} {
  if (typeof s === "string") {
    // If only a string, infer a title to avoid empty headings.
    return {
      title: `Step ${index + 1}`,
      description: s,
    };
  }
  return {
    ...s,
    durationISO: s.duration ? toISODuration(s.duration) : undefined,
  };
}

function MetaChip({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <span
      className="
        inline-flex items-center gap-1.5 rounded-full
        px-2.5 py-1 text-[12px]
        border border-gold/45
        bg-sand/50 text-ink/70
      "
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      <span className="whitespace-pre-wrap">{label}</span>
    </span>
  );
}

function paletteByIndex(i: number) {
  // Midnight Embassy — single gold accent across all steps.
  void i;
  return {
    dotBg: "bg-gold text-midnight",
    cardRing: "border-gold/45",
    accentBar: "bg-gradient-to-r from-gold to-transparent",
  };
}

/* ---------- SEO: JSON-LD (HowTo) ---------- */

function buildHowToLd(
  heading: string,
  steps: Array<{
    title: string;
    description?: string;
    duration?: string;
    durationISO?: string;
    docs?: string;
    outcome?: string;
  }>,
  uid: string,
) {
  if (!steps.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: heading,
    step: steps.map((s, idx) => {
      const url = `#step-${uid}-${idx + 1}`;
      const stepLd: any = {
        "@type": "HowToStep",
        name: s.title,
        url,
      };
      if (s.description) stepLd.text = s.description;
      if (s.durationISO) stepLd.timeRequired = s.durationISO;
      if (s.docs) stepLd.tool = s.docs; // approximate mapping
      if (s.outcome) stepLd.result = { "@type": "Thing", name: s.outcome };
      return stepLd;
    }),
  };
}

/* ---------- Duration -> ISO 8601 (best-effort) ---------- */

function toISODuration(input: string): string | undefined {
  // Accepts patterns like "2–4 weeks", "3 months", "10 days", "90 minutes", "1-2 weeks"
  if (!input) return undefined;
  // Pick the first numeric token for conservative ISO mapping
  const m = input
    .toLowerCase()
    .match(
      /(\d+(?:\.\d+)?)\s*(hour|hr|hours|day|days|week|weeks|month|months|minute|minutes|min)/i,
    );
  if (!m) return undefined;
  const value = Number(m[1]);
  const unit = m[2];
  if (!Number.isFinite(value)) return undefined;

  // ISO 8601 duration
  switch (unit) {
    case "minute":
    case "minutes":
    case "min":
      return `PT${Math.round(value)}M`;
    case "hour":
    case "hr":
    case "hours":
      return `PT${Math.round(value)}H`;
    case "day":
    case "days":
      return `P${Math.round(value)}D`;
    case "week":
    case "weeks":
      return `P${Math.round(value)}W`;
    case "month":
    case "months":
      return `P${Math.round(value)}M`;
    default:
      return undefined;
  }
}
