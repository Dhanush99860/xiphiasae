"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Rise({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Fade({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}
const DUO = "object-cover [filter:grayscale(0.5)_brightness(0.7)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105";

const ARTICLES = [
  { cat: "Guide", title: "Caribbean citizenship by investment, compared", meta: "8 min read", img: "/images/citizenship/dominica/dominica-citizenship-by-investment.webp" },
  { cat: "Article", title: "Grenada CBI in 2025 — routes, costs & timeline", meta: "6 min read", img: "/images/citizenship/grenada/coral-bay-residences.webp" },
  { cat: "Insight", title: "Why a second citizenship now", meta: "5 min read", img: "/images/citizenship/turkey/bank-deposit-turkey.webp" },
];

function Insights({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
      <Ambient tone="light" />
      <Badge>Section 7 · Insights</Badge>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Insights<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">مقالات</span></p>
            <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium`}><Rise text="Read before you decide." /></h2>
          </div>
          <a href="#" className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>All insights →</a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Fade key={a.title} delay={i * 0.1}>
              <a href="#" className="group block">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-md">
                  <Image src={a.img} alt="" fill sizes="30vw" className={DUO} />
                  <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}26` }} />
                  <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a1733]" style={{ background: GOLD }}>{a.cat}</span>
                </div>
                <h3 className={`${serifClass} mt-4 text-[1.35rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{a.title}</h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-[#0c1f3f]/45">{a.meta}</p>
              </a>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Badge>Section 8 · Consultation CTA</Badge>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src="/images/citizenship/saint-lucia-citizenship/nef-saint-lucia.webp" alt="" fill sizes="100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.42)_contrast(1.05)]" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />Your next move<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">ابدأ الآن</span></p>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>Begin your <span className="italic" style={{ color: GOLD }}>second citizenship.</span></h2>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">Tell us your goal. A senior advisor will recommend the jurisdiction and route that fit — privately, and entirely off the record.</p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="#" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></a>
          <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]">Download the guide</a>
        </div>
        <p lang="ar" dir="rtl" className="mt-8 font-arabic-display text-2xl" style={{ color: GOLD }}>جنسيتك الثانية تبدأ من هنا</p>
        <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-white/45">By appointment · Dubai · London · Bengaluru</p>
      </div>
    </section>
  );
}

export default function SectionsCit78({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Insights serifClass={serifClass} />
      <CTA serifClass={serifClass} />
    </main>
  );
}
