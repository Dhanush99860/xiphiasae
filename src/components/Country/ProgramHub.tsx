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

function toText(x: unknown): string {
  if (typeof x === "string") return x;
  if (x && typeof x === "object") return Object.values(x as Record<string, unknown>).filter((v) => typeof v === "string").join(" — ");
  return x == null ? "" : String(x);
}

export type ProgramData = {
  vertical: string;
  verticalSlug: string;
  country: string;
  countrySlug: string;
  title: string;
  tagline?: string;
  heroImage: string;
  brochure?: string;
  stats: { label: string; value: string }[];
  benefits: string[];
  prices: { label: string; amount?: string; when?: string; notes?: string }[];
  governmentFees: { label: string; amount?: string }[];
  proofOfFunds: { label: string; amount?: string; notes?: string }[];
  requirements: string[];
  disqualifiers: string[];
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
function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}

function Hero({ d, serifClass, play }: { d: ProgramData; serifClass: string; play: boolean }) {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}>
      <div className="lcp-instant mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}><a href={`/${d.verticalSlug}`} className="hover:text-[#bfa15c]">{d.vertical}</a> <span style={{ color: GOLD }}>/</span> <a href={`/${d.verticalSlug}/${d.countrySlug}`} className="hover:text-[#bfa15c]">{d.country}</a> <span style={{ color: GOLD }}>/</span> Route</p></Fade>
          <Fade play={play} delay={0.1}><p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{d.country} · Investment route</p></Fade>
          <h1 className={`${serifClass} mt-5 max-w-2xl text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.0]`}><Rise text={d.title} play={play} delay={0.2} /></h1>
          {d.tagline ? <Fade play={play} delay={0.6}><p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/75">{d.tagline}</p></Fade> : null}
          <Fade play={play} delay={0.75}><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>{d.brochure ? <a href={d.brochure} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download brochure</a> : null}</div></Fade>
          {d.stats.length ? <Fade play={play} delay={0.9}><div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t pt-7 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>{d.stats.map((s) => <div key={s.label} className="flex flex-col gap-1"><span className={`${serifClass} text-[clamp(1.3rem,2vw,1.8rem)] font-medium leading-none`} style={{ color: GOLD }}>{s.value}</span><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{s.label}</span></div>)}</div></Fade> : null}
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.06 }} animate={play ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg">
          <Image src={d.heroImage} alt={d.title} fill sizes="45vw" priority className="object-cover [filter:grayscale(0.4)_brightness(0.72)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.6) 0%, transparent 50%)" }} />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
          <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
        </motion.div>
      </div>
    </section>
  );
}

function Benefits({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  if (!d.benefits.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="المزايا">What you get</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="The benefits, in full." /></h2>
        <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">{d.benefits.map((bn, i) => <Fade key={i}><div className="flex items-start gap-3 border-t pt-5" style={{ borderColor: `${INK}1a` }}><span className="mt-0.5 text-[14px]" style={{ color: GOLD }}>✦</span><p className="text-[15px] leading-relaxed text-[#0c1f3f]/75">{toText(bn)}</p></div></Fade>)}</div>
      </div>
    </section>
  );
}

function Costs({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  if (!d.prices.length && !d.governmentFees.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="التكاليف">Investment & costs</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="Every figure, in writing." /></h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {d.prices.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Qualifying investment</p>
              <div className="mt-5 overflow-hidden rounded-lg border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                {d.prices.map((p, i) => (
                  <Fade key={p.label + i}><div className="flex items-center justify-between gap-4 border-b px-5 py-4 last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <div><p className="text-[15px] font-medium text-white/90">{p.label}</p>{p.when || p.notes ? <p className="mt-0.5 text-[12px] text-white/45">{[p.when, p.notes].filter(Boolean).join(" · ")}</p> : null}</div>
                    {p.amount ? <span className={`${serifClass} shrink-0 text-[1.25rem] font-medium`} style={{ color: GOLD }}>{p.amount}</span> : null}
                  </div></Fade>
                ))}
              </div>
            </div>
          ) : <div />}
          {d.governmentFees.length ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Government & due-diligence fees</p>
              <div className="mt-5 flex flex-col gap-3">{d.governmentFees.map((g, i) => <Fade key={g.label + i}><div className="flex items-center justify-between gap-3 border-b py-2.5 text-[14px]" style={{ borderColor: "rgba(255,255,255,0.1)" }}><span className="text-white/70">{g.label}</span>{g.amount ? <span className="font-medium text-white/90">{g.amount}</span> : null}</div></Fade>)}</div>
            </div>
          ) : null}
        </div>
        <p className="mt-8 text-[13px] text-white/45">Figures are indicative and exclusive of professional fees. Your advisor confirms an exact, written cost breakdown for your family size.</p>
      </div>
    </section>
  );
}

function Eligibility({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  if (!d.requirements.length && !d.proofOfFunds.length && !d.disqualifiers.length) return null;
  return (
    <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="الأهلية">Eligibility</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}><Rise text="What it takes to qualify." /></h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {d.requirements.length ? <div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Requirements</p><div className="mt-4 flex flex-col gap-3">{d.requirements.map((r, i) => <div key={i} className="flex items-start gap-3"><span className="mt-1 text-[13px]" style={{ color: GOLD }}>✦</span><p className="text-[14px] leading-relaxed text-[#0c1f3f]/75">{toText(r)}</p></div>)}</div></div> : null}
          {d.proofOfFunds.length ? <div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Proof of funds</p><div className="mt-4 flex flex-col gap-3">{d.proofOfFunds.map((p, i) => <div key={i} className="flex items-start justify-between gap-3 border-b pb-2.5 text-[14px]" style={{ borderColor: `${INK}14` }}><span className="text-[#0c1f3f]/70">{p.label ?? "Source of funds"}{p.notes ? ` · ${p.notes}` : ""}</span>{p.amount ? <span className="font-medium" style={{ color: GOLD }}>{p.amount}</span> : null}</div>)}</div></div> : null}
          {d.disqualifiers.length ? <div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Who cannot apply</p><div className="mt-4 flex flex-col gap-3">{d.disqualifiers.map((x, i) => <div key={i} className="flex items-start gap-3"><span className="mt-1 text-[13px] text-[#0c1f3f]/30">—</span><p className="text-[14px] leading-relaxed text-[#0c1f3f]/65">{toText(x)}</p></div>)}</div></div> : null}
        </div>
      </div>
    </section>
  );
}

function Faq({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  const [open, setOpen] = useState(0);
  if (!d.faq.length) return null;
  return (
    <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit"><Eyebrow ar="أسئلة شائعة">Questions</Eyebrow><h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05]`}>This route, <span className="italic" style={{ color: GOLD }}>answered.</span></h2></div>
        <div>{d.faq.map((f, i) => { const on = open === i; return (
          <div key={i} className="border-b" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
            <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} aria-controls={`program-faq-panel-${i}`} className="flex w-full items-center justify-between gap-6 py-5 text-left"><span className={`${serifClass} text-[1.2rem] font-medium leading-snug transition-colors ${on ? "text-[#bfa15c]" : ""}`}>{toText(f.q)}</span><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[15px] transition-all duration-300" style={{ borderColor: on ? GOLD : "rgba(255,255,255,0.25)", color: on ? GOLD : "#eef3fb", transform: on ? "rotate(45deg)" : "none" }}>+</span></button>
            <AnimatePresence initial={false}>{on ? <motion.div id={`program-faq-panel-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"><p className="pb-6 pr-10 text-[15px] leading-relaxed text-white/70">{toText(f.a)}</p></motion.div> : null}</AnimatePresence>
          </div>
        ); })}</div>
      </div>
    </section>
  );
}

function CTA({ d, serifClass }: { d: ProgramData; serifClass: string }) {
  return (
    <section data-tone="dark" className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Image src={d.heroImage} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.35)_contrast(1.05)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.6) 50%, rgba(8,18,42,0.88) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className={`${serifClass} text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.0]`}>Start the <span className="italic" style={{ color: GOLD }}>{d.country}</span> route.</h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">A senior advisor will confirm the exact costs, timeline and documents for your case — privately, and entirely off the record.</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={`/${d.verticalSlug}/${d.countrySlug}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">All {d.country} routes</a></div>
      </div>
    </section>
  );
}

export default function ProgramHub({ data, serifClass }: { data: ProgramData; serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);
  return (
    <div className="relative">
      <Header serifClass={serifClass} />
      <Hero d={data} serifClass={serifClass} play={play} />
      <Benefits d={data} serifClass={serifClass} />
      <Costs d={data} serifClass={serifClass} />
      <Eligibility d={data} serifClass={serifClass} />
      <Faq d={data} serifClass={serifClass} />
      <CTA d={data} serifClass={serifClass} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
