"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">
      {children}
    </div>
  );
}

function Rise({ text, className, delay = 0, stagger = 0.05 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}>
          <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function Fade({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

/** Low-res photo, treated as a warm duotone so resolution never shows. */
function Duotone({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image src={src} alt="" fill sizes="40vw" className="object-cover" style={{ filter: "grayscale(0.7) sepia(0.35) contrast(1.05) brightness(0.92)" }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${INK}55 0%, transparent 45%, ${GOLD}33 100%)`, mixBlendMode: "multiply" }} />
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}40` }} />
    </div>
  );
}

const PROGRAMMES = [
  { no: "01", name: "Golden Visa", line: "Long-term residency by investment — the UAE, Portugal, Greece and more.", img: "/images/residency/uae/uae-golden-visa.webp" },
  { no: "02", name: "Citizenship by Investment", line: "A second passport in 4–6 months — the Caribbean, Malta, Türkiye.", img: "/images/citizenship/grenada/grenada-citizenship.webp" },
  { no: "03", name: "Residency & Relocation", line: "Skilled, corporate and family routes to permanent residency.", img: "/images/residency/singapore/singapore-gip-pr-investment-hero.webp" },
];

function Header({ center = false }: { center?: boolean }) {
  return (
    <>
      <Fade>
        <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}>
          <span className="h-px w-8" style={{ background: GOLD }} />
          What we secure
          <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">خدماتنا</span>
        </p>
      </Fade>
    </>
  );
}

/* ── A · refined cards, 3-up ──────────────────────────────────────────── */
function Cards({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>A · Programme cards</Badge>
      <div className="mx-auto max-w-6xl text-center">
        <div className="flex justify-center"><Header center /></div>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}>
          <Rise text="What we secure." />
        </h2>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
        {PROGRAMMES.map((p, i) => (
          <Fade key={p.name} delay={i * 0.1}>
            <a href="#" className="group block">
              <Duotone src={p.img} className="aspect-[4/3] w-full rounded-sm" />
              <div className="mt-5">
                <span className="text-[12px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{p.no}</span>
                <h3 className={`${serifClass} mt-1 text-[1.7rem] font-medium leading-tight`}>{p.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#14110c]/65">{p.line}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                  Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/* ── B · editorial index ──────────────────────────────────────────────── */
function Index({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>B · Editorial index</Badge>
      <div className="mx-auto max-w-5xl">
        <Header />
        <ul className="mt-12">
          {PROGRAMMES.map((p) => (
            <li key={p.name} className="border-t" style={{ borderColor: `${INK}1a` }}>
              <a href="#" className="group flex items-center gap-6 py-7">
                <span className="text-[12px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{p.no}</span>
                <div className="min-w-0 flex-1">
                  <h3 className={`${serifClass} text-[clamp(1.8rem,4vw,3rem)] font-medium leading-tight transition-colors`}>{p.name}</h3>
                  <p className="mt-1 text-[14px] text-[#14110c]/60">{p.line}</p>
                </div>
                <Duotone src={p.img} className="h-20 w-28 shrink-0 rounded-sm opacity-80 transition-all duration-500 group-hover:h-24 group-hover:w-36 group-hover:opacity-100 sm:h-24 sm:w-40" />
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1" style={{ color: GOLD }}>→</span>
              </a>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: `${INK}1a` }} />
        </ul>
      </div>
    </section>
  );
}

/* ── C · alternating duotone rows ─────────────────────────────────────── */
function Rows({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>C · Alternating rows</Badge>
      <div className="mx-auto max-w-6xl">
        <Header />
        <div className="mt-14 flex flex-col gap-20">
          {PROGRAMMES.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Fade key={p.name} delay={0.05}>
                <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <Duotone src={p.img} className="aspect-[5/4] w-full rounded-sm" />
                  <div className={flip ? "lg:pe-4" : "lg:ps-4"}>
                    <span className="text-[12px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{p.no}</span>
                    <h3 className={`${serifClass} mt-2 text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-tight`}>{p.name}</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#14110c]/65">{p.line}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                      Explore <span>→</span>
                    </span>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Section3Samples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Cards serifClass={serifClass} />
      <Index serifClass={serifClass} />
      <Rows serifClass={serifClass} />
    </main>
  );
}
