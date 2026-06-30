"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import Ambient from "./Ambient";
import Header from "./LuxeHeader";
import Footer from "./LuxeFooter";
import MediaBackdrop from "./MediaBackdrop";
import ProgrammesTable from "./ProgrammesTable";
import PassportPower from "./PassportPower";
import WhyXiphias from "./WhyXiphias";
import InsightsNews from "./InsightsNews";
import WhyInvest from "./WhyInvest";
import WhatWeProvide from "./WhatWeProvide";
import FaqSection from "./FaqSection";

const GOLD = "#bfa15c";
// Below-fold videos (desktop-only via MediaBackdrop; mobile gets the poster).
const V_JET = "/videos/19666133-uhd_2160_3840_60fps.mp4"; // CTA
const V_ADVISOR = "/videos/14736590_3840_2160_30fps.mp4"; // Section 2 (advisor)
// Poster stills (captured from each clip) — server-rendered LCP image; video is
// desktop-only & in-view-only, so mobile loads the poster and never the .mp4.
const P_JET = "/images/home/cta-jet-poster.webp";
const P_ADVISOR = "/images/home/advisor-poster.webp";
// Hero: real photography (not video) — warm, on-brand, fast, the LCP image.
const HERO_FAMILY = "/images/home/hero-family.webp";
const IMG = {
  // Section 2
  family1: "/images/home/freedom-to-move.webp",
  family2: "/images/home/family-plan-b.webp",
  corporate: "/images/home/corporate-mobility.webp",
  // Programmes
  uae: "/images/home/uae-golden-visa.webp",
  grenada: "/images/home/grenada-citizenship.webp",
  singapore: "/images/home/singapore-due-diligence.webp",
  // Process
  dubai: "/images/home/dubai-global-mobility.webp",
  dubaiPortrait: "/images/home/dubai-global-mobility-portrait.webp",
  portugal: "/images/home/portugal-golden-visa.webp",
  greece: "/images/home/greece-golden-visa.webp",
  malta: "/images/home/malta-residency.webp",
  varun: "/images/home/varun-singh-md.webp",
};

const WHAT_WE_PROVIDE_IMAGES = {
  "Citizenship by Investment": IMG.grenada,
  "Residency & Golden Visas": IMG.uae,
  "Skilled & Corporate Migration": IMG.corporate,
  "Source-of-funds & due diligence": IMG.singapore,
  "Relocation, banking & schooling": IMG.family1,
  "Lifetime concierge": IMG.dubai,
};

const INSIGHT_IMAGES = {
  "/blog/dubai-golden-visa-real-estate": "/images/home/insight-dubai-golden-visa.webp",
  "/blog/investment-migration-2025": "/images/home/insight-investment-migration.webp",
  "/blog/greece-golden-visa-benefits": "/images/home/insight-greece-golden-visa.webp",
  "/blog/us-passport-visa-free-countries-2026": "/images/home/insight-us-passport.webp",
};

/* ─────────── shared text animations ─────────── */
function Rise({ text, className, delay = 0, stagger = 0.05 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}>
          <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
function Eyebrow({ children, ar, center, light }: { children: React.ReactNode; ar: string; center?: boolean; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />{children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}
function Btn({ children, light, ghost, href = "#" }: { children: React.ReactNode; light?: boolean; ghost?: boolean; href?: string }) {
  if (ghost) return <a href={href} className={`inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${light ? "border-[#0c1f3f]/25 text-[#0c1f3f] hover:border-[#0c1f3f]/60" : "border-white/25 text-white hover:border-[#bfa15c]"}`}>{children}</a>;
  return <a href={href} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1733] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>{children}<span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>;
}

/* ─────────── 1 · HERO (real photo · keyword-dense · the LCP image) ─────────── */
const HERO_QUICK: [string, string][] = [["Golden Visa", "/golden-visa"], ["Citizenship by Investment", "/citizenship"], ["Residency", "/residency"], ["Skilled Migration", "/skilled"], ["Corporate Mobility", "/corporate"]];
const HERO_STATS = [{ v: "35", u: "jurisdictions" }, { v: "17 yrs", u: "advising" }, { v: "10,000+", u: "families" }, { v: "98%", u: "approval" }];
function Hero({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: "radial-gradient(120% 100% at 12% 0%, #13284f 0%, #0a1733 58%)" }}>
      <Ambient tone="dark" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="lcp-instant">
          <Eyebrow ar="الهجرة والإقامة">Dubai · Global mobility since 2007</Eyebrow>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}><Rise text="Immigration, residency &" className="block" /><span className="block italic" style={{ color: GOLD }}><Rise text="citizenship — expertly advised." delay={0.25} /></span></h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">Golden visas, residency and second passports across 35 jurisdictions — handled end-to-end by XIPHIAS Immigration. 17 years of advisory, 10,000+ families relocated.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }} className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center"><Btn href="/citizenship">Book a private consultation</Btn><Btn ghost href="/eligibility">Check your eligibility</Btn></motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="mt-7 flex flex-wrap gap-2">{HERO_QUICK.map(([label, href]) => <a key={label} href={href} className="rounded-full border px-3.5 py-1.5 text-[12px] text-white/75 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]" style={{ borderColor: "rgba(191,161,92,0.35)" }}>{label}</a>)}</motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95 }} className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.12)" }}>{HERO_STATS.map((s) => <div key={s.u} className="flex flex-col"><span className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums" style={{ color: GOLD }}>{s.v}</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{s.u}</span></div>)}</motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-[5/6] w-full overflow-hidden rounded-lg lg:aspect-[4/5]">
        <Image src={HERO_FAMILY} alt="A family with XIPHIAS Immigration at the airport, holding their new passports" fill sizes="(min-width:1024px) 45vw, 100vw" priority className="object-cover" />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
          <span aria-hidden className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
          <div className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-2 text-[12px] font-semibold backdrop-blur" style={{ color: GOLD }}>Licensed in the UAE · IMC & ICCRC members</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── 2 · WHAT BRINGS YOU HERE (interactive expanding panels) ─────────── */
const INTENTS: { no: string; title: string; line: string; tag: string; href: string; media: { type: "img" | "video"; src: string } }[] = [
  { no: "01", title: "Freedom to move", line: "A second passport and visa-free access to 140+ countries — for you and your family.", tag: "Citizenship", href: "/citizenship", media: { type: "img", src: IMG.family1 } },
  { no: "02", title: "A plan B for your family", line: "Security, education and a place to belong — whatever tomorrow brings.", tag: "Residency", href: "/residency", media: { type: "img", src: IMG.family2 } },
  { no: "03", title: "A private advisor", line: "One named advisor who handles every step — filing, liaison, follow-through.", tag: "Concierge", href: "/contact", media: { type: "video", src: V_ADVISOR } },
  { no: "04", title: "Global business reach", line: "Corporate mobility and relocation across 35 jurisdictions.", tag: "Corporate", href: "/corporate", media: { type: "img", src: IMG.corporate } },
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
              <a key={it.no} href={it.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative cursor-pointer overflow-hidden rounded-sm transition-all duration-500 ease-out" style={{ flex: on ? 3.2 : 1 }}>
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

/* ─────────── 4 · PROCESS (pinned one-card horizontal) ─────────── */
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
          <motion.div key={s.no} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="group relative block h-[440px] w-full shrink-0 overflow-hidden rounded-sm lg:h-[66vh] lg:w-[60rem]">
            <Image src={s.img} alt="" fill sizes="70vw" className="object-cover [filter:grayscale(0.75)_sepia(0.22)_brightness(0.72)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-[1.04]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,16,38,0.94) 0%, rgba(6,16,38,0.2) 55%, rgba(6,16,38,0.55) 100%)" }} />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
            <span className={`${serifClass} pointer-events-none absolute right-8 top-4 text-[8rem] font-medium leading-none`} style={{ color: `${GOLD}22` }}>{s.no}</span>
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10"><span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{s.detail}</span><h3 className={`${serifClass} mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight transition-colors group-hover:text-[#bfa15c]`}>{s.title}</h3><p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">{s.line}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── 8 · CTA (cinematic split, jet video) ─────────── */
function CTA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} data-tone="dark" className="relative min-h-screen overflow-hidden px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: "#0a1733" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow ar="ابدأ الآن">Your next move</Eyebrow>
          <h2 className={`${serifClass} mt-7 text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.0]`}>Your global future<br /><span className="italic" style={{ color: GOLD }}>begins with a conversation.</span></h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">Tell us your goal. A senior advisor will map your most secure, cost-effective pathway — privately, and entirely off the record.</p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><Btn href="/contact">Book a private consultation</Btn><Btn ghost href="https://wa.me/917406006061">WhatsApp our Dubai desk</Btn></div>
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

export default function AssembledHome({ serifClass }: { serifClass: string }) {
  return (
    <div>
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} />
      <WhatBringsYou serifClass={serifClass} />
      <WhyInvest serifClass={serifClass} imageSrc={IMG.dubaiPortrait} imageAlt="Dubai skyline and Museum of the Future" />
      <ProgrammesTable serifClass={serifClass} />
      <WhatWeProvide serifClass={serifClass} imageOverrides={WHAT_WE_PROVIDE_IMAGES} />
      <PassportPower serifClass={serifClass} />
      <Process serifClass={serifClass} />
      <FaqSection serifClass={serifClass} />
      <WhyXiphias serifClass={serifClass} portraitSrc={IMG.varun} />
      <InsightsNews serifClass={serifClass} imageOverrides={INSIGHT_IMAGES} />
      <CTA serifClass={serifClass} />
      <Footer serifClass={serifClass} />
    </div>
  );
}
