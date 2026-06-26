"use client";

/**
 * VARIANT ② — "Spotlight" for the marketing-hub /programs page reskin.
 * App-like and cinematic: a dark navy full-bleed hero, then a SPLIT panel —
 * a LIST of the six real programme categories on one side and a large
 * SPOTLIGHT on the other whose REAL full-bleed image fills the whole panel
 * and updates on hover/click of the active category (client state, default =
 * Citizenship). Serif name, description and "Explore →" to the real route.
 * Closes on a full-bleed CTA → /contact. Matches the locked navy/gold idiom.
 *
 * DATA: the six categories are the real XIPHIAS programme verticals, each
 * pointing at its real route. Every frame is resolved via the client-safe
 * countryImage() helper — no fabricated paths.
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

type Category = {
  name: string;
  href: string;
  img: string;
  kicker: string; // short region/scope label
  blurb: string;
  ar: string;
};

// The six REAL programme categories — real route + real full-bleed image.
const CATEGORIES: Category[] = [
  {
    name: "Citizenship by Investment",
    href: "/citizenship",
    img: countryImage("grenada"),
    kicker: "A second passport",
    ar: "الجنسية بالاستثمار",
    blurb:
      "Acquire a second nationality through a transparent, government-approved contribution or investment — visa-free reach, a safe harbour for your family and a generational asset secured for life.",
  },
  {
    name: "Residency & Golden Visas",
    href: "/residency",
    img: countryImage("portugal"),
    kicker: "A second home base",
    ar: "الإقامة والتأشيرات الذهبية",
    blurb:
      "Establish residence in Europe and beyond through investment — a renewable foothold with light stay requirements and a clear path toward permanence and, in time, citizenship.",
  },
  {
    name: "Golden Visa",
    href: "/golden-visa",
    img: countryImage("uae"),
    kicker: "Long-term Gulf residence",
    ar: "التأشيرة الذهبية",
    blurb:
      "Long-term residency for investors and specialised talent — property, talent and capital routes, with family included at any age and a stable, tax-efficient base in the region.",
  },
  {
    name: "Skilled Migration",
    href: "/skilled",
    img: countryImage("canada"),
    kicker: "Points-based pathways",
    ar: "الهجرة المهارية",
    blurb:
      "Permanent residence earned on merit — points-based and employer-led pathways for professionals and their families, with a direct route to settlement and citizenship.",
  },
  {
    name: "Corporate Mobility",
    href: "/corporate",
    img: countryImage("singapore"),
    kicker: "For founders & teams",
    ar: "التنقل المؤسسي",
    blurb:
      "Relocate founders, executives and teams with confidence — company formation, intra-company transfers and entrepreneur routes structured around your business and your people.",
  },
  {
    name: "Work Permits",
    href: "/work-permits",
    img: countryImage("uae", "Africa & Middle East"),
    kicker: "Authorised employment",
    ar: "تصاريح العمل",
    blurb:
      "Authorised employment, handled end-to-end — sponsorship, documentation and compliance for individuals and employers placing talent across our key destinations.",
  },
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

export default function ProgramsSpotlight({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0); // default = Citizenship
  const c = CATEGORIES[active];
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (full-bleed, DARK navy) ── */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-screen items-end overflow-hidden px-6 pb-20 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={countryImage("portugal")}
            alt="A second life secured — XIPHIAS programmes"
            fill
            priority
            sizes="100vw"
            className="object-cover [filter:grayscale(0.45)_brightness(0.55)_contrast(1.05)]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.85) 0%, transparent 50%)" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              <a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Programmes
            </p>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-8">
            <Eyebrow light ar="برامجنا">What we do</Eyebrow>
          </motion.div>
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}>
            <motion.span className="block" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>Six routes to a</motion.span>
            <motion.span className="block italic" style={{ color: GOLD }} initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.45 }}>second life.</motion.span>
          </h1>
          <motion.p initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
            Citizenship, residency, golden visas, skilled migration, corporate mobility and work permits — every XIPHIAS programme, one private desk, guided end to end.
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#spotlight" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Explore programmes <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              Book a private consultation
            </a>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1 }} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {[{ v: "6", u: "Programme categories" }, { v: "30+", u: "Destinations worldwide" }, { v: "1", u: "Private advisory desk" }].map((x) => (
              <div key={x.u} className="flex flex-col">
                <span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{x.v}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{x.u}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SPOTLIGHT + LIST (app-like SPLIT, DARK) ── */}
      <section id="spotlight" data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto w-full max-w-6xl">
          <Eyebrow light ar="استكشف البرامج">Explore by programme</Eyebrow>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}>
            Six programme <span className="italic" style={{ color: GOLD }}>categories.</span>
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_0.95fr]">
            {/* Cinematic SPOTLIGHT panel — real full-bleed image fills the whole box */}
            <div className="relative order-2 aspect-[16/11] overflow-hidden rounded-lg lg:order-1 lg:aspect-auto lg:min-h-[36rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={c.href}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <Image src={c.img} alt={`${c.name} — XIPHIAS programme`} fill sizes="(min-width:1024px) 56vw, 100vw" className="object-cover [filter:brightness(0.78)_contrast(1.04)]" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.94) 0%, rgba(8,18,42,0.12) 55%, rgba(8,18,42,0.45) 100%)" }} />
              <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <motion.div key={`txt-${c.href}`} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c.kicker}</span>
                  <h3 className={`${serifClass} mt-2 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-tight`}>{c.name}</h3>
                  <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/75">{c.blurb}</p>
                  <a href={c.href} className="group mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
                    Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Category LIST — hover/click updates the spotlight */}
            <ul className="order-1 flex flex-col gap-1.5 lg:order-2">
              {CATEGORIES.map((x, i) => {
                const on = i === active;
                return (
                  <li key={x.href}>
                    <button
                      type="button"
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
                          <span className={`${serifClass} text-[1.18rem] font-medium leading-tight transition-colors`} style={{ color: on ? "#eef3fb" : "rgba(238,243,251,0.7)" }}>{x.name}</span>
                        </span>
                        <span aria-hidden className="shrink-0 translate-x-0 text-base transition-all duration-300" style={{ color: GOLD, opacity: on ? 1 : 0 }}>→</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA (DARK, full-bleed) → /contact ── */}
      <section data-tone="dark" className="relative isolate flex min-h-[80vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="absolute inset-0 -z-10">
          <Image src={countryImage("grenada")} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <Eyebrow light ar="ابدأ رحلتك">Begin your journey</Eyebrow>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>
            Find your programme in <span className="italic" style={{ color: GOLD }}>one conversation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Tell a XIPHIAS advisor your goals, timeline and family — and we will map the right route across citizenship, residency and mobility, handled from a single desk.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="/citizenship" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              Start with citizenship
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
