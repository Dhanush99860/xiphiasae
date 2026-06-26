"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { SmoothScroll } from "@/components/motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import MediaBackdrop from "@/components/HomeLuxe/MediaBackdrop";
import WhyInvest from "@/components/HomeLuxe/WhyInvest";
import ProgrammesTable from "@/components/HomeLuxe/ProgrammesTable";
import PassportPower from "@/components/HomeLuxe/PassportPower";
import FaqSection from "@/components/HomeLuxe/FaqSection";
import WhyXiphias from "@/components/HomeLuxe/WhyXiphias";
import InsightsNews from "@/components/HomeLuxe/InsightsNews";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const STEEL = "#9fb4d8";
const V_AIRPORT = "/videos/12444971_3840_2160_24fps.mp4";
const V_SKYLINE = "/videos/14361063_1440_2560_30fps.mp4";
const V_JET = "/videos/19666133-uhd_2160_3840_60fps.mp4";
const P_AIRPORT = "/images/posters/hero-airport.jpg";
const P_SKYLINE = "/images/posters/proof-skyline.jpg";
const P_JET = "/images/posters/cta-jet.jpg";
const IMG = {
  uae: "/images/residency/uae/uae-golden-visa.webp",
  grenada: "/images/citizenship/grenada/grenada-citizenship.webp",
  singapore: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp",
  dubai: "/images/citizenship/dubai/dubai-country-image.webp",
  portugal: "/images/residency/portugal/portugal-golden-visa.webp",
  greece: "/images/residency/greece/greece-golden-visa.webp",
  malta: "/images/residency/malta/malta-mprp.webp",
};

function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Eyebrow({ children, ar, center }: { children: React.ReactNode; ar: string; center?: boolean }) {
  return <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}
function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true, amount: 0.6 }); const [n, setN] = useState(0);
  useEffect(() => { if (!inView) return; let raf = 0, s = 0; const tick = (t: number) => { if (!s) s = t; const p = Math.min(1, (t - s) / 1600); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, [inView, to]);
  return <span ref={ref} className={className}>{n.toLocaleString("en-US")}{suffix}</span>;
}
function Magnetic({ children, href = "#", gold }: { children: React.ReactNode; href?: string; gold?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a ref={ref} href={href}
      onMouseMove={(e) => { const el = ref.current!; const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.3}px, ${(e.clientY - (r.top + r.height / 2)) * 0.3}px)`; }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = "translate(0,0)"; }}
      className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform duration-200 ${gold ? "" : "border border-white/25 text-white"}`}
      style={gold ? { background: GOLD, color: NAVY } : undefined}>
      {children}
    </a>
  );
}

/* ── PRELOADER ── */
function Preloader({ serifClass, onDone }: { serifClass: string; onDone: () => void }) {
  const [wipe, setWipe] = useState(false);
  return (
    <motion.div className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden" style={{ background: NAVY, transformOrigin: "top" }} animate={{ scaleY: wipe ? 0 : 1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} onAnimationComplete={() => { if (wipe) onDone(); }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} onAnimationComplete={() => setTimeout(() => setWipe(true), 650)} className="flex flex-col items-center">
        <span className="relative block h-20 w-20"><Image src="/images/logo/xiphias-immigration-white.png" alt="" fill sizes="80px" className="object-contain" priority /></span>
        <motion.span className={`${serifClass} mt-5 text-[1.6rem] font-semibold tracking-[0.3em]`} style={{ color: GOLD }} initial={{ letterSpacing: "0.6em", opacity: 0 }} animate={{ letterSpacing: "0.3em", opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>XIPHIAS</motion.span>
        <motion.span className="mt-4 block h-px" style={{ background: GOLD }} initial={{ width: 0 }} animate={{ width: 140 }} transition={{ duration: 0.9, delay: 0.4 }} />
      </motion.div>
    </motion.div>
  );
}

/* ── HERO (video + particles + cursor glow + magnetic) ── */
function Hero({ serifClass, play }: { serifClass: string; play: boolean }) {
  return (
    <section data-tone="dark" onPointerMove={(e) => { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`); }} className="relative isolate h-screen w-full overflow-hidden bg-[#0a1733] text-[#eef3fb]" style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
      <motion.div className="absolute inset-0" initial={{ scale: 1.16 }} animate={play ? { scale: 1 } : { scale: 1.16 }} transition={{ duration: 14, ease: "easeOut" }}>
        <MediaBackdrop poster={P_AIRPORT} video={V_AIRPORT} priority sizes="100vw" alt="Travellers in an international airport terminal" filter="saturate(0.85) contrast(1.08) brightness(0.62)" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,16,38,0.9) 0%, rgba(6,16,38,0.3) 45%, rgba(6,16,38,0.7) 100%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(22rem 22rem at var(--mx) var(--my), rgba(191,161,92,0.18), transparent 60%)" }} />
      <Ambient tone="dark" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}><Eyebrow ar="من نحن" center>Private Global Mobility</Eyebrow></motion.div>
        <h1 className={`${serifClass} mt-7 text-[clamp(3rem,7.5vw,7rem)] font-medium leading-[0.94]`}><Rise text="Your second passport," className="block" play={play} delay={0.3} /><span className="block italic" style={{ color: GOLD }}><Rise text="privately arranged." play={play} delay={0.7} /></span></h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={play ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1.2 }} className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-white/75">Golden visas and citizenship by investment — arranged end-to-end for those who value discretion, certainty, and time.</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={play ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 1.45 }} className="mt-9 flex flex-col items-center gap-4 sm:flex-row"><Magnetic gold href="/citizenship">Book a private consultation →</Magnetic><Magnetic href="/citizenship">Explore programmes</Magnetic></motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55"><span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span><motion.span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} animate={{ scaleY: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} /></div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items = ["Citizenship by Investment", "Golden Visas", "Residency", "Second Passports", "Skilled Migration", "Corporate Mobility"];
  return (
    <div className="relative overflow-hidden border-y py-4" style={{ background: NAVY, borderColor: `${GOLD}26` }}>
      <motion.div className="flex w-max gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-10 text-[13px] font-semibold uppercase tracking-[0.28em] text-white/50"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{t}</span>)}
      </motion.div>
    </div>
  );
}

/* ── PROGRAMMES (3D tilt cards) ── */
const PROG = [
  { tag: "Golden Visa", name: "United Arab Emirates", img: IMG.uae, stat: "10-year residency" },
  { tag: "Citizenship", name: "Grenada", img: IMG.grenada, stat: "4–6 months · 145 visa-free" },
  { tag: "Residency", name: "Portugal", img: IMG.portugal, stat: "EU · 5-yr citizenship" },
];
function TiltCard({ p, serifClass }: { p: (typeof PROG)[number]; serifClass: string }) {
  return (
    <a href="#" className="group block aspect-[4/5] [perspective:1100px]">
      <div
        onPointerMove={(e) => { const el = e.currentTarget; const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`); el.style.setProperty("--rx", `${(py - 0.5) * -8}deg`); el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`); }}
        onPointerLeave={(e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); }}
        className="relative h-full w-full overflow-hidden rounded-md transition-transform duration-300 ease-out group-hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]"
        style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d", ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
        <Image src={p.img} alt={p.name} fill sizes="30vw" className="object-cover [filter:grayscale(0.5)_brightness(0.7)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.1) 60%)" }} />
        <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(14rem 14rem at var(--mx) var(--my), rgba(191,161,92,0.25), transparent 60%)", mixBlendMode: "screen" }} />
        <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
        <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]" style={{ transform: "translateZ(40px)" }}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{p.tag}</span>
          <h3 className={`${serifClass} mt-1 text-[1.7rem] font-medium leading-tight`}>{p.name}</h3>
          <p className="mt-2 text-[13px] text-white/70">{p.stat}</p>
        </div>
      </div>
    </a>
  );
}
function Programmes({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <Eyebrow ar="خدماتنا">What we secure</Eyebrow>
      <h2 className={`${serifClass} mx-auto mt-5 max-w-6xl text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}><Rise text="Every route to a global life." /></h2>
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">{PROG.map((p) => <TiltCard key={p.name} p={p} serifClass={serifClass} />)}</div>
    </section>
  );
}

/* ── MOBILITY (visa stamps rain in) ── */
const STAMPS = [
  { t: "DUBAI", s: "ENTRY", l: "4%", top: "8%", rot: -9, round: true, c: GOLD }, { t: "LONDON", s: "★ UK ★", l: "39%", top: "3%", rot: 6, round: false, c: STEEL },
  { t: "SCHENGEN", s: "EU", l: "70%", top: "10%", rot: -13, round: true, c: GOLD }, { t: "SINGAPORE", s: "ENTRY", l: "9%", top: "39%", rot: 11, round: false, c: STEEL },
  { t: "TŌKYŌ", s: "日本", l: "45%", top: "36%", rot: -6, round: true, c: GOLD }, { t: "NEW YORK", s: "E-2", l: "73%", top: "45%", rot: 9, round: false, c: STEEL },
  { t: "HONG KONG", s: "ENTRY", l: "18%", top: "69%", rot: -11, round: false, c: GOLD }, { t: "GENÈVE", s: "CH", l: "55%", top: "70%", rot: 6, round: true, c: STEEL },
];
function Mobility({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-screen items-center px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 90% at 80% 0%, #13284f 0%, ${NAVY} 60%)` }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow ar="حرية التنقل">Where it takes you</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.0]`}>Visa-free to <span className="italic" style={{ color: GOLD }}>145 destinations.</span></h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">The moment your citizenship is granted, the world opens — the UK, Schengen, Singapore, Hong Kong and beyond, without a visa.</p>
          <Magnetic gold href="/passport-index">Explore the passport index →</Magnetic>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }} className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border" style={{ background: "linear-gradient(135deg,#f7f9fd,#e6ecf6)", borderColor: `${GOLD}44` }}>
          <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `repeating-linear-gradient(125deg, ${GOLD}12 0 2px, transparent 2px 10px)` }} />
          {STAMPS.map((st) => (
            <motion.div key={st.t} className="absolute" style={{ left: st.l, top: st.top, rotate: `${st.rot}deg` }} variants={{ hidden: { opacity: 0, scale: 1.9 }, show: { opacity: 0.92, scale: 1, transition: { duration: 0.34, ease: "easeOut" } } }}>
              <div className={`${st.round ? "rounded-full px-4 py-3" : "rounded-[3px] px-3 py-2"} border-[2.5px] text-center`} style={{ borderColor: st.c, color: st.c }}><p className={`${serifClass} text-[clamp(0.8rem,1.3vw,1.05rem)] font-bold leading-none`}>{st.t}</p><p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.14em]">{st.s}</p></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── PROCESS (GSAP pinned horizontal) ── */
const STEPS = [
  { no: "01", title: "Private consultation", line: "A confidential conversation about your goals, timeline and budget.", detail: "Senior advisor · under NDA", img: IMG.dubai },
  { no: "02", title: "Strategy & route", line: "We map the most secure, cost-effective pathway across 25+ jurisdictions.", detail: "Cost · timeline · passport power", img: IMG.portugal },
  { no: "03", title: "Handled end to end", line: "Filing, liaison and follow-through — managed by your named advisor.", detail: "One desk · in writing", img: IMG.greece },
  { no: "04", title: "Arrival", line: "Your residency or citizenship secured — and we remain on call.", detail: "Banking · schooling · relocation", img: IMG.malta },
];
function Process({ serifClass }: { serifClass: string }) {
  const sectionRef = useRef<HTMLDivElement>(null); const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const mm = gsap.matchMedia(); mm.add("(min-width:1024px)", () => { const track = trackRef.current!; const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 120); const st = ScrollTrigger.create({ trigger: sectionRef.current!, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.5, invalidateOnRefresh: true, onUpdate: (s) => gsap.set(track, { x: -dist() * s.progress }) }); return () => st.kill(); }); return () => mm.revert(); }, []);
  return (
    <section ref={sectionRef} data-tone="dark" className="relative min-h-screen overflow-hidden bg-[#0a1733] pb-16 pt-24 text-[#eef3fb]">
      <div className="px-6 sm:px-12 lg:px-20"><Eyebrow ar="كيف نعمل">How it works</Eyebrow><h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium`}>The process.</h2></div>
      <div ref={trackRef} className="mt-10 flex flex-col gap-8 px-6 sm:px-12 lg:w-max lg:flex-row lg:items-center lg:gap-12 lg:px-20">
        {STEPS.map((s) => (
          <motion.a key={s.no} href="#" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="group relative block h-[440px] w-full shrink-0 overflow-hidden rounded-sm lg:h-[66vh] lg:w-[60rem]">
            <Image src={s.img} alt="" fill sizes="70vw" className="object-cover [filter:grayscale(0.75)_sepia(0.22)_brightness(0.72)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-[1.04]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,16,38,0.94) 0%, rgba(6,16,38,0.2) 55%, rgba(6,16,38,0.55) 100%)" }} />
            <span className={`${serifClass} pointer-events-none absolute right-8 top-4 text-[8rem] font-medium leading-none`} style={{ color: `${GOLD}22` }}>{s.no}</span>
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10"><span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{s.detail}</span><h3 className={`${serifClass} mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{s.title}</h3><p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">{s.line}</p></div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ── PROOF (counters over parallax video) ── */
function Proof({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const stats = [[17, "", "Years advising"], [10000, "+", "Families relocated"], [35, "", "Jurisdictions"], [98, "%", "Approval rate"]] as const;
  return (
    <section ref={ref} data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden py-28 text-[#eef3fb]" style={{ background: "#0a1733" }}>
      <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y }}><MediaBackdrop poster={P_SKYLINE} video={V_SKYLINE} sizes="100vw" filter="grayscale(0.5) sepia(0.18) contrast(1.05) brightness(0.5)" /></motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,16,38,0.86) 0%, rgba(6,16,38,0.45) 50%, rgba(6,16,38,0.8) 100%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center sm:px-12 lg:px-20">
        <div className="flex justify-center"><Eyebrow ar="سجل حافل" center>A credential, not a claim</Eyebrow></div>
        <div className="mt-14 grid grid-cols-2 gap-y-14 lg:grid-cols-4">{stats.map((s) => (<div key={s[2]}><div className={`${serifClass} text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none`} style={{ color: GOLD }}><CountUp to={s[0]} suffix={s[1]} /></div><div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/55">{s[2]}</div></div>))}</div>
      </div>
    </section>
  );
}

/* ── CTA (jet video + magnetic) ── */
function CTA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} data-tone="dark" className="relative min-h-screen overflow-hidden px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: "#0a1733" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow ar="ابدأ الآن">Your next move</Eyebrow>
          <h2 className={`${serifClass} mt-7 text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.0]`}>Your global future<br /><span className="italic" style={{ color: GOLD }}>begins with a conversation.</span></h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">Tell us your goal. A senior advisor will map your most secure, cost-effective pathway — privately, and entirely off the record.</p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><Magnetic gold href="/contact">Book a private consultation →</Magnetic><Magnetic href="/contact">WhatsApp our Dubai desk</Magnetic></div>
          <p lang="ar" dir="rtl" className="mt-8 font-arabic-display text-2xl" style={{ color: GOLD }}>مستقبلك العالمي يبدأ من هنا</p>
        </div>
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[24rem] overflow-hidden rounded-md" style={{ boxShadow: "0 40px 110px -40px rgba(0,0,0,0.7)" }}>
          <div className="absolute inset-0 z-10" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}45` }} />
          <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y }}><MediaBackdrop poster={P_JET} video={V_JET} sizes="100vw" filter="saturate(0.9) contrast(1.05) brightness(0.92)" /></motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,16,38,0.55), transparent 50%)" }} />
        </div>
      </div>
    </section>
  );
}

export default function Sample3Bugatti({ serifClass }: { serifClass: string }) {
  const [done, setDone] = useState(false);
  const [play, setPlay] = useState(false);
  return (
    <div className="relative">
      <SmoothScroll />
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} play={play} />
      <Marquee />
      <WhyInvest serifClass={serifClass} />
      <Programmes serifClass={serifClass} />
      <ProgrammesTable serifClass={serifClass} />
      <Mobility serifClass={serifClass} />
      <PassportPower serifClass={serifClass} />
      <Process serifClass={serifClass} />
      <FaqSection serifClass={serifClass} />
      <WhyXiphias serifClass={serifClass} />
      <Proof serifClass={serifClass} />
      <InsightsNews serifClass={serifClass} />
      <CTA serifClass={serifClass} />
      <Footer serifClass={serifClass} />
      <AnimatePresence>{!done ? <Preloader serifClass={serifClass} onDone={() => { setDone(true); setPlay(true); }} /> : null}</AnimatePresence>
    </div>
  );
}
