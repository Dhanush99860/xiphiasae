"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import MediaBackdrop from "@/components/HomeLuxe/MediaBackdrop";
import { SmoothScroll } from "@/components/motion";
import WhyInvest from "@/components/HomeLuxe/WhyInvest";
import ProgrammesTable from "@/components/HomeLuxe/ProgrammesTable";
import PassportPower from "@/components/HomeLuxe/PassportPower";
import FaqSection from "@/components/HomeLuxe/FaqSection";
import WhyXiphias from "@/components/HomeLuxe/WhyXiphias";
import InsightsNews from "@/components/HomeLuxe/InsightsNews";

const GOLD = "#bfa15c";
const INK = "#0c1f3f";
const V_AIRPORT = "/videos/12444971_3840_2160_24fps.mp4";
const V_SKYLINE = "/videos/14361063_1440_2560_30fps.mp4";
const V_JET = "/videos/19666133-uhd_2160_3840_60fps.mp4";
const V_ADVISOR = "/videos/14736590_3840_2160_30fps.mp4";
const P_AIRPORT = "/images/posters/hero-airport.jpg";
const P_SKYLINE = "/images/posters/proof-skyline.jpg";
const P_JET = "/images/posters/cta-jet.jpg";
const P_ADVISOR = "/images/posters/s2-advisor.jpg";
const IMG = {
  family1: "/images/Pexels/pexels-gatsby-yang-857486579-37669246.jpg",
  family2: "/images/Pexels/pexels-m-munzevi-2155457440-37119543.jpg",
  corporate: "/images/corporate/uae/dubai-corporate-immigration.webp",
  uae: "/images/residency/uae/uae-golden-visa.webp",
  grenada: "/images/citizenship/grenada/grenada-citizenship.webp",
  singapore: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp",
  dubai: "/images/citizenship/dubai/dubai-country-image.webp",
  portugal: "/images/residency/portugal/portugal-golden-visa.webp",
  greece: "/images/residency/greece/greece-golden-visa.webp",
  malta: "/images/residency/malta/malta-mprp.webp",
};

/* helpers */
function Rise({ text, className, delay = 0, stagger = 0.05 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function BlurIn({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}>
      {words.map((w, i) => (<motion.span key={i} style={{ display: "inline-block", marginInlineEnd: "0.26em" }} variants={{ hidden: { opacity: 0, filter: "blur(10px)", y: 6 }, show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span>))}
    </motion.span>
  );
}
function Eyebrow({ children, ar, center }: { children: React.ReactNode; ar: string; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />{children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}
function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true, amount: 0.6 }); const [n, setN] = useState(0);
  useEffect(() => { if (!inView) return; let raf = 0, s = 0; const tick = (t: number) => { if (!s) s = t; const p = Math.min(1, (t - s) / 1600); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, [inView, to]);
  return <span ref={ref} className={className}>{n.toLocaleString("en-US")}{suffix}</span>;
}
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function SplitFlap({ text, className, startFrame = 0 }: { text: string; className?: string; startFrame?: number }) {
  const ref = useRef<HTMLSpanElement>(null); const [disp, setDisp] = useState(() => text.replace(/[^ ]/g, " ")); const started = useRef(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver((e) => { if (e[0].isIntersecting && !started.current) { started.current = true; let f = 0; const settle = (i: number) => startFrame + i * 2 + 6; const maxF = settle(text.length) + 2; const id = setInterval(() => { f++; setDisp(text.split("").map((ch, i) => (ch === " " ? " " : f >= settle(i) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)])).join("")); if (f > maxF) { setDisp(text); clearInterval(id); } }, 45); } }, { threshold: 0.6 }); io.observe(el); return () => io.disconnect(); }, [text, startFrame]);
  return <span ref={ref} className={className}>{disp}</span>;
}
function Btn({ children, ghost, href = "#" }: { children: React.ReactNode; ghost?: boolean; href?: string }) {
  if (ghost) return <a href={href} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">{children}</a>;
  return <a href={href} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1733] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>{children}<span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>;
}

/* 1 · HERO (video) */
function Hero({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative h-screen w-full overflow-hidden bg-[#0a1733] text-[#eef3fb]">
      <motion.div className="absolute inset-0" initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 16, ease: "easeOut" }}>
        <MediaBackdrop poster={P_AIRPORT} video={V_AIRPORT} priority sizes="100vw" alt="Travellers in an international airport terminal" filter="saturate(0.82) contrast(1.06) brightness(0.78)" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,16,38,0.85) 0%, rgba(6,16,38,0.25) 45%, rgba(6,16,38,0.6) 100%)" }} />
      <div className="lcp-instant relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <Eyebrow ar="من نحن" center>Private Global Mobility</Eyebrow>
        <h1 className={`${serifClass} mt-7 text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.96]`}><Rise text="Your second passport," className="block" delay={0.4} /><span className="block italic" style={{ color: GOLD }}><Rise text="privately arranged." delay={0.8} /></span></h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }} className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-white/70">Golden visas and citizenship by investment — arranged end-to-end for those who value discretion, certainty, and time.</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.55 }} className="mt-9 flex flex-col items-center gap-4 sm:flex-row"><Btn href="/citizenship">Book a private consultation</Btn><Btn ghost href="/citizenship">Explore programmes</Btn></motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55"><span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span><span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} /></div>
    </section>
  );
}

/* 2 · WHAT BRINGS YOU (expanding panels) */
const INTENTS: { no: string; title: string; line: string; tag: string; media: { type: "img" | "video"; src: string } }[] = [
  { no: "01", title: "Freedom to move", line: "A second passport and visa-free access to 140+ countries — for you and your family.", tag: "Citizenship", media: { type: "img", src: IMG.family1 } },
  { no: "02", title: "A plan B for your family", line: "Security, education and a place to belong — whatever tomorrow brings.", tag: "Residency", media: { type: "img", src: IMG.family2 } },
  { no: "03", title: "A private advisor", line: "One named advisor who handles every step — filing, liaison, follow-through.", tag: "Concierge", media: { type: "video", src: V_ADVISOR } },
  { no: "04", title: "Global business reach", line: "Corporate mobility and relocation across 35 jurisdictions.", tag: "Corporate", media: { type: "img", src: IMG.corporate } },
];
function WhatBringsYou({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="ما الذي تبحث عنه">What brings you here</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}><Rise text="Why people come to us." /></h2>
        <div className="mt-12 flex h-[68vh] flex-col gap-3 lg:flex-row">
          {INTENTS.map((it, i) => {
            const on = i === active;
            return (
              <a key={it.no} href="#" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative cursor-pointer overflow-hidden rounded-sm transition-all duration-500 ease-out" style={{ flex: on ? 3.2 : 1 }}>
                {it.media.type === "img" ? (
                  <Image src={it.media.src} alt="" fill sizes="60vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.92) contrast(1.03)" }} />
                ) : (
                  <MediaBackdrop poster={P_ADVISOR} video={it.media.src} sizes="(min-width:1024px) 60vw, 100vw" alt="A private XIPHIAS advisor at work" filter="saturate(0.95)" />
                )}
                <div className="absolute inset-0" style={{ background: on ? "linear-gradient(0deg, rgba(6,16,38,0.85) 0%, rgba(6,16,38,0.1) 55%)" : "linear-gradient(0deg, rgba(6,16,38,0.7), rgba(6,16,38,0.45))" }} />
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
                <span className={`${serifClass} absolute right-4 top-3 text-[3rem] font-medium leading-none`} style={{ color: `${GOLD}3a` }}>{it.no}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{it.tag}</span>
                  <h3 className={`${serifClass} mt-1 font-medium leading-tight transition-all duration-500`} style={{ fontSize: on ? "1.9rem" : "1.25rem" }}>{it.title}</h3>
                  <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-white/70 transition-all duration-500" style={{ maxHeight: on ? "6rem" : "0", opacity: on ? 1 : 0 }}>{it.line}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 3 · PROGRAMMES (clip-reveal rows) */
const PROG = [
  { no: "01", name: "Golden Visa", line: "Long-term residency by investment — the UAE, Portugal, Greece and more.", stat: "2–8 months", img: IMG.uae },
  { no: "02", name: "Citizenship by Investment", line: "A second passport in 4–6 months — the Caribbean, Malta, Türkiye.", stat: "140+ visa-free", img: IMG.grenada },
  { no: "03", name: "Residency & Relocation", line: "Skilled, corporate and family routes to permanent residency.", stat: "PR pathways", img: IMG.singapore },
];
function ProgRow({ p, i, serifClass }: { p: (typeof PROG)[number]; i: number; serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const clip = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(clip, (v) => `inset(0% 0% ${v}% 0%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const flip = i % 2 === 1;
  return (
    <div ref={ref} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <motion.a href="#" className="group relative block aspect-[5/4] w-full overflow-hidden rounded-sm" style={{ clipPath }}>
        <motion.div className="absolute inset-0" style={{ scale }}><Image src={p.img} alt="" fill sizes="45vw" className="object-cover [filter:grayscale(0.72)_sepia(0.32)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_sepia(0)] group-hover:scale-[1.04]" /></motion.div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${INK}33,transparent 45%,${GOLD}26)`, mixBlendMode: "multiply" }} />
        <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"><span className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-[#0a1733]" style={{ background: GOLD }}>{p.stat}</span></div>
      </motion.a>
      <div className={flip ? "lg:pe-4" : "lg:ps-4"}>
        <span className="text-[12px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{p.no}</span>
        <h3 className={`${serifClass} mt-2 text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-tight`}>{p.name}</h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#0c1f3f]/65">{p.line}</p>
        <a href="#" className="group/cta mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}><span className="relative">Explore<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/cta:scale-x-100" /></span><span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span></a>
      </div>
    </div>
  );
}
function Programmes({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#eef3fb" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="خدماتنا">What we secure</Eyebrow>
        <h2 className={`${serifClass} mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}><Rise text="What we secure." /></h2>
        <div className="mt-16 flex flex-col gap-24">{PROG.map((p, i) => <ProgRow key={p.name} p={p} i={i} serifClass={serifClass} />)}</div>
      </div>
    </section>
  );
}

/* 4 · PROCESS (GSAP pinned horizontal) */
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
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
            <span className={`${serifClass} pointer-events-none absolute right-8 top-4 text-[8rem] font-medium leading-none`} style={{ color: `${GOLD}22` }}>{s.no}</span>
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10"><span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{s.detail}</span><h3 className={`${serifClass} mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{s.title}</h3><p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">{s.line}</p></div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* 5 · DESTINATIONS (split-flap boarding passes) */
const DEST = [
  { code: "DXB", name: "United Arab Emirates", prog: "Golden Visa", time: "2 MONTHS", status: "OPEN" },
  { code: "LIS", name: "Portugal", prog: "Golden Visa", time: "6 MONTHS", status: "OPEN" },
  { code: "ATH", name: "Greece", prog: "Golden Visa", time: "3 MONTHS", status: "OPEN" },
  { code: "MLA", name: "Malta", prog: "Residency", time: "4 MONTHS", status: "LIMITED" },
  { code: "GND", name: "Grenada", prog: "Citizenship", time: "4 MONTHS", status: "OPEN" },
  { code: "IST", name: "Türkiye", prog: "Citizenship", time: "5 MONTHS", status: "NEW" },
];
function Pill({ s }: { s: string }) { const open = s === "OPEN"; return <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#0a1733", background: open ? "transparent" : GOLD, boxShadow: open ? `inset 0 0 0 1px ${GOLD}66` : "none" }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: open ? GOLD : "#0a1733" }} />{s}</span>; }
function Destinations({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-4xl">
        <Eyebrow ar="وجهاتنا">Where we take you</Eyebrow>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}>Departures.</h2>
        <div className="mt-12 flex flex-col gap-5">
          {DEST.map((d, i) => (
            <a key={d.code} href="#" className="group relative flex items-stretch overflow-hidden rounded-sm border bg-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(20,17,12,0.4)]" style={{ borderColor: `${INK}26` }}>
              <div className="flex w-28 shrink-0 flex-col items-center justify-center gap-1 py-7" style={{ background: GOLD }}><span className="font-mono text-[26px] font-bold leading-none text-[#0a1733]"><SplitFlap text={d.code} startFrame={i * 3} /></span><span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0a1733]/70">Gate · XIA</span></div>
              <div className="relative w-0"><div className="absolute inset-y-3 left-0 border-l border-dashed" style={{ borderColor: `${INK}33` }} /><span className="absolute -left-2 -top-2 h-4 w-4 rounded-full" style={{ background: "#f3f7fd" }} /><span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full" style={{ background: "#f3f7fd" }} /></div>
              <div className="flex flex-1 items-center justify-between gap-4 px-6 py-6 sm:px-8"><div><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0c1f3f]/45">Destination</span><h3 className={`${serifClass} text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-none transition-colors group-hover:text-[#bfa15c]`}><SplitFlap text={d.name} startFrame={i * 3 + 4} /></h3><span className="mt-1 block text-[12px] uppercase tracking-[0.12em] text-[#0c1f3f]/55">{d.prog}</span></div><div className="hidden flex-col items-end gap-2 sm:flex"><span className="font-mono text-[12px] tracking-widest text-[#0c1f3f]/70">{d.time}</span><Pill s={d.status} /></div></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6 · XIA (intelligence console) */
const ROUTES = [
  { rank: "01", place: "Grenada", prog: "Citizenship", pct: 96 }, { rank: "02", place: "Portugal", prog: "Golden Visa", pct: 91 },
  { rank: "03", place: "United Arab Emirates", prog: "Golden Visa", pct: 88 }, { rank: "04", place: "Malta", prog: "Residency", pct: 84 },
];
function XIA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.3 });
  const QUERY = "Second passport · visa-free EU · family of 4 · under $400k"; const [typed, setTyped] = useState(""); const [phase, setPhase] = useState(0);
  useEffect(() => { if (!inView) return; let i = 0; const id = setInterval(() => { i++; setTyped(QUERY.slice(0, i)); if (i >= QUERY.length) { clearInterval(id); setTimeout(() => setPhase(1), 300); setTimeout(() => setPhase(2), 1100); } }, 30); return () => clearInterval(id); }, [inView]);
  const r = 52, c = 2 * Math.PI * r; const BREAK = [["Investment from", "$235,000"], ["Timeline", "4 months"], ["Visa-free", "144 countries"], ["Family", "Spouse + 2"], ["Due diligence", "Pre-cleared"]];
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#e9f0fa" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="الذكاء">XIA · Intelligence</Eyebrow>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.02]`}><BlurIn text="See every route" className="block" /><span className="block italic" style={{ color: GOLD }}><BlurIn text="before you commit." delay={0.3} /></span></h2>
        <div ref={ref} className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="overflow-hidden rounded-lg" style={{ background: "#0e2143", boxShadow: "0 40px 100px -50px rgba(20,17,12,0.45)" }}>
            <div className="flex items-center gap-2 border-b px-6 py-4" style={{ borderColor: `${GOLD}2e` }}><span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} /><span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">XIA · live</span></div>
            <div className="p-6 font-mono text-[13px] sm:p-7"><div className="flex flex-wrap"><span style={{ color: GOLD }}>&gt;&nbsp;</span><span className="text-white/90">{typed}</span></div><div className="mt-4 text-white/40 transition-opacity duration-500" style={{ opacity: phase >= 1 ? 1 : 0 }}>analysing 35 jurisdictions · 5 matched…</div>
              <div className="mt-5 flex flex-col gap-3.5">{ROUTES.map((rt, i) => (<div key={rt.place} className="transition-all duration-500" style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(10px)", transitionDelay: `${i * 120}ms` }}><div className="flex items-center justify-between text-[12px]"><span className="text-white/85"><span style={{ color: GOLD }}>{rt.rank}</span>&nbsp;&nbsp;{rt.place} · <span className="text-white/50">{rt.prog}</span></span><span style={{ color: GOLD }}>{rt.pct}%</span></div><div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full transition-[width] duration-1000 ease-out" style={{ width: phase >= 2 ? `${rt.pct}%` : "0%", background: GOLD, transitionDelay: `${i * 120}ms` }} /></div></div>))}</div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg p-7 text-[#eef3fb]" style={{ background: "#0a1733", boxShadow: "0 40px 100px -50px rgba(20,17,12,0.45)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Top match</p>
            <div className="mt-4 flex items-center gap-5"><div className="relative h-28 w-28 shrink-0"><svg viewBox="0 0 120 120" className="h-full w-full -rotate-90"><circle cx="60" cy="60" r={r} fill="none" stroke="#ffffff18" strokeWidth="3" /><circle cx="60" cy="60" r={r} fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray={c} style={{ strokeDashoffset: inView ? c * 0.04 : c, transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1) 0.3s" }} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className={`${serifClass} text-[2rem] font-medium leading-none`} style={{ color: GOLD }}>96%</span><span className="text-[9px] uppercase tracking-[0.2em] text-white/45">match</span></div></div><div><h3 className={`${serifClass} text-[2rem] font-medium leading-none`}>Grenada</h3><p className="mt-1 text-[12px] uppercase tracking-[0.12em]" style={{ color: GOLD }}>Citizenship by Investment</p></div></div>
            <div className="mt-6 flex flex-col">{BREAK.map(([k, v], i) => (<div key={k} className="flex items-center justify-between border-t py-3 text-[13px] transition-all duration-500" style={{ borderColor: "#ffffff12", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(12px)", transitionDelay: `${600 + i * 90}ms` }}><span className="text-white/50">{k}</span><span className="font-medium text-white/90">{v}</span></div>))}</div>
            <div className="mt-auto pt-7"><Btn href="/citizenship">Begin a private assessment</Btn></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7 · PROOF (counters over parallax video) */
function Proof({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const stats = [[17, "", "Years advising"], [10000, "+", "Families relocated"], [25, "+", "Countries served"], [98, "%", "Approval rate"]] as const;
  return (
    <section ref={ref} data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden py-28 text-[#eef3fb]" style={{ background: "#0a1733" }}>
      <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y }}><MediaBackdrop poster={P_SKYLINE} video={V_SKYLINE} sizes="100vw" filter="grayscale(0.5) sepia(0.18) contrast(1.05) brightness(0.5)" /></motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,16,38,0.86) 0%, rgba(6,16,38,0.45) 50%, rgba(6,16,38,0.8) 100%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center sm:px-12 lg:px-20">
        <div className="flex justify-center"><Eyebrow ar="سجل حافل" center>A credential, not a claim</Eyebrow></div>
        <div className="mt-14 grid grid-cols-2 gap-y-14 lg:grid-cols-4">{stats.map((s) => (<div key={s[2]}><div className={`${serifClass} text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none`} style={{ color: GOLD }}><CountUp to={s[0]} suffix={s[1]} /></div><div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/55">{s[2]}</div></div>))}</div>
        <p className="mx-auto mt-14 max-w-xl text-[15px] leading-relaxed text-white/70">Licensed in the UAE. Members of the IMC. Advisors retained for life — not for a transaction.</p>
      </div>
    </section>
  );
}

/* 8 · CTA (jet video split) */
function CTA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} data-tone="dark" className="relative min-h-screen overflow-hidden px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: "#0a1733" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow ar="ابدأ الآن">Your next move</Eyebrow>
          <h2 className={`${serifClass} mt-7 text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.0]`}>Your global future<br /><span className="italic" style={{ color: GOLD }}>begins with a conversation.</span></h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">Tell us your goal. A senior advisor will map your most secure, cost-effective pathway — privately, and entirely off the record.</p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><Btn href="/contact">Book a private consultation</Btn><Btn ghost href="/contact">WhatsApp our Dubai desk</Btn></div>
          <p lang="ar" dir="rtl" className="mt-8 font-arabic-display text-2xl" style={{ color: GOLD }}>مستقبلك العالمي يبدأ من هنا</p>
          <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-white/45">By appointment · Dubai · London · Bengaluru</p>
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

export default function Sample2Mix({ serifClass }: { serifClass: string }) {
  return (
    <div>
      <SmoothScroll />
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} />
      <WhatBringsYou serifClass={serifClass} />
      <WhyInvest serifClass={serifClass} />
      <ProgrammesTable serifClass={serifClass} />
      <Programmes serifClass={serifClass} />
      <PassportPower serifClass={serifClass} />
      <Process serifClass={serifClass} />
      <Destinations serifClass={serifClass} />
      <XIA serifClass={serifClass} />
      <FaqSection serifClass={serifClass} />
      <WhyXiphias serifClass={serifClass} />
      <Proof serifClass={serifClass} />
      <InsightsNews serifClass={serifClass} />
      <CTA serifClass={serifClass} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
