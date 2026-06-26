"use client";

// GoldenVisaHub — VARIANT ① "Hub" for the REAL /golden-visa vertical landing.
// Navy/gold luxury idiom matching CountryHub / VerticalHub / ProgramHub.
//
// Fed by live data: the server page (src/app/(site)/golden-visa/page.tsx) loads
// the real golden-visa destinations via getResidencyCountries() filtered by
// GOLDEN_VISA_SLUGS and passes them in as `destinations` (name, slug, region,
// stat — all derived from real CountryMeta). Each card links to its real route
// /residency/[slug]; images are REAL full-bleed frames via countryImage().

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

export type GoldenVisaDestination = {
  name: string;
  slug: string;
  region: string;
  stat: string;
};

const STEPS = [
  { no: "01", title: "Discovery", detail: "A private consultation to map your goals, timeline and the destinations that fit your family." },
  { no: "02", title: "Selection", detail: "We compare investment, lead time and benefits across every Golden Visa route and shortlist the right one." },
  { no: "03", title: "Application", detail: "Document preparation, project vetting and submission — handled end-to-end by your dedicated desk." },
  { no: "04", title: "Approval", detail: "Biometrics, residence cards and onboarding, with a clear path to permanence on eligible routes." },
];

const PROOF = [
  { v: "20+", u: "Years advising HNW families" },
  { v: "2,000+", u: "Approvals delivered" },
  { v: "1", u: "Dedicated desk per client" },
];

const DUO =
  "object-cover [filter:grayscale(0.5)_brightness(0.7)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105";

function Rise({ text, className, delay = 0, reduce }: { text: string; className?: string; delay?: number; reduce?: boolean }) {
  if (reduce) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}>
          <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function Fade({ children, delay = 0, className, reduce }: { children: React.ReactNode; delay?: number; className?: string; reduce?: boolean }) {
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

function Eyebrow({ children, ar, onDark = false }: { children: React.ReactNode; ar: string; onDark?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: onDark ? GOLD : GOLD_DEEP }}>
      <span className="h-px w-8" style={{ background: onDark ? GOLD : GOLD_DEEP }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

export default function GoldenVisaHub({
  destinations,
  serifClass,
}: {
  destinations: GoldenVisaDestination[];
  serifClass: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const cards = destinations.map((d) => ({ ...d, img: countryImage(d.slug, d.region) }));
  const count = destinations.length;
  const countWord =
    ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][count] ??
    String(count);
  const heroStats = [
    { v: String(count), u: "Headline destinations" },
    { v: "€250K", u: "Entry investment from" },
    { v: "90+", u: "Visa-free unlocked" },
  ];

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (DARK, full-bleed real Dubai/UAE image) ── */}
      <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
        <div className="absolute inset-0">
          <Image src={countryImage("uae")} alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.6)_contrast(1.05)]" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <Fade reduce={reduce}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}>
              <a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Golden Visa
            </p>
          </Fade>
          <Fade reduce={reduce} delay={0.1}>
            <div className="mt-8"><Eyebrow ar="الإقامة عبر الاستثمار" onDark>Residency by Investment</Eyebrow></div>
          </Fade>
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}>
            <Rise text="Golden Visa" reduce={reduce} delay={0.2} className="block" />
            <span className="block italic" style={{ color: GOLD }}><Rise text="for the few who plan ahead." reduce={reduce} delay={0.45} /></span>
          </h1>
          <Fade reduce={reduce} delay={0.9}>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
              {count} headline residence-by-investment routes — Portugal, Greece, the UAE, Malta and more — compared by investment, timeline and the lifestyle, schooling and mobility they unlock.
            </p>
          </Fade>
          <Fade reduce={reduce} delay={1.05}>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
                Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#destinations" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
                Explore destinations
              </a>
            </div>
          </Fade>
          <Fade reduce={reduce} delay={1.3}>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {heroStats.map((x) => (
                <div key={x.u} className="flex flex-col">
                  <span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{x.v}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{x.u}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── DESTINATIONS (LIGHT, grid of real full-bleed image cards) ── */}
      <section id="destinations" data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow ar="الوجهات">Explore by country</Eyebrow>
              <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium capitalize`}>
                <Rise text={`${countWord} Golden Visa destinations.`} reduce={reduce} />
              </h2>
            </div>
            <a href="/contact" className="text-[13px] font-semibold underline-offset-4 hover:underline" style={{ color: GOLD_DEEP }}>Need advice?</a>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((x, i) => (
              <Fade key={x.slug} reduce={reduce} delay={(i % 3) * 0.06}>
                <a href={`/residency/${x.slug}`} className="group block aspect-[4/5]">
                  <div className="relative h-full w-full overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]">
                    <Image src={x.img} alt={x.name} fill sizes="(min-width:1024px) 22rem, 50vw" className={DUO} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.1) 55%, rgba(8,18,42,0.4) 100%)" }} />
                    <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{x.region}</span>
                      <h3 className={`${serifClass} mt-1 text-[1.7rem] font-medium leading-tight`}>{x.name}</h3>
                      {x.stat ? <p className="mt-2 text-[12px] text-white/70">{x.stat}</p> : null}
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                        Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (DARK, step rail) ── */}
      <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Eyebrow ar="كيف نعمل" onDark>How it works</Eyebrow>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}>
            <Rise text="Four steps." reduce={reduce} />
            <span className="italic" style={{ color: GOLD }}> <Rise text="One desk." reduce={reduce} delay={0.2} /></span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((st, i) => (
              <Fade key={st.no} reduce={reduce} delay={i * 0.08}>
                <div className="h-full rounded-lg border p-8 transition-colors duration-300 hover:border-[#bfa15c]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))" }}>
                  <span className={`${serifClass} text-[3rem] font-medium leading-none`} style={{ color: GOLD }}>{st.no}</span>
                  <h3 className={`${serifClass} mt-4 text-[1.5rem] font-medium`}>{st.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/70">{st.detail}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF / STAT BAND (LIGHT) ── */}
      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f7f4ef" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Eyebrow ar="السجل">The record</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>
              <Rise text="A quiet track record, plainly stated." reduce={reduce} />
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: `${GOLD}33` }}>
            {[{ v: String(count), u: "Golden Visa jurisdictions" }, ...PROOF].map((x) => (
              <div key={x.u} className="bg-[#fbfaf7] p-8">
                <p className={`${serifClass} text-[clamp(2.2rem,4vw,3rem)] font-medium leading-none`} style={{ color: GOLD_DEEP }}>{x.v}</p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: `${INK}99` }}>{x.u}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA (DARK, parallax real image) → /contact ── */}
      <section ref={ctaRef} data-tone="dark" className="relative flex min-h-[80vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : ctaY }}>
          <Image src={countryImage("portugal")} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>
            Find your route <span className="italic" style={{ color: GOLD }}>in one conversation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Compare investment, timeline and benefits across every Golden Visa destination, then map the right path for your family with a XIPHIAS advisor.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#destinations" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              Explore destinations
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
