"use client";

import { useEffect, useRef, useState } from "react";

const GOLD = "#bfa15c";
const INK = "#14110c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-black/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">
      {children}
    </div>
  );
}

function Header({ light = true }: { light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      Where we take you
      <span lang="ar" dir="rtl" className={`font-arabic-display text-sm tracking-normal ${light ? "" : "text-[#bfa15c]"}`}>وجهاتنا</span>
    </p>
  );
}

type Dest = { code: string; name: string; prog: string; time: string; status: string };
const DEST: Dest[] = [
  { code: "DXB", name: "United Arab Emirates", prog: "Golden Visa", time: "2 MONTHS", status: "OPEN" },
  { code: "LIS", name: "Portugal", prog: "Golden Visa", time: "6 MONTHS", status: "OPEN" },
  { code: "ATH", name: "Greece", prog: "Golden Visa", time: "3 MONTHS", status: "OPEN" },
  { code: "MLA", name: "Malta", prog: "Residency", time: "4 MONTHS", status: "LIMITED" },
  { code: "GND", name: "Grenada", prog: "Citizenship", time: "4 MONTHS", status: "OPEN" },
  { code: "IST", name: "Türkiye", prog: "Citizenship", time: "5 MONTHS", status: "NEW" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function SplitFlap({ text, className, startFrame = 0 }: { text: string; className?: string; startFrame?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [disp, setDisp] = useState(() => text.replace(/[^ ]/g, " "));
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        let f = 0;
        const settle = (i: number) => startFrame + i * 2 + 6;
        const maxF = settle(text.length) + 2;
        const id = setInterval(() => {
          f++;
          setDisp(text.split("").map((ch, i) => (ch === " " ? " " : f >= settle(i) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)])).join(""));
          if (f > maxF) { setDisp(text); clearInterval(id); }
        }, 45);
      }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [text, startFrame]);
  return <span ref={ref} className={className}>{disp}</span>;
}

function StatusPill({ status, dark = false }: { status: string; dark?: boolean }) {
  const open = status === "OPEN";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
      style={{
        color: open ? GOLD : dark ? "#0c0f14" : "#0c0f14",
        background: open ? "transparent" : GOLD,
        boxShadow: open ? `inset 0 0 0 1px ${GOLD}66` : "none",
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: open ? GOLD : "#0c0f14" }} />
      {status}
    </span>
  );
}

/* ── V1a · Framed board, bold borders + status + hover accent ─────────── */
function Framed({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>V1a · Framed · bold borders</Badge>
      <div className="mx-auto max-w-5xl">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}>Departures.</h2>
        <div className="mt-12 border-2" style={{ borderColor: `${INK}26` }}>
          <div className="h-1 w-full" style={{ background: GOLD }} />
          <div className="grid grid-cols-[3.5rem_1fr_6rem] items-center gap-4 border-b-2 px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#14110c]/45 sm:grid-cols-[4.5rem_1fr_9rem_7rem_6rem] sm:px-7" style={{ borderColor: `${INK}26` }}>
            <span>Code</span><span>Destination</span><span className="hidden sm:block">Programme</span><span className="hidden sm:block text-right">Timeline</span><span className="text-right">Status</span>
          </div>
          {DEST.map((d, i) => (
            <a key={d.code} href="#" className="group relative grid grid-cols-[3.5rem_1fr_6rem] items-center gap-4 border-b px-5 py-5 transition-colors last:border-b-0 hover:bg-[color:rgba(191,161,92,0.1)] sm:grid-cols-[4.5rem_1fr_9rem_7rem_6rem] sm:px-7" style={{ borderColor: `${INK}1f` }}>
              <span aria-hidden className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" style={{ background: GOLD }} />
              <span className="font-mono text-[15px] font-bold tracking-widest" style={{ color: GOLD }}><SplitFlap text={d.code} startFrame={i * 3} /></span>
              <span className={`${serifClass} text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-none transition-colors group-hover:text-[#bfa15c]`}><SplitFlap text={d.name} startFrame={i * 3 + 4} /></span>
              <span className="hidden text-[12px] uppercase tracking-[0.12em] text-[#14110c]/55 sm:block">{d.prog}</span>
              <span className="hidden text-right font-mono text-[12px] tracking-widest text-[#14110c]/70 sm:block">{d.time}</span>
              <span className="text-right"><StatusPill status={d.status} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── V1b · Dark classic departures board ──────────────────────────────── */
function DarkBoard({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 sm:px-12 lg:px-20" style={{ background: "#efe7d8" }}>
      <Badge>V1b · Dark classic board</Badge>
      <div className="mx-auto max-w-5xl">
        <div className="text-[#14110c]"><Header /></div>
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium text-[#14110c]`}>Departures.</h2>
        <div className="mt-10 overflow-hidden rounded-sm border" style={{ background: "#0f131a", borderColor: `${GOLD}55`, boxShadow: `0 30px 80px -30px rgba(0,0,0,0.5)` }}>
          <div className="grid grid-cols-[3.5rem_1fr_6rem] items-center gap-4 border-b px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f3efe6]/45 sm:grid-cols-[4.5rem_1fr_9rem_7rem_6rem] sm:px-7" style={{ borderColor: `${GOLD}33` }}>
            <span>Code</span><span>Destination</span><span className="hidden sm:block">Programme</span><span className="hidden sm:block text-right">Timeline</span><span className="text-right">Status</span>
          </div>
          {DEST.map((d, i) => (
            <a key={d.code} href="#" className="group grid grid-cols-[3.5rem_1fr_6rem] items-center gap-4 border-b px-5 py-5 transition-colors last:border-b-0 hover:bg-white/[0.04] sm:grid-cols-[4.5rem_1fr_9rem_7rem_6rem] sm:px-7" style={{ borderColor: `${GOLD}22` }}>
              <span className="font-mono text-[16px] font-bold tracking-widest" style={{ color: GOLD }}><SplitFlap text={d.code} startFrame={i * 3} /></span>
              <span className={`${serifClass} text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-none text-[#f3efe6] transition-colors group-hover:text-[#bfa15c]`}><SplitFlap text={d.name} startFrame={i * 3 + 4} /></span>
              <span className="hidden text-[12px] uppercase tracking-[0.12em] text-[#f3efe6]/55 sm:block">{d.prog}</span>
              <span className="hidden text-right font-mono text-[12px] tracking-widest text-[#bfa15c]/90 sm:block">{d.time}</span>
              <span className="text-right"><StatusPill status={d.status} dark /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── V1c · Boarding-pass ticket rows ──────────────────────────────────── */
function Tickets({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#14110c] sm:px-12 lg:px-20" style={{ background: "#f6f1e8" }}>
      <Badge>V1c · Boarding-pass tickets</Badge>
      <div className="mx-auto max-w-4xl">
        <Header />
        <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium`}>Departures.</h2>
        <div className="mt-12 flex flex-col gap-5">
          {DEST.map((d, i) => (
            <a key={d.code} href="#" className="group relative flex items-stretch overflow-hidden rounded-sm border bg-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(20,17,12,0.4)]" style={{ borderColor: `${INK}26` }}>
              {/* stub */}
              <div className="flex w-28 shrink-0 flex-col items-center justify-center gap-1 py-7" style={{ background: GOLD }}>
                <span className="font-mono text-[26px] font-bold leading-none text-[#0c0f14]"><SplitFlap text={d.code} startFrame={i * 3} /></span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0c0f14]/70">Gate · XIA</span>
              </div>
              {/* perforation */}
              <div className="relative w-0">
                <div className="absolute inset-y-3 left-0 border-l border-dashed" style={{ borderColor: `${INK}33` }} />
                <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full" style={{ background: "#f6f1e8" }} />
                <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full" style={{ background: "#f6f1e8" }} />
              </div>
              {/* body */}
              <div className="flex flex-1 items-center justify-between gap-4 px-6 py-6 sm:px-8">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#14110c]/45">Destination</span>
                  <h3 className={`${serifClass} text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-none transition-colors group-hover:text-[#bfa15c]`}><SplitFlap text={d.name} startFrame={i * 3 + 4} /></h3>
                  <span className="mt-1 block text-[12px] uppercase tracking-[0.12em] text-[#14110c]/55">{d.prog}</span>
                </div>
                <div className="hidden flex-col items-end gap-2 sm:flex">
                  <span className="font-mono text-[12px] tracking-widest text-[#14110c]/70">{d.time}</span>
                  <StatusPill status={d.status} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Section5BoardVariants({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Framed serifClass={serifClass} />
      <DarkBoard serifClass={serifClass} />
      <Tickets serifClass={serifClass} />
    </main>
  );
}
