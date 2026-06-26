"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

// Content arrays are mostly strings but some MDX uses objects (e.g. { "For GTS": "…" }).
// Coerce to a safe display string so we never render an object as a React child.
function toText(x: unknown): string {
  if (typeof x === "string") return x;
  if (x && typeof x === "object") return Object.values(x as Record<string, unknown>).filter((v) => typeof v === "string").join(" — ");
  return x == null ? "" : String(x);
}

export type CountryData = {
  vertical: string; // "Citizenship by Investment"
  verticalSlug: string; // "citizenship"
  country: string;
  slug: string;
  region?: string;
  summary: string;
  heroImage: string;
  brochure?: string;
  stats: { label: string; value: string }[];
  overview: string;
  keyPoints: string[];
  facts: { label: string; value: string }[];
  programmes: { title: string; tagline?: string; from?: string; timeline?: string; href: string }[];
  process: string[];
  requirements: string[];
  faq: { q: string; a: string }[];
};

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
function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className={`font-arabic-display text-sm tracking-normal ${light ? "" : ""}`}>{ar}</span></p>;
}

/* ── HERO (split A) ── */
function Hero({ d, serifClass, play }: { d: CountryData; serifClass: string; play: boolean }) {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}>
      <div className="lcp-instant mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}><a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> <a href={`/${d.verticalSlug}`} className="hover:text-[#bfa15c]">{d.vertical}</a> <span style={{ color: GOLD }}>/</span> {d.country}</p></Fade>
          <Fade play={play} delay={0.1}><p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{d.region ? `${d.region} · ` : ""}{d.vertical}</p></Fade>
          <h1 className={`${serifClass} mt-5 text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.92]`}><Rise text={d.country} play={play} delay={0.2} /></h1>
          <Fade play={play} delay={0.6}><p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/75">{d.summary}</p></Fade>
          <Fade play={play} delay={0.75}><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>{d.brochure ? <a href={d.brochure} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download brochure</a> : null}</div></Fade>
          {d.stats.length ? <Fade play={play} delay={0.9}><div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t pt-7 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>{d.stats.map((s) => <div key={s.label} className="flex flex-col gap-1"><span className={`${serifClass} text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none`} style={{ color: GOLD }}>{s.value}</span><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{s.label}</span></div>)}</div></Fade> : null}
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.06 }} animate={play ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg">
          <Image src={d.heroImage} alt={d.country} fill sizes="45vw" priority className="object-cover [filter:grayscale(0.4)_brightness(0.72)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.6) 0%, transparent 50%)" }} />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
          <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About({ d, serifClass }: { d: CountryData; serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow ar="نبذة">About {d.country}</Eyebrow>
          <h2 className={`${serifClass} mt-5 max-w-xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.06]`}><Rise text="The programme, in plain terms." /></h2>
          {d.overview ? <Fade delay={0.1}><p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">{d.overview}</p></Fade> : null}
          {d.keyPoints.length ? <div className="mt-9 flex flex-col">{d.keyPoints.map((k, i) => <div key={i} className="flex items-start gap-3 border-t py-4" style={{ borderColor: `${INK}14` }}><span className="mt-1 text-[14px]" style={{ color: GOLD }}>✦</span><p className="max-w-md text-[15px] leading-relaxed text-[#0c1f3f]/75">{toText(k)}</p></div>)}</div> : null}
        </div>
        {d.facts.length ? (
          <Fade delay={0.15}>
            <div className="rounded-lg border p-7 lg:p-8" style={{ borderColor: `${INK}16`, background: "rgba(255,255,255,0.55)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">{d.country} at a glance</p>
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-md" style={{ background: `${INK}12` }}>
                {d.facts.map((f) => (<div key={f.label} className="group bg-[#f3f7fd] p-5 transition-colors duration-300 hover:bg-white"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/45">{f.label}</p><p className={`${serifClass} mt-1.5 text-[1.15rem] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{f.value}</p></div>))}
              </div>
              {d.brochure ? <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: `${INK}14` }}><span className="text-[12px] uppercase tracking-[0.14em] text-[#0c1f3f]/50">Official brochure</span><a href={d.brochure} className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Download PDF <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span></a></div> : null}
            </div>
          </Fade>
        ) : null}
      </div>
    </section>
  );
}

/* ── PROGRAMMES ── */
function Programmes({ d, serifClass }: { d: CountryData; serifClass: string }) {
  if (!d.programmes.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="طرق الاستثمار">Investment routes</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text={`Ways to invest in ${d.country}.`} /></h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {d.programmes.map((p, i) => (
            <Fade key={p.title} delay={i * 0.08}>
              <a href={p.href} className="group block h-full rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c] hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))" }}>
                <div className="flex items-start justify-between gap-4"><h3 className={`${serifClass} text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{p.title}</h3>{p.from ? <span className={`${serifClass} shrink-0 text-[1.1rem] italic`} style={{ color: GOLD }}>{p.from}</span> : null}</div>
                {p.tagline ? <p className="mt-4 text-[15px] leading-relaxed text-white/70">{p.tagline}</p> : null}
                <div className="mt-6 flex items-center justify-between">{p.timeline ? <span className="text-[12px] uppercase tracking-[0.14em] text-white/50">{p.timeline}</span> : <span />}<span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>View route <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span></div>
              </a>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROCESS ── */
function Process({ d, serifClass }: { d: CountryData; serifClass: string }) {
  if (!d.process.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-5xl">
        <Eyebrow ar="كيف نعمل">The process</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="From first call to approval." /></h2>
        <div className="mt-12 flex flex-col">
          {d.process.map((step, i) => (
            <Fade key={i} delay={i * 0.06}>
              <div className="flex items-start gap-6 border-t py-7" style={{ borderColor: `${INK}16` }}>
                <span className={`${serifClass} shrink-0 text-[2.4rem] font-medium leading-none`} style={{ color: `${GOLD}` }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="max-w-2xl text-[16px] leading-relaxed text-[#0c1f3f]/75">{toText(step)}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── REQUIREMENTS ── */
function Requirements({ d, serifClass }: { d: CountryData; serifClass: string }) {
  if (!d.requirements.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div><Eyebrow ar="المتطلبات">Eligibility</Eyebrow><h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]`}>What it takes to qualify.</h2></div>
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">{d.requirements.map((r, i) => <Fade key={i}><div className="flex items-start gap-3"><span className="mt-1 text-[14px]" style={{ color: GOLD }}>✦</span><p className="text-[15px] leading-relaxed text-white/75">{toText(r)}</p></div></Fade>)}</div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function Faq({ d, serifClass }: { d: CountryData; serifClass: string }) {
  const [open, setOpen] = useState(0);
  if (!d.faq.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit"><Eyebrow ar="أسئلة شائعة">Questions</Eyebrow><h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]`}>{d.country}, <span className="italic" style={{ color: GOLD }}>answered.</span></h2></div>
        <div>{d.faq.map((f, i) => { const on = open === i; return (
          <div key={i} className="border-b" style={{ borderColor: `${INK}16` }}>
            <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} aria-controls={`country-faq-panel-${i}`} className="flex w-full items-center justify-between gap-6 py-5 text-left"><span className={`${serifClass} text-[1.25rem] font-medium leading-snug transition-colors ${on ? "text-[#bfa15c]" : ""}`}>{toText(f.q)}</span><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[15px] transition-all duration-300" style={{ borderColor: on ? GOLD : `${INK}33`, color: on ? GOLD : INK, transform: on ? "rotate(45deg)" : "none" }}>+</span></button>
            <AnimatePresence initial={false}>{on ? <motion.div id={`country-faq-panel-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"><p className="pb-6 pr-10 text-[15px] leading-relaxed text-[#0c1f3f]/70">{toText(f.a)}</p></motion.div> : null}</AnimatePresence>
          </div>
        ); })}</div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function eligibilityHref(verticalSlug: string): string {
  return ["citizenship", "residency", "corporate", "skilled"].includes(verticalSlug)
    ? `/${verticalSlug}/eligibility-check`
    : "/eligibility";
}
function CTA({ d, serifClass }: { d: CountryData; serifClass: string }) {
  return (
    <section data-tone="dark" className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Image src={d.heroImage} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.35)_contrast(1.05)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.88) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Eyebrow ar="ابدأ الآن"><span /></Eyebrow>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.0]`}>Begin your <span className="italic" style={{ color: GOLD }}>{d.country}</span> application.</h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">A senior advisor will map your route, costs and timeline — privately, and entirely off the record.</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={eligibilityHref(d.verticalSlug)} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div>
      </div>
    </section>
  );
}

export default function CountryHub({ data, serifClass }: { data: CountryData; serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);
  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero d={data} serifClass={serifClass} play={play} />
      <About d={data} serifClass={serifClass} />
      <Programmes d={data} serifClass={serifClass} />
      <Process d={data} serifClass={serifClass} />
      <Requirements d={data} serifClass={serifClass} />
      <Faq d={data} serifClass={serifClass} />
      <CTA d={data} serifClass={serifClass} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
