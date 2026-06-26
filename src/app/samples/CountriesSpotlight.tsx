"use client";

/**
 * VARIANT ③ — "Index + Spotlight" for the /countries INDEX reskin.
 * App-like split: a sticky navy left INDEX rail listing every real destination
 * (searchable, region-grouped, gold active indicator) and a large right
 * SPOTLIGHT panel featuring the selected country (flag, serif name, region, ISO,
 * real image, "Explore →" to /countries/[slug]). Collapses to a chip row +
 * spotlight on mobile. Matches the locked navy/gold CountryHub idiom.
 *
 * DATA: the destination roster (name, code, region, slug) is the project's real
 * canonical country table (COUNTRY_META in src/lib/countries-content.ts), and
 * the per-country frame is resolved via the client-safe countryImage() helper.
 * No fabricated countries. (Programme counts / tracks live in a server-only MDX
 * loader and are intentionally not pulled into this client preview.)
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Flag from "@/components/Countries/Flag";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

type Country = { slug: string; name: string; code: string; region: string };

// Real roster — mirrors COUNTRY_META in src/lib/countries-content.ts (the
// canonical country table the live /countries index is built from).
const COUNTRIES: Country[] = [
  { slug: "antigua-barbuda", name: "Antigua & Barbuda", code: "AG", region: "Caribbean" },
  { slug: "australia", name: "Australia", code: "AU", region: "Asia-Pacific" },
  { slug: "bulgaria", name: "Bulgaria", code: "BG", region: "Europe" },
  { slug: "canada", name: "Canada", code: "CA", region: "Americas" },
  { slug: "curacao", name: "Curaçao", code: "CW", region: "Caribbean" },
  { slug: "cyprus", name: "Cyprus", code: "CY", region: "Europe" },
  { slug: "dominica", name: "Dominica", code: "DM", region: "Caribbean" },
  { slug: "egypt", name: "Egypt", code: "EG", region: "Africa & Middle East" },
  { slug: "germany", name: "Germany", code: "DE", region: "Europe" },
  { slug: "greece", name: "Greece", code: "GR", region: "Europe" },
  { slug: "grenada", name: "Grenada", code: "GD", region: "Caribbean" },
  { slug: "hong-kong", name: "Hong Kong", code: "HK", region: "Asia-Pacific" },
  { slug: "hungary", name: "Hungary", code: "HU", region: "Europe" },
  { slug: "italy", name: "Italy", code: "IT", region: "Europe" },
  { slug: "latvia", name: "Latvia", code: "LV", region: "Europe" },
  { slug: "malaysia", name: "Malaysia", code: "MY", region: "Asia-Pacific" },
  { slug: "malta", name: "Malta", code: "MT", region: "Europe" },
  { slug: "mauritius", name: "Mauritius", code: "MU", region: "Africa & Middle East" },
  { slug: "monaco", name: "Monaco", code: "MC", region: "Europe" },
  { slug: "nauru", name: "Nauru", code: "NR", region: "Asia-Pacific" },
  { slug: "new-zealand", name: "New Zealand", code: "NZ", region: "Asia-Pacific" },
  { slug: "panama", name: "Panama", code: "PA", region: "Americas" },
  { slug: "portugal", name: "Portugal", code: "PT", region: "Europe" },
  { slug: "saintkitts", name: "Saint Kitts & Nevis", code: "KN", region: "Caribbean" },
  { slug: "saint-lucia", name: "Saint Lucia", code: "LC", region: "Caribbean" },
  { slug: "saotome", name: "São Tomé & Príncipe", code: "ST", region: "Africa & Middle East" },
  { slug: "singapore", name: "Singapore", code: "SG", region: "Asia-Pacific" },
  { slug: "spain", name: "Spain", code: "ES", region: "Europe" },
  { slug: "switzerland", name: "Switzerland", code: "CH", region: "Europe" },
  { slug: "turkey", name: "Turkey", code: "TR", region: "Europe" },
  { slug: "uae", name: "United Arab Emirates", code: "AE", region: "Africa & Middle East" },
  { slug: "united-kingdom", name: "United Kingdom", code: "GB", region: "Europe" },
  { slug: "uruguay", name: "Uruguay", code: "UY", region: "Americas" },
  { slug: "usa", name: "United States", code: "US", region: "Americas" },
  { slug: "vanuatu", name: "Vanuatu", code: "VU", region: "Asia-Pacific" },
];

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

export default function CountriesSpotlight({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState("uae");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = COUNTRIES.filter(
      (c) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q),
    );
    const byRegion = new Map<string, Country[]>();
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
  }, [query]);

  const visibleCount = grouped.reduce((s, g) => s + g.countries.length, 0);
  const active = COUNTRIES.find((c) => c.slug === activeSlug) ?? COUNTRIES[0];

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
            {COUNTRIES.length} destinations across five regions — search the index,
            then explore the spotlight for every residency, citizenship, skilled and
            corporate pathway we run there.
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
                {COUNTRIES.filter((c) =>
                  grouped.some((g) => g.countries.includes(c)),
                ).map((c) => {
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
          <motion.div
            key={active.slug}
            {...(reduce
              ? {}
              : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } })}
            className="relative isolate min-h-[28rem] overflow-hidden rounded-lg border lg:min-h-[34rem] lg:self-stretch"
            style={{ borderColor: "rgba(191,161,92,0.35)" }}
          >
              {/* Full-bleed image fills the entire panel (even when the column
                  stretches to the index rail's height). */}
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
                <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <div className="flex flex-col gap-1">
                    <span className={`${serifClass} text-[1.5rem] font-medium leading-none`} style={{ color: GOLD }}>
                      {active.code}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">ISO code</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`${serifClass} text-[1.5rem] font-medium leading-none`} style={{ color: GOLD }}>
                      {active.region.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Region</span>
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
