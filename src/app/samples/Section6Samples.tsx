"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const GOLD = "#bfa15c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
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

function CTA() {
  return (
    <a href="#" className="group mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b0e13] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
      Begin a private assessment
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

const RESULTS = [
  { rank: "01", place: "Grenada", prog: "Citizenship", pct: 96, note: "4 mo" },
  { rank: "02", place: "Portugal", prog: "Golden Visa", pct: 91, note: "6 mo" },
  { rank: "03", place: "United Arab Emirates", prog: "Golden Visa", pct: 88, note: "2 mo" },
];

/* ── V1 · Intelligence console (types a query, ranks routes) ──────────── */
function ConsoleVariant({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const QUERY = "Second passport · visa-free EU · under $400k";
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(0); // 0 typing · 1 analysing · 2 results

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(QUERY.slice(0, i));
      if (i >= QUERY.length) {
        clearInterval(id);
        setTimeout(() => setPhase(1), 350);
        setTimeout(() => setPhase(2), 1200);
      }
    }, 36);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="relative min-h-screen px-6 py-28 text-[#f3efe6] sm:px-12 lg:px-20" style={{ background: "#0b0e13" }}>
      <Badge>V1 · Intelligence console</Badge>
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow />
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.05]`}>
            Know your options,
            <br />
            <span className="italic" style={{ color: GOLD }}>before you ask.</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
            XIA, our intelligence engine, ranks every eligible pathway across 35 jurisdictions
            by cost, speed and certainty — privately, in minutes.
          </p>
          <CTA />
        </div>

        <div className="overflow-hidden rounded-md border" style={{ background: "#0e131b", borderColor: `${GOLD}40`, boxShadow: "0 40px 100px -40px rgba(0,0,0,0.6)" }}>
          <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: `${GOLD}26` }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">XIA · live</span>
          </div>
          <div className="p-6 font-mono text-[13px] sm:p-8">
            <div className="flex">
              <span style={{ color: GOLD }}>&gt;&nbsp;</span>
              <span className="text-white/90">{typed}</span>
              <span className="ml-0.5 inline-block w-2 animate-pulse" style={{ background: phase === 0 ? "#f3efe6" : "transparent", height: "1.1em" }} />
            </div>
            <div className="mt-4 text-white/40 transition-opacity duration-500" style={{ opacity: phase >= 1 ? 1 : 0 }}>
              XIA · analysing 35 jurisdictions…
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {RESULTS.map((r, i) => (
                <div key={r.place} className="transition-all duration-500" style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(12px)", transitionDelay: `${i * 140}ms` }}>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-white/85">
                      <span style={{ color: GOLD }}>{r.rank}</span>&nbsp;&nbsp;{r.place} · <span className="text-white/55">{r.prog}</span>
                    </span>
                    <span style={{ color: GOLD }}>{r.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full transition-[width] duration-1000 ease-out" style={{ width: phase >= 2 ? `${r.pct}%` : "0%", background: GOLD, transitionDelay: `${i * 140}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── V2 · Assessment card (score ring + match) ────────────────────────── */
function ScoreRing({ pct, serifClass }: { pct: number; serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="relative h-32 w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#ffffff18" strokeWidth="3" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray={c} style={{ strokeDashoffset: inView ? c * (1 - pct / 100) : c, transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${serifClass} text-[2.2rem] font-medium leading-none`} style={{ color: GOLD }}>{pct}%</span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/45">match</span>
      </div>
    </div>
  );
}

const CHIPS = ["Goal · Second passport", "Budget · $400k", "Timeline · 6 months", "Family · 4"];

function CardVariant({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#f3efe6] sm:px-12 lg:px-20" style={{ background: "#0c0f14" }}>
      <Badge>V2 · Assessment card</Badge>
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow />
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.05]`}>
            See every route
            <br />
            <span className="italic" style={{ color: GOLD }}>before you commit.</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
            Answer three private questions; XIA returns your best-matched pathways across
            35 jurisdictions — ranked by cost, speed and certainty.
          </p>
          <CTA />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8 }} className="rounded-lg border p-8" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))", borderColor: `${GOLD}33` }}>
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c, i) => (
              <motion.span key={c} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-full border px-3 py-1.5 text-[12px] text-white/75" style={{ borderColor: "#ffffff22" }}>
                {c}
              </motion.span>
            ))}
          </div>
          <div className="my-7 h-px w-full" style={{ background: "#ffffff14" }} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Top match</p>
          <div className="mt-4 flex items-center gap-6">
            <ScoreRing pct={96} serifClass={serifClass} />
            <div>
              <h3 className={`${serifClass} text-[2rem] font-medium leading-none`}>Grenada</h3>
              <p className="mt-1 text-[13px] uppercase tracking-[0.12em]" style={{ color: GOLD }}>Citizenship by Investment</p>
              <p className="mt-2 text-[13px] text-white/55">4 months · 140+ visa-free · family of 4</p>
            </div>
          </div>
          <p className="mt-6 text-[12px]" style={{ color: GOLD }}>+ 3 more matched routes →</p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Section6Samples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <ConsoleVariant serifClass={serifClass} />
      <CardVariant serifClass={serifClass} />
    </main>
  );
}
