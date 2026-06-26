"use client";

import React, { useId } from "react";
import { Clock, FileText, CheckCircle2 } from "lucide-react";

type Step = { title: string; description?: string };

/**
 * ProcessTimeline — refined, readable, “premium” timeline.
 * - Minimal cards (soft ring + subtle tint), strong type hierarchy
 * - Vertical rail on all screens (no jumpy grids), perfect for scanning
 * - Numbered markers with connecting line (no JS)
 * - Optional meta chips (duration/docs/outcome) if provided in each step object:
 *     { title, description, duration?: string, docs?: string, outcome?: string }
 *
 * Signature unchanged: ({ steps, heading? })
 */
export default function ProcessTimeline({
  steps,
  heading = "How it works",
}: {
  steps: Step[];
  heading?: string | null;
}) {
  if (!steps?.length) return null;

  const uid = useId();
  const headingId = heading ? `process-heading-${uid}` : undefined;

  return (
    <section
      role="region"
      aria-labelledby={heading ? headingId : undefined}
      className="text-ink"
    >
      {/* Header */}
      {heading ? (
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Process
          </span>
          <h3 id={headingId} className="font-sora text-xl font-semibold text-ink">
            {heading}
          </h3>
          <span className="ml-auto hidden sm:inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-gold/45 text-ink/45">
            {steps.length} step{steps.length > 1 ? "s" : ""}
          </span>
        </div>
      ) : null}

      {/* Timeline list */}
      <ol className="space-y-4 sm:space-y-5" aria-label="Application steps">
        {steps.map((raw, i) => {
          const step = raw as Step & {
            duration?: string;
            docs?: string;
            outcome?: string;
          };
          const isLast = i === steps.length - 1;
          const stepId = `step-${uid}-${i + 1}`;
          const palette = paletteByIndex(i);

          return (
            <li key={`${step.title}-${i}`} className="relative">
              {/* Marker + connector */}
              <div className="absolute left-0 top-0 h-full w-8 sm:w-10">
                {/* connector line */}
                {!isLast ? (
                  <span
                    className="absolute left-4 sm:left-5 top-6 bottom-0 w-px bg-gold/30"
                    aria-hidden
                  />
                ) : null}
                {/* dot */}
                <span
                  className={[
                    "absolute left-0 top-1 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center",
                    "rounded-full text-[13px] font-semibold ring-2 ring-midnight",
                    palette.dotBg,
                  ].join(" ")}
                  aria-hidden
                >
                  {i + 1}
                </span>
              </div>

              {/* Card */}
              <article
                aria-labelledby={`${stepId}-title`}
                className={[
                  "ml-10 sm:ml-12 rounded-xl p-4 sm:p-5",
                  "bg-white",
                  "border transition",
                  "hover:border-gold/65",
                  palette.cardRing,
                ].join(" ")}
              >
                {/* accent bar */}
                <span
                  className={[
                    "block h-1 w-14 rounded-full",
                    palette.accentBar,
                  ].join(" ")}
                  aria-hidden
                />

                <h4
                  id={`${stepId}-title`}
                  className="mt-2 font-sora text-base font-semibold leading-6 text-ink"
                >
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h4>

                {step.description ? (
                  <p className="mt-2 text-[15px] leading-7 text-ink/55">
                    {step.description}
                  </p>
                ) : null}

                {/* Optional meta chips */}
                {step.duration || step.docs || step.outcome ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.outcome ? (
                      <Chip icon={<CheckCircle2 className="h-3.5 w-3.5" />}>
                        {step.outcome}
                      </Chip>
                    ) : null}
                    {step.duration ? (
                      <Chip icon={<Clock className="h-3.5 w-3.5" />}>
                        {step.duration}
                      </Chip>
                    ) : null}
                    {step.docs ? (
                      <Chip icon={<FileText className="h-3.5 w-3.5" />}>
                        {step.docs}
                      </Chip>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2 opacity-80">
                    <Chip icon={<CheckCircle2 className="h-3.5 w-3.5" />}>
                      Guided
                    </Chip>
                    <Chip icon={<Clock className="h-3.5 w-3.5" />}>
                      Avg. 2–4 weeks
                    </Chip>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ---------- UI bits ---------- */

function Chip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span
      className="
        inline-flex items-center gap-1.5 rounded-full
        px-2.5 py-1 text-xs
        border border-gold/45
        bg-sand/50 text-ink/70
      "
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      {children}
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
