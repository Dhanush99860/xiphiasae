"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">
      {children}
    </div>
  );
}

function Header() {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      Where we take you
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">وجهاتنا</span>
    </p>
  );
}

type Dest = { code: string; name: string; prog: string; time: string };
const DEST: Dest[] = [
  { code: "DXB", name: "United Arab Emirates", prog: "Golden Visa", time: "2 MONTHS" },
  { code: "LIS", name: "Portugal", prog: "Golden Visa", time: "6 MONTHS" },
  { code: "ATH", name: "Greece", prog: "Golden Visa", time: "3 MONTHS" },
  { code: "MLA", name: "Malta", prog: "Residency", time: "4 MONTHS" },
  { code: "GND", name: "Grenada", prog: "Citizenship", time: "4 MONTHS" },
  { code: "IST", name: "Türkiye", prog: "Citizenship", time: "5 MONTHS" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** Split-flap / departures-board scramble that settles left→right when in view. */
function SplitFlap({ text, className, startFrame = 0 }: { text: string; className?: string; startFrame?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [disp, setDisp] = useState(() => text.replace(/[^ ]/g, " "));
  useEffect(() => {
    if (!inView) return;
    let f = 0;
    const settle = (i: number) => startFrame + i * 2 + 6;
    const maxF = settle(text.length) + 2;
    const id = setInterval(() => {
      f++;
      setDisp(
        text
          .split("")
          .map((ch, i) => (ch === " " ? " " : f >= settle(i) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      if (f > maxF) {
        setDisp(text);
        clearInterval(id);
      }
    }, 45);
    return () => clearInterval(id);
  }, [inView, text, startFrame]);
  return <span ref={ref} className={className}>{disp}</span>;
}

/* ── V1 · Departures board (split-flap signature) ─────────────────────── */
function Board({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>V1 · Departures board (split-flap)</Badge>
      <div className="mx-auto max-w-5xl">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}>Departures.</h2>

        <div className="mt-12 rounded-sm border" style={{ borderColor: `${INK}1a` }}>
          <div className="grid grid-cols-[3.5rem_1fr_8rem] items-center gap-4 border-b px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#14110c]/40 sm:grid-cols-[4rem_1fr_9rem_7rem] sm:px-7" style={{ borderColor: `${INK}1a` }}>
            <span>Code</span>
            <span>Destination</span>
            <span className="hidden sm:block">Programme</span>
            <span className="text-right">Timeline</span>
          </div>
          {DEST.map((d, i) => (
            <a key={d.code} href="#" className="group grid grid-cols-[3.5rem_1fr_8rem] items-center gap-4 border-b px-5 py-5 transition-colors last:border-b-0 hover:bg-[color:rgba(191,161,92,0.08)] sm:grid-cols-[4rem_1fr_9rem_7rem] sm:px-7" style={{ borderColor: `${INK}12` }}>
              <span className="font-mono text-[15px] font-semibold tracking-widest" style={{ color: GOLD }}>
                <SplitFlap text={d.code} startFrame={i * 3} />
              </span>
              <span className={`${serifClass} text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-none transition-colors group-hover:text-[#bfa15c]`}>
                <SplitFlap text={d.name} startFrame={i * 3 + 4} />
              </span>
              <span className="hidden text-[12px] uppercase tracking-[0.12em] text-[#14110c]/55 sm:block">{d.prog}</span>
              <span className="text-right font-mono text-[12px] tracking-widest text-[#14110c]/70">{d.time}</span>
            </a>
          ))}
        </div>
        <p className="mt-6 text-right text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>35 destinations · view all →</p>
      </div>
    </section>
  );
}

/* ── V2 · Flight-route arc (gold arc draws, dot travels) ──────────────── */
function bez(t: number) {
  const p0 = { x: 60, y: 250 }, p1 = { x: 500, y: -40 }, p2 = { x: 940, y: 250 };
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

function RouteArc({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const dash = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const travelT = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const [hover, setHover] = useState<number | null>(null);
  const [planeXY, setPlaneXY] = useState(() => bez(0));
  useEffect(() => {
    const unsub = travelT.on("change", (t) => setPlaneXY(bez(Math.max(0, Math.min(1, t)))));
    return () => unsub();
  }, [travelT]);

  const ts = DEST.map((_, i) => 0.08 + (i * 0.84) / (DEST.length - 1));

  return (
    <section ref={ref} className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f3ecdf" }}>
      <Badge>V2 · Flight-route arc</Badge>
      <div className="mx-auto max-w-6xl">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}>Where we take you.</h2>

        <div className="relative mt-10">
          <svg viewBox="0 0 1000 300" className="w-full" style={{ overflow: "visible" }}>
            <path d="M60 250 Q500 -40 940 250" fill="none" stroke={`${INK}1a`} strokeWidth={1.5} />
            <motion.path d="M60 250 Q500 -40 940 250" pathLength={100} fill="none" stroke={GOLD} strokeWidth={1.5} strokeDasharray="100" style={{ strokeDashoffset: dash }} />
            {DEST.map((d, i) => {
              const pt = bez(ts[i]);
              const on = hover === i;
              return (
                <g key={d.code} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
                  <circle cx={pt.x} cy={pt.y} r={on ? 8 : 5} fill={on ? GOLD : "#f3ecdf"} stroke={GOLD} strokeWidth={1.5} style={{ transition: "r .2s" }} />
                  <text x={pt.x} y={pt.y - (i % 2 === 0 ? 18 : -28)} textAnchor="middle" className="font-mono" style={{ fontSize: 13, fill: GOLD, fontWeight: 600, letterSpacing: 2 }}>{d.code}</text>
                  <text x={pt.x} y={pt.y - (i % 2 === 0 ? 18 : -28) + (i % 2 === 0 ? -16 : 16)} textAnchor="middle" style={{ fontSize: 12, fill: INK, opacity: on ? 1 : 0.55 }}>{d.name}</text>
                </g>
              );
            })}
            <motion.circle r={5} fill={INK} style={{ cx: useTransform(travelT, (t) => bez(Math.max(0, Math.min(1, t))).x), cy: useTransform(travelT, (t) => bez(Math.max(0, Math.min(1, t))).y) }} />
            <motion.circle r={11} fill="none" stroke={INK} strokeWidth={1} opacity={0.4} style={{ cx: useTransform(travelT, (t) => bez(Math.max(0, Math.min(1, t))).x), cy: useTransform(travelT, (t) => bez(Math.max(0, Math.min(1, t))).y) }} />
          </svg>
          <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-[13px] text-[#14110c]/60">
            {hover !== null ? `${DEST[hover].name} — ${DEST[hover].prog} · ${DEST[hover].time}` : "Hover a destination · the route draws as you scroll"}
            <span aria-hidden className="block" style={{ height: 1, marginTop: 4, width: 120, marginInline: "auto", background: GOLD }} />
          </p>
        </div>

        <p className="mt-12 text-center text-[12px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>35 destinations · view all →</p>
      </div>
    </section>
  );
}

export default function Section5Samples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Board serifClass={serifClass} />
      <RouteArc serifClass={serifClass} />
    </main>
  );
}
