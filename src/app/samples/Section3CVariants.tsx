"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">
      {children}
    </div>
  );
}

const DUO = "[filter:grayscale(0.72)_sepia(0.32)_contrast(1.05)_brightness(0.94)] transition-[filter,transform] duration-700 ease-out group-hover:[filter:grayscale(0)_sepia(0)]";

function Tint() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" style={{ background: `linear-gradient(135deg, ${INK}55 0%, transparent 45%, ${GOLD}33 100%)`, mixBlendMode: "multiply" }} />
      <div className="pointer-events-none absolute inset-0 z-10" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
    </>
  );
}

function Header() {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      What we secure
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">خدماتنا</span>
    </p>
  );
}

const PROGRAMMES = [
  { no: "01", name: "Golden Visa", line: "Long-term residency by investment — the UAE, Portugal, Greece and more.", stat: "2–8 months", img: "/images/residency/uae/uae-golden-visa.webp" },
  { no: "02", name: "Citizenship by Investment", line: "A second passport in 4–6 months — the Caribbean, Malta, Türkiye.", stat: "140+ visa-free", img: "/images/citizenship/grenada/grenada-citizenship.webp" },
  { no: "03", name: "Residency & Relocation", line: "Skilled, corporate and family routes to permanent residency.", stat: "PR pathways", img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp" },
];

type P = (typeof PROGRAMMES)[number];

function Text({ p, serifClass, flip }: { p: P; serifClass: string; flip: boolean }) {
  return (
    <div className={flip ? "lg:pe-4" : "lg:ps-4"}>
      <span className="text-[12px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{p.no}</span>
      <h3 className={`${serifClass} mt-2 text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-tight`}>{p.name}</h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#14110c]/65">{p.line}</p>
      <a href="#" className="group/cta mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
        <span className="relative">
          Explore
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/cta:scale-x-100" />
        </span>
        <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
      </a>
    </div>
  );
}

/* ── V1 · counter-parallax (image & text drift opposite) + colour-on-hover ── */
function Row1({ p, i, serifClass }: { p: P; i: number; serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const txtY = useTransform(scrollYProgress, [0, 1], [-36, 36]);
  const flip = i % 2 === 1;
  return (
    <div ref={ref} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <a href="#" className="group relative block aspect-[5/4] w-full overflow-hidden rounded-sm">
        <motion.div className="absolute -inset-y-[16%] inset-x-0" style={{ y: imgY }}>
          <Image src={p.img} alt="" fill sizes="45vw" className={`object-cover ${DUO} group-hover:scale-[1.03]`} />
        </motion.div>
        <Tint />
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-[#0b0e13]" style={{ background: GOLD }}>{p.stat}</span>
        </div>
      </a>
      <motion.div style={{ y: txtY }}>
        <Text p={p} serifClass={serifClass} flip={flip} />
      </motion.div>
    </div>
  );
}

/* ── V2 · in-frame parallax (image drifts inside a held frame) + cursor tilt ── */
function Row2({ p, i, serifClass }: { p: P; i: number; serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const innerY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const txtX = useTransform(scrollYProgress, [0, 0.45], [i % 2 === 1 ? 70 : -70, 0]);
  const flip = i % 2 === 1;
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
  };
  return (
    <div ref={ref} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`} style={{ perspective: 1000 }}>
      <a
        href="#"
        onPointerMove={onMove}
        onPointerLeave={(e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); }}
        className="group relative block aspect-[5/4] w-full overflow-hidden rounded-sm transition-transform duration-300"
        style={{ transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))", transformStyle: "preserve-3d" }}
      >
        <motion.div className="absolute -inset-y-[16%] inset-x-0" style={{ y: innerY }}>
          <Image src={p.img} alt="" fill sizes="45vw" className={`object-cover ${DUO}`} />
        </motion.div>
        <Tint />
        {/* gold corner frame draws on hover */}
        <span className="pointer-events-none absolute left-3 top-3 z-20 h-6 w-6 border-l border-t opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ borderColor: GOLD }} />
        <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-6 w-6 border-b border-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ borderColor: GOLD }} />
      </a>
      <motion.div style={{ x: txtX }}>
        <Text p={p} serifClass={serifClass} flip={flip} />
      </motion.div>
    </div>
  );
}

/* ── V3 · clip-reveal on scroll + scale-settle + colour-on-hover ─────────── */
function Row3({ p, i, serifClass }: { p: P; i: number; serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const clipBottom = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useTransform(clipBottom, (v) => `inset(0% 0% ${v}% 0%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const flip = i % 2 === 1;
  return (
    <div ref={ref} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <motion.a href="#" className="group relative block aspect-[5/4] w-full overflow-hidden rounded-sm" style={{ clipPath: clip }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={p.img} alt="" fill sizes="45vw" className={`object-cover ${DUO} group-hover:scale-[1.03]`} />
        </motion.div>
        <Tint />
      </motion.a>
      <Text p={p} serifClass={serifClass} flip={flip} />
    </div>
  );
}

function Block({ title, badge, serifClass, Row }: { title: string; badge: string; serifClass: string; Row: (props: { p: P; i: number; serifClass: string }) => React.ReactElement }) {
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>{badge}</Badge>
      <div className="mx-auto max-w-6xl">
        <Header />
        <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-[#14110c]/40">{title}</p>
        <div className="mt-14 flex flex-col gap-24">
          {PROGRAMMES.map((p, i) => (
            <Row key={p.name} p={p} i={i} serifClass={serifClass} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Section3CVariants({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Block badge="C1 · Counter-parallax + colour-on-hover" title="Scroll: image & text drift opposite · Hover: photo goes full colour + stat" serifClass={serifClass} Row={Row1} />
      <Block badge="C2 · In-frame parallax + cursor tilt" title="Scroll: image drifts inside the held frame, text slides in · Hover: 3D tilt to cursor + gold corners" serifClass={serifClass} Row={Row2} />
      <Block badge="C3 · Clip-reveal on scroll" title="Scroll: image wipes open + settles from a zoom · Hover: full colour" serifClass={serifClass} Row={Row3} />
    </main>
  );
}
