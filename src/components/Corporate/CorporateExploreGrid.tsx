// src/components/Corporate/SkilledExploreGrid.tsx
"use client";

import React from "react";
import Link from "next/link";
import type { ProgramMeta, CountryMeta } from "@/lib/corporate-content";
import CountryCardPro from "@/components/Citizenship/CountryCardPro"; // same visual
import CompareDrawer, {
  type CompareItem,
} from "@/components/Citizenship/CompareDrawer"; // same visual drawer
import {
  Search as SearchIcon,
  SlidersHorizontal,
  XCircle,
  ChevronDown,
  Check as CheckIcon,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { formatTimelineShort } from "@/lib/timeline";
import { Eyebrow } from "@/components/ui";
import {
  DrawLine,
  Reveal,
  SandReveal,
  SplitText,
  GradientText,
  LatticeOverlay,
  CollectionRail,
  ImageReveal,
  ParallaxLayer,
  Stagger,
  StaggerItem,
  Counter,
} from "@/components/motion";

/* ------------------------- helpers & formatters ------------------------- */

type CorporateRoute =
  | "free-zone"
  | "mainland"
  | "holding"
  | "entrepreneur"
  | "investor"
  | "branch"
  | "work-permit"
  | "ep" // employment pass / executive permit
  | "hq";

/** Infer a corporate route type from tags */
function inferCorporateRouteTypeFromTags(
  tags?: string[],
): CorporateRoute | undefined {
  if (!tags) return undefined;
  const t = tags.map((s) => s.toLowerCase());

  if (t.some((s) => s.includes("free zone") || s.includes("freezone") || s.includes("fz")))
    return "free-zone";
  if (t.some((s) => s.includes("mainland"))) return "mainland";
  if (t.some((s) => s.includes("holding"))) return "holding";
  if (t.some((s) => s.includes("entrepreneur") || s.includes("startup")))
    return "entrepreneur";
  if (t.some((s) => s.includes("investor") || s.includes("investment")))
    return "investor";
  if (t.some((s) => s.includes("branch"))) return "branch";
  if (t.some((s) => s.includes("work permit") || s.includes("work-permit")))
    return "work-permit";
  if (
    t.some(
      (s) =>
        s.includes("ep") ||
        s.includes("employment pass") ||
        s.includes("executive permit"),
    )
  )
    return "ep";
  if (t.some((s) => s.includes("hq") || s.includes("headquarters"))) return "hq";

  return undefined;
}

const STABLE_LOCALE = "en"; // <- keep output identical on server & client

function toCurrency(amount?: number, currency = "USD") {
  if (typeof amount !== "number") return "";
  try {
    return new Intl.NumberFormat(STABLE_LOCALE, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString(STABLE_LOCALE)}`;
  }
}

// normalize any relative path ("images/..") to root-absolute ("/images/..")
function ensureAbs(src?: string) {
  if (!src) return undefined;
  return src.startsWith("/") ? src : `/${src.replace(/^\.?\/*/, "")}`;
}

/** Shared ranker for programs (safe) */
function rankPrograms(all: ProgramMeta[]) {
  const key = (x: ProgramMeta) =>
    `${String(x?.title ?? "")} ${String(x?.country ?? "")}`.trim();

  return [...all].sort((a, b) => {
    const tA = a.timelineMonths ?? Number.MAX_SAFE_INTEGER;
    const tB = b.timelineMonths ?? Number.MAX_SAFE_INTEGER;
    if (tA !== tB) return tA - tB;

    const iA = a.minInvestment ?? Number.MAX_SAFE_INTEGER; // used as setup/min capital when present
    const iB = b.minInvestment ?? Number.MAX_SAFE_INTEGER;
    if (iA !== iB) return iA - iB;

    return key(a).localeCompare(key(b), STABLE_LOCALE, { sensitivity: "base" });
  });
}

function pickTopPrograms(all: ProgramMeta[], n = 5) {
  return rankPrograms(all).slice(0, n);
}

/** Build a preview image with safe fallback (normalize to absolute) */
function imgOrFallback(p: ProgramMeta) {
  const img =
    ensureAbs((p as any).heroImage as string | undefined) ||
    ensureAbs((p as any).heroPoster as string | undefined);
  return img || `/images/corporate/${p.countrySlug}.jpg`;
}

/** Discover which route types exist across programs */
function availableRouteTypes(programs?: ProgramMeta[]) {
  const set = new Set<string>();
  for (const p of programs ?? []) {
    const rt = inferCorporateRouteTypeFromTags((p as any).tags);
    if (rt) set.add(rt);
  }
  return Array.from(set) as CorporateRoute[];
}

/** Heuristic: 100% ownership (no local partner) bubble-up */
function hasFullOwnership(p: ProgramMeta) {
  const t = ((p as any).tags ?? []).map((s: string) => s.toLowerCase());
  if (t.some((s: string) => s.includes("100%") && s.includes("ownership")))
    return true;
  if (t.some((s: string) => s.includes("free zone") || s.includes("freezone")))
    return true;
  if (
    t.some(
      (s: string) =>
        s.includes("no local sponsor") || s.includes("no local partner"),
    )
  )
    return true;
  return false;
}

/* -------------------------------- types -------------------------------- */

type Option = { value: string; label: string; hint?: string };

/* --------------------------- main component ---------------------------- */

export default function ExploreGrid({
  countries,
  programs,
  className,
}: {
  countries?: CountryMeta[];
  programs?: ProgramMeta[];
  className?: string;
}) {
  const safeCountries = countries ?? [];
  const safePrograms = programs ?? [];

  const [q, setQ] = React.useState("");
  const [routeType, setRouteType] = React.useState<string>("");
  const [sort, setSort] = React.useState<
    "timeline" | "setup" | "ownership" | "alpha"
  >("timeline");

  const routeTypes = React.useMemo(
    () => availableRouteTypes(safePrograms),
    [safePrograms],
  );

  const routeTypeOptions: Option[] = React.useMemo(
    () => [
      { value: "", label: "All routes" },
      ...routeTypes.map((rt) => ({
        value: rt,
        label: rt
          .replace("-", " ")
          .replace(/\b\w/g, (m) => m.toUpperCase()),
      })),
    ],
    [routeTypes],
  );

  const sortOptions: Option[] = React.useMemo(
    () => [
      {
        value: "timeline",
        label: "Fastest timeline",
        hint: "Shortest months first",
      },
      {
        value: "setup",
        label: "Lowest setup / min capital",
        hint: "Lower declared minimum first",
      },
      {
        value: "ownership",
        label: "100% ownership first",
        hint: "Free zone & no-local-partner first",
      },
      { value: "alpha", label: "A–Z country", hint: "Alphabetical" },
    ],
    [],
  );

  /** Filter programs by route & search */
  const filteredPrograms = React.useMemo(() => {
    const ql = q.trim().toLowerCase();
    return safePrograms.filter((p) => {
      const derived = inferCorporateRouteTypeFromTags((p as any).tags);
      if (routeType && derived !== routeType) return false;
      if (!ql) return true;

      const title = String(p?.title ?? "").toLowerCase();
      const country = String(p?.country ?? "").toLowerCase();
      const slug = String((p as any)?.programSlug ?? "").toLowerCase();
      const tags: string[] = Array.isArray((p as any)?.tags)
        ? (p as any).tags
        : [];

      return (
        title.includes(ql) ||
        country.includes(ql) ||
        slug.includes(ql) ||
        tags.some((t) => String(t).toLowerCase().includes(ql))
      );
    });
  }, [safePrograms, q, routeType]);

  /** Per-country best stats after filtering */
  const bestByCountry = React.useMemo(() => {
    const map = new Map<string, ProgramMeta | undefined>();
    for (const p of filteredPrograms) {
      const current = map.get(p.countrySlug);
      if (!current) {
        map.set(p.countrySlug, p);
      } else {
        const a = p.timelineMonths ?? Number.MAX_SAFE_INTEGER;
        const b = current.timelineMonths ?? Number.MAX_SAFE_INTEGER;
        if (a < b) map.set(p.countrySlug, p);
      }
    }
    return map;
  }, [filteredPrograms]);

  /** Country list derived for cards */
  const normalized = React.useMemo(
    () =>
      safeCountries.map((c) => {
        const best = bestByCountry.get(c.countrySlug);
        return {
          c,
          hasMatch: !!best,
          minInvestment: best?.minInvestment, // reused as "setup/min capital" when provided
          currency: best?.currency,
          timelineMonths: best?.timelineMonths,
          timelineLabel: best?.timelineLabel,
        };
      }),
    [safeCountries, bestByCountry],
  );

  /** Country search + route gating */
  const filteredCountries = React.useMemo(() => {
    const ql = q.trim().toLowerCase();
    let arr = normalized;
    if (ql) {
      arr = arr.filter(({ c }) => {
        const country = String(c?.country ?? "").toLowerCase();
        const title = String(c?.title ?? "").toLowerCase();
        const tags: string[] = Array.isArray((c as any)?.tags)
          ? (c as any).tags
          : [];
        return (
          country.includes(ql) ||
          title.includes(ql) ||
          tags.some((t) => String(t).toLowerCase().includes(ql))
        );
      });
    }
    if (routeType) arr = arr.filter((row) => row.hasMatch);
    return arr;
  }, [normalized, q, routeType]);

  /** Sort countries */
  const sortedCountries = React.useMemo(() => {
    const arr = [...filteredCountries];
    switch (sort) {
      case "setup":
        arr.sort(
          (a, b) =>
            (a.minInvestment ?? Number.MAX_SAFE_INTEGER) -
            (b.minInvestment ?? Number.MAX_SAFE_INTEGER),
        );
        break;
      case "ownership":
        // Countries with at least one 100% ownership / free zone route bubble up,
        // then by fastest timeline for tie-break.
        arr.sort((a, b) => {
          const aProg = bestByCountry.get(a.c.countrySlug);
          const bProg = bestByCountry.get(b.c.countrySlug);
          const aNo = aProg ? (hasFullOwnership(aProg) ? 0 : 1) : 1;
          const bNo = bProg ? (hasFullOwnership(bProg) ? 0 : 1) : 1;
          if (aNo !== bNo) return aNo - bNo;
          const ta = a.timelineMonths ?? Number.MAX_SAFE_INTEGER;
          const tb = b.timelineMonths ?? Number.MAX_SAFE_INTEGER;
          return ta - tb;
        });
        break;
      case "alpha":
        arr.sort((a, b) =>
          String(a?.c?.country ?? "").localeCompare(
            String(b?.c?.country ?? ""),
            STABLE_LOCALE,
            { sensitivity: "base" },
          ),
        );
        break;
      case "timeline":
      default:
        arr.sort(
          (a, b) =>
            (a.timelineMonths ?? Number.MAX_SAFE_INTEGER) -
            (b.timelineMonths ?? Number.MAX_SAFE_INTEGER),
        );
        break;
    }
    return arr;
  }, [filteredCountries, sort, bestByCountry]);

  /** Top 5 + compare items */
  const top5 = React.useMemo(
    () => pickTopPrograms(filteredPrograms, 5),
    [filteredPrograms],
  );

  const compareItems: CompareItem[] = React.useMemo(
    () =>
      pickTopPrograms(filteredPrograms, 6).map((p) => ({
        title: p.title,
        country: p.country,
        href: `/corporate/${p.countrySlug}/${p.programSlug}`,
        minInvestment: p.minInvestment, // shown as "setup/min capital" in drawer
        currency: p.currency,
        timelineMonths: p.timelineMonths,
        timelineLabel: p.timelineLabel,
        tags: (p as any).tags ?? [],
        heroImage: imgOrFallback(p),
      })),
    [filteredPrograms],
  );

  const resultCount = sortedCountries.length;

  /* --------------------------------- UI --------------------------------- */

  return (
    <div className={["text-ink", className].join(" ")}>
      {/* Section opener — textured ivory plate to break the flat sand */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-white to-dune/40 p-6 shadow-[0_24px_60px_-44px_rgba(168,125,31,0.5)] md:p-9">
        <LatticeOverlay opacity={0.06} />
        <div
          aria-hidden
          className="pointer-events-none absolute -start-16 -bottom-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)] blur-2xl"
        />
        {/* Ghost numeral — readable on light per contrast rules */}
        <span
          aria-hidden
          className="pointer-events-none absolute end-4 top-2 select-none font-sora text-[7rem] font-bold leading-none text-gold_deep/25 md:text-[9rem]"
        >
          01
        </span>

        <div className="relative">
          <Reveal y={0}>
            <Eyebrow tone="gold" arabic="تنقّل الشركات">
              Corporate Mobility
            </Eyebrow>
          </Reveal>

          <SandReveal delay={0.05}>
            <h2 className="mt-5 max-w-3xl font-sora text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-tight text-ink">
              <SplitText text="Explore corporate routes by" />{" "}
              <GradientText
                className="font-sora"
                colors={["#a87d1f", "#d4af37", "#f0d98a", "#a87d1f"]}
              >
                country
              </GradientText>
            </h2>
          </SandReveal>

          <SandReveal delay={0.16} y={24} blur={6}>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/70">
              Compare free zone &amp; mainland company formation, investor and
              entrepreneur options, and employment / work permits across the
              Emirates and beyond.
            </p>
          </SandReveal>

          <DrawLine
            d="M0 1 L 100 1"
            viewBox="0 0 100 2"
            className="mt-6 h-px w-48"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* ── Cinematic destinations rail — a Rolex-style collection of corporate jurisdictions ── */}
      {safeCountries.length > 0 ? (
        <CountryRail countries={safeCountries} />
      ) : null}

      {/* MOBILE: collapsible filter panel with premium dropdowns */}
      <details
        className="
          lg:hidden rounded-2xl p-4 open:p-4
          border border-gold/45 bg-dune/40 backdrop-blur-sm
        "
      >
        <summary className="cursor-pointer select-none font-semibold flex items-center gap-2 text-ink">
          <SlidersHorizontal className="h-4 w-4 text-gold" />
          Filters & Top Programs
          <span className="ms-auto text-sm font-normal text-ink/60">
            {resultCount} countries
          </span>
        </summary>

        <ActiveFilters
          q={q}
          routeType={routeType}
          onClearQ={() => setQ("")}
          onClearRoute={() => setRouteType("")}
        />

        {/* Filter fields */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Search (span 2 on sm for symmetry) */}
          <div className="sm:col-span-2">
            <FilterInput
              value={q}
              onChange={setQ}
              placeholder="Search by country, program or tag…"
            />
          </div>

          {/* Route type */}
          <FancySelect
            label="Route type"
            value={routeType}
            onChange={setRouteType}
            options={routeTypeOptions}
            placeholder="All routes"
          />

          {/* Sort */}
          <FancySelect
            label="Sort by"
            value={sort}
            onChange={(v) => setSort(v as any)}
            options={sortOptions}
            placeholder="Sort"
          />
        </div>

        {/* Reset */}
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setQ("");
              setRouteType("");
              setSort("timeline");
            }}
            className="text-sm rounded-full px-4 py-2 border border-gold/40 text-ink/80 hover:border-gold/60 transition-colors"
          >
            Reset all
          </button>
        </div>

        {/* Top 5 list */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-ink">Top 5 programs</h3>
          <ol
            className="mt-3 space-y-3"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {top5.map((p, idx) => (
              <li
                key={`${p.countrySlug}-${p.programSlug}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(idx + 1)} />
                <Link
                  href={`/corporate/${p.countrySlug}/${p.programSlug}`}
                  className="block rounded-xl border border-gold/45 bg-sand/50 p-3 hover:border-gold/65 transition-colors"
                  itemProp="url"
                >
                  <div className="flex items-center gap-3">
                    <SquareThumb program={p} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-ink" itemProp="name">
                        {p.title}
                      </div>
                      <div className="text-xs text-ink/60">
                        {p.country}
                      </div>
                    </div>
                    <div className="text-end text-xs">
                      <div className="tabular-nums text-gold">
                        {typeof p.minInvestment === "number"
                          ? toCurrency(p.minInvestment, p.currency ?? "USD")
                          : "No min"}
                      </div>
                      <div className="text-ink/60">
                        {formatTimelineShort(
                          p.timelineMonths,
                          p.timelineLabel,
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-5 hidden md:block">
            <ContactForm />
          </div>
        </div>
      </details>

      {/* DESKTOP: sticky aside with premium dropdowns */}
      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <aside className="hidden lg:block lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div
              className="
                rounded-2xl p-5
                border border-gold/45 bg-dune/40 backdrop-blur-sm
              "
            >
              <div className="mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gold" />
                <h3 className="text-base font-semibold text-ink">Filters</h3>
                <span className="ms-auto text-sm font-normal text-ink/60">
                  {resultCount} countries
                </span>
              </div>

              <ActiveFilters
                q={q}
                routeType={routeType}
                onClearQ={() => setQ("")}
                onClearRoute={() => setRouteType("")}
              />

              {/* 2-column responsive layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Search spans both columns */}
                <div className="md:col-span-2">
                  <FilterInput
                    value={q}
                    onChange={setQ}
                    placeholder="Search by country, program or tag…"
                  />
                </div>

                {/* Route */}
                <FancySelect
                  label="Route type"
                  value={routeType}
                  onChange={setRouteType}
                  options={routeTypeOptions}
                  placeholder="All routes"
                />

                {/* Sort */}
                <FancySelect
                  label="Sort by"
                  value={sort}
                  onChange={(v) => setSort(v as any)}
                  options={sortOptions}
                  placeholder="Sort"
                />
              </div>

              {/* Reset */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setRouteType("");
                    setSort("timeline");
                  }}
                  className="text-sm rounded-full px-4 py-2 border border-gold/40 text-ink/80 hover:border-gold/60 transition-colors"
                >
                  Reset all
                </button>
              </div>
            </div>

            {/* Top 5 (same UI; thumbnails safe) */}
            <div className="rounded-2xl p-5 border border-gold/45 bg-dune/40 backdrop-blur-sm">
              <h3 className="text-base font-semibold text-ink">Top 5 programs</h3>
              <ol
                className="mt-3 space-y-3"
                itemScope
                itemType="https://schema.org/ItemList"
              >
                {top5.map((p, idx) => (
                  <li
                    key={`${p.countrySlug}-${p.programSlug}`}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={String(idx + 1)} />
                    <Link
                      href={`/corporate/${p.countrySlug}/${p.programSlug}`}
                      className="group block rounded-xl border border-gold/45 bg-sand/50 p-3 hover:border-gold/65 transition-colors"
                      itemProp="url"
                    >
                      <div className="flex items-center gap-3">
                        <SquareThumb program={p} />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-ink" itemProp="name">
                            {p.title}
                          </div>
                          <div className="text-xs text-ink/60">
                            {p.country}
                          </div>
                        </div>
                        <div className="text-end text-xs">
                          <div className="tabular-nums text-gold">
                            {typeof p.minInvestment === "number"
                              ? toCurrency(p.minInvestment, p.currency ?? "USD")
                              : "No min"}
                          </div>
                          <div className="text-ink/60">
                            {formatTimelineShort(
                              p.timelineMonths,
                              p.timelineLabel,
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>

              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </aside>

        {/* Main grid (same visuals) */}
        <section className="lg:col-span-8">
          <header className="mb-4 flex items-center justify-between">
            <SandReveal y={16} blur={4}>
              <h3 className="flex items-center gap-2.5 text-xl font-semibold text-ink">
                <span aria-hidden className="h-5 w-1 rounded-full bg-gradient-to-b from-gold to-gold_deep" />
                Explore by country
              </h3>
            </SandReveal>
            <Link
              href="/personal-booking"
              className="font-medium text-gold_deep underline-offset-4 hover:text-gold hover:underline"
            >
              Need advice?
            </Link>
          </header>

          <ol
            className="grid gap-4 sm:grid-cols-2"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {sortedCountries.map(
              ({ c, minInvestment, currency, timelineMonths, timelineLabel }, idx) => (
                <li
                  key={`${c.countrySlug}-${idx}`}
                  className="contents"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={String(idx + 1)} />
                  <div
                    itemProp="item"
                    itemScope
                    itemType="https://schema.org/Country"
                  >
                    <meta itemProp="name" content={c.country} />
                    <Reveal y={28} delay={Math.min(idx, 5) * 0.06}>
                    <CountryCardPro
                      href={`/corporate/${c.countrySlug}`}
                      title={c.title}
                      summary={c.summary}
                      heroImage={
                        ensureAbs((c as any).heroImage) ||
                        `/images/corporate/${c.countrySlug}.jpg`
                      }
                      country={c.country}
                      minInvestment={minInvestment}
                      currency={currency}
                      timelineMonths={timelineMonths}
                      timelineLabel={timelineLabel}
                      tags={(c as any).tags ?? []}
                    />
                    </Reveal>
                  </div>
                </li>
              ),
            )}
          </ol>

          {resultCount === 0 && (
            <div className="mt-8 rounded-2xl border border-gold/45 bg-dune/40 p-6 text-center backdrop-blur-sm">
              <p className="font-medium text-ink">No countries match your filters.</p>
              <p className="mt-1 text-sm text-ink/60">
                Try clearing the search or selecting a different route.
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {q && (
                  <button
                    onClick={() => setQ("")}
                    className="rounded-full px-4 py-2 text-sm border border-gold/40 text-ink/80 hover:border-gold/60 transition-colors"
                  >
                    Clear search
                  </button>
                )}
                {routeType && (
                  <button
                    onClick={() => setRouteType("")}
                    className="rounded-full px-4 py-2 text-sm border border-gold/40 text-ink/80 hover:border-gold/60 transition-colors"
                  >
                    Reset route
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      <CompareDrawer items={compareItems} />
    </div>
  );
}

/* ----------------------------- subcomponents ---------------------------- */

/**
 * CountryRail — a horizontal scroll-snap "collection" of corporate jurisdictions
 * with real per-country imagery (ImageReveal masked-wipe media), gold edges and
 * a parallax drift on the kicker. Native-swipe on mobile; no extra vertical
 * scroll. Content-first: each card carries country, title and a deep link.
 */
function CountryRail({ countries }: { countries: CountryMeta[] }) {
  const items = countries.slice(0, 10);
  return (
    <section
      aria-label="Corporate destinations"
      className="relative mb-10 overflow-hidden rounded-3xl border border-gold/40 bg-midnight px-5 py-9 text-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)] md:px-8 md:py-12"
    >
      {/* ambient gold haze + lattice on the dark ground */}
      <LatticeOverlay opacity={0.06} />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent"
      />

      <div className="relative mb-6 flex flex-wrap items-end justify-between gap-4">
        <ParallaxLayer speed={24} className="max-w-xl">
          <Reveal y={0}>
            <Eyebrow tone="onDark" arabic="الوجهات">
              Destinations
            </Eyebrow>
          </Reveal>
          <SandReveal delay={0.05}>
            <h3 className="mt-4 font-sora text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-tight tracking-tight text-white">
              <SplitText text="A collection of corporate jurisdictions" />
            </h3>
          </SandReveal>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Swipe through the markets where we structure companies, sponsorship
            and residence — each a distinct route to global mobility.
          </p>
        </ParallaxLayer>

        <span
          aria-hidden
          className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/45 md:inline-flex"
        >
          Swipe
          <span className="inline-block h-px w-10 bg-gradient-to-r from-gold/70 to-transparent" />
        </span>
      </div>

      <CollectionRail className="relative">
        {items.map((c, idx) => {
          const img =
            ensureAbs((c as any).heroImage) ||
            `/images/corporate/${c.countrySlug}.jpg`;
          return (
            <Link
              key={c.countrySlug}
              href={`/corporate/${c.countrySlug}`}
              prefetch={false}
              className="group relative snap-start shrink-0 w-[78%] sm:w-[58%] md:w-[42%] lg:w-[32%]"
              aria-label={`${c.country} corporate routes`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/12 ring-1 ring-inset ring-white/5 transition-transform duration-500 group-hover:-translate-y-1">
                <ImageReveal
                  src={img}
                  alt={`${c.country} — corporate immigration`}
                  ratio="aspect-[4/5]"
                  sizes="(min-width:1024px) 32vw, (min-width:640px) 58vw, 78vw"
                  className="rounded-2xl"
                  position="center"
                />
                {/* scrim + caption */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/85 via-black/15 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                    {String(idx + 1).padStart(2, "0")} · {c.country}
                  </span>
                  <div className="mt-1.5 font-sora text-lg font-semibold leading-snug text-white">
                    {c.title}
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/75 transition-colors group-hover:text-gold">
                    Explore routes
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        fill="currentColor"
                        d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </CollectionRail>

      {/* Animated proof strip under the rail */}
      <Stagger className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-4">
        {[
          { to: items.length, suffix: "", label: "Jurisdictions" },
          { to: 100, suffix: "%", label: "Ownership routes" },
          { to: 24, suffix: "h", label: "Advisor response" },
          { to: 15, suffix: "+", label: "Years advising" },
        ].map((s) => (
          <StaggerItem key={s.label} className="bg-white/[0.05] px-4 py-4">
            <div className="font-sora text-2xl font-semibold tracking-tight text-gold">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/55">
              {s.label}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ActiveFilters({
  q,
  routeType,
  onClearQ,
  onClearRoute,
}: {
  q: string;
  routeType: string;
  onClearQ: () => void;
  onClearRoute: () => void;
}) {
  if (!q && !routeType) return null;
  return (
    <div className="mb-3 mt-2 flex flex-wrap items-center gap-2">
      {q ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sand/50 px-3 py-1 text-xs border border-gold/45 text-ink/80">
          <span className="opacity-80">Search:</span>
          <strong className="font-medium text-ink">{q}</strong>
          <button
            aria-label="Clear search"
            onClick={onClearQ}
            className="ms-1 p-0.5 hover:text-gold"
          >
            <XCircle className="h-3.5 w-3.5" />
          </button>
        </span>
      ) : null}
      {routeType ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sand/50 px-3 py-1 text-xs border border-gold/45 text-ink/80">
          <span className="opacity-80">Route:</span>
          <strong className="font-medium text-ink">{routeType.replace("-", " ")}</strong>
          <button
            aria-label="Reset route"
            onClick={onClearRoute}
            className="ms-1 p-0.5 hover:text-gold"
          >
            <XCircle className="h-3.5 w-3.5" />
          </button>
        </span>
      ) : null}
      <span className="ms-auto text-xs text-ink/40">
        Refine your selection
      </span>
    </div>
  );
}

function SquareThumb({ program }: { program: ProgramMeta }) {
  const hero = ensureAbs((program as any).heroImage);
  const heroPoster = ensureAbs((program as any).heroPoster);
  const countryPost = `/images/corporate/${program.countrySlug}.jpg`;
  const og = `/xiphias-immigration.png`;
  const svgFallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><defs><linearGradient id='g' x1='0' x2='1'><stop stop-color='#0b1626'/><stop offset='1' stop-color='#0a0e1a'/></linearGradient></defs><rect width='80' height='80' fill='url(#g)'/><circle cx='40' cy='40' r='18' fill='#d4af37' fill-opacity='0.5'/></svg>",
    );

  const candidates = [hero, heroPoster, countryPost, og, svgFallback].filter(
    Boolean,
  ) as string[];
  const [idx, setIdx] = React.useState(0);

  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-dune ring-1 ring-gold/20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={candidates[idx]}
        alt=""
        className="h-full w-full object-cover"
        onError={() => setIdx((i) => Math.min(i + 1, candidates.length - 1))}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* ======================== Filter UI building blocks ===================== */

function FilterInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <SearchIcon className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/70" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gold/45 ps-9 pe-9 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40 bg-sand/50"
        aria-label="Search programs and countries"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute end-2 top-1/2 -translate-y-1/2 p-1"
        >
          <XCircle className="h-4 w-4 text-ink/50 hover:text-gold" />
        </button>
      ) : null}
    </label>
  );
}

/** Accessible, dependency-free dropdown with keyboard + outside-click support */
function FancySelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard on button
  function onButtonKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(
        Math.max(
          0,
          options.findIndex((o) => o.value === value),
        ),
      );
    }
  }

  // Keyboard on menu
  function onMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i < 0 ? 0 : i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i < 0 ? 0 : i - 1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) {
        onChange(opt.value);
        setOpen(false);
        btnRef.current?.focus();
      }
    }
  }

  // Ensure active option visible
  React.useEffect(() => {
    if (!open) return;
    const el = menuRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  return (
    <div className="relative">
      <label className="mb-1 block text-xs font-medium text-ink/60">
        {label}
      </label>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          "group w-full rounded-xl border border-gold/45 bg-sand/50 text-ink",
          "px-3 py-2 text-start text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40",
          "flex items-center justify-between gap-2",
        ].join(" ")}
      >
        <span className={selected ? "text-ink" : "text-ink/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
          className="
            absolute z-50 mt-2 w-full overflow-auto rounded-xl border border-gold/40 bg-white shadow-xl
            max-h-72 backdrop-blur-md
          "
        >
          {options.map((opt, i) => {
            const isSel = opt.value === value;
            const isActive = i === activeIndex;
            return (
              <div
                key={opt.value || i}
                role="option"
                aria-selected={isSel}
                data-index={i}
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className={[
                  "flex cursor-pointer items-start gap-2 px-3 py-2 text-sm text-ink/80",
                  isActive ? "bg-gold/10 text-ink" : "",
                ].join(" ")}
              >
                <div
                  className={`h-4 w-4 mt-0.5 rounded border ${
                    isSel
                      ? "bg-gold border-gold"
                      : "border-gold/45"
                  }`}
                >
                  {isSel && <CheckIcon className="h-4 w-4 text-midnight" />}
                </div>
                <div className="min-w-0">
                  <div className="truncate">{opt.label}</div>
                  {opt.hint ? (
                    <div className="text-xs text-ink/55">
                      {opt.hint}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm text-ink/45">
              No options
            </div>
          )}
        </div>
      )}
    </div>
  );
}
