"use client";

/**
 * ③ "Index + Spotlight" — the LIVE /countries index.
 * App-like split: a dark navy hero ("Find your country." + real destination
 * count), a sticky region-grouped INDEX rail (searchable, gold active state),
 * and a large full-bleed SPOTLIGHT panel for the selected country (flag, serif
 * name, REAL stats — programme count, tracks, region — and "Explore →" to
 * /countries/[slug]). Closing CTA → /contact. Reduced-motion safe.
 *
 * DATA is REAL: countries are passed in from the server page, sourced from
 * src/lib/countries-content (getCountriesByRegion) — each carries slug, name,
 * code (ISO-2), region, programmeCount and tracks[]. Per-country imagery is
 * resolved client-side via countryImage(). Nothing is fabricated.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Flag from "@/components/Countries/Flag";
import { countryImage } from "@/components/Countries/country-image";
import { TRACK_PILL } from "@/lib/countries-shared";
import type { CountrySummary } from "@/lib/countries-shared";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

const REGION_ORDER = [
  "Africa & Middle East",
  "Europe",
  "Caribbean",
  "Asia-Pacific",
  "Americas",
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: light ? GOLD_DEEP : GOLD }}
    >
      <span className="h-px w-8" style={{ background: light ? GOLD_DEEP : GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        {ar}
      </span>
    </p>
  );
}

export default function CountriesSpotlightIndex({
  countries,
  serifClass,
}: {
  countries: CountrySummary[];
  serifClass: string;
}) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(
    () => countries.find((c) => c.slug === "uae")?.slug ?? countries[0]?.slug ?? "",
  );

  const regionCount = useMemo(
    () => new Set(countries.map((c) => c.region)).size,
    [countries],
  );

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = countries.filter(
      (c) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q),
    );
    const byRegion = new Map<string, CountrySummary[]>();
    for (const c of matches) {
      const list = byRegion.get(c.region) ?? [];
      list.push(c);
      byRegion.set(c.region, list);
    }
    return [
      ...REGION_ORDER,
      ...[...byRegion.keys()].filter((r) => !REGION_ORDER.includes(r)),
    ]
      .filter((r) => byRegion.has(r))
      .map((region) => ({
        region,
        countries: byRegion.get(region)!.sort((a, b) => a.name.localeCompare(b.name)),
      }));
  }, [query, countries]);

  const visibleCount = grouped.reduce((s, g) => s + g.countries.length, 0);
  const active = countries.find((c) => c.slug === activeSlug) ?? countries[0];

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── INDEX + SPOTLIGHT (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-20 pt-28 text-[#eef3fb] sm:px-12 lg:px-16"
        style={{ background: `radial-gradient(120% 100% at 12% 0%, #13284f 0%, ${NAVY} 58%)` }}
      >
        <Ambient tone="dark" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div {...fade}>
            <Eyebrow ar="الوجهات">Where we operate</Eyebrow>
          </motion.div>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.96]`}>
            Find your country.
          </h1>
          <motion.p
            {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.2 } })}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75"
          >
            {countries.length} destinations across {regionCount} regions — search the
            index, then explore the spotlight for every residency, citizenship,
            skilled and corporate pathway we run there.
          </motion.p>
        </div>

        {/* App-like split */}
        <div className="relative z-10 mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
          {/* LEFT — sticky index rail */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div
              className="rounded-lg border p-5"
              style={{ borderColor: "rgba(191,161,92,0.28)", background: "rgba(255,255,255,0.04)" }}
            >
              <label className="relative block">
                <span className="sr-only">Search a destination</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a destination…"
                  className="w-full rounded-full border bg-white/5 px-5 py-3 text-[14px] text-white outline-none transition placeholder:text-white/40 focus:border-[#bfa15c]"
                  style={{ borderColor: "rgba(191,161,92,0.4)" }}
                />
              </label>

              {/* Chip row (mobile only) */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {grouped.flatMap((g) => g.countries).map((c) => {
                  const on = c.slug === activeSlug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setActiveSlug(c.slug)}
                      aria-pressed={on}
                      className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition"
                      style={{
                        borderColor: on ? GOLD : "rgba(255,255,255,0.18)",
                        background: on ? GOLD : "transparent",
                        color: on ? NAVY : "rgba(255,255,255,0.8)",
                      }}
                    >
                      <Flag code={c.code} size={18} />
                      {c.name}
                    </button>
                  );
                })}
              </div>

              {/* Grouped list (desktop) */}
              <div className="mt-4 hidden max-h-[62vh] flex-col overflow-y-auto pr-1 lg:flex">
                {visibleCount === 0 ? (
                  <p className="px-1 py-6 text-[14px] text-white/55">
                    No destinations match “{query}”.
                  </p>
                ) : (
                  grouped.map((g) => (
                    <div key={g.region} className="mb-3">
                      <p
                        className="flex items-center gap-2 px-1 py-2 text-[10px] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {g.region}
                        <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }} />
                        <span style={{ color: GOLD }}>{g.countries.length}</span>
                      </p>
                      {g.countries.map((c) => {
                        const on = c.slug === activeSlug;
                        return (
                          <button
                            key={c.slug}
                            type="button"
                            onMouseEnter={() => setActiveSlug(c.slug)}
                            onFocus={() => setActiveSlug(c.slug)}
                            onClick={() => setActiveSlug(c.slug)}
                            aria-pressed={on}
                            className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors"
                            style={{ background: on ? "rgba(191,161,92,0.12)" : "transparent" }}
                          >
                            <span
                              aria-hidden
                              className="h-5 w-px transition-all"
                              style={{ background: on ? GOLD : "transparent", height: on ? 20 : 0 }}
                            />
                            <Flag code={c.code} size={22} />
                            <span
                              className={`flex-1 text-[14px] transition-colors ${on ? "font-semibold" : ""}`}
                              style={{ color: on ? GOLD : "rgba(238,243,251,0.82)" }}
                            >
                              {c.name}
                            </span>
                            <span
                              aria-hidden
                              className="text-[12px] tabular-nums opacity-60"
                              style={{ color: on ? GOLD : "rgba(238,243,251,0.5)" }}
                            >
                              {c.programmeCount}
                            </span>
                            <span
                              aria-hidden
                              className="text-[13px] opacity-0 transition group-hover:opacity-100"
                              style={{ color: GOLD }}
                            >
                              →
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — spotlight panel */}
          {active ? (
            <motion.div
              key={active.slug}
              {...(reduce
                ? {}
                : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } })}
              className="relative isolate min-h-[28rem] overflow-hidden rounded-lg border lg:min-h-[34rem] lg:self-stretch"
              style={{ borderColor: "rgba(191,161,92,0.35)" }}
            >
              {/* Full-bleed image fills the entire panel. */}
              <Image
                src={countryImage(active.slug, active.region)}
                alt={`${active.name} — destinations we serve`}
                fill
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover [filter:grayscale(0.3)_brightness(0.72)_contrast(1.05)]"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.96) 0%, rgba(8,18,42,0.5) 45%, rgba(8,18,42,0.18) 100%)" }}
              />
              <span aria-hidden className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
              <span aria-hidden className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2" style={{ borderColor: GOLD }} />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <div className="flex items-center gap-3">
                  <Flag code={active.code} size={40} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
                    {active.region}
                  </span>
                </div>
                <h2 className={`${serifClass} mt-3 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[0.98]`}>
                  {active.name}
                </h2>

                {/* Real pathway pills */}
                {active.tracks.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.tracks.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                        style={{ borderColor: "rgba(191,161,92,0.5)", color: GOLD }}
                      >
                        {TRACK_PILL[t]}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <div className="flex flex-col gap-1">
                    <span className={`${serifClass} text-[1.5rem] font-medium leading-none`} style={{ color: GOLD }}>
                      {active.programmeCount}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      {active.programmeCount === 1 ? "Programme" : "Programmes"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`${serifClass} text-[1.5rem] font-medium leading-none`} style={{ color: GOLD }}>
                      {active.tracks.length}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      {active.tracks.length === 1 ? "Pathway" : "Pathways"}
                    </span>
                  </div>
                  <a
                    href={`/countries/${active.slug}`}
                    className="group ms-auto inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* ── Closing CTA (light) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-28 text-center text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#fbfaf7" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="flex justify-center">
            <Eyebrow ar="ابدأ" light>
              Begin
            </Eyebrow>
          </div>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02]`}>
            Not sure which country fits?{" "}
            <span className="italic" style={{ color: GOLD_DEEP }}>
              Let&apos;s map it together.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">
            Share your goals and a senior XIPHIAS advisor will return a tailored
            shortlist of destinations and programmes — privately, within 24 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: NAVY, color: "#eef3fb" }}
            >
              Book a private consultation{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
