"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">{children}</div>;
}
function Eyebrow() {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />XIA · Intelligence<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الذكاء</span></p>;
}

/* ── A · Ask XIA — interactive inputs, live result ────────────────────── */
const GOALS = [{ k: "passport", label: "A second passport" }, { k: "residency", label: "A golden visa" }, { k: "relocate", label: "To relocate" }] as const;
const BUDGETS = ["$200k", "$400k", "$1M+"];
const PRIORITIES = ["Fastest", "Best value", "Most access"];
const RESULTS: Record<string, { country: string; prog: string; score: number; facts: [string, string][] }> = {
  passport: { country: "Grenada", prog: "Citizenship by Investment", score: 96, facts: [["Investment", "$235k"], ["Timeline", "4 months"], ["Visa-free", "144"]] },
  residency: { country: "United Arab Emirates", prog: "Golden Visa", score: 92, facts: [["Investment", "AED 2M"], ["Timeline", "2 months"], ["Renewable", "10 yrs"]] },
  relocate: { country: "Portugal", prog: "Golden Visa", score: 89, facts: [["Investment", "€500k"], ["Timeline", "6 months"], ["Path to EU", "Yes"]] },
};
function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className="rounded-full border px-4 py-2 text-[13px] transition-colors duration-200" style={{ borderColor: on ? GOLD : `${INK}22`, background: on ? GOLD : "transparent", color: on ? "#0b0e13" : `${INK}aa`, fontWeight: on ? 600 : 400 }}>{children}</button>;
}
function AskXIA({ serifClass }: { serifClass: string }) {
  const [goal, setGoal] = useState<string>("passport");
  const [budget, setBudget] = useState(1);
  const [prio, setPrio] = useState(0);
  const r = RESULTS[goal];
  const rad = 52, c = 2 * Math.PI * rad;
  return (
    <section className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f3ecdf" }}>
      <Badge>A · Ask XIA (interactive)</Badge>
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <Eyebrow />
          <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.02]`}>Ask XIA.</h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#14110c]/65">Three quick answers; XIA returns your best-matched route in real time.</p>
          <div className="mt-9 space-y-7">
            <div><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14110c]/45">I want…</p><div className="flex flex-wrap gap-2.5">{GOALS.map((g) => <Chip key={g.k} on={goal === g.k} onClick={() => setGoal(g.k)}>{g.label}</Chip>)}</div></div>
            <div><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14110c]/45">Budget</p><div className="flex flex-wrap gap-2.5">{BUDGETS.map((bd, i) => <Chip key={bd} on={budget === i} onClick={() => setBudget(i)}>{bd}</Chip>)}</div></div>
            <div><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14110c]/45">Priority</p><div className="flex flex-wrap gap-2.5">{PRIORITIES.map((pr, i) => <Chip key={pr} on={prio === i} onClick={() => setPrio(i)}>{pr}</Chip>)}</div></div>
          </div>
        </div>
        <div className="rounded-lg p-8 text-[#f3efe6]" style={{ background: "#0b0e13", boxShadow: "0 40px 100px -50px rgba(20,17,12,0.5)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Your best match</p>
          <div className="mt-5 flex items-center gap-6">
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90"><circle cx="60" cy="60" r={rad} fill="none" stroke="#ffffff18" strokeWidth="3" /><motion.circle cx="60" cy="60" r={rad} fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray={c} animate={{ strokeDashoffset: c * (1 - r.score / 100) }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} /></svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><motion.span key={r.score} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${serifClass} text-[2rem] font-medium leading-none`} style={{ color: GOLD }}>{r.score}%</motion.span><span className="text-[9px] uppercase tracking-[0.2em] text-white/45">match</span></div>
            </div>
            <motion.div key={goal} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}><h3 className={`${serifClass} text-[2rem] font-medium leading-none`}>{r.country}</h3><p className="mt-1 text-[12px] uppercase tracking-[0.12em]" style={{ color: GOLD }}>{r.prog}</p></motion.div>
          </div>
          <div className="mt-7 flex flex-col">{r.facts.map(([k, v]) => <div key={k} className="flex items-center justify-between border-t py-3 text-[13px]" style={{ borderColor: "#ffffff12" }}><span className="text-white/50">{k}</span><span className="font-medium text-white/90">{v}</span></div>)}</div>
          <a href="#" className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b0e13]" style={{ background: GOLD }}>See the full dossier →</a>
        </div>
      </div>
    </section>
  );
}

/* ── B · Route intelligence map (arc draws, dot travels, hover nodes) ──── */
const NODES = [{ code: "GND", name: "Grenada", note: "Citizenship · 96%" }, { code: "LIS", name: "Portugal", note: "Golden Visa · 91%" }, { code: "DXB", name: "United Arab Emirates", note: "Golden Visa · 88%" }, { code: "MLA", name: "Malta", note: "Residency · 84%" }, { code: "IST", name: "Türkiye", note: "Citizenship · 80%" }];
function bez(t: number) { const p0 = { x: 60, y: 250 }, p1 = { x: 500, y: -30 }, p2 = { x: 940, y: 250 }; const m = 1 - t; return { x: m * m * p0.x + 2 * m * t * p1.x + t * t * p2.x, y: m * m * p0.y + 2 * m * t * p1.y + t * t * p2.y }; }
function RouteMap({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const dash = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const tT = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const [hover, setHover] = useState<number | null>(null);
  const [xy, setXY] = useState(() => bez(0));
  useEffect(() => { const u = tT.on("change", (t) => setXY(bez(Math.max(0, Math.min(1, t))))); return () => u(); }, [tT]);
  const ts = NODES.map((_, i) => 0.08 + (i * 0.84) / (NODES.length - 1));
  return (
    <section ref={ref} className="relative px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f3ecdf" }}>
      <Badge>B · Route intelligence map</Badge>
      <div className="mx-auto max-w-6xl">
        <Eyebrow />
        <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,5vw,4rem)] font-medium`}>XIA maps your route.</h2>
        <p className="mt-4 max-w-xl text-[15px] text-[#14110c]/60">Every eligible jurisdiction, evaluated by cost, speed and certainty — your strongest path, drawn.</p>
        <div className="relative mt-8">
          <svg viewBox="0 0 1000 300" className="w-full" style={{ overflow: "visible" }}>
            <path d="M60 250 Q500 -30 940 250" fill="none" stroke={`${INK}18`} strokeWidth={1.5} />
            <motion.path d="M60 250 Q500 -30 940 250" pathLength={100} fill="none" stroke={GOLD} strokeWidth={1.5} strokeDasharray="100" style={{ strokeDashoffset: dash }} />
            {NODES.map((n, i) => { const pt = bez(ts[i]); const on = hover === i; return (
              <g key={n.code} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
                <circle cx={pt.x} cy={pt.y} r={on ? 8 : 5} fill={on ? GOLD : "#f3ecdf"} stroke={GOLD} strokeWidth={1.5} style={{ transition: "r .2s" }} />
                <text x={pt.x} y={pt.y - (i % 2 === 0 ? 18 : -28)} textAnchor="middle" className="font-mono" style={{ fontSize: 13, fill: GOLD, fontWeight: 600, letterSpacing: 2 }}>{n.code}</text>
              </g>
            ); })}
            <motion.circle r={5} fill={INK} style={{ cx: useTransform(tT, (t) => bez(Math.max(0, Math.min(1, t))).x), cy: useTransform(tT, (t) => bez(Math.max(0, Math.min(1, t))).y) }} />
            <motion.circle r={11} fill="none" stroke={INK} strokeWidth={1} opacity={0.35} style={{ cx: useTransform(tT, (t) => bez(Math.max(0, Math.min(1, t))).x), cy: useTransform(tT, (t) => bez(Math.max(0, Math.min(1, t))).y) }} />
          </svg>
          <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-[13px] text-[#14110c]/60">{hover !== null ? `${NODES[hover].name} — ${NODES[hover].note}` : "Hover a jurisdiction · the route draws as you scroll"}<span aria-hidden className="mx-auto mt-1 block h-px w-28" style={{ background: GOLD }} /></p>
        </div>
        <div className="mt-12 flex justify-center"><a href="#" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b0e13]" style={{ background: GOLD }}>Begin a private assessment →</a></div>
      </div>
    </section>
  );
}

export default function Section6Creative({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <AskXIA serifClass={serifClass} />
      <RouteMap serifClass={serifClass} />
    </main>
  );
}
