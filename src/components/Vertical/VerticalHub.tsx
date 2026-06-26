"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import WhatWeProvide from "@/components/HomeLuxe/WhatWeProvide";
import FaqSection from "@/components/HomeLuxe/FaqSection";
import WhyXiphias from "@/components/HomeLuxe/WhyXiphias";
import InsightsNews from "@/components/HomeLuxe/InsightsNews";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

export type VerticalConfig = {
  verticalSlug: string;
  vertical: string;
  curtainLabel: string;
  heroImage: string;
  heroEyebrow: string;
  heroEyebrowAr: string;
  heroTitle: string; // line 1
  heroTitleItalic: string; // line 2 (gold italic)
  heroSummary: string;
  heroChips: string[];
  heroStats: { v: string; u: string }[];
  destHeading: string;
  destSub: string;
  regions: string[];
  countries: { name: string; slug: string; region: string; img: string; note?: string }[];
  routesEyebrow: string;
  routesEyebrowAr: string;
  routesTitle: string;
  routesTitleItalic: string;
  routes: { k: string; tag: string; line: string; points: string[] }[];
  process: { no: string; title: string; detail: string; handle: string[] }[];
  ctaHeading: string;
  ctaItalic: string;
  ctaSummary: string;
  ctaImage: string;
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
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} animate={play === undefined ? undefined : play ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} whileInView={play === undefined ? { opacity: 1, y: 0 } : undefined} viewport={play === undefined ? { once: true, amount: 0.3 } : undefined} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}
function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}
function spotlight(e: React.PointerEvent<HTMLElement>) { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }

const DUO = "object-cover [filter:grayscale(0.55)_brightness(0.66)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.82)] group-hover:scale-105";

export default function VerticalHub({ c, serifClass }: { c: VerticalConfig; serifClass: string }) {
  const [entered, setEntered] = useState(false);
  const [play, setPlay] = useState(false);
  const [region, setRegion] = useState("All");
  const [active, setActive] = useState(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const list = c.countries.filter((x) => region === "All" || x.region === region);
  const s = c.process[active];
  const pct = c.process.length > 1 ? (active / (c.process.length - 1)) * 100 : 0;

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* HERO */}
      <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
          <Image src={c.heroImage} alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.6)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
        <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <Fade play={play}><p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}><a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> {c.vertical}</p></Fade>
          <Fade play={play} delay={0.1}><p className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{c.heroEyebrow}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{c.heroEyebrowAr}</span></p></Fade>
          <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}><Rise text={c.heroTitle} play={play} delay={0.2} className="block" /><span className="block italic" style={{ color: GOLD }}><Rise text={c.heroTitleItalic} play={play} delay={0.5} /></span></h1>
          <Fade play={play} delay={0.9}><p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">{c.heroSummary}</p></Fade>
          <Fade play={play} delay={1.05}><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={`/${c.verticalSlug}/eligibility-check`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div></Fade>
          <motion.div className="mt-10 flex flex-wrap gap-2.5" initial="hidden" animate={play ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}>{c.heroChips.map((x) => <motion.span key={x} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="rounded-full border px-3 py-1.5 text-[12px] text-white/70" style={{ borderColor: "rgba(191,161,92,0.4)" }}>{x}</motion.span>)}</motion.div>
          <Fade play={play} delay={1.3}><div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>{c.heroStats.map((x) => <div key={x.u} className="flex flex-col"><span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{x.v}</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{x.u}</span></div>)}</div></Fade>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow ar="الوجهات">{c.destHeading}</Eyebrow><h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text={c.destSub} /></h2></div>
            {c.regions.length > 1 ? <div className="flex flex-wrap gap-2">{c.regions.map((r) => <button key={r} onClick={() => setRegion(r)} className="rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200" style={{ borderColor: region === r ? GOLD : `${INK}22`, background: region === r ? GOLD : "transparent", color: region === r ? "#0a1733" : `${INK}aa` }}>{r}</button>)}</div> : null}
          </div>
          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((x) => (
                <motion.a key={x.name} href={`/${c.verticalSlug}/${x.slug}`} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }} className="group block aspect-[4/5] [perspective:1100px]">
                  <div onPointerMove={(e) => { const el = e.currentTarget; const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`); el.style.setProperty("--rx", `${(py - 0.5) * -7}deg`); el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`); }} onPointerLeave={(e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); }} className="relative h-full w-full overflow-hidden rounded-md transition-transform duration-300 ease-out group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]" style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                    <Image src={x.img} alt={x.name} fill sizes="(min-width:1024px) 22rem, 50vw" className={DUO} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.1) 55%, rgba(8,18,42,0.4) 100%)" }} />
                    <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(14rem 14rem at var(--mx) var(--my), rgba(191,161,92,0.25), transparent 60%)", mixBlendMode: "screen" }} />
                    <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]" style={{ transform: "translateZ(40px)" }}>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{x.region}</span>
                      <h3 className={`${serifClass} mt-1 text-[1.7rem] font-medium leading-tight`}>{x.name}</h3>
                      {x.note ? <p className="mt-2 text-[12px] text-white/70">{x.note}</p> : null}
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ROUTES */}
      <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto w-full max-w-6xl">
          <Eyebrow ar={c.routesEyebrowAr}>{c.routesEyebrow}</Eyebrow>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04]`}><Rise text={c.routesTitle} /><span className="italic" style={{ color: GOLD }}><Rise text={c.routesTitleItalic} delay={0.2} /></span></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.routes.map((rt, i) => (
              <Fade key={rt.k} delay={i * 0.08}>
                <a href="/contact" onPointerMove={spotlight} className="group relative block h-full cursor-pointer overflow-hidden rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
                  <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(18rem 18rem at var(--mx) var(--my), rgba(191,161,92,0.16), transparent 60%)" }} />
                  <p className="text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>{rt.tag}</p>
                  <h3 className={`${serifClass} mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-medium transition-colors group-hover:text-[#bfa15c]`}>{rt.k}</h3>
                  <p className="relative mt-4 text-[15px] leading-relaxed text-white/70">{rt.line}</p>
                  <ul className="relative mt-6 flex flex-col gap-3">{rt.points.map((pt) => <li key={pt} className="flex items-center gap-3 text-[14px] text-white/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{pt}</li>)}</ul>
                </a>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <WhatWeProvide serifClass={serifClass} />

      {/* PROCESS */}
      <section data-tone="light" className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="mx-auto w-full max-w-6xl">
          <Eyebrow ar="كيف نعمل">How we do it</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="Five steps. One desk." /></h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative ps-8">
              <div className="absolute left-1 top-2 bottom-2 w-px" style={{ background: `${INK}1a` }}><div className="w-full origin-top transition-[height] duration-500" style={{ height: `${pct}%`, background: GOLD }} /></div>
              <ul className="flex flex-col">{c.process.map((st, i) => { const on = i === active; return (
                <li key={st.no}><button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block w-full py-4 text-left">
                  <span className="absolute -left-[2.05rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300" style={{ background: i <= active ? GOLD : "#f3f7fd", boxShadow: `0 0 0 4px #f3f7fd`, outline: `1px solid ${GOLD}` }} />
                  <span className="flex items-baseline gap-3"><span className={`${serifClass} text-[1.2rem] font-medium`} style={{ color: on ? GOLD : `${INK}40` }}>{st.no}</span><span className={`${serifClass} text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium transition-colors duration-300`} style={{ color: on ? INK : `${INK}66` }}>{st.title}</span></span>
                </button></li>
              ); })}</ul>
            </div>
            <motion.div key={active} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center rounded-lg border p-9 lg:p-12" style={{ borderColor: `${INK}14`, background: "rgba(255,255,255,0.5)" }}>
              <span className={`${serifClass} text-[5rem] font-medium leading-none`} style={{ color: GOLD }}>{s.no}</span>
              <h3 className={`${serifClass} mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-medium`}>{s.title}</h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#0c1f3f]/70">{s.detail}</p>
              <div className="mt-7 border-t pt-6" style={{ borderColor: `${INK}12` }}><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">What we handle</p><ul className="mt-4 flex flex-col gap-3">{s.handle.map((h) => <li key={h} className="flex items-center gap-3 text-[14px] text-[#0c1f3f]/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{h}</li>)}</ul></div>
            </motion.div>
          </div>
        </div>
      </section>

      <FaqSection serifClass={serifClass} />
      <WhyXiphias serifClass={serifClass} />
      <InsightsNews serifClass={serifClass} />

      {/* CTA */}
      <section ref={ctaRef} data-tone="dark" className="relative flex min-h-[80vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" style={{ y: ctaY }}><Image src={c.ctaImage} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" /></motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className={`${serifClass} text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>{c.ctaHeading} <span className="italic" style={{ color: GOLD }}>{c.ctaItalic}</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">{c.ctaSummary}</p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a><a href={`/${c.verticalSlug}/eligibility-check`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Check your eligibility</a></div>
        </div>
      </section>

      <Footer serifClass={serifClass} />

      <AnimatePresence>{!entered ? <Curtain serifClass={serifClass} label={c.curtainLabel} onDone={() => { setEntered(true); setPlay(true); }} /> : null}</AnimatePresence>
    </div>
  );
}

function Curtain({ serifClass, label, onDone }: { serifClass: string; label: string; onDone: () => void }) {
  const [wipe, setWipe] = useState(false);
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden" style={{ background: NAVY, transformOrigin: "right" }} animate={{ scaleX: wipe ? 0 : 1 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} onAnimationComplete={() => { if (wipe) onDone(); }}>
      <motion.span className={`${serifClass} text-[clamp(1.4rem,3vw,2.4rem)] font-medium italic`} style={{ color: GOLD }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} onAnimationComplete={() => setTimeout(() => setWipe(true), 450)}>{label}</motion.span>
      <span className="absolute bottom-0 left-0 h-0.5 w-full" style={{ background: GOLD }} />
    </motion.div>
  );
}
