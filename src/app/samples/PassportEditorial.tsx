"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Flag from "@/components/Countries/Flag";
import { countryImage } from "@/components/Countries/country-image";

/* ── LOCKED navy/gold system ── */
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* ── REAL passport data — verbatim from src/data/passport-index.ts
   (passportRecords + passportIndexStats, the same source the live
   /passport-index page consumes). country, code (ISO-2), rank, score,
   band and region are unchanged. `slug` is the country-image resolver key
   (only countries with a real /public image carry one). ── */
type Band = "Elite access" | "High access" | "Strategic mobility" | "Restricted access";
type Passport = {
  country: string;
  code: string;
  region: string;
  rank: string;
  rankValue: number;
  score: number;
  band: Band;
  movement: string;
  slug?: string;
};

const STATS = {
  snapshotLabel: "2026 public snapshot",
  trackedPassports: 199,
  trackedDestinations: 227,
  topScore: 192,
  lowestScore: 24,
  mobilityGap: 168,
};

const PASSPORTS: Passport[] = [
  { country: "Singapore", code: "SG", region: "Asia", rank: "1st", rankValue: 1, score: 192, band: "Elite access", movement: "Retains the top position", slug: "singapore" },
  { country: "Japan", code: "JP", region: "Asia", rank: "2nd", rankValue: 2, score: 188, band: "Elite access", movement: "Joint second" },
  { country: "South Korea", code: "KR", region: "Asia", rank: "2nd", rankValue: 2, score: 188, band: "Elite access", movement: "Joint second" },
  { country: "Denmark", code: "DK", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", movement: "Top European cluster" },
  { country: "Luxembourg", code: "LU", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", movement: "Top European cluster" },
  { country: "Spain", code: "ES", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", movement: "Top European cluster", slug: "spain" },
  { country: "Sweden", code: "SE", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", movement: "Top European cluster" },
  { country: "Switzerland", code: "CH", region: "Europe", rank: "3rd", rankValue: 3, score: 186, band: "Elite access", movement: "Top European cluster", slug: "switzerland" },
  { country: "United Arab Emirates", code: "AE", region: "Middle East", rank: "5th", rankValue: 5, score: 184, band: "Elite access", movement: "Strongest 20-year climber", slug: "uae" },
  { country: "Portugal", code: "PT", region: "Europe", rank: "5th group", rankValue: 5, score: 184, band: "Elite access", movement: "High-access EU passport group", slug: "portugal" },
  { country: "Canada", code: "CA", region: "North America", rank: "8th", rankValue: 8, score: 181, band: "High access", movement: "Top-ten profile", slug: "canada" },
  { country: "United States", code: "US", region: "North America", rank: "Top 10", rankValue: 10, score: 179, band: "High access", movement: "Recovered into the top 10", slug: "usa" },
  { country: "China", code: "CN", region: "Asia", rank: "59th", rankValue: 59, score: 141, band: "Strategic mobility", movement: "Major decade climber" },
  { country: "India", code: "IN", region: "Asia", rank: "80th", rankValue: 80, score: 55, band: "Strategic mobility", movement: "Moved up in 2026 public reports" },
  { country: "Afghanistan", code: "AF", region: "Global South", rank: "Last", rankValue: 199, score: 24, band: "Restricted access", movement: "Lowest access in the public snapshot" },
];

const REGIONS = ["All", "Asia", "Europe", "Middle East", "North America", "Global South"] as const;
type Region = (typeof REGIONS)[number];

const BAND_TINT: Record<Band, string> = {
  "Elite access": "#bfa15c",
  "High access": "#7da7c4",
  "Strategic mobility": "#9a8bbd",
  "Restricted access": "#b06a5a",
};

/* Real sub-routes under /passport-index (verbatim from the live shell). */
const SUBROUTES = [
  { label: "Full ranking", href: "/passport-index/ranking" },
  { label: "Compare passports", href: "/passport-index/compare" },
  { label: "My passport", href: "/passport-index/my-passport" },
  { label: "Improve mobility", href: "/passport-index/improve" },
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar?: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD : GOLD_DEEP }}>
      <span className="h-px w-8" style={{ background: light ? GOLD : GOLD_DEEP }} />
      {children}
      {ar ? <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span> : null}
    </p>
  );
}

export default function PassportEditorial({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [region, setRegion] = useState<Region>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PASSPORTS.filter(
      (p) =>
        (region === "All" || p.region === region) &&
        (q === "" || p.country.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)),
    );
  }, [region, query]);

  const hero = PASSPORTS[0]; // Singapore — strongest passport in the snapshot

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
        Sample · Passport ③ Editorial Ranking
      </div>
      <Header serifClass={serifClass} />

      {/* ── HERO — full-bleed image, navy overlay ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-20 pt-36 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={countryImage("singapore", "Asia")}
            alt="Singapore — the strongest passport in the 2026 public mobility snapshot"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,23,51,0.94) 0%, rgba(10,23,51,0.78) 45%, rgba(10,23,51,0.45) 100%)" }} />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow light ar="مؤشر قوة جواز السفر">XIPHIAS Passport Power · Editorial</Eyebrow>
          <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>
            The world, ranked by the strength of a passport.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/75">
            A magazine-grade reading of the {STATS.snapshotLabel}: {STATS.trackedPassports} passports measured against{" "}
            {STATS.trackedDestinations} destinations. From {hero.country}&rsquo;s {hero.score}-destination peak down to the
            {" "}{STATS.lowestScore}-destination floor — a {STATS.mobilityGap}-point mobility gap, read like an advisor would.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/passport-index/ranking"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Browse full ranking <span aria-hidden>→</span>
            </Link>
            <Link
              href="/passport-index/compare"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-colors hover:border-white/60"
            >
              Compare two passports
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT PASSPORT POWER MEANS — image + copy (light) ── */}
      <section data-tone="light" className="relative isolate px-6 py-20 sm:px-12 lg:px-20" style={{ background: "#fbfaf7", color: INK }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-black/5">
            <Image
              src={countryImage("portugal", "Europe")}
              alt="Portugal — a high-access EU passport favoured for long-term mobility planning"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(10,23,51,0.28) 0%, rgba(10,23,51,0) 55%)" }} />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/55 px-3.5 py-2 text-white backdrop-blur">
              <Flag code="PT" size={26} />
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">Portugal · 184 destinations</span>
            </div>
          </div>
          <div>
            <Eyebrow ar="ماذا تعني قوة الجواز">What passport power means</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05]`}>
              A score is a starting point, not a verdict.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "rgba(12,31,63,0.74)" }}>
              The number beside a passport counts the destinations it reaches without a prior visa. It captures travel
              freedom — but not tax residence, the right to live and work, education access, or a credible Plan B. The
              widest read of the public snapshot is a {STATS.mobilityGap}-point gap between the strongest and weakest
              passport: that gap is exactly where second residence and citizenship planning earns its place.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t pt-6" style={{ borderColor: "rgba(168,125,31,0.4)" }}>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Top score</dt>
                <dd className={`${serifClass} mt-1 text-[2rem] font-medium`}>{STATS.topScore}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Tracked</dt>
                <dd className={`${serifClass} mt-1 text-[2rem] font-medium`}>{STATS.trackedPassports}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>Mobility gap</dt>
                <dd className={`${serifClass} mt-1 text-[2rem] font-medium`}>{STATS.mobilityGap}</dd>
              </div>
            </dl>
            <Link
              href="/passport-index/improve"
              className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] underline-offset-4 hover:underline"
              style={{ color: GOLD_DEEP }}
            >
              How to improve mobility <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE RANKING — editorial table/cards with flags + scores (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 py-20 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 140% at 12% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow light ar="الترتيب">The ranking</Eyebrow>
              <h2 className={`${serifClass} mt-5 text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05]`}>
                The 2026 mobility table, read top to bottom.
              </h2>
            </div>
            {/* SEARCH + FILTER affordance */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="sr-only" htmlFor="passport-search">Search passports by country or ISO code</label>
              <input
                id="passport-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code…"
                className="w-56 rounded-full border border-white/25 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:border-[#bfa15c] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter ranking by region">
            {REGIONS.map((r) => {
              const active = region === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  aria-pressed={active}
                  className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors"
                  style={
                    active
                      ? { background: GOLD, color: NAVY, borderColor: GOLD }
                      : { background: "transparent", color: "rgba(238,243,251,0.85)", borderColor: "rgba(255,255,255,0.25)" }
                  }
                >
                  {r}
                </button>
              );
            })}
          </div>

          {/* Column header (desktop) */}
          <div className="mt-8 hidden grid-cols-[64px_1fr_140px_120px] items-center gap-4 border-b pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 sm:grid" style={{ borderColor: "rgba(191,161,92,0.4)" }}>
            <span>Rank</span>
            <span>Passport</span>
            <span>Access band</span>
            <span className="text-right">Score</span>
          </div>

          <ul className="divide-y" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {rows.map((p, i) => (
              <motion.li
                key={p.code}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.25) }}
                className="border-b border-white/10"
              >
                <Link
                  href={`/passport-index/passport/${p.code.toLowerCase()}`}
                  className="grid grid-cols-[64px_1fr] items-center gap-4 py-5 transition-colors hover:bg-white/[0.04] sm:grid-cols-[64px_1fr_140px_120px]"
                >
                  <span className={`${serifClass} text-[1.6rem] font-medium`} style={{ color: GOLD }}>
                    {p.rankValue}
                  </span>
                  <span className="flex items-center gap-3.5">
                    <Flag code={p.code} size={38} />
                    <span>
                      <span className={`${serifClass} block text-[1.25rem] font-medium leading-tight`}>{p.country}</span>
                      <span className="text-[12px] text-white/55">{p.code} · {p.region} · {p.movement}</span>
                    </span>
                  </span>
                  <span className="hidden items-center gap-2 text-[12px] font-medium text-white/80 sm:flex">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: BAND_TINT[p.band] }} aria-hidden />
                    {p.band}
                  </span>
                  <span className="hidden text-right sm:block">
                    <span className={`${serifClass} text-[1.7rem] font-medium`}>{p.score}</span>
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-white/45">destinations</span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
          {rows.length === 0 ? (
            <p className="py-12 text-center text-[15px] text-white/60">
              No passports match.{" "}
              <button type="button" onClick={() => { setRegion("All"); setQuery(""); }} className="font-semibold underline" style={{ color: GOLD }}>
                Reset
              </button>
            </p>
          ) : (
            <p className="mt-5 text-[12px] text-white/45">
              Showing {rows.length} of {PASSPORTS.length} curated passports · {STATS.snapshotLabel}. Open any row for its full
              profile, or{" "}
              <Link href="/passport-index/ranking" className="font-semibold underline" style={{ color: GOLD }}>
                see the complete table
              </Link>
              .
            </p>
          )}

          {/* Real sub-route chips */}
          <div className="mt-10 flex flex-wrap gap-2.5 border-t pt-7" style={{ borderColor: "rgba(191,161,92,0.4)" }}>
            {SUBROUTES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-white/25 px-4 py-2 text-[12px] font-medium text-white/85 transition-colors hover:border-[#bfa15c] hover:text-white"
              >
                {s.label} <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY TEASER (light) ── */}
      <section data-tone="light" className="relative isolate px-6 py-20 sm:px-12 lg:px-20" style={{ background: "#f7f4ef", color: INK }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Eyebrow ar="المنهجية">Methodology</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05]`}>
              How we read the snapshot — and where it stops.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "rgba(12,31,63,0.74)" }}>
              Scores reflect a public {STATS.snapshotLabel} of visa-free and visa-on-arrival access across{" "}
              {STATS.trackedDestinations} destinations. Rankings shift with policy and reciprocal agreements; bands are an
              advisory simplification, not legal advice. We publish the limits in full so the table stays a planning tool,
              never a promise.
            </p>
            <Link
              href="/passport-index/methodology"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: NAVY, color: "#fbfaf7" }}
            >
              Read the methodology <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg ring-1 ring-black/5">
            <Image
              src={countryImage("uae", "Africa & Middle East")}
              alt="United Arab Emirates — the strongest 20-year climber in the snapshot"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(10,23,51,0.3) 0%, rgba(10,23,51,0) 60%)" }} />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/55 px-3.5 py-2 text-white backdrop-blur">
              <Flag code="AE" size={26} />
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">UAE · strongest 20-yr climber</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 140% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-3xl">
          <Eyebrow light ar="تحدث إلى مستشار">Turn a score into a plan</Eyebrow>
          <h2 className={`${serifClass} mx-auto mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>
            Where does your passport leave you?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            Start with your passport and your family&rsquo;s goal — travel, education, tax residence or a Plan B — and we
            will map the residence and citizenship routes that close your mobility gap, privately and end to end.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Check your eligibility <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-colors hover:border-white/60"
            >
              Speak to an advisor
            </Link>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
