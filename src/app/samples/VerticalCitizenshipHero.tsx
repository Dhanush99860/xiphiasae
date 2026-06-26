"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const IVORY = "#eef3fb";
const IMG_CARIB = "/images/citizenship/grenada/grenada-citizenship.webp";
const IMG_FAMILY = "/images/Pexels/pexels-m-munzevi-2155457440-37119543.jpg";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Crumb({ dark }: { dark?: boolean }) {
  const c = dark ? "rgba(238,243,251,0.55)" : "rgba(12,31,63,0.5)";
  return <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: c }}>Home <span style={{ color: GOLD }}>/</span> Citizenship by Investment</p>;
}
function Eyebrow({ center }: { center?: boolean }) {
  return <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Citizenship by Investment<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الجنسية بالاستثمار</span></p>;
}
const CHIPS = ["Private client service", "Due-diligence desk", "Discreet & confidential"];
function Actions({ dark }: { dark?: boolean }) {
  return (
    <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <a href="#" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
      <a href="#" className={`inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${dark ? "border-white/25 text-white hover:border-[#bfa15c]" : "border-[#0c1f3f]/25 text-[#0c1f3f] hover:border-[#0c1f3f]/60"}`}>Download the guide</a>
    </div>
  );
}

/* ── A · Full-bleed cinematic hero (treated image + navy) ─────────────── */
function HeroFullBleed({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <Badge>A · Full-bleed cinematic</Badge>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src={IMG_CARIB} alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.5)_brightness(0.62)_contrast(1.05)]" priority />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
        <div className="mb-8 pt-24"><Crumb dark /></div>
        <Eyebrow />
        <h1 className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.98]`}>Second citizenship,<br /><span className="italic" style={{ color: GOLD }}>first-class advisory.</span></h1>
        <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">Donation and real-estate routes across the Caribbean, Malta and Türkiye — arranged end-to-end, with transparent costs and rigorous compliance.</p>
        <Actions dark />
        <div className="mt-10 flex flex-wrap gap-2.5">{CHIPS.map((c) => <span key={c} className="rounded-full border px-3 py-1.5 text-[12px] text-white/70" style={{ borderColor: "rgba(191,161,92,0.4)" }}>{c}</span>)}</div>
      </div>
    </section>
  );
}

/* ── B · Split hero (navy text left, framed media right, key facts) ───── */
const FACTS: [string, string][] = [["From", "$235k"], ["Timeline", "4–6 months"], ["Visa-free", "140+"], ["Family", "Included"]];
function HeroSplit({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
      <Badge>B · Split + key facts</Badge>
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 sm:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20">
        <div className="pt-24 lg:pt-0">
          <Crumb dark />
          <div className="mt-7"><Eyebrow /></div>
          <h1 className={`${serifClass} mt-6 text-[clamp(2.6rem,5.2vw,4.8rem)] font-medium leading-[0.98]`}>Second citizenship,<br /><span className="italic" style={{ color: GOLD }}>first-class advisory.</span></h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/75">Concierge guidance across donation and real-estate routes — a private-client approach to a second passport, without friction.</p>
          <Actions dark />
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t pt-7 sm:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {FACTS.map(([k, v]) => <div key={k}><div className={`${serifClass} text-[1.7rem] font-medium`} style={{ color: GOLD }}>{v}</div><div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/45">{k}</div></div>)}
          </div>
        </div>
        <div className="relative hidden h-[78vh] overflow-hidden rounded-md lg:block" style={{ boxShadow: "0 50px 120px -40px rgba(0,0,0,0.6)" }}>
          <div className="absolute inset-0 z-10" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }} />
          <Image src={IMG_FAMILY} alt="" fill sizes="50vw" className="object-cover [filter:grayscale(0.35)_brightness(0.8)_contrast(1.05)]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.7), transparent 55%)" }} />
          <div className="absolute inset-x-0 bottom-0 p-8"><p className="text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>A future your family inherits</p></div>
        </div>
      </div>
    </section>
  );
}

export default function VerticalCitizenshipHero({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <HeroFullBleed serifClass={serifClass} />
      <HeroSplit serifClass={serifClass} />
    </main>
  );
}
