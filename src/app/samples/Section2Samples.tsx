"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const GOLD = "#bfa15c";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

/** Word rise that fires when scrolled into view. Observes the visible CONTAINER
 *  (not the clipped words) and staggers children, so it never deadlocks. */
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
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const dur = 1500;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

function Rule({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="my-8 block h-px"
      style={{ background: GOLD, width: 80, transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function Eyebrow({ center = false }: { center?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7 }}
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`}
      style={{ color: GOLD }}
    >
      <span className="h-px w-8" style={{ background: GOLD }} />
      Who we are
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        من نحن
      </span>
    </motion.p>
  );
}

const STATS = [
  { to: 17, suffix: "", label: "Years" },
  { to: 10000, suffix: "+", label: "Families" },
  { to: 25, suffix: "+", label: "Countries" },
  { to: 98, suffix: "%", label: "Approval" },
];

function StatRow({ dark, center = false }: { dark: boolean; center?: boolean }) {
  return (
    <div className={`mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-4 ${center ? "text-center" : ""}`}>
      {STATS.map((s) => (
        <div key={s.label}>
          <div className={`text-[clamp(2rem,3.5vw,3rem)] font-medium ${dark ? "text-[#f3efe6]" : "text-[#14110c]"}`} style={{ fontVariantNumeric: "tabular-nums" }}>
            <CountUp to={s.to} suffix={s.suffix} />
          </div>
          <div className={`mt-2 text-[11px] uppercase tracking-[0.2em] ${dark ? "text-white/45" : "text-[#14110c]/50"}`}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── A · centered editorial statement (dark / light) ──────────────────── */
function Centered({ serifClass, dark }: { serifClass: string; dark: boolean }) {
  return (
    <section className={`relative flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center ${dark ? "text-[#f3efe6]" : "text-[#14110c]"}`} style={{ background: dark ? "#0b0e13" : "#f6f1e8" }}>
      <Badge>{dark ? "A · Statement · Dark" : "B · Statement · Light"}</Badge>
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center">
          <Eyebrow center />
        </div>
        <h2 className={`${serifClass} mx-auto mt-8 max-w-3xl text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em]`}>
          <Rise text="A private practice for" className="block" />
          <span className="block italic" style={{ color: GOLD }}>
            <Rise text="global citizens." delay={0.25} />
          </span>
        </h2>
        <div className="flex justify-center">
          <Rule delay={0.4} />
        </div>
        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.4 }} className={`mx-auto max-w-2xl text-[16px] leading-relaxed ${dark ? "text-white/65" : "text-[#14110c]/65"}`}>
          For seventeen years, XIPHIAS has arranged residency, citizenship and second
          passports for families who value discretion, certainty, and time — quietly,
          and end to end.
        </motion.p>
        <StatRow dark={dark} center />
      </div>
    </section>
  );
}

/* ── C · split statement + large counters (dark) ──────────────────────── */
function Split({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-28 text-[#f3efe6] sm:px-12 lg:px-20" style={{ background: "#0b0e13" }}>
      <Badge>C · Split · statement + counters</Badge>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Eyebrow />
          <h2 className={`${serifClass} mt-7 text-[clamp(2.2rem,4.4vw,3.8rem)] font-medium leading-[1.05]`}>
            <Rise text="A private practice for" className="block" />
            <span className="block italic" style={{ color: GOLD }}>
              <Rise text="global citizens." delay={0.25} />
            </span>
          </h2>
          <Rule delay={0.4} />
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-md text-[16px] leading-relaxed text-white/65">
            Residency, citizenship and second passports — arranged quietly, end to end,
            for families who value discretion and certainty.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-white/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className={`${serifClass} text-[clamp(2.6rem,5vw,4rem)] font-medium`} style={{ color: GOLD, fontVariantNumeric: "tabular-nums" }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/45">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Section2Samples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <Centered serifClass={serifClass} dark />
      <Centered serifClass={serifClass} dark={false} />
      <Split serifClass={serifClass} />
    </main>
  );
}
