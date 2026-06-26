"use client";

import * as React from "react";
import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

// ✅ Accept countries/programs from any vertical
import type {
  CountryMeta as ResidencyCountry,
  ProgramMeta as ResidencyProgram,
} from "@/lib/residency-content";
import type {
  CountryMeta as CitizenshipCountry,
  ProgramMeta as CitizenshipProgram,
} from "@/lib/citizenship-content";
import type {
  CountryMeta as SkilledCountry,
  ProgramMeta as SkilledProgram,
} from "@/lib/skilled-content";
import type {
  CountryMeta as CorporateCountry,
  ProgramMeta as CorporateProgram,
} from "@/lib/corporate-content";

type AnyCountry =
  | ResidencyCountry
  | CitizenshipCountry
  | SkilledCountry
  | CorporateCountry;
type AnyProgram =
  | ResidencyProgram
  | CitizenshipProgram
  | SkilledProgram
  | CorporateProgram;

import CountryCard from "./CountryCard";
import TopPrograms from "@/components/Residency/TopPrograms";
import ContactForm from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui";
import {
  Reveal,
  SandReveal,
  ShinyText,
  Stagger,
  StaggerItem,
  DrawLine,
  TiltCard,
} from "@/components/motion";
import { ca } from "date-fns/locale"; // (tree-shaken; safe if unused)

// ---------------- helpers ----------------
function baseFromCategory(
  cat?: AnyCountry["category"] | AnyProgram["category"],
) {
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
/** Accent-insensitive, whitespace-tolerant search */
function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

type Props = {
  countries: AnyCountry[];
  topPrograms?: AnyProgram[];
  /** Optional override for the right-column heading */
  topHeading?: string;
};

export default function ResidencyLanding({
  countries,
  topPrograms,
  topHeading,
}: Props) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut: press "/" to jump to desktop search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as any).isContentEditable);
      if (!isTyping && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const s = norm(q);
    if (!s) return countries;
    return countries.filter((c) => {
      const title = norm(c.title || "");
      const country = norm(c.country || "");
      const summary = norm(c.summary || "");
      return (
        title.includes(s) ||
        country.includes(s) ||
        (summary && summary.includes(s))
      );
    });
  }, [countries, q]);

  // Heading for the aside list
  const derivedHeading =
    topHeading ??
    (topPrograms && topPrograms[0]
      ? `Top ${topPrograms[0].category
          .charAt(0)
          .toUpperCase()}${topPrograms[0].category.slice(1)} Programs`
      : "Top Programs");

  // SEO: build ItemList JSON-LD for country grid
  const itemListJsonLd = React.useMemo(() => {
    const elements = filtered.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseFromCategory(c.category)}/${c.countrySlug}`,
      name: c.title || c.country,
      description: c.summary || undefined,
    }));
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Explore by country",
      itemListElement: elements,
    } as const;
  }, [filtered]);

  return (
    <section
      className="relative mt-12 overflow-hidden rounded-3xl border border-gold/45 bg-sand px-5 py-10 text-ink md:px-8 md:py-12"
      aria-labelledby="explore-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Subtle gold/lattice background */}
      <Background />

      {/* ---- Section header ---- */}
      <div className="relative z-10 mb-10 max-w-3xl">
        <Reveal>
          <Eyebrow tone="gold" arabic="الوجهات">
            Explore by country
          </Eyebrow>
        </Reveal>
        <SandReveal delay={0.05} y={32} blur={10}>
          <h2 className="mt-5 text-balance font-sora text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold leading-[1.08] tracking-tight text-ink">
            Residency routes,{" "}
            <ShinyText
              baseColor="#a87d1f"
              shineColor="#f3d98a"
              className="font-sora"
            >
              mapped across the world.
            </ShinyText>
          </h2>
        </SandReveal>
        <DrawLine
          d="M0 1 L120 1"
          viewBox="0 0 120 2"
          preserveAspectRatio="none"
          strokeWidth={1.5}
          delay={0.35}
          className="mt-5 h-px w-28"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* ---- Left/Main: Countries ---- */}
      <div className="order-1 lg:order-1 lg:col-span-2 space-y-4">
        {/* Title row (desktop) */}
        <div className="hidden md:flex items-center justify-between">
          <h2
            id="explore-heading"
            className="text-base font-semibold uppercase tracking-[0.18em] text-ink/70"
          >
            Destinations
          </h2>
          <Link
            href="/personal-booking"
            className="text-sm font-medium text-gold underline-offset-4 hover:underline"
          >
            Need advice?
          </Link>
        </div>

        {/* Mobile sticky search */}
        <div
          role="search"
          className="md:hidden sticky top-0 z-40 -mx-5 px-5 py-3 bg-sand/95 backdrop-blur border-b border-gold/45"
          aria-label="Search countries"
        >
          <SearchField
            id="mobileCountrySearch"
            value={q}
            onChange={setQ}
            placeholder="Type a country name…"
            srLabel="Search countries"
          />
          <CountBar current={filtered.length} total={countries.length} />
        </div>

        {/* Country Grid — sequenced reveal */}
        <Stagger amount={0.12}>
          <ul
            id="country-grid"
            role="list"
            className="grid items-stretch gap-4 sm:grid-cols-2"
            aria-live="polite"
          >
            {filtered.map((c) => (
              <li key={c.countrySlug} className="flex min-w-0">
                {/* CountryCard already handles category-aware links */}
                <StaggerItem className="flex min-w-0 flex-1">
                  <TiltCard max={6} className="flex min-w-0 flex-1 [transform-style:preserve-3d]">
                    <CountryCard country={c as any} variant="compact" />
                  </TiltCard>
                </StaggerItem>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="sm:col-span-2">
                <EmptyState query={q} onClear={() => setQ("")} />
              </li>
            )}
          </ul>
        </Stagger>
      </div>

      {/* ---- Right/Aside (sticky) ---- */}
      <aside className="order-2 lg:order-2 lg:sticky lg:top-6 h-max">
        <div className="rounded-2xl border border-gold/45 bg-dune/40 p-5 backdrop-blur-sm">
          {/* Desktop search */}
          <div className="hidden md:block" role="search">
            <label
              htmlFor="countrySearch"
              className="text-lg font-semibold text-ink"
            >
              Search countries
            </label>
            <div className="mt-3">
              <SearchField
                id="countrySearch"
                inputRef={inputRef}
                value={q}
                onChange={setQ}
                placeholder="Type a country name…"
                srLabel="Search countries"
              />
            </div>
            <CountBar current={filtered.length} total={countries.length} />
            <p className="mt-2 text-[12px] text-ink/60">
              Tip: press{" "}
              <kbd className="rounded border border-gold/40 px-1 text-ink/70">
                /
              </kbd>{" "}
              to focus the search.
            </p>
          </div>

          {/* Top programs (horizontal cards for sidebars) */}
          {topPrograms && topPrograms.length > 0 ? (
            <div className="mt-6">
              <header className="mb-3">
                <span className="flex items-center gap-3">
                  <DrawLine
                    d="M0 1 L36 1"
                    viewBox="0 0 36 2"
                    preserveAspectRatio="none"
                    strokeWidth={1.5}
                    delay={0.15}
                    className="h-px w-6 shrink-0"
                  />
                  <Reveal y={8} delay={0.05}>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold_deep">
                      {derivedHeading}
                    </h3>
                  </Reveal>
                </span>
                <p className="mt-2 text-sm text-ink/60">
                  Popular, fast-moving options across countries.
                </p>
              </header>
              <TopPrograms programs={topPrograms as any} />
            </div>
          ) : null}
        </div>

        {/* Contact form */}
        <div className="pt-5">
          <ContactForm />
        </div>
      </aside>
      </div>

      {/* SEO: JSON-LD for the country grid */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

function SearchField({
  id,
  value,
  onChange,
  placeholder,
  srLabel,
  inputRef,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  srLabel: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {srLabel}
      </label>
      <Search
        className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold_deep/70"
        aria-hidden
      />
      <input
        ref={inputRef}
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={[
          "w-full rounded-xl",
          "bg-sand/60",
          "border border-gold/45",
          "px-9 py-3 text-sm md:text-base",
          "text-ink",
          "placeholder:text-ink/55",
          "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold",
        ].join(" ")}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute end-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/45 bg-sand/60 text-ink/70 transition-colors hover:border-gold/65 hover:text-gold"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

function CountBar({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="mt-2 text-xs text-ink/60"
      aria-live="polite"
      role="status"
    >
      Showing{" "}
      <strong className="tabular-nums text-gold_deep">{current}</strong> of{" "}
      <span className="tabular-nums text-ink/70">{total}</span>
    </div>
  );
}

function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gold/45 bg-dune/40 p-6 text-center backdrop-blur-sm">
      <p className="text-sm text-ink/70">
        No countries match{" "}
        <span className="font-semibold text-ink">&ldquo;{query}&rdquo;</span>.
      </p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          onClick={onClear}
          className="rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-midnight transition-colors hover:shadow-[0_8px_30px_-8px_rgba(212,175,55,0.6)]"
        >
          Clear search
        </button>
        <Link
          href="/contact"
          className="rounded-full border border-gold/40 px-4 py-1.5 text-sm text-ink transition-colors hover:border-gold/60"
        >
          Get help
        </Link>
      </div>
    </div>
  );
}

/* ---------------- background (subtle, black & white) ---------------- */
function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      {/* warm dune band so the flat sand reads as layered, not empty */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dune/45 to-transparent" />
      {/* faint gold dot-grid — readable on sand (gold_deep for contrast) */}
      <svg
        className="absolute inset-0 h-full w-full text-gold_deep opacity-[0.22]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-gold"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-gold)" />
      </svg>
      {/* soft gold underglows */}
      <div className="absolute -top-24 -start-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-24 -end-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
    </div>
  );
}
