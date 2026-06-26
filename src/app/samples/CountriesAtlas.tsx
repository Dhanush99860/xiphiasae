"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

/* ── LOCKED navy/gold luxury tokens (match CountryHub) ── */
const GOLD = "#bfa15c";
const NAVY = "#0a1733";

/* ── REAL destinations data ──────────────────────────────────────────────
   Sourced from the project's country catalogue that powers /countries:
   • names / ISO-2 codes / regions  → COUNTRY_META in src/lib/countries-content.ts
   • tracks (pathways present)        → which content/{vertical}/{slug} dirs exist
   • programmeCount                   → count of programme MDX files per country
   Every slug below maps to the real /countries/[slug] route. No invented data. */
type Track = "citizenship" | "residency" | "skilled" | "corporate";
type Country = {
  slug: string;
  name: string;
  code: string;
  region: string;
  tracks: Track[];
  programmeCount: number;
};

const TRACK_PILL: Record<Track, string> = {
  citizenship: "Citizenship",
  residency: "Residency",
  skilled: "Skilled",
  corporate: "Corporate",
};

const COUNTRIES: Country[] = [
  { slug: "uae", name: "United Arab Emirates", code: "AE", region: "Africa & Middle East", tracks: ["residency", "corporate"], programmeCount: 6 },
  { slug: "egypt", name: "Egypt", code: "EG", region: "Africa & Middle East", tracks: ["citizenship"], programmeCount: 4 },
  { slug: "mauritius", name: "Mauritius", code: "MU", region: "Africa & Middle East", tracks: ["residency"], programmeCount: 4 },
  { slug: "saotome", name: "São Tomé & Príncipe", code: "ST", region: "Africa & Middle East", tracks: ["citizenship"], programmeCount: 1 },
  { slug: "portugal", name: "Portugal", code: "PT", region: "Europe", tracks: ["residency", "corporate"], programmeCount: 3 },
  { slug: "greece", name: "Greece", code: "GR", region: "Europe", tracks: ["residency"], programmeCount: 2 },
  { slug: "malta", name: "Malta", code: "MT", region: "Europe", tracks: ["residency"], programmeCount: 3 },
  { slug: "cyprus", name: "Cyprus", code: "CY", region: "Europe", tracks: ["residency", "corporate"], programmeCount: 5 },
  { slug: "hungary", name: "Hungary", code: "HU", region: "Europe", tracks: ["residency"], programmeCount: 2 },
  { slug: "latvia", name: "Latvia", code: "LV", region: "Europe", tracks: ["residency"], programmeCount: 4 },
  { slug: "switzerland", name: "Switzerland", code: "CH", region: "Europe", tracks: ["residency"], programmeCount: 2 },
  { slug: "monaco", name: "Monaco", code: "MC", region: "Europe", tracks: ["residency"], programmeCount: 2 },
  { slug: "bulgaria", name: "Bulgaria", code: "BG", region: "Europe", tracks: ["residency"], programmeCount: 3 },
  { slug: "germany", name: "Germany", code: "DE", region: "Europe", tracks: ["skilled"], programmeCount: 1 },
  { slug: "spain", name: "Spain", code: "ES", region: "Europe", tracks: ["skilled", "corporate"], programmeCount: 2 },
  { slug: "italy", name: "Italy", code: "IT", region: "Europe", tracks: ["skilled"], programmeCount: 1 },
  { slug: "turkey", name: "Turkey", code: "TR", region: "Europe", tracks: ["citizenship"], programmeCount: 6 },
  { slug: "united-kingdom", name: "United Kingdom", code: "GB", region: "Europe", tracks: ["skilled", "corporate"], programmeCount: 3 },
  { slug: "grenada", name: "Grenada", code: "GD", region: "Caribbean", tracks: ["citizenship"], programmeCount: 2 },
  { slug: "dominica", name: "Dominica", code: "DM", region: "Caribbean", tracks: ["citizenship"], programmeCount: 2 },
  { slug: "antigua-barbuda", name: "Antigua & Barbuda", code: "AG", region: "Caribbean", tracks: ["citizenship"], programmeCount: 3 },
  { slug: "saintkitts", name: "Saint Kitts & Nevis", code: "KN", region: "Caribbean", tracks: ["citizenship"], programmeCount: 3 },
  { slug: "saint-lucia", name: "Saint Lucia", code: "LC", region: "Caribbean", tracks: ["citizenship"], programmeCount: 2 },
  { slug: "curacao", name: "Curaçao", code: "CW", region: "Caribbean", tracks: ["residency"], programmeCount: 2 },
  { slug: "singapore", name: "Singapore", code: "SG", region: "Asia-Pacific", tracks: ["residency"], programmeCount: 3 },
  { slug: "malaysia", name: "Malaysia", code: "MY", region: "Asia-Pacific", tracks: ["residency"], programmeCount: 3 },
  { slug: "hong-kong", name: "Hong Kong", code: "HK", region: "Asia-Pacific", tracks: ["residency"], programmeCount: 4 },
  { slug: "new-zealand", name: "New Zealand", code: "NZ", region: "Asia-Pacific", tracks: ["residency"], programmeCount: 3 },
  { slug: "australia", name: "Australia", code: "AU", region: "Asia-Pacific", tracks: ["skilled"], programmeCount: 6 },
  { slug: "vanuatu", name: "Vanuatu", code: "VU", region: "Asia-Pacific", tracks: ["citizenship"], programmeCount: 1 },
  { slug: "nauru", name: "Nauru", code: "NR", region: "Asia-Pacific", tracks: ["citizenship"], programmeCount: 1 },
  { slug: "canada", name: "Canada", code: "CA", region: "Americas", tracks: ["residency", "skilled", "corporate"], programmeCount: 25 },
  { slug: "usa", name: "United States", code: "US", region: "Americas", tracks: ["residency", "skilled", "corporate"], programmeCount: 11 },
  { slug: "panama", name: "Panama", code: "PA", region: "Americas", tracks: ["residency"], programmeCount: 3 },
  { slug: "uruguay", name: "Uruguay", code: "UY", region: "Americas", tracks: ["residency"], programmeCount: 2 },
];

const REGION_ORDER = ["Africa & Middle East", "Europe", "Caribbean", "Asia-Pacific", "Americas"];

/* ISO-2 → flag emoji (regional indicators), so cards carry a real flag glyph. */
function flag(code: string): string {
  if (!code || code.length !== 2) return "";
  return String.fromCodePoint(...code.toUpperCase().split("").map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65)));
}

/* ── small inline eyebrow (gold rule + label + arabic) ── */
function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

/* ── HERO (dark) — "Find your country" + count + visual search + region chips ── */
function Hero({
  serifClass,
  total,
  programmeTotal,
  active,
  setActive,
  reduce,
}: {
  serifClass: string;
  total: number;
  programmeTotal: number;
  active: string;
  setActive: (r: string) => void;
  reduce: boolean | null;
}) {
  const chips = ["All", ...REGION_ORDER];
  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden px-6 pb-16 pt-36 text-[#eef3fb] sm:px-12 lg:px-20"
      style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}
    >
      <Ambient tone="dark" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow ar="الوجهات">Where we operate</Eyebrow>
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.6rem,7vw,5.2rem)] font-medium leading-[0.95]`}>
            Find your <span className="italic" style={{ color: GOLD }}>country.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Pick a destination to see every residency, citizenship, skilled and corporate pathway we run
            there. {total} countries, {programmeTotal} live programmes — one atlas.
          </p>
        </motion.div>

        {/* Visual search affordance (non-functional in sample) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-9 flex max-w-xl items-center gap-3 rounded-full border px-5 py-3.5"
          style={{ borderColor: "rgba(191,161,92,0.32)", background: "rgba(255,255,255,0.04)" }}
        >
          <span aria-hidden style={{ color: GOLD }}>⌕</span>
          <span className="text-[14px] text-white/55">Search a country or region…</span>
        </motion.div>

        {/* Region filter chips */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          {chips.map((c) => {
            const on = active === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={on}
                className="rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300"
                style={{
                  borderColor: on ? GOLD : "rgba(255,255,255,0.18)",
                  background: on ? GOLD : "transparent",
                  color: on ? NAVY : "rgba(238,243,251,0.78)",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── ATLAS GRID (dark) — glass cards, gold hairline, hover lift ── */
function CountryCard({
  c,
  serifClass,
  reduce,
  i,
}: {
  c: Country;
  serifClass: string;
  reduce: boolean | null;
  i: number;
}) {
  return (
    <motion.a
      href={`/countries/${c.slug}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: reduce ? 0 : Math.min(i, 8) * 0.04 }}
      className="group relative flex h-full flex-col justify-between gap-6 rounded-lg border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c] hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]"
      style={{ borderColor: "rgba(191,161,92,0.28)", background: "rgba(255,255,255,0.04)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[1.5rem] leading-none"
          style={{ background: "rgba(255,255,255,0.06)", boxShadow: `inset 0 0 0 1px ${GOLD}44` }}
        >
          {flag(c.code) || c.name.charAt(0)}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{c.region}</span>
      </div>

      <div>
        <h3 className={`${serifClass} text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>
          {c.name}
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {c.tracks.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em]"
              style={{ borderColor: "rgba(191,161,92,0.4)", color: GOLD }}
            >
              {TRACK_PILL[t]}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <span className="flex flex-col gap-1">
          <span className={`${serifClass} text-[1.8rem] font-medium leading-none`} style={{ color: GOLD }}>
            {c.programmeCount}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Programme{c.programmeCount === 1 ? "" : "s"}
          </span>
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
          View <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.a>
  );
}

function Atlas({
  serifClass,
  countries,
  reduce,
}: {
  serifClass: string;
  countries: Country[];
  reduce: boolean | null;
}) {
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="الأطلس">The atlas</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium`}>
          Every destination we serve.
        </h2>

        {countries.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c, i) => (
              <CountryCard key={c.slug} c={c} serifClass={serifClass} reduce={reduce} i={i} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-[15px] text-white/60">No destinations in this region.</p>
        )}
      </div>
    </section>
  );
}

/* ── CLOSING CTA (dark) → /contact ── */
function CTA({ serifClass, reduce }: { serifClass: string; reduce: boolean | null }) {
  return (
    <section
      data-tone="dark"
      className="relative isolate flex min-h-[60vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
      style={{ background: `radial-gradient(120% 100% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
    >
      <Ambient tone="dark" />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <div className="flex justify-center">
          <Eyebrow ar="ابدأ الآن">Begin</Eyebrow>
        </div>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02]`}>
          Not sure which country fits? <span className="italic" style={{ color: GOLD }}>Let&apos;s map it together.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
          Share your goals and a senior XIPHIAS advisor returns a tailored shortlist of destinations and
          programmes — privately, within 24 hours.
        </p>
        <div className="mt-9">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ background: GOLD, color: NAVY }}
          >
            Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default function CountriesAtlas({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("All");

  const total = COUNTRIES.length;
  const programmeTotal = useMemo(() => COUNTRIES.reduce((s, c) => s + c.programmeCount, 0), []);

  const filtered = useMemo(() => {
    const list = active === "All" ? COUNTRIES : COUNTRIES.filter((c) => c.region === active);
    const rank = (r: string) => {
      const i = REGION_ORDER.indexOf(r);
      return i === -1 ? REGION_ORDER.length : i;
    };
    return [...list].sort((a, b) => rank(a.region) - rank(b.region) || a.name.localeCompare(b.name));
  }, [active]);

  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero
        serifClass={serifClass}
        total={total}
        programmeTotal={programmeTotal}
        active={active}
        setActive={setActive}
        reduce={reduce}
      />
      <Atlas serifClass={serifClass} countries={filtered} reduce={reduce} />
      <CTA serifClass={serifClass} reduce={reduce} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
