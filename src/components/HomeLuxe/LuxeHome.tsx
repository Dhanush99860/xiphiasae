"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Ambient from "./Ambient";
import Header from "./LuxeHeader";
import Footer from "./LuxeFooter";
import MediaBackdrop from "./MediaBackdrop";
import ProgrammesTable from "./ProgrammesTable";
import ProgrammesDirectory from "./ProgrammesDirectory";
import PassportPower from "./PassportPower";
import WhyXiphias from "./WhyXiphias";
import InsightsNews from "./InsightsNews";
import WhyInvest from "./WhyInvest";
import WhatWeProvide from "./WhatWeProvide";
import FaqSection from "./FaqSection";
import type { DirectoryRegion } from "@/lib/countries-shared";

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
  "Citizenship by Investment Advisory": IMG.grenada,
  "Residency and Golden Visa Services": IMG.uae,
  "Skilled Migration Services": IMG.corporate,
  "Corporate Immigration Services": IMG.corporate,
  "Due-Diligence Support": IMG.singapore,
  "Relocation Support": IMG.family1,
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
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.14em", marginBottom: "-0.14em", paddingInlineEnd: "0.06em", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}>
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
const HERO_PROOF = [
  "UAE Golden Visa, residency and citizenship routes",
  "Eligibility, documents, filing and post-approval support",
  "Private advisory for investors, families and companies",
];
function Hero({ serifClass }: { serifClass: string }) {
  return (
    <section id="home-hero" data-tone="dark" className="relative isolate overflow-hidden text-[#eef3fb]" style={{ background: "#0a1733" }}>
      <Ambient tone="dark" />
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeOut" }}>
        <Image src={HERO_FAMILY} alt="" fill sizes="100vw" priority className="object-cover object-[58%_center] [filter:grayscale(0.22)_brightness(0.62)_contrast(1.08)] lg:object-center" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(6,15,35,0.96) 0%, rgba(6,15,35,0.76) 42%, rgba(6,15,35,0.38) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(6,15,35,0.9) 0%, rgba(6,15,35,0.18) 52%, rgba(6,15,35,0.34) 100%)" }} />
      <div className="absolute left-0 top-0 h-full w-[44vw] bg-[#061027]/45" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[92rem] flex-col justify-center px-5 pb-12 pt-32 sm:px-10 sm:pb-16 sm:pt-36 lg:px-16 lg:pb-20 lg:pt-32 xl:px-20">
        <div className="lcp-instant grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(18rem,0.44fr)] xl:gap-16">
          <div className="home-hero-copy min-w-0" style={{ width: "100%", maxWidth: "min(50rem, calc(100vw - 2.5rem))" }}>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d5b866] sm:text-[11px] sm:tracking-[0.34em]">
              <span className="h-px w-8 bg-[#d5b866]" />
              <span>XIPHIAS Since 2009 · XIPHIAS Dubai Since 2017</span>
              <span lang="ar" dir="rtl" className="hidden font-arabic-display text-sm tracking-normal sm:inline">الهجرة والإقامة</span>
            </p>
            <h1 className={`${serifClass} mt-5 max-w-[13ch] text-[clamp(2.55rem,9.4vw,3.15rem)] font-medium leading-[0.96] text-white sm:max-w-[15ch] sm:text-[clamp(3.6rem,7.2vw,6.3rem)] lg:max-w-[15ch]`}>
              Top Immigration Consultants in Dubai
              <span className="mt-3 block text-[0.52em] italic leading-[1.05] text-[#d5b866] sm:mt-4 sm:text-[0.58em]">for UAE Visa, Residency and Citizenship</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-[14px] leading-6 text-white/78 sm:mt-6 sm:max-w-[42rem] sm:text-[17px] sm:leading-8 lg:text-[18px]">XIPHIAS assists with Dubai visa, UAE Golden Visa, residency, citizenship by investment and skilled migration services. Work with experienced immigration consultants in Dubai for complete eligibility, documentation and application support.</p>
            <div className="home-hero-actions mt-6 flex w-full max-w-full flex-col items-stretch gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center">
              <a href="/eligibility" className="group flex w-full max-w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0a1733] transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-7 sm:text-[13px] sm:tracking-[0.12em]" style={{ background: GOLD }}>Get a Free Eligibility Assessment<span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
              <a href="/personal-booking" className="flex w-full max-w-full items-center justify-center rounded-full border border-white/25 px-5 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#bfa15c] sm:w-auto sm:px-7 sm:text-[13px] sm:tracking-[0.12em]">Speak to a Dubai Immigration Consultant</a>
            </div>
            <div className="home-hero-chips mt-5 flex max-w-full flex-wrap gap-2 sm:mt-6">{HERO_QUICK.map(([label, href]) => <a key={label} href={href} className="shrink-0 rounded-full border px-3 py-1.5 text-[11px] text-white/76 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c] sm:px-3.5 sm:text-[12px]" style={{ borderColor: "rgba(191,161,92,0.38)" }}>{label}</a>)}</div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d5b866]">UAE-Licensed · Confidential Consultation · End-to-End Application Support</p>
          </div>

          <aside className="hidden border-l pl-8 lg:block" style={{ borderColor: "rgba(191,161,92,0.34)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d5b866]">Private advisory desk</p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6">
              {HERO_STATS.map((s) => (
                <div key={s.u} className="min-w-0">
                  <span className="block text-[clamp(1.55rem,2.1vw,2rem)] font-semibold tabular-nums text-[#d5b866]">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/52">{s.u}</span>
                </div>
              ))}
            </div>
            <ul className="mt-8 space-y-4 border-t pt-7 text-[14px] leading-6 text-white/72" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {HERO_PROOF.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[#d5b866]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[12px] font-semibold text-[#d5b866]">Licensed in the UAE · IMC &amp; ICCRC members</p>
          </aside>
        </div>
        <div className="mt-8 hidden max-w-[42rem] grid-cols-2 gap-x-5 gap-y-4 border-t pt-5 sm:grid lg:hidden" style={{ borderColor: "rgba(255,255,255,0.13)" }}>
          {HERO_STATS.map((s) => (
            <div key={s.u} className="min-w-0">
              <span className="block text-[1.55rem] font-semibold leading-none tabular-nums text-[#d5b866]">{s.v}</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/54">{s.u}</span>
            </div>
          ))}
          <p className="col-span-2 text-[12px] font-semibold text-[#d5b866]">Licensed in the UAE · IMC &amp; ICCRC members</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-2 text-white/55 lg:flex"><span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span><span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} /></div>
    </section>
  );
}

/* ─────────── 2 · WHAT BRINGS YOU HERE (interactive expanding panels) ─────────── */
const INTENTS: { no: string; title: string; line: string; tag: string; href: string; media: { type: "img" | "video"; src: string } }[] = [
  { no: "01", title: "Citizenship by Investment", line: "Secure second citizenship through eligible investment programs with support from top immigration consultants.", tag: "Explore Citizenship Programs", href: "/citizenship", media: { type: "img", src: IMG.family1 } },
  { no: "02", title: "Residency by Investment", line: "Explore UAE Golden Visa and global residency programs with trusted Golden Visa consultants in Dubai.", tag: "Compare Residency Programs", href: "/residency", media: { type: "img", src: IMG.family2 } },
  { no: "03", title: "Private Immigration Advisory", line: "The best immigration consultants assess your profile, budget, family and preferred destination.", tag: "Book a Private Consultation", href: "/personal-booking", media: { type: "video", src: V_ADVISOR } },
  { no: "04", title: "Corporate Mobility", line: "Dubai visa and UAE visa support for founders, executives, employees and international businesses.", tag: "Explore Global Corporate Mobility", href: "/corporate", media: { type: "img", src: IMG.corporate } },
];
function WhatBringsYou({ serifClass }: { serifClass: string }) {
  const [active, setActive] = useState(0);
  return (
    <section data-tone="light" className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <div className="mx-auto max-w-6xl">
        <Eyebrow ar="ما الذي تبحث عنه">What brings you here</Eyebrow>
        <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}><Rise text="Immigration Solutions for Investors, Families and Businesses" /></h2>
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
  { no: "01", title: "Private Consultation", line: "Our top immigration consultants assess your nationality, goals, family, budget and timeline.", detail: "Confidential profile assessment", img: IMG.dubai },
  { no: "02", title: "Program Selection", line: "We compare suitable UAE visa, Golden Visa, residency, citizenship and skilled migration pathways.", detail: "Cost · timeline · eligibility", img: IMG.portugal },
  { no: "03", title: "Application Management", line: "A dedicated advisor coordinates documentation, due diligence and application submission.", detail: "End-to-end coordination", img: IMG.greece },
  { no: "04", title: "Approval and Relocation", line: "We support the remaining immigration, passport and relocation formalities after approval.", detail: "Post-approval support", img: IMG.malta },
];
function Process({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-[#0a1733] px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20 lg:py-32">
      <Ambient tone="dark" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Eyebrow ar="كيف نعمل">How it works</Eyebrow>
          <h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05]`}>Our Immigration Consultation and <span className="italic" style={{ color: GOLD }}>Application Process</span></h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">A clear, managed path from your first private assessment through approval and relocation.</p>
        </div>

        <div className="relative mt-14 space-y-8 before:absolute before:bottom-8 before:left-[1.15rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-[#bfa15c]/70 before:via-[#bfa15c]/35 before:to-transparent sm:space-y-12 lg:before:left-1/2">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.no}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-14 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0"
            >
              <span className={`${serifClass} absolute left-0 top-6 z-10 grid h-10 w-10 place-items-center rounded-full border bg-[#0a1733] text-[14px] font-semibold lg:left-1/2 lg:-translate-x-1/2`} style={{ borderColor: `${GOLD}88`, color: GOLD }}>{s.no}</span>
              <div className={`group relative aspect-[16/10] overflow-hidden rounded-lg ${i % 2 ? "lg:col-start-2" : "lg:col-start-1"}`}>
                <Image src={s.img} alt={s.title} fill sizes="(min-width:1024px) 35rem, 100vw" className="object-cover [filter:grayscale(0.38)_brightness(0.76)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:scale-[1.035] group-hover:[filter:grayscale(0)_brightness(0.86)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061026]/55 via-transparent to-transparent" />
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
              </div>
              <div className={`mt-6 flex flex-col justify-center lg:mt-0 ${i % 2 ? "lg:col-start-1 lg:row-start-1 lg:text-right" : "lg:col-start-2"}`}>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>{s.detail}</span>
                <h3 className={`${serifClass} mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight`}>{s.title}</h3>
                <p className={`mt-4 max-w-md text-[15px] leading-relaxed text-white/65 ${i % 2 ? "lg:ml-auto" : ""}`}>{s.line}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex justify-center"><Btn href="/eligibility">Start Your Free Eligibility Assessment</Btn></div>
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
          <h2 className={`${serifClass} mt-7 text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.0]`}>Speak to an<br /><span className="italic" style={{ color: GOLD }}>Immigration Consultant in Dubai</span></h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">Tell us your destination, budget and family requirements. Our best immigration consultants will assess your eligibility and recommend suitable UAE visa, residency or citizenship options.</p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><Btn href="/eligibility">Get My Free Eligibility Assessment</Btn><Btn ghost href="https://wa.me/917406006061">WhatsApp Our Dubai Team</Btn></div>
          <p lang="ar" dir="rtl" className="mt-8 font-arabic-display text-2xl" style={{ color: GOLD }}>مستقبلك العالمي يبدأ من هنا</p>
          <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-white/45">Confidential · No obligation · Personalised guidance</p>
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

export default function AssembledHome({ serifClass, directory }: { serifClass: string; directory: DirectoryRegion[] }) {
  return (
    <div>
      <Header serifClass={serifClass} />
      <Hero serifClass={serifClass} />
      <ProgrammesDirectory serifClass={serifClass} regions={directory} />
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
