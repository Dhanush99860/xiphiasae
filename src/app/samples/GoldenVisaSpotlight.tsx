"use client";

/**
 * VARIANT ② — "Cinematic Spotlight" for the /golden-visa (vertical-landing) reskin.
 * App-like, dramatic: a full-bleed Dubai hero, then a large FEATURED destination
 * spotlight whose full-bleed image fills the panel and updates on hover/click of
 * the destination list beside it (client state) — serif name, real key facts,
 * "Explore →" to the real route. Then a process band + closing CTA to /contact.
 * Matches the locked navy/gold VerticalHub idiom.
 *
 * DATA: the eight destinations mirror GOLDEN_VISA_SLUGS / ORDER in
 * src/app/(site)/golden-visa/page.tsx, which loads getResidencyCountries() from
 * src/lib/residency-content.ts. Names, regions and the headline stat are taken
 * from each country's content/residency/<slug>/_country.mdx frontmatter. Every
 * frame is resolved via the client-safe countryImage() helper. No fabricated data.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

type Dest = {
  name: string;
  slug: string;
  region: string;
  stat: string; // headline key fact
  blurb: string;
  facts: { k: string; v: string }[];
};

// Real Golden Visa roster — mirrors GOLDEN_VISA_SLUGS + ORDER in
// src/app/(site)/golden-visa/page.tsx. Facts drawn from each _country.mdx.
const DESTS: Dest[] = [
  {
    name: "Portugal",
    slug: "portugal",
    region: "Europe",
    stat: "From €250,000",
    blurb:
      "EU residency through investment with one of Europe's lightest stay requirements — Schengen access and a clear path to permanence.",
    facts: [
      { k: "Investment", v: "From €250K" },
      { k: "Stay", v: "~7 days / yr" },
      { k: "Path", v: "PR / citizenship · 5 yrs" },
    ],
  },
  {
    name: "Greece",
    slug: "greece",
    region: "Europe",
    stat: "From €250,000",
    blurb:
      "A renewable five-year permit through real estate or capital, with Schengen travel and an Aegean lifestyle for the whole family.",
    facts: [
      { k: "Investment", v: "From €250K" },
      { k: "Permit", v: "5-yr renewable" },
      { k: "Schengen", v: "90 / 180 days" },
    ],
  },
  {
    name: "United Arab Emirates",
    slug: "uae",
    region: "Africa & Middle East",
    stat: "2 or 10-year visa",
    blurb:
      "Long-term Gulf residency for investors and specialised talent — real estate, talent and student routes, family included at any age.",
    facts: [
      { k: "Residency", v: "2 or 10 yrs" },
      { k: "Routes", v: "Property · Talent" },
      { k: "Family", v: "Children any age" },
    ],
  },
  {
    name: "Malta",
    slug: "malta",
    region: "Europe",
    stat: "Permanent residence",
    blurb:
      "Mediterranean permanent residence via qualifying property and government contribution, with low minimum stay and Schengen travel.",
    facts: [
      { k: "Status", v: "Permanent" },
      { k: "Property", v: "Buy or lease" },
      { k: "Family", v: "Spouse · kids · parents" },
    ],
  },
  {
    name: "Cyprus",
    slug: "cyprus",
    region: "Europe",
    stat: "PR · one visit / 2 yrs",
    blurb:
      "Permanent residency with minimal physical presence across three routes — property, business or fund — with full EU benefits.",
    facts: [
      { k: "Status", v: "Permanent" },
      { k: "Presence", v: "1 visit / 2 yrs" },
      { k: "Routes", v: "Property · Fund" },
    ],
  },
  {
    name: "Hungary",
    slug: "hungary",
    region: "Europe",
    stat: "10-year permit",
    blurb:
      "The Guest Investor Programme — a 10-year renewable permit, Schengen access and a route to permanent residence then citizenship.",
    facts: [
      { k: "Permit", v: "10-yr renewable" },
      { k: "PR", v: "After 3 yrs" },
      { k: "Citizenship", v: "After 8 yrs" },
    ],
  },
  {
    name: "Latvia",
    slug: "latvia",
    region: "Europe",
    stat: "From €50,000",
    blurb:
      "One of the most affordable EU / Schengen routes — a renewable five-year permit with a single annual visit to preserve it.",
    facts: [
      { k: "Investment", v: "From €50K" },
      { k: "Permit", v: "5-yr renewable" },
      { k: "Presence", v: "1 visit / yr" },
    ],
  },
  {
    name: "Mauritius",
    slug: "mauritius",
    region: "Africa & Middle East",
    stat: "From USD 375,000",
    blurb:
      "Permanent residency on a stable tropical island — real estate from USD 375K, family included, with a fast-track naturalisation option.",
    facts: [
      { k: "Investment", v: "From $375K" },
      { k: "Status", v: "Permanent" },
      { k: "Family", v: "Spouse · kids · parents" },
    ],
  },
];

const PROCESS = [
  { no: "01", title: "Discovery", detail: "A private consultation to map your goals, timeline and the routes that fit." },
  { no: "02", title: "Selection", detail: "We shortlist destinations and programmes, modelling investment and mobility." },
  { no: "03", title: "Diligence", detail: "Project vetting, source-of-funds preparation and a transparent cost picture." },
  { no: "04", title: "Submission", detail: "We assemble, file and steward your application end-to-end with the authority." },
  { no: "05", title: "Approval", detail: "Permits issued, family included, and your second base activated." },
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD : GOLD_DEEP }}>
      <span className="h-px w-8" style={{ background: light ? GOLD : GOLD_DEEP }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

export default function GoldenVisaSpotlight({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const d = DESTS[active];
  const s = PROCESS[step];
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (full-bleed Dubai, DARK) ── */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-screen items-end overflow-hidden px-6 pb-20 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={countryImage("uae", "Africa & Middle East")}
            alt="Dubai skyline at dusk — the UAE Golden Visa"
            fill
            priority
            sizes="100vw"
            className="object-cover [filter:grayscale(0.45)_brightness(0.6)_contrast(1.05)]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.85) 0%, transparent 50%)" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              <a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Golden Visa
            </p>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-8">
            <Eyebrow light ar="الإقامة بالاستثمار">Residency by Investment</Eyebrow>
          </motion.div>
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}>
            <motion.span className="block" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>Golden Visa</motion.span>
            <motion.span className="block italic" style={{ color: GOLD }} initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.45 }}>programmes.</motion.span>
          </h1>
          <motion.p initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
            Eight headline residence-by-investment routes — Portugal, Greece, the UAE, Malta and more — compared by investment, timeline and the lifestyle they unlock.
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#spotlight" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Explore destinations <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              Book a private consultation
            </a>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1 }} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {[{ v: "8", u: "Headline destinations" }, { v: "€250K", u: "Entry investment from" }, { v: "90+", u: "Visa-free destinations" }].map((x) => (
              <div key={x.u} className="flex flex-col">
                <span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{x.v}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{x.u}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SPOTLIGHT (featured destination, DARK cinematic panel) ── */}
      <section id="spotlight" data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto w-full max-w-6xl">
          <Eyebrow light ar="الوجهات">Explore by country</Eyebrow>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}>
            Eight Golden Visa <span className="italic" style={{ color: GOLD }}>destinations.</span>
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_0.95fr]">
            {/* Cinematic featured panel */}
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg lg:aspect-auto lg:min-h-[34rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={d.slug}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <Image src={countryImage(d.slug, d.region)} alt={`${d.name} — Golden Visa destination`} fill sizes="(min-width:1024px) 56vw, 100vw" className="object-cover [filter:brightness(0.78)_contrast(1.04)]" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.94) 0%, rgba(8,18,42,0.12) 55%, rgba(8,18,42,0.45) 100%)" }} />
              <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <motion.div key={`txt-${d.slug}`} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{d.region} · {d.stat}</span>
                  <h3 className={`${serifClass} mt-2 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-tight`}>{d.name}</h3>
                  <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/75">{d.blurb}</p>
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.16)" }}>
                    {d.facts.map((f) => (
                      <div key={f.k} className="flex flex-col">
                        <span className="text-[13px] font-semibold" style={{ color: GOLD }}>{f.v}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{f.k}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`/residency/${d.slug}`} className="group mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
                    Explore {d.name} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Destination list — hover/click updates the spotlight */}
            <ul className="flex flex-col gap-1.5">
              {DESTS.map((x, i) => {
                const on = i === active;
                return (
                  <li key={x.slug}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className="group relative block w-full overflow-hidden rounded-md border px-5 py-4 text-left transition-all duration-300"
                      style={{ borderColor: on ? GOLD : "rgba(191,161,92,0.22)", background: on ? "rgba(191,161,92,0.1)" : "rgba(255,255,255,0.02)" }}
                    >
                      <span className="absolute inset-y-0 left-0 w-0.5 transition-all duration-300" style={{ background: GOLD, opacity: on ? 1 : 0 }} />
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="flex items-baseline gap-3">
                          <span className={`${serifClass} text-[0.95rem] font-medium tabular-nums`} style={{ color: on ? GOLD : "rgba(238,243,251,0.4)" }}>{String(i + 1).padStart(2, "0")}</span>
                          <span className={`${serifClass} text-[1.2rem] font-medium transition-colors`} style={{ color: on ? "#eef3fb" : "rgba(238,243,251,0.7)" }}>{x.name}</span>
                        </span>
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: on ? GOLD : "rgba(238,243,251,0.4)" }}>{x.region}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PROCESS (LIGHT band) ── */}
      <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="mx-auto w-full max-w-6xl">
          <Eyebrow ar="كيف نعمل">How we do it</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}>Five steps. One desk.</h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <ul className="relative flex flex-col ps-8">
              <span className="absolute left-1 top-2 bottom-2 w-px" style={{ background: `${INK}1a` }} />
              <span className="absolute left-1 top-2 w-px origin-top transition-[height] duration-500" style={{ background: GOLD, height: `${(step / (PROCESS.length - 1)) * 100}%` }} />
              {PROCESS.map((st, i) => {
                const on = i === step;
                return (
                  <li key={st.no}>
                    <button onMouseEnter={() => setStep(i)} onFocus={() => setStep(i)} onClick={() => setStep(i)} aria-pressed={on} className="relative block w-full py-4 text-left">
                      <span className="absolute -left-[2.05rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300" style={{ background: i <= step ? GOLD : "#f3f7fd", boxShadow: "0 0 0 4px #f3f7fd", outline: `1px solid ${GOLD}` }} />
                      <span className="flex items-baseline gap-3">
                        <span className={`${serifClass} text-[1.2rem] font-medium`} style={{ color: on ? GOLD_DEEP : `${INK}40` }}>{st.no}</span>
                        <span className={`${serifClass} text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium transition-colors duration-300`} style={{ color: on ? INK : `${INK}66` }}>{st.title}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <motion.div key={s.no} initial={reduce ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center rounded-lg border p-9 lg:p-12" style={{ borderColor: `${INK}14`, background: "rgba(255,255,255,0.6)" }}>
              <span className={`${serifClass} text-[5rem] font-medium leading-none`} style={{ color: GOLD_DEEP }}>{s.no}</span>
              <h3 className={`${serifClass} mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-medium`}>{s.title}</h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#0c1f3f]/70">{s.detail}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA (DARK, full-bleed) ── */}
      <section data-tone="dark" className="relative isolate flex min-h-[80vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="absolute inset-0 -z-10">
          <Image src={countryImage("portugal", "Europe")} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <Eyebrow light ar="ابدأ رحلتك">Begin your route</Eyebrow>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>
            Find your route in <span className="italic" style={{ color: GOLD }}>one conversation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Compare investment, timeline and benefits across every Golden Visa destination, then map the right path for your family with a XIPHIAS advisor.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="/residency" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              All residency routes
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
