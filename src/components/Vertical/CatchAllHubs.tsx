"use client";

// Navy/gold "Hub" reskin for the generic /[vertical] catch-all route family.
// Mirrors the locked idiom of VerticalHub / CountryHub / ProgramHub, but is fed
// by the generic ProgramDoc data the catch-all serves (skilled / corporate, and
// any country/programme without a bespoke route). UI-only — all real data,
// routes, metadata and JSON-LD stay in the server pages.

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

const VERTICAL_AR: Record<string, string> = {
  residency: "الإقامة",
  citizenship: "الجنسية",
  skilled: "الهجرة المهارية",
  corporate: "الأعمال",
};

function eligibilityHref(verticalSlug: string): string {
  return ["citizenship", "residency", "corporate", "skilled"].includes(verticalSlug)
    ? `/${verticalSlug}/eligibility-check`
    : "/eligibility";
}

function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className, play }: { children: React.ReactNode; delay?: number; className?: string; play?: boolean }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined} viewport={play === undefined ? { once: true, amount: 0.3 } : undefined} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}
function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}

const DUO = "object-cover [filter:grayscale(0.5)_brightness(0.66)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.82)] group-hover:scale-105";

const PROCESS: { no: string; title: string; detail: string }[] = [
  { no: "01", title: "Private consultation", detail: "A senior advisor reviews your profile, goals and timeline — privately, and entirely off the record." },
  { no: "02", title: "Route & eligibility", detail: "We map the programmes you qualify for, with exact thresholds, documents and outcomes in writing." },
  { no: "03", title: "Dossier & filing", detail: "Our team assembles, certifies and submits your application, liaising directly with the authority." },
  { no: "04", title: "Approval & beyond", detail: "We track every milestone to approval — and stay on as your single desk for everything that follows." },
];

/* ───────────────────────── VERTICAL LANDING ───────────────────────── */

export type VerticalLandingData = {
  verticalSlug: string;
  vertical: string; // capitalised label
  heroImage: string;
  ctaImage: string;
  totalPrograms: number;
  countries: { name: string; slug: string; count: number; img: string }[];
};

export function VerticalLanding({ d, serifClass }: { d: VerticalLandingData; serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);
  const ar = VERTICAL_AR[d.verticalSlug] ?? "";

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* HERO — full-bleed image */}
      <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
          <Image src={d.heroImage} alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.6)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
        <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}><a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> {d.vertical}</p></Fade>
          <Fade play={play} delay={0.1}><div className="mt-8"><Eyebrow ar={ar}>Programmes by country</Eyebrow></div></Fade>
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98] capitalize`}><Rise text={d.vertical} play={play} delay={0.2} className="block" /><span className="block italic" style={{ color: GOLD }}><Rise text="by country" play={play} delay={0.5} /></span></h1>
          <Fade play={play} delay={0.9}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">Select a country to explore the {d.verticalSlug} routes we guide clients through — each with its own thresholds, timelines and outcomes.</p></Fade>
          <Fade play={play} delay={1.05}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={eligibilityHref(d.verticalSlug)} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div></Fade>
          {d.countries.length ? <Fade play={play} delay={1.3}><div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}><div className="flex flex-col"><span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{d.countries.length}</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Countries</span></div><div className="flex flex-col"><span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{d.totalPrograms}</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Programmes</span></div></div></Fade> : null}
        </div>
      </section>

      {/* DESTINATIONS — image cards */}
      <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Eyebrow ar="الوجهات">Destinations</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="Where this route can take you." /></h2>
          {d.countries.length === 0 ? (
            <p className="mt-12 text-[#0c1f3f]/55">No programmes available yet.</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {d.countries.map((x) => (
                <Fade key={x.slug}>
                  <a href={`/${d.verticalSlug}/${x.slug}`} className="group block aspect-[4/5] [perspective:1100px]">
                    <div className="relative h-full w-full overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]">
                      <Image src={x.img} alt={x.name} fill sizes="(min-width:1024px) 22rem, 50vw" className={DUO} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.1) 55%, rgba(8,18,42,0.4) 100%)" }} />
                      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{x.count} {x.count === 1 ? "programme" : "programmes"}</span>
                        <h3 className={`${serifClass} mt-1 text-[1.7rem] font-medium capitalize leading-tight`}>{x.name}</h3>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                      </div>
                    </div>
                  </a>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Eyebrow ar="كيف نعمل">How we do it</Eyebrow>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text="Four steps." /> <span className="italic" style={{ color: GOLD }}><Rise text="One desk." delay={0.2} /></span></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((st, i) => (
              <Fade key={st.no} delay={i * 0.08}>
                <div className="h-full rounded-lg border p-8" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))" }}>
                  <span className={`${serifClass} text-[3rem] font-medium leading-none`} style={{ color: GOLD }}>{st.no}</span>
                  <h3 className={`${serifClass} mt-4 text-[1.5rem] font-medium`}>{st.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/70">{st.detail}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF BAND */}
      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[{ v: "20+", u: "Years of practice" }, { v: "60+", u: "Programmes" }, { v: "30+", u: "Jurisdictions" }, { v: "98%", u: "Approval rate" }].map((s) => (
            <Fade key={s.u}><div className="flex flex-col gap-1 border-t pt-6" style={{ borderColor: `${INK}1a` }}><span className={`${serifClass} text-[clamp(2rem,3.4vw,3rem)] font-medium leading-none`} style={{ color: GOLD }}>{s.v}</span><span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0c1f3f]/50">{s.u}</span></div></Fade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section data-tone="dark" className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Image src={d.ctaImage} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0] capitalize`}>Begin your <span className="italic" style={{ color: GOLD }}>{d.vertical}</span> journey.</h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">A senior advisor will map your route, costs and timeline — privately, and entirely off the record.</p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={eligibilityHref(d.verticalSlug)} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}

/* ───────────────────────── COUNTRY LISTING ───────────────────────── */

export type CountryListingData = {
  verticalSlug: string;
  vertical: string;
  country: string; // slug
  countryLabel: string;
  heroImage: string;
  programmes: { title: string; summary?: string; href: string }[];
};

export function CountryListing({ d, serifClass }: { d: CountryListingData; serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);
  const ar = VERTICAL_AR[d.verticalSlug] ?? "";

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* HERO — full-bleed image */}
      <section data-tone="dark" className="relative flex min-h-[80vh] items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
          <Image src={d.heroImage} alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.6)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
        <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}><a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> <a href={`/${d.verticalSlug}`} className="capitalize hover:text-[#bfa15c]">{d.vertical}</a> <span style={{ color: GOLD }}>/</span> <span className="capitalize">{d.countryLabel}</span></p></Fade>
          <Fade play={play} delay={0.1}><div className="mt-8"><Eyebrow ar={ar}>{d.vertical} programmes</Eyebrow></div></Fade>
          <h1 className={`${serifClass} mt-6 text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.92] capitalize`}><Rise text={d.countryLabel} play={play} delay={0.2} /></h1>
          <Fade play={play} delay={0.6}><p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">The {d.verticalSlug} routes available in {d.countryLabel}. Choose a programme to review eligibility, investment thresholds and the full process.</p></Fade>
          <Fade play={play} delay={0.75}><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={eligibilityHref(d.verticalSlug)} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div></Fade>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Eyebrow ar="الطرق">Investment routes</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium capitalize`}><Rise text={`Ways into ${d.countryLabel}.`} /></h2>
          {d.programmes.length === 0 ? (
            <p className="mt-12 text-[#0c1f3f]/55">No programmes available yet.</p>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {d.programmes.map((p, i) => (
                <Fade key={p.href} delay={i * 0.08}>
                  <a href={p.href} className="group block h-full rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c] hover:shadow-[0_30px_70px_-35px_rgba(8,18,42,0.35)]" style={{ borderColor: `${INK}1f`, background: "rgba(255,255,255,0.6)" }}>
                    <h3 className={`${serifClass} text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{p.title}</h3>
                    {p.summary ? <p className="mt-4 text-[15px] leading-relaxed text-[#0c1f3f]/70 line-clamp-3">{p.summary}</p> : null}
                    <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>View programme <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                  </a>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section data-tone="dark" className="relative flex min-h-[60vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Image src={d.heroImage} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.35)_contrast(1.05)]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.88) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.0] capitalize`}>Begin your <span className="italic" style={{ color: GOLD }}>{d.countryLabel}</span> application.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">A senior advisor will map your route, costs and timeline — privately, and entirely off the record.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={eligibilityHref(d.verticalSlug)} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}

/* ───────────────────────── PROGRAMME DETAIL CHROME ─────────────────────────
   Wraps the server-rendered MDX <article> + related rail in the navy/gold
   ProgramHub idiom: a full-bleed image hero, then the prose on a light band. */

export type ProgramShellData = {
  verticalSlug: string;
  vertical: string;
  country: string; // slug
  countryLabel: string;
  title: string;
  summary?: string;
  brochure?: string;
  heroImage: string;
};

export function ProgramShell({ d, serifClass, children, related }: { d: ProgramShellData; serifClass: string; children: React.ReactNode; related: React.ReactNode }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);
  const ar = VERTICAL_AR[d.verticalSlug] ?? "";

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* HERO — full-bleed image */}
      <section data-tone="dark" className="relative flex min-h-[72vh] items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={play ? { scale: 1 } : { scale: 1.1 }} transition={{ duration: 8, ease: "easeOut" }}>
          <Image src={d.heroImage} alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.55)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.35) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.85) 0%, transparent 50%)" }} />
        <div className="lcp-instant relative z-10 mx-auto w-full max-w-5xl px-6 pt-28 sm:px-12 lg:px-20">
          <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}><a href={`/${d.verticalSlug}`} className="capitalize hover:text-[#bfa15c]">{d.vertical}</a> <span style={{ color: GOLD }}>/</span> <a href={`/${d.verticalSlug}/${d.country}`} className="capitalize hover:text-[#bfa15c]">{d.countryLabel}</a> <span style={{ color: GOLD }}>/</span> Route</p></Fade>
          <Fade play={play} delay={0.1}><div className="mt-7"><Eyebrow ar={ar}>{d.countryLabel} · {d.vertical}</Eyebrow></div></Fade>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.0]`}><Rise text={d.title} play={play} delay={0.2} /></h1>
          {d.summary ? <Fade play={play} delay={0.6}><p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">{d.summary}</p></Fade> : null}
          <Fade play={play} delay={0.75}><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>{d.brochure ? <a href={d.brochure} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download brochure</a> : null}</div></Fade>
        </div>
      </section>

      {/* BODY — light band */}
      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[2fr_1fr]">
          <article className="prose max-w-none">{children}</article>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border p-6" style={{ borderColor: `${INK}1f`, background: "rgba(255,255,255,0.6)" }}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Related</h3>
              {related}
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section data-tone="dark" className="relative flex min-h-[60vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Image src={d.heroImage} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.35)_contrast(1.05)]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.88) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.0]`}>Start the <span className="italic" style={{ color: GOLD }}>{d.title}</span> route.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">A senior advisor will confirm the exact costs, timeline and documents for your case — privately, and entirely off the record.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={`/${d.verticalSlug}/${d.country}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c] capitalize">All {d.countryLabel} routes</a></div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
