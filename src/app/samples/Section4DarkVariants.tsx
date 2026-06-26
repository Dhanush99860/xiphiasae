"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";

const GOLD = "#bfa15c";
const DARK = "#0b0e13";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
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

type Step = { no: string; title: string; line: string; detail: string; img: string; w: string; h: string; self: string };
const STEPS: Step[] = [
  { no: "01", title: "Private consultation", line: "A confidential conversation about your goals, timeline and budget.", detail: "Senior advisor · under NDA", img: "/images/citizenship/dubai/dubai-country-image.webp", w: "lg:w-[32rem]", h: "lg:h-[62vh]", self: "lg:self-start" },
  { no: "02", title: "Strategy & route", line: "We map the most secure, cost-effective pathway across 25+ jurisdictions.", detail: "Cost · timeline · passport power", img: "/images/citizenship/grenada/grenada-citizenship.webp", w: "lg:w-[26rem]", h: "lg:h-[50vh]", self: "lg:self-end" },
  { no: "03", title: "Handled end to end", line: "Filing, liaison and follow-through — managed by your named advisor.", detail: "One desk · in writing", img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp", w: "lg:w-[36rem]", h: "lg:h-[58vh]", self: "lg:self-start" },
  { no: "04", title: "Arrival", line: "Your residency or citizenship secured — and we remain on call.", detail: "Banking · schooling · relocation", img: "/images/residency/uae/uae-golden-visa.webp", w: "lg:w-[28rem]", h: "lg:h-[54vh]", self: "lg:self-center" },
];

function usePinned(sectionRef: React.RefObject<HTMLDivElement | null>, trackRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    mm.add("(min-width:1024px)", () => {
      const track = trackRef.current!;
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);
      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: () => `+=${getDist()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set(track, { x: -getDist() * self.progress }),
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [sectionRef, trackRef]);
}

const ENTER = {
  initial: { opacity: 0, y: 70, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

/* ── V1 · DARK · image-filled, varied sizes, 1-by-1 parallax, hover→gold ── */
function ImageCards({ serifClass }: { serifClass: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  usePinned(sectionRef, trackRef);
  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-24 text-[#f3efe6]" style={{ background: DARK }}>
      <Badge>D1 · Dark · image-filled · varied · hover→gold</Badge>
      <div className="px-6 sm:px-12 lg:px-20">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium`}>The process.</h2>
      </div>
      <div ref={trackRef} className="mt-12 flex flex-col gap-8 px-6 sm:px-12 lg:mt-16 lg:w-max lg:flex-row lg:items-stretch lg:gap-10 lg:px-20">
        {STEPS.map((s) => (
          <motion.a key={s.no} href="#" {...ENTER} className={`group relative block h-[420px] w-full shrink-0 overflow-hidden rounded-sm ${s.w} ${s.h} ${s.self}`}>
            <Image src={s.img} alt="" fill sizes="40vw" className="object-cover [filter:grayscale(0.75)_sepia(0.25)_contrast(1.05)_brightness(0.7)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_sepia(0)_brightness(0.82)] group-hover:scale-[1.04]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.92) 0%, rgba(8,10,14,0.25) 55%, rgba(8,10,14,0.5) 100%)" }} />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
            <span className={`${serifClass} pointer-events-none absolute right-5 top-3 text-[6rem] font-medium leading-none`} style={{ color: `${GOLD}26` }}>{s.no}</span>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{s.detail}</span>
              <h3 className={`${serifClass} mt-2 text-[1.9rem] font-medium leading-tight transition-colors duration-300 group-hover:text-[#bfa15c]`}>{s.title}</h3>
              <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/85">{s.line}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors group-hover:text-[#bfa15c]" style={{ color: "#f3efe6" }}>
                Read more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ── V2 · DARK · type-led filled cards (number watermark + panel), varied ── */
function TypeCards({ serifClass }: { serifClass: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  usePinned(sectionRef, trackRef);
  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-24 text-[#f3efe6]" style={{ background: "#0c0f14" }}>
      <Badge>D2 · Dark · type-led filled · varied</Badge>
      <div className="px-6 sm:px-12 lg:px-20">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium`}>The process.</h2>
      </div>
      <div ref={trackRef} className="mt-12 flex flex-col gap-8 px-6 sm:px-12 lg:mt-16 lg:w-max lg:flex-row lg:items-stretch lg:gap-10 lg:px-20">
        {STEPS.map((s) => (
          <motion.a
            key={s.no}
            href="#"
            {...ENTER}
            className={`group relative flex h-[360px] w-full shrink-0 flex-col justify-between overflow-hidden rounded-sm border p-8 ${s.w} ${s.h} ${s.self}`}
            style={{ borderColor: `${GOLD}2e`, background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0))" }}
          >
            <span className={`${serifClass} pointer-events-none absolute -right-2 -top-6 text-[10rem] font-medium leading-none transition-colors duration-500`} style={{ color: `${GOLD}1f` }}>{s.no}</span>
            <div className="relative">
              <span className="h-px w-10" style={{ background: GOLD, display: "block" }} />
              <span className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{s.detail}</span>
            </div>
            <div className="relative">
              <h3 className={`${serifClass} text-[2rem] font-medium leading-tight transition-colors duration-300 group-hover:text-[#bfa15c]`}>{s.title}</h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/85">{s.line}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors group-hover:text-[#bfa15c]" style={{ color: "#f3efe6" }}>
                Read more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export default function Section4DarkVariants({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <ImageCards serifClass={serifClass} />
      <TypeCards serifClass={serifClass} />
    </main>
  );
}
