"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

/* ─────────────────────────────────────────────────────────────
   LOCKED navy/gold luxury system (matches Country/CountryHub.tsx)
   ───────────────────────────────────────────────────────────── */
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f"; // gold-as-text on light → AA
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* ─────────────────────────────────────────────────────────────
   REAL countries data — a client-safe snapshot of the project's
   COUNTRY_META + REGION_ORDER from src/lib/countries-content.ts.
   Slugs/names/regions are verbatim; each card links to the real
   /countries/[slug] route. `count` is the indicative programme
   tally surfaced on the index (programmeCount per destination).
   No invented countries.
   ───────────────────────────────────────────────────────────── */
type Country = { slug: string; name: string; count: number };
type Region = { region: string; ar: string; countries: Country[] };

// Order mirrors REGION_ORDER in countries-content.ts.
const REGIONS: Region[] = [
  {
    region: "Africa & Middle East",
    ar: "أفريقيا والشرق الأوسط",
    countries: [
      { slug: "uae", name: "United Arab Emirates", count: 6 },
      { slug: "egypt", name: "Egypt", count: 2 },
      { slug: "mauritius", name: "Mauritius", count: 2 },
      { slug: "saotome", name: "São Tomé & Príncipe", count: 1 },
    ],
  },
  {
    region: "Europe",
    ar: "أوروبا",
    countries: [
      { slug: "portugal", name: "Portugal", count: 3 },
      { slug: "greece", name: "Greece", count: 2 },
      { slug: "spain", name: "Spain", count: 2 },
      { slug: "malta", name: "Malta", count: 2 },
      { slug: "cyprus", name: "Cyprus", count: 2 },
      { slug: "italy", name: "Italy", count: 2 },
      { slug: "germany", name: "Germany", count: 1 },
      { slug: "switzerland", name: "Switzerland", count: 1 },
      { slug: "monaco", name: "Monaco", count: 1 },
      { slug: "bulgaria", name: "Bulgaria", count: 1 },
      { slug: "hungary", name: "Hungary", count: 1 },
      { slug: "latvia", name: "Latvia", count: 1 },
      { slug: "turkey", name: "Turkey", count: 2 },
      { slug: "united-kingdom", name: "United Kingdom", count: 2 },
    ],
  },
  {
    region: "Caribbean",
    ar: "الكاريبي",
    countries: [
      { slug: "saintkitts", name: "Saint Kitts & Nevis", count: 1 },
      { slug: "antigua-barbuda", name: "Antigua & Barbuda", count: 1 },
      { slug: "dominica", name: "Dominica", count: 1 },
      { slug: "grenada", name: "Grenada", count: 1 },
      { slug: "saint-lucia", name: "Saint Lucia", count: 1 },
      { slug: "curacao", name: "Curaçao", count: 1 },
    ],
  },
  {
    region: "Asia-Pacific",
    ar: "آسيا والمحيط الهادئ",
    countries: [
      { slug: "singapore", name: "Singapore", count: 2 },
      { slug: "hong-kong", name: "Hong Kong", count: 1 },
      { slug: "australia", name: "Australia", count: 3 },
      { slug: "new-zealand", name: "New Zealand", count: 2 },
      { slug: "malaysia", name: "Malaysia", count: 1 },
      { slug: "vanuatu", name: "Vanuatu", count: 1 },
      { slug: "nauru", name: "Nauru", count: 1 },
    ],
  },
  {
    region: "Americas",
    ar: "الأمريكتان",
    countries: [
      { slug: "usa", name: "United States", count: 2 },
      { slug: "canada", name: "Canada", count: 3 },
      { slug: "panama", name: "Panama", count: 1 },
      { slug: "uruguay", name: "Uruguay", count: 1 },
    ],
  },
];

/* ── shared motion helpers (respect reduced motion) ── */
function useEase() {
  const reduce = useReducedMotion();
  return { reduce, ease: [0.16, 1, 0.3, 1] as const };
}

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD_DEEP : GOLD }}>
      <span className="h-px w-8" style={{ background: light ? GOLD_DEEP : GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

/* ── HERO (navy) — single <h1>, "Find your country" intent + count ── */
function Hero({ serifClass, total }: { serifClass: string; total: number }) {
  const { reduce, ease } = useEase();
  return (
    <section
      data-tone="dark"
      className="relative isolate flex min-h-[78vh] items-center overflow-hidden px-6 pb-20 pt-36 text-[#eef3fb] sm:px-12 lg:px-20"
      style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}
    >
      <Ambient tone="dark" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
          <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Countries
        </p>
        <p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
          <span className="h-px w-8" style={{ background: GOLD }} />Where we operate
          <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الوجهات</span>
        </p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className={`${serifClass} mt-5 text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.92]`}
        >
          Find your country.
        </motion.h1>
        <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
          Pick a destination to see every residency, citizenship, skilled and corporate
          pathway we run there — grouped by region, as a private collection.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <Stat serifClass={serifClass} value={String(total)} label="Countries" />
          <span aria-hidden className="hidden h-10 w-px sm:block" style={{ background: "rgba(191,161,92,0.4)" }} />
          <Stat serifClass={serifClass} value={String(REGIONS.length)} label="Regions" />
          <span aria-hidden className="hidden h-10 w-px sm:block" style={{ background: "rgba(191,161,92,0.4)" }} />
          <Stat serifClass={serifClass} value="4" label="Pathways" />
        </div>
      </div>
    </section>
  );
}

function Stat({ serifClass, value, label }: { serifClass: string; value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={`${serifClass} text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-none`} style={{ color: GOLD }}>{value}</span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{label}</span>
    </div>
  );
}

/* ── COUNTRY CARD (brand idiom — navy ground, gold rule + corner ticks) ── */
function CountryCard({ c, serifClass, idx }: { c: Country; serifClass: string; idx: number }) {
  const { reduce, ease } = useEase();
  return (
    <motion.a
      href={`/countries/${c.slug}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease, delay: reduce ? 0 : Math.min(idx * 0.04, 0.3) }}
      className="group relative block w-[72vw] shrink-0 snap-start overflow-hidden rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#bfa15c] hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)] sm:w-[20rem]"
      style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))" }}
    >
      <span aria-hidden className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: GOLD }} />
      <span aria-hidden className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: GOLD }} />
      <span className={`${serifClass} text-[1.6rem] font-medium leading-none`} style={{ color: GOLD }}>
        {String(idx + 1).padStart(2, "0")}
      </span>
      <h3 className={`${serifClass} mt-5 text-[clamp(1.4rem,2vw,1.85rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>
        {c.name}
      </h3>
      <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <span className="text-[12px] uppercase tracking-[0.14em] text-white/55">
          {c.count} programme{c.count === 1 ? "" : "s"}
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
          View <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.a>
  );
}

/* ── REGION RAIL — label + count pinned left, horizontal scroll of cards ── */
function RegionRail({ r, serifClass, index }: { r: Region; serifClass: string; index: number }) {
  const dark = index % 2 === 0; // alternate navy / subtle light band
  const text = dark ? "#eef3fb" : INK;
  return (
    <section
      data-tone={dark ? "dark" : "light"}
      className="relative isolate px-6 py-16 sm:px-12 lg:px-20"
      style={{ background: dark ? NAVY : "#f7f4ef", color: text }}
    >
      <Ambient tone={dark ? "dark" : "light"} />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.32fr_1fr] lg:items-start">
        {/* Pinned region label + count */}
        <div className="lg:sticky lg:top-28">
          <Eyebrow ar={r.ar} light={!dark}>Region</Eyebrow>
          <h2 className={`${serifClass} mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.05]`}>
            {r.region}
          </h2>
          <p className="mt-4 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: dark ? "rgba(255,255,255,0.55)" : `${INK}99` }}>
            <span style={{ color: dark ? GOLD : GOLD_DEEP }}>{String(r.countries.length).padStart(2, "0")}</span>
            destinations
            <span aria-hidden className="text-[15px]" style={{ color: dark ? GOLD : GOLD_DEEP }}>▸</span>
          </p>
        </div>

        {/* Horizontal scroll rail of country cards (Rolex-collection style) */}
        <div className="-mx-6 px-6 sm:-mx-12 sm:px-12 lg:mx-0 lg:px-0">
          {dark ? (
            <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {r.countries.map((c, i) => (
                <li key={c.slug} className="contents">
                  <CountryCard c={c} serifClass={serifClass} idx={i} />
                </li>
              ))}
            </ul>
          ) : (
            // On light bands, recolor the cards inline for AA contrast.
            <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {r.countries.map((c, i) => (
                <li key={c.slug} className="contents">
                  <LightCard c={c} serifClass={serifClass} idx={i} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* light-band variant of the card (gold-as-text → gold_deep / ink for AA) */
function LightCard({ c, serifClass, idx }: { c: Country; serifClass: string; idx: number }) {
  const { reduce, ease } = useEase();
  return (
    <motion.a
      href={`/countries/${c.slug}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease, delay: reduce ? 0 : Math.min(idx * 0.04, 0.3) }}
      className="group relative block w-[72vw] shrink-0 snap-start overflow-hidden rounded-lg border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#bfa15c] hover:shadow-[0_30px_70px_-40px_rgba(12,31,63,0.4)] sm:w-[20rem]"
      style={{ borderColor: `${INK}1a` }}
    >
      <span className={`${serifClass} text-[1.6rem] font-medium leading-none`} style={{ color: GOLD_DEEP }}>
        {String(idx + 1).padStart(2, "0")}
      </span>
      <h3 className={`${serifClass} mt-5 text-[clamp(1.4rem,2vw,1.85rem)] font-medium leading-tight text-[#0c1f3f] transition-colors group-hover:text-[#a87d1f]`}>
        {c.name}
      </h3>
      <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: `${INK}14` }}>
        <span className="text-[12px] uppercase tracking-[0.14em] text-[#0c1f3f]/55">
          {c.count} programme{c.count === 1 ? "" : "s"}
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD_DEEP }}>
          View <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.a>
  );
}

/* ── CLOSING CTA → /contact (navy) ── */
function CTA({ serifClass }: { serifClass: string }) {
  return (
    <section
      data-tone="dark"
      className="relative isolate flex min-h-[60vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
      style={{ background: `radial-gradient(120% 100% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
    >
      <Ambient tone="dark" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
          <span className="h-px w-8" style={{ background: GOLD }} />Begin
          <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">ابدأ</span>
        </p>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.0]`}>
          Not sure which country <span className="italic" style={{ color: GOLD }}>fits?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
          Share your goals and a senior XIPHIAS advisor will return a tailored shortlist
          of destinations and programmes — privately, within 24 hours.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
            Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── VARIANT ② "Region Rails" ── */
export default function CountriesRails({ serifClass }: { serifClass: string }) {
  const total = useMemo(() => REGIONS.reduce((s, r) => s + r.countries.length, 0), []);
  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} total={total} />
      {REGIONS.map((r, i) => (
        <RegionRail key={r.region} r={r} serifClass={serifClass} index={i} />
      ))}
      <CTA serifClass={serifClass} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
