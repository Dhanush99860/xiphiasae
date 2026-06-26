"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";

const GOLD = "#bfa15c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-50 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

function Header() {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      How it works
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">كيف نعمل</span>
    </p>
  );
}

type Step = { no: string; title: string; line: string; detail: string; img: string };
const STEPS: Step[] = [
  { no: "01", title: "Private consultation", line: "A confidential conversation about your goals, timeline and budget.", detail: "Senior advisor · under NDA", img: "/images/citizenship/dubai/dubai-country-image.webp" },
  { no: "02", title: "Strategy & route", line: "We map the most secure, cost-effective pathway across 25+ jurisdictions.", detail: "Cost · timeline · passport power", img: "/images/citizenship/grenada/grenada-citizenship.webp" },
  { no: "03", title: "Handled end to end", line: "Filing, liaison and follow-through — managed by your named advisor.", detail: "One desk · in writing", img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp" },
  { no: "04", title: "Arrival", line: "Your residency or citizenship secured — and we remain on call.", detail: "Banking · schooling · relocation", img: "/images/residency/uae/uae-golden-visa.webp" },
];

const DUO = "object-cover [filter:grayscale(0.75)_sepia(0.22)_contrast(1.05)_brightness(0.72)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_sepia(0)_brightness(0.85)] group-hover:scale-[1.04]";

function CardFace({ s, serifClass }: { s: Step; serifClass: string }) {
  return (
    <>
      <Image src={s.img} alt="" fill sizes="70vw" className={DUO} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.94) 0%, rgba(8,10,14,0.2) 55%, rgba(8,10,14,0.55) 100%)" }} />
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
      <span className={`${serifClass} pointer-events-none absolute right-8 top-4 text-[8rem] font-medium leading-none`} style={{ color: `${GOLD}22` }}>{s.no}</span>
      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{s.detail}</span>
        <h3 className={`${serifClass} mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight transition-colors duration-300 group-hover:text-[#bfa15c]`}>{s.title}</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/90">{s.line}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors group-hover:text-[#bfa15c]" style={{ color: "#f3efe6" }}>
          Read more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </>
  );
}

function usePinned(sectionRef: React.RefObject<HTMLDivElement | null>, trackRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px)", () => {
      const track = trackRef.current!;
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);
      const st = ScrollTrigger.create({ trigger: sectionRef.current!, start: "top top", end: () => `+=${getDist()}`, pin: true, scrub: 0.5, invalidateOnRefresh: true, onUpdate: (self) => gsap.set(track, { x: -getDist() * self.progress }) });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [sectionRef, trackRef]);
}

function usePinProgress(sectionRef: React.RefObject<HTMLDivElement | null>, setP: (n: number) => void, vh = 320) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px)", () => {
      const st = ScrollTrigger.create({ trigger: sectionRef.current!, start: "top top", end: `+=${vh}%`, pin: true, scrub: 0.5, onUpdate: (self) => setP(self.progress) });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [sectionRef, setP]);
}

function SectionShell({ badge, serifClass, children, bg = "#0b0e13" }: { badge: string; serifClass: string; children: React.ReactNode; bg?: string }) {
  return (
    <>
      <div className="px-6 pt-24 sm:px-12 lg:px-20" style={{ background: bg }}>
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium text-[#f3efe6]`}>The process.</h2>
      </div>
      <Badge>{badge}</Badge>
      {children}
    </>
  );
}

/* ── A1 · horizontal, ONE wide card at a time ─────────────────────────── */
function OneUp({ serifClass }: { serifClass: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  usePinned(sectionRef, trackRef);
  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pb-16 text-[#f3efe6]" style={{ background: "#0b0e13" }}>
      <SectionShell badge="A1 · One wide card at a time (horizontal)" serifClass={serifClass}>
        <div ref={trackRef} className="mt-10 flex flex-col gap-8 px-6 sm:px-12 lg:w-max lg:flex-row lg:items-center lg:gap-12 lg:px-20">
          {STEPS.map((s) => (
            <motion.a key={s.no} href="#" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="group relative block h-[440px] w-full shrink-0 overflow-hidden rounded-sm lg:h-[66vh] lg:w-[60rem]">
              <CardFace s={s} serifClass={serifClass} />
            </motion.a>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}

/* ── A2 · stacked deck — cards dealt one by one ───────────────────────── */
function Deck({ serifClass }: { serifClass: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  usePinProgress(sectionRef, setP, 340);
  const active = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden text-[#f3efe6]" style={{ background: "#0c0f14" }}>
      <SectionShell badge="A2 · Stacked deck (dealt one by one)" serifClass={serifClass} bg="#0c0f14">
        {/* desktop deck */}
        <div className="relative mx-auto hidden h-[64vh] max-w-3xl lg:block">
          {STEPS.map((s, i) => {
            const delta = i - active;
            let style: React.CSSProperties;
            if (delta < 0) style = { opacity: 0, transform: "translateY(-52px) scale(0.92)", zIndex: 5 };
            else if (delta === 0) style = { opacity: 1, transform: "translateY(0) scale(1)", zIndex: 30 };
            else if (delta === 1) style = { opacity: 0, transform: "translateY(70px) scale(0.96)", zIndex: 20 };
            else style = { opacity: 0, transform: "translateY(110px) scale(0.94)", zIndex: 10 };
            return (
              <a key={s.no} href="#" className="group absolute inset-0 block overflow-hidden rounded-sm transition-all duration-700" style={{ ...style, transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}>
                <CardFace s={s} serifClass={serifClass} />
              </a>
            );
          })}
          <div className="absolute -bottom-12 left-0 flex gap-2">
            {STEPS.map((s, i) => (
              <span key={s.no} className="h-1 w-10 rounded-full transition-colors duration-300" style={{ background: i <= active ? GOLD : "#ffffff22" }} />
            ))}
          </div>
        </div>
        {/* mobile fallback: simple stack */}
        <div className="flex flex-col gap-6 px-6 pb-16 pt-10 lg:hidden">
          {STEPS.map((s) => (
            <a key={s.no} href="#" className="group relative block h-[420px] overflow-hidden rounded-sm">
              <CardFace s={s} serifClass={serifClass} />
            </a>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}

/* ── A3 · cinematic swap — one frame, content crossfades per step ──────── */
function Swap({ serifClass }: { serifClass: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  usePinProgress(sectionRef, setP, 340);
  const active = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden text-[#f3efe6]" style={{ background: "#0b0e13" }}>
      <SectionShell badge="A3 · Cinematic swap (one frame, crossfade)" serifClass={serifClass}>
        <div className="relative mx-auto mt-10 hidden h-[68vh] max-w-6xl px-6 sm:px-12 lg:block lg:px-20">
          <div className="group relative h-full w-full overflow-hidden rounded-sm">
            {STEPS.map((s, i) => (
              <Image key={s.no} src={s.img} alt="" fill sizes="90vw" className="object-cover transition-opacity duration-700 [filter:grayscale(0.7)_sepia(0.2)_contrast(1.05)_brightness(0.7)]" style={{ opacity: i === active ? 1 : 0 }} />
            ))}
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,10,14,0.9) 0%, rgba(8,10,14,0.3) 55%, transparent 100%)" }} />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
            <motion.span key={`n${active}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.16, y: 0 }} transition={{ duration: 0.6 }} className={`${serifClass} pointer-events-none absolute right-10 top-6 text-[12rem] font-medium leading-none`} style={{ color: GOLD }}>{STEPS[active].no}</motion.span>
            <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center p-10 sm:p-16">
              <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{STEPS[active].detail}</span>
                <h3 className={`${serifClass} mt-3 text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-tight`}>{STEPS[active].title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-white/70">{STEPS[active].line}</p>
              </motion.div>
              <div className="mt-8 flex gap-2">
                {STEPS.map((s, i) => (
                  <span key={s.no} className="h-1 w-10 rounded-full transition-colors duration-300" style={{ background: i <= active ? GOLD : "#ffffff22" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* mobile fallback */}
        <div className="flex flex-col gap-6 px-6 pb-16 pt-10 lg:hidden">
          {STEPS.map((s) => (
            <a key={s.no} href="#" className="group relative block h-[420px] overflow-hidden rounded-sm">
              <CardFace s={s} serifClass={serifClass} />
            </a>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}

export default function Section4OneByOne({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <OneUp serifClass={serifClass} />
      <Deck serifClass={serifClass} />
      <Swap serifClass={serifClass} />
    </main>
  );
}
