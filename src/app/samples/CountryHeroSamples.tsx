"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className, play }: { children: React.ReactNode; delay?: number; className?: string; play: boolean }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

const G = {
  country: "Grenada",
  arabic: "غرينادا",
  region: "Caribbean",
  summary: "Citizenship via NTF donation or government-approved real estate — fast-track, family-friendly, with visa-free access to 145 destinations and a route to the U.S. E-2 visa.",
  img: "/images/citizenship/grenada/grenada-citizenship.webp",
  stats: [
    { v: "4–6", u: "months", l: "Timeline" },
    { v: "145", u: "destinations", l: "Visa-free" },
    { v: "#76", u: "global", l: "Passport rank" },
    { v: "$158k", u: "minimum", l: "Invest from" },
  ],
};

function StatCell({ v, u, l, serifClass }: { v: string; u: string; l: string; serifClass: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={`${serifClass} text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-none`} style={{ color: GOLD }}>{v} <span className="text-[0.55em] uppercase tracking-[0.1em] text-white/45">{u}</span></span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{l}</span>
    </div>
  );
}

/* ───────── VARIANT A · split (content left, framed image right) ───────── */
function VariantA({ serifClass }: { serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 150); return () => clearTimeout(t); }, []);
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}>
      <Badge>Country hero · A (split + framed image)</Badge>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>Home <span style={{ color: GOLD }}>/</span> Citizenship <span style={{ color: GOLD }}>/</span> {G.country}</p></Fade>
          <Fade play={play} delay={0.1}><p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{G.region} · Citizenship by Investment<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{G.arabic}</span></p></Fade>
          <h1 className={`${serifClass} mt-5 text-[clamp(3.2rem,8vw,6rem)] font-medium leading-[0.92]`}><Rise text={G.country} play={play} delay={0.2} /><span className="block italic text-[0.42em]" style={{ color: GOLD }}><Rise text="a Caribbean passport, privately arranged." play={play} delay={0.45} /></span></h1>
          <Fade play={play} delay={0.85}><p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/75">{G.summary}</p></Fade>
          <Fade play={play} delay={1.0}><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="#" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download brochure</a></div></Fade>
          <Fade play={play} delay={1.15}><div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t pt-7 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>{G.stats.map((s) => <StatCell key={s.l} {...s} serifClass={serifClass} />)}</div></Fade>
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.06 }} animate={play ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg">
          <Image src={G.img} alt={G.country} fill sizes="45vw" className="object-cover [filter:grayscale(0.4)_brightness(0.72)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.6) 0%, transparent 50%)" }} />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
          <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
          <div className="absolute bottom-5 left-5 rounded-full bg-black/55 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] backdrop-blur" style={{ color: GOLD }}>2 investment routes</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── VARIANT B · full-bleed image + bottom stat strip ───────── */
function VariantB({ serifClass }: { serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 150); return () => clearTimeout(t); }, []);
  return (
    <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Badge>Country hero · B (full-bleed + stat strip)</Badge>
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : {}} transition={{ duration: 8, ease: "easeOut" }}>
        <Image src={G.img} alt={G.country} fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.55)_contrast(1.05)]" priority />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.45) 55%, rgba(8,18,42,0.25) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.95) 0%, transparent 40%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}>Home <span style={{ color: GOLD }}>/</span> Citizenship <span style={{ color: GOLD }}>/</span> {G.country}</p></Fade>
        <Fade play={play} delay={0.1}><p className="mt-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{G.region} · Citizenship by Investment<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{G.arabic}</span></p></Fade>
        <h1 className={`${serifClass} mt-4 text-[clamp(3.5rem,11vw,8rem)] font-medium leading-[0.9]`}><Rise text={G.country} play={play} delay={0.2} /></h1>
        <Fade play={play} delay={0.7}><p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">{G.summary}</p></Fade>
        <Fade play={play} delay={0.85}><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="#" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download brochure</a></div></Fade>
        <Fade play={play} delay={1.0}><div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.14)" }}>{G.stats.map((s) => <StatCell key={s.l} {...s} serifClass={serifClass} />)}<span className="rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: `${GOLD}66`, color: GOLD }}>2 investment routes</span></div></Fade>
      </div>
    </section>
  );
}

export default function CountryHeroSamples({ serifClass }: { serifClass: string }) {
  return (
    <main className="bg-[#0a1733]">
      <VariantA serifClass={serifClass} />
      <VariantB serifClass={serifClass} />
    </main>
  );
}
