"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const GOLD = "#bfa15c";
const CARD = "#0e131b";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">
      {children}
    </div>
  );
}

function Eyebrow() {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      XIA · Intelligence
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الذكاء</span>
    </p>
  );
}

/* NEW text animation #1 — horizontal WIPE with a gold leading edge (per line). */
function WipeReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <span ref={ref} className={`relative inline-block overflow-hidden ${className ?? ""}`}>
      <span className="inline-block" style={{ clipPath: inView ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", transition: `clip-path 0.9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{text}</span>
      <span aria-hidden className="absolute bottom-1 top-1" style={{ width: 3, background: GOLD, left: inView ? "101%" : "-1%", opacity: inView ? 0 : 1, transition: `left 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, opacity 0.25s ${delay + 0.85}s` }} />
    </span>
  );
}

/* NEW text animation #2 — focus / blur-in per word. */
function BlurIn({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <motion.span key={i} style={{ display: "inline-block", marginInlineEnd: "0.26em" }} variants={{ hidden: { opacity: 0, filter: "blur(10px)", y: 6 }, show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

const ROUTES = [
  { rank: "01", place: "Grenada", prog: "Citizenship", invest: "$235k", time: "4 mo", visa: "144", pct: 96 },
  { rank: "02", place: "Portugal", prog: "Golden Visa", invest: "€500k", time: "6 mo", visa: "172", pct: 91 },
  { rank: "03", place: "United Arab Emirates", prog: "Golden Visa", invest: "AED 2M", time: "2 mo", visa: "185", pct: 88 },
  { rank: "04", place: "Malta", prog: "Residency", invest: "€150k", time: "4 mo", visa: "172", pct: 84 },
  { rank: "05", place: "Türkiye", prog: "Citizenship", invest: "$400k", time: "5 mo", visa: "118", pct: 80 },
];

function CTA() {
  return (
    <a href="#" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b0e13] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
      Begin a private assessment <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

/* ── V1 · Big intelligence dossier (table) — light bg, dark card ──────── */
function Dossier({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>V1 · Big dossier table · light bg / dark card · WIPE text</Badge>
      <div className="mx-auto max-w-6xl">
        <Eyebrow />
        <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.02]`}>
          <WipeReveal text="Know your options," className="block" />
          <span className="block italic" style={{ color: GOLD }}><WipeReveal text="before you ask." delay={0.25} /></span>
        </h2>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#14110c]/65">
          XIA ranks every eligible pathway across 35 jurisdictions by cost, speed, visa-free reach and
          certainty — privately, in minutes. A sample dossier:
        </p>

        <div ref={ref} className="mt-10 overflow-hidden rounded-lg" style={{ background: CARD, boxShadow: "0 50px 120px -50px rgba(20,17,12,0.5)" }}>
          <div className="flex items-center justify-between border-b px-7 py-4" style={{ borderColor: `${GOLD}2e` }}>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
              <span className="font-mono text-[12px] tracking-widest text-white/55">XIA · DOSSIER · 35 JURISDICTIONS</span>
            </div>
            <span className="font-mono text-[12px] text-white/35">query · second passport / visa-free EU / &lt;$400k</span>
          </div>
          <div className="grid grid-cols-[2.5rem_1fr_5rem_5rem] gap-4 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:grid-cols-[2.5rem_1.4fr_1fr_6rem_5rem_6rem_8rem]">
            <span>#</span><span>Destination</span><span className="hidden sm:block">Programme</span><span className="hidden sm:block">From</span><span>Time</span><span className="hidden sm:block">Visa-free</span><span className="text-right sm:text-left">Match</span>
          </div>
          {ROUTES.map((r, i) => (
            <div key={r.place} className="grid grid-cols-[2.5rem_1fr_5rem_5rem] items-center gap-4 border-t px-7 py-4 transition-all duration-500 sm:grid-cols-[2.5rem_1.4fr_1fr_6rem_5rem_6rem_8rem]" style={{ borderColor: "#ffffff10", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)", transitionDelay: `${i * 110}ms` }}>
              <span className="font-mono text-[13px]" style={{ color: GOLD }}>{r.rank}</span>
              <span className={`${serifClass} text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium text-[#f3efe6]`}>{r.place}</span>
              <span className="hidden text-[12px] uppercase tracking-[0.1em] text-white/55 sm:block">{r.prog}</span>
              <span className="hidden font-mono text-[12px] text-white/70 sm:block">{r.invest}</span>
              <span className="font-mono text-[12px] text-white/70">{r.time}</span>
              <span className="hidden font-mono text-[12px] text-white/70 sm:block">{r.visa}</span>
              <span className="col-span-1 flex items-center justify-end gap-2 sm:justify-start">
                <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-white/10 sm:block">
                  <span className="block h-full rounded-full transition-[width] duration-1000 ease-out" style={{ width: inView ? `${r.pct}%` : "0%", background: GOLD, transitionDelay: `${i * 110 + 200}ms` }} />
                </span>
                <span className="font-mono text-[13px]" style={{ color: GOLD }}>{r.pct}%</span>
              </span>
            </div>
          ))}
          <div className="flex flex-col items-start justify-between gap-4 border-t px-7 py-6 sm:flex-row sm:items-center" style={{ borderColor: `${GOLD}2e` }}>
            <span className="text-[13px] text-white/55">Your full dossier covers investment, timelines, due-diligence and family inclusion.</span>
            <CTA />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── V2 · Console + top-match dossier (two big dark cards) ─────────────── */
function ConsolePlus({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const QUERY = "Second passport · visa-free EU · family of 4 · under $400k";
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => { i++; setTyped(QUERY.slice(0, i)); if (i >= QUERY.length) { clearInterval(id); setTimeout(() => setPhase(1), 300); setTimeout(() => setPhase(2), 1100); } }, 30);
    return () => clearInterval(id);
  }, [inView]);
  const r = 52, c = 2 * Math.PI * r;
  const BREAK = [["Investment from", "$235,000"], ["Timeline", "4 months"], ["Visa-free", "144 countries"], ["Family", "Spouse + 2"], ["Due diligence", "Pre-cleared"]];
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f3ecdf" }}>
      <Badge>V2 · Console + dossier · light bg / dark cards · BLUR-IN text</Badge>
      <div className="mx-auto max-w-6xl">
        <Eyebrow />
        <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.02]`}>
          <BlurIn text="See every route" className="block" />
          <span className="block italic" style={{ color: GOLD }}><BlurIn text="before you commit." delay={0.3} /></span>
        </h2>

        <div ref={ref} className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* console */}
          <div className="overflow-hidden rounded-lg" style={{ background: CARD, boxShadow: "0 40px 100px -50px rgba(20,17,12,0.45)" }}>
            <div className="flex items-center gap-2 border-b px-6 py-4" style={{ borderColor: `${GOLD}2e` }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">XIA · live</span>
            </div>
            <div className="p-6 font-mono text-[13px] sm:p-7">
              <div className="flex flex-wrap"><span style={{ color: GOLD }}>&gt;&nbsp;</span><span className="text-white/90">{typed}</span></div>
              <div className="mt-4 text-white/40 transition-opacity duration-500" style={{ opacity: phase >= 1 ? 1 : 0 }}>analysing 35 jurisdictions · 5 matched…</div>
              <div className="mt-5 flex flex-col gap-3.5">
                {ROUTES.slice(0, 4).map((rt, i) => (
                  <div key={rt.place} className="transition-all duration-500" style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(10px)", transitionDelay: `${i * 120}ms` }}>
                    <div className="flex items-center justify-between text-[12px]"><span className="text-white/85"><span style={{ color: GOLD }}>{rt.rank}</span>&nbsp;&nbsp;{rt.place} · <span className="text-white/50">{rt.prog}</span></span><span style={{ color: GOLD }}>{rt.pct}%</span></div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full transition-[width] duration-1000 ease-out" style={{ width: phase >= 2 ? `${rt.pct}%` : "0%", background: GOLD, transitionDelay: `${i * 120}ms` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* top-match dossier */}
          <div className="flex flex-col rounded-lg p-7 text-[#f3efe6]" style={{ background: "#0b0e13", boxShadow: "0 40px 100px -50px rgba(20,17,12,0.45)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Top match</p>
            <div className="mt-4 flex items-center gap-5">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r={r} fill="none" stroke="#ffffff18" strokeWidth="3" />
                  <circle cx="60" cy="60" r={r} fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray={c} style={{ strokeDashoffset: inView ? c * (1 - 0.96) : c, transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1) 0.3s" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center"><span className={`${serifClass} text-[2rem] font-medium leading-none`} style={{ color: GOLD }}>96%</span><span className="text-[9px] uppercase tracking-[0.2em] text-white/45">match</span></div>
              </div>
              <div>
                <h3 className={`${serifClass} text-[2rem] font-medium leading-none`}>Grenada</h3>
                <p className="mt-1 text-[12px] uppercase tracking-[0.12em]" style={{ color: GOLD }}>Citizenship by Investment</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              {BREAK.map(([k, v], i) => (
                <div key={k} className="flex items-center justify-between border-t py-3 text-[13px] transition-all duration-500" style={{ borderColor: "#ffffff12", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(12px)", transitionDelay: `${600 + i * 90}ms` }}>
                  <span className="text-white/50">{k}</span><span className="font-medium text-white/90">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-7"><CTA /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Section6BigVariants({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Dossier serifClass={serifClass} />
      <ConsolePlus serifClass={serifClass} />
    </main>
  );
}
