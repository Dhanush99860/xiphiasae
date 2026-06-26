// src/components/Residency/Country/SidebarProgramsList.tsx
// Polished UI/UX with primary (blue) accents, light/dark support, subtle graphics,
// accessible semantics, and SEO-friendly ItemList microdata. Renders cleanly on SSR.

import * as React from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { formatTimelineLong, hasTimelineValue } from "@/lib/timeline";

// --- accept programs from any vertical (types only) ---
import type { ProgramMeta as ResidencyProgram } from "@/lib/residency-content";
import type { ProgramMeta as CitizenshipProgram } from "@/lib/citizenship-content";
import type { ProgramMeta as SkilledProgram } from "@/lib/skilled-content";
import type { ProgramMeta as CorporateProgram } from "@/lib/corporate-content";

type AnyProgram =
  | ResidencyProgram
  | CitizenshipProgram
  | SkilledProgram
  | CorporateProgram;

type SidebarProgramsListProps = {
  country: string;
  programs: AnyProgram[];
  /** Optionally highlight the currently viewed program */
  activeProgramSlug?: string;
  /** Optional: show compact thumbnails when available (default true) */
  showThumbnails?: boolean;
};

/* ================================
   Helpers (formatting & paths)
================================== */

function formatTimeline(months?: number, label?: string) {
  return formatTimelineLong(months, label, "Timeline varies");
}

function formatInvestment(value?: number, currency?: string) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (!currency) return value.toLocaleString();
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString()} ${currency}`;
  }
}

function baseFromCategory(cat?: AnyProgram["category"]) {
  switch (cat) {
    case "citizenship":
      return "/citizenship";
    case "skilled":
      return "/skilled";
    case "corporate":
      return "/corporate";
    case "residency":
    default:
      return "/residency";
  }
}

// Conservative thumbnail source without JS fallbacks (SSR-safe)
function thumbForProgram(p: AnyProgram) {
  const heroImage = (p as any).heroImage as string | undefined;
  const heroPoster = (p as any).heroPoster as string | undefined;
  const countryPoster = p.countrySlug
    ? `/images/countries/${p.countrySlug}-hero-poster.jpg`
    : undefined;
  return heroImage || heroPoster || countryPoster || "/xiphias-immigration.png";
}

/* ================================
   Component
================================== */

export default function SidebarProgramsList({
  country,
  programs,
  activeProgramSlug,
  showThumbnails = true,
}: SidebarProgramsListProps) {
  // 1) de-duplicate by countrySlug + programSlug to avoid duplicate React keys
  const seen = new Set<string>();
  const uniquePrograms: AnyProgram[] = (programs ?? []).filter((p) => {
    const id = `${p.countrySlug}::${(p as any).programSlug ?? ""}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  const hasPrograms = uniquePrograms.length > 0;
  const countrySlug = hasPrograms ? uniquePrograms[0]?.countrySlug : undefined;
  const base = baseFromCategory(
    hasPrograms ? uniquePrograms[0]?.category : undefined,
  );

  return (
    <section
      aria-labelledby="programs-heading"
      className="relative"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Decorative gold accents (non-interactive) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-gold/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-gold/5 blur-2xl"
      />

      <meta itemProp="name" content={`Programs in ${country}`} />
      <meta
        itemProp="itemListOrder"
        content="https://schema.org/ItemListOrderAscending"
      />

      <SectionHeader eyebrow="Programs" title={`In ${country}`} />

      {!hasPrograms ? (
        <div className="mt-4 rounded-2xl border border-gold/45 bg-white p-4 text-14 text-ink/70">
          No programs found for {country}.
          <div className="mt-2">
            <Link
              href={countrySlug ? `${base}/${countrySlug}` : base}
              className="
                inline-flex items-center gap-1.5
                rounded-lg px-2.5 py-1.5 text-14 font-medium
                border border-gold/45
                bg-sand/50 hover:border-gold/65
                text-ink
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
                transition
              "
            >
              Explore country overview
              <span aria-hidden="true" className="inline-block">
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M7 5l6 5-6 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <ul
          className="mt-4 space-y-2.5"
          role="list"
          aria-describedby="programs-subtext"
        >
          <span id="programs-subtext" className="sr-only">
            List of programs in {country}
          </span>

          {uniquePrograms.map((p, idx) => {
            const isActive =
              !!activeProgramSlug && p.programSlug === activeProgramSlug;
            const timelineLabel = formatTimeline(
              (p as any).timelineMonths as number | undefined,
              (p as any).timelineLabel as string | undefined,
            );
            const investmentLabel = formatInvestment(
              (p as any).minInvestment as number | undefined,
              (p as any).currency as string | undefined,
            );

            // 2) Make keys/IDs unambiguously unique and stable
            const slugSafe = (p as any).programSlug ?? "program";
            const key = `${p.countrySlug}-${slugSafe}-${idx}`;
            const metaId = `program-meta-${p.countrySlug}-${slugSafe}-${idx}`;

            const href = `${baseFromCategory(p.category)}/${p.countrySlug}/${slugSafe}`;
            const thumb = showThumbnails ? thumbForProgram(p) : null;

            return (
              <li
                key={key}
                className="min-w-0"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(idx + 1)} />
                <Link
                  href={href}
                  itemProp="item"
                  aria-describedby={metaId}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group block rounded-xl p-2.5 sm:p-3 transition border",
                    isActive
                      ? "bg-sand/60 border-gold/40"
                      : "bg-white border-gold/45 hover:border-gold/65",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    "text-ink",
                  ].join(" ")}
                >
                  {/* Layout: thumbnail/dot | content | chevron */}
                  <div className="grid grid-cols-[auto,1fr,auto] items-start gap-2.5 sm:gap-3">
                    {/* Thumbnail or accent dot */}
                    {thumb ? (
                      <div className="relative mt-0.5 h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-lg border border-gold/45 bg-sand">
                        {/* plain <img> for resilience (no domain config) */}
                        <img
                          src={thumb}
                          alt={`${p.title} thumbnail`}
                          loading="lazy"
                          decoding="async"
                          width={44}
                          height={44}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <span
                        className={[
                          "mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full",
                          isActive
                            ? "bg-gold"
                            : "bg-pearl/30 group-hover:bg-gold/70",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    )}

                    {/* Content */}
                    <div className="min-w-0">
                      <div
                        className={[
                          "font-sora text-[13.5px] sm:text-14 font-medium leading-snug line-clamp-2",
                          isActive ? "text-gold" : "text-ink",
                        ].join(" ")}
                        itemProp="name"
                      >
                        {p.title}
                      </div>

                      <div
                        id={metaId}
                        className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-12 text-ink/55"
                      >
                        {hasTimelineValue(
                          (p as any).timelineMonths as number | undefined,
                          (p as any).timelineLabel as string | undefined,
                        ) ? (
                          <span
                            className="
                              inline-flex items-center gap-1
                              rounded-md px-1.5 py-0.5
                              bg-sand/50
                              border border-gold/45
                              text-ink/70
                            "
                          >
                            <svg
                              viewBox="0 0 20 20"
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 2v2M14 2v2M3.5 7h13M5 5h10a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="tabular-nums">
                              {timelineLabel}
                            </span>
                          </span>
                        ) : null}

                        {typeof (p as any).minInvestment === "number" &&
                        (p as any).currency &&
                        investmentLabel ? (
                          <span
                            className="
                              inline-flex items-center gap-1
                              rounded-md px-1.5 py-0.5
                              bg-sand/50
                              border border-gold/45
                              text-gold
                            "
                          >
                            <svg
                              viewBox="0 0 20 20"
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              aria-hidden="true"
                            >
                              <path
                                d="M3 6h14M3 10h14M3 14h14"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="whitespace-nowrap">
                              From{" "}
                              <span className="tabular-nums">
                                {investmentLabel}
                              </span>
                            </span>
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Chevron */}
                    <span
                      className={[
                        "ml-1 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full transition",
                        isActive
                          ? "text-gold"
                          : "text-ink/40 group-hover:text-gold",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M7 5l6 5-6 5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>

                {/* SEO name (for microdata); hidden to users */}
                <meta itemProp="name" content={p.title} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
