"use client";

// ProgramsGrid — VARIANT ① "Category Grid": a marketing-hub /programs preview.
// A dark navy/gold hero introduces XIPHIAS's six programme categories, then a
// responsive grid of glass cards — each a REAL full-bleed image (object-cover),
// the category name in Cormorant serif, a one-line description and a gold
// "Explore →" linking to its real route. Closes on a CTA → /contact.
//
// Data: the SIX real programme categories with their real routes and a
// representative country image via countryImage() from
// src/components/Countries/country-image.ts. Self-contained sample component.

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

// The SIX real programme categories — real route + representative country image.
const CATEGORIES = [
  {
    name: "Citizenship by Investment",
    route: "/citizenship",
    img: countryImage("grenada"),
    blurb: "A second passport and lifelong mobility through trusted Caribbean and European routes.",
  },
  {
    name: "Residency & Golden Visas",
    route: "/residency",
    img: countryImage("portugal"),
    blurb: "Live, study and invest across Europe with flexible residence-by-investment programmes.",
  },
  {
    name: "Golden Visa",
    route: "/golden-visa",
    img: countryImage("uae"),
    blurb: "Long-stay residence in the world's headline hubs — from the UAE to the Mediterranean.",
  },
  {
    name: "Skilled Migration",
    route: "/skilled",
    img: countryImage("canada"),
    blurb: "Points-based pathways to permanent residence for professionals and their families.",
  },
  {
    name: "Corporate Mobility",
    route: "/corporate",
    img: countryImage("singapore"),
    blurb: "Relocate teams, founders and capital with investor and business-migration routes.",
  },
  {
    name: "Work Permits",
    route: "/work-permits",
    img: countryImage("uae", "Africa & Middle East"),
    blurb: "Compliant employment authorisation to live and work in your destination of choice.",
  },
];

const HERO_STATS = [
  { v: "6", u: "Programme categories" },
  { v: "30+", u: "Destinations covered" },
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

export default function ProgramsGrid({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion() ?? false;
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (DARK, radial navy + real full-bleed image) ── */}
      <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: `radial-gradient(120% 120% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <div className="absolute inset-0">
          <Image src={countryImage("portugal")} alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.55)_contrast(1.05)]" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.94) 0%, rgba(8,18,42,0.62) 55%, rgba(8,18,42,0.34) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.82) 0%, transparent 45%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <Fade reduce={reduce}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}>
              <a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Programmes
            </p>
          </Fade>
          <Fade reduce={reduce} delay={0.1}>
            <div className="mt-8"><Eyebrow ar="برامجنا" onDark>Our Programmes</Eyebrow></div>
          </Fade>
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}>
            <Rise text="Every route to" reduce={reduce} delay={0.2} className="block" />
            <span className="block italic" style={{ color: GOLD }}><Rise text="your second home." reduce={reduce} delay={0.45} /></span>
          </h1>
          <Fade reduce={reduce} delay={0.9}>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
              Six programme families — citizenship, residency, golden visas, skilled migration, corporate mobility and work permits — each curated, compared and managed end-to-end by a dedicated XIPHIAS desk.
            </p>
          </Fade>
          <Fade reduce={reduce} delay={1.05}>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
                Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#categories" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
                Browse programmes
              </a>
            </div>
          </Fade>
          <Fade reduce={reduce} delay={1.3}>
            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {HERO_STATS.map((x) => (
                <div key={x.u} className="flex flex-col">
                  <span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{x.v}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{x.u}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CATEGORY GRID (LIGHT, glass cards w/ real full-bleed images) ── */}
      <section id="categories" data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow ar="الفئات">Choose your programme</Eyebrow>
              <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}>
                <Rise text="Six ways to move forward." reduce={reduce} />
              </h2>
            </div>
            <a href="/contact" className="text-[13px] font-semibold underline-offset-4 hover:underline" style={{ color: GOLD_DEEP }}>Not sure which fits?</a>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Fade key={c.route} reduce={reduce} delay={(i % 3) * 0.06}>
                <a href={c.route} className="group block aspect-[4/5]">
                  <div className="relative h-full w-full overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]">
                    <Image src={c.img} alt={c.name} fill sizes="(min-width:1024px) 22rem, (min-width:640px) 50vw, 100vw" className={DUO} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.94) 0%, rgba(8,18,42,0.1) 55%, rgba(8,18,42,0.42) 100%)" }} />
                    <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]">
                      <h3 className={`${serifClass} text-[1.7rem] font-medium leading-tight`}>{c.name}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/75">{c.blurb}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
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

      {/* ── CLOSING CTA (DARK, parallax real image) → /contact ── */}
      <section ref={ctaRef} data-tone="dark" className="relative flex min-h-[80vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : ctaY }}>
          <Image src={countryImage("grenada")} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>
            Find your route <span className="italic" style={{ color: GOLD }}>in one conversation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Tell us where you want to live, work or invest and a XIPHIAS advisor will map the right programme — and the timeline to get there — for your family.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>
              Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="#categories" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">
              Browse programmes
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
