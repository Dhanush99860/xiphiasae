"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const IMG_CARIB = "/images/citizenship/grenada/grenada-citizenship.webp";

/* word-rise driven by `play` */
function Rise({ text, className, play, delay = 0, stagger = 0.05 }: { text: string; className?: string; play: boolean; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, play, delay = 0, className }: { children: React.ReactNode; play: boolean; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

const CHIPS = ["Private client service", "Due-diligence desk", "Discreet & confidential"];
function CitizenshipHero({ serifClass, play }: { serifClass: string; play: boolean }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
        <Image src={IMG_CARIB} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.6)_contrast(1.05)]" priority />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
        <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}>Home <span style={{ color: GOLD }}>/</span> Citizenship by Investment</p></Fade>
        <Fade play={play} delay={0.1}><p className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Citizenship by Investment<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الجنسية بالاستثمار</span></p></Fade>
        <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}><Rise text="Second citizenship," play={play} delay={0.2} className="block" /><span className="block italic" style={{ color: GOLD }}><Rise text="first-class advisory." play={play} delay={0.5} /></span></h1>
        <Fade play={play} delay={0.9}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">Donation and real-estate routes across the Caribbean, Malta and Türkiye — arranged end-to-end, with transparent costs and rigorous compliance.</p></Fade>
        <Fade play={play} delay={1.05}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="#" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download the guide</a></div></Fade>
        <motion.div className="mt-10 flex flex-wrap gap-2.5" initial="hidden" animate={play ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}>{CHIPS.map((c) => <motion.span key={c} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="rounded-full border px-3 py-1.5 text-[12px] text-white/70" style={{ borderColor: "rgba(191,161,92,0.4)" }}>{c}</motion.span>)}</motion.div>
      </div>
    </section>
  );
}

const NAV = ["Home", "Citizenship by Investment", "Golden Visa", "About"];
export default function TransitionDemo({ serifClass }: { serifClass: string }) {
  const [page, setPage] = useState<"home" | "cit">("home");
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const [play, setPlay] = useState(false);
  const pending = useRef<"home" | "cit">("home");

  const go = (label: string) => {
    const target = label === "Citizenship by Investment" ? "cit" : "home";
    if (phase !== "idle" || target === page) return;
    pending.current = target;
    setPlay(false);
    setPhase("cover");
  };

  return (
    <div className="relative">
      {/* faux navbar */}
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-6 py-5 sm:px-10" style={{ background: page === "cit" ? "transparent" : "rgba(10,23,51,0.6)", backdropFilter: "blur(8px)" }}>
        <span className={`${serifClass} text-[1.4rem] font-semibold tracking-[0.05em] text-[#eef3fb]`}>XIPHIAS</span>
        <nav className="hidden items-center gap-7 lg:flex">{NAV.map((n) => <button key={n} onClick={() => go(n)} className="text-[13px] font-medium transition-colors" style={{ color: (n === "Citizenship by Investment" && page === "cit") ? GOLD : "rgba(238,243,251,0.75)" }}>{n}</button>)}</nav>
      </header>

      {/* pages */}
      {page === "home" ? (
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-[#eef3fb]" style={{ background: "radial-gradient(120% 90% at 50% -10%, #16244a 0%, #0a1733 60%)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>Private Global Mobility</p>
          <h1 className={`${serifClass} mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-medium`}>Your second passport, <span className="italic" style={{ color: GOLD }}>privately arranged.</span></h1>
          <p className="mt-8 text-[13px] uppercase tracking-[0.2em] text-white/45">↑ click “Citizenship by Investment” to see the transition</p>
        </section>
      ) : (
        <CitizenshipHero serifClass={serifClass} play={play} />
      )}

      {/* transition curtain */}
      <AnimatePresence>
        {phase !== "idle" ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center"
            style={{ background: NAVY, transformOrigin: phase === "cover" ? "left" : "right" }}
            initial={{ scaleX: phase === "cover" ? 0 : 1 }}
            animate={{ scaleX: phase === "cover" ? 1 : 0 }}
            transition={{ duration: phase === "cover" ? 0.5 : 0.6, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (phase === "cover") { setPage(pending.current); setPhase("reveal"); }
              else { setPhase("idle"); setPlay(true); }
            }}
          >
            <motion.span className={`${serifClass} text-[clamp(1.4rem,3vw,2.4rem)] font-medium italic`} style={{ color: GOLD }} initial={{ opacity: 0 }} animate={{ opacity: phase === "cover" ? 1 : 0 }} transition={{ duration: 0.3 }}>Citizenship by Investment</motion.span>
            <span className="absolute bottom-0 left-0 h-0.5 w-full" style={{ background: GOLD }} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
