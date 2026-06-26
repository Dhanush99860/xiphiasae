"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Ambient from "./Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

const ITEMS = [
  { t: "Citizenship by Investment", line: "A second passport in 3–6 months — donation or real estate.", chip: "10 programmes", img: "/images/citizenship/grenada/grenada-citizenship.webp" },
  { t: "Residency & Golden Visas", line: "Live, work and retire across 35 jurisdictions.", chip: "20+ programmes", img: "/images/residency/uae/uae-golden-visa.webp" },
  { t: "Skilled & Corporate Migration", line: "Talent, founders and whole teams — relocated.", chip: "Canada · Australia · UK", img: "/images/corporate/uae/dubai-corporate-immigration.webp" },
  { t: "Source-of-funds & due diligence", line: "Pre-cleared before a single file is filed.", chip: "Under NDA", img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp" },
  { t: "Relocation, banking & schooling", line: "Settled in — not just approved.", chip: "End to end", img: "/images/Pexels/pexels-gatsby-yang-857486579-37669246.jpg" },
  { t: "Lifetime concierge", line: "Advisors retained for life, not for a transaction.", chip: "On call", img: "/images/citizenship/dubai/dubai-country-image.webp" },
];

function Row({ item, i, serifClass }: { item: (typeof ITEMS)[number]; i: number; serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const flip = i % 2 === 1;
  return (
    <div ref={ref} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg">
        <motion.div className="absolute -inset-y-[16%] inset-x-0" style={{ y }}>
          <Image src={item.img} alt={item.t} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover [filter:grayscale(0.45)_brightness(0.7)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,18,42,0.45), transparent 55%)" }} />
        <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={flip ? "lg:pe-4" : "lg:ps-4"}>
        <span className={`${serifClass} text-[2.2rem] font-medium leading-none`} style={{ color: `${GOLD}66` }}>0{i + 1}</span>
        <h3 className={`${serifClass} mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight`}>{item.t}</h3>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/70">{item.line}</p>
        <span className="mt-5 inline-flex rounded-full border px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/80" style={{ borderColor: `${GOLD}55` }}>{item.chip}</span>
      </motion.div>
    </div>
  );
}

export default function WhatWeProvide({ serifClass }: { serifClass: string }) {
  return (
    <section data-tone="dark" className="relative isolate px-6 py-28 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
      <Ambient tone="dark" />
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />What we provide<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">ما نقدمه</span></p>
        <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.04]`}>Everything, handled by <span className="italic" style={{ color: GOLD }}>one desk.</span></h2>
        <div className="mt-16 flex flex-col gap-24">
          {ITEMS.map((item, i) => <Row key={item.t} item={item} i={i} serifClass={serifClass} />)}
        </div>
      </div>
    </section>
  );
}
