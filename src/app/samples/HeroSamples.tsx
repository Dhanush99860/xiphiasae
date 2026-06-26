"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const SKYLINE = "/videos/14361063_1440_2560_30fps.mp4"; // vertical Dubai dusk
const AIRPORT = "/videos/12444971_3840_2160_24fps.mp4"; // landscape terminal

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

/** Word-by-word rise that plays on mount (hero is above the fold). */
function Rise({ text, className, delay = 0, stagger = 0.07 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Eyebrow({ delay = 0 }: { delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: GOLD }}
    >
      <motion.span
        className="h-px"
        style={{ background: GOLD, transformOrigin: "left" }}
        initial={{ scaleX: 0, width: 32 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
      />
      Private Global Mobility
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        الإقامة والجنسية
      </span>
    </motion.p>
  );
}

function CTAs({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
    >
      <a href="#" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b0e13] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
        Book a private consultation
      </a>
      <a href="#" className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/75 hover:text-white">
        Explore programmes →
      </a>
    </motion.div>
  );
}

function ScrollCue({ delay = 1.4 }: { delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay }} className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2 text-white/55">
      <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
      <span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD}, transparent)` }} />
    </motion.div>
  );
}

/* ── 1 · DARK · full-bleed, slow zoom, words rise ─────────────────────── */
function FullRise({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0b0e13] text-[#f3efe6]">
      <Badge>1 · Full-screen · Dark · word-rise</Badge>
      <motion.div className="absolute inset-0" initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 16, ease: "easeOut" }}>
        <video src={AIRPORT} autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ filter: "saturate(0.82) contrast(1.06) brightness(0.78)" }} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.85) 0%, rgba(8,10,14,0.25) 45%, rgba(8,10,14,0.6) 100%)" }} />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <Eyebrow delay={0.2} />
        <h1 className={`${serifClass} mt-7 text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.96] tracking-[-0.01em]`}>
          <Rise text="Your second passport," delay={0.45} className="block" />
          <span className="block italic" style={{ color: GOLD }}>
            <Rise text="privately arranged." delay={0.85} />
          </span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }} className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-white/70">
          Golden visas and citizenship by investment — arranged end-to-end for those who value discretion, certainty, and time.
        </motion.p>
        <div className="mt-9">
          <CTAs delay={1.55} />
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}

/* ── 2 · DARK · cinematic letterbox-open reveal, headline mask-up ──────── */
function FullReveal({ serifClass }: { serifClass: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0b0e13] text-[#f3efe6]">
      <Badge>2 · Full-screen · Dark · cinematic reveal</Badge>
      <div className="absolute inset-0" style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(50% 0 50% 0)", transition: "clip-path 1.5s cubic-bezier(.16,1,.3,1)" }}>
        <motion.video src={SKYLINE} autoPlay muted loop playsInline className="h-full w-full object-cover" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 18, ease: "easeOut" }} style={{ filter: "saturate(0.9) contrast(1.05) brightness(0.8)" }} />
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,10,14,0.85) 0%, rgba(8,10,14,0.25) 55%, transparent 100%), linear-gradient(0deg, rgba(8,10,14,0.7) 0%, transparent 50%)" }} />
      <div className="relative z-10 flex h-full max-w-6xl flex-col justify-end px-8 pb-24 sm:px-12 lg:px-16">
        <Eyebrow delay={1.1} />
        <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.94]`}>
          <Rise text="The world," delay={1.3} className="block" />
          <span className="block italic" style={{ color: GOLD }}>
            <Rise text="by private arrangement." delay={1.6} />
          </span>
        </h1>
        <div className="mt-9">
          <CTAs delay={2.1} />
        </div>
      </div>
    </section>
  );
}

/* ── 3 · WARM · full-bleed, headline slides from left, gold grade ─────── */
function FullWarm({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#161109] text-[#f3efe6]">
      <Badge>3 · Full-screen · Warm gold grade</Badge>
      <motion.div className="absolute inset-0" initial={{ scale: 1.12, x: 0 }} animate={{ scale: 1.04, x: -24 }} transition={{ duration: 22, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}>
        <video src={AIRPORT} autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ filter: "sepia(0.25) saturate(1.05) contrast(1.04) brightness(0.85)" }} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(22,17,9,0.8) 0%, rgba(22,17,9,0.2) 50%, rgba(191,161,92,0.14) 100%), linear-gradient(0deg, rgba(22,17,9,0.7) 0%, transparent 55%)" }} />
      <div className="relative z-10 flex h-full max-w-6xl flex-col justify-center px-8 sm:px-12 lg:px-16">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <Eyebrow delay={0.2} />
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(3rem,7.5vw,6.5rem)] font-medium leading-[0.95]`}>
            Residency, citizenship,
            <br />
            <span className="italic" style={{ color: GOLD }}>
              and the freedom it buys.
            </span>
          </h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-9">
          <CTAs delay={0.9} />
        </motion.div>
      </div>
      <ScrollCue />
    </section>
  );
}

export default function HeroSamples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <FullRise serifClass={serifClass} />
      <FullReveal serifClass={serifClass} />
      <FullWarm serifClass={serifClass} />
    </main>
  );
}
