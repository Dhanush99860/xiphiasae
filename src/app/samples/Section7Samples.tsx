"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const GOLD = "#bfa15c";
const SKYLINE = "/videos/14361063_1440_2560_30fps.mp4";
const DUBAI = "/images/citizenship/dubai/dubai-country-image.webp";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0, start = 0;
    const dur = 1600;
    const tick = (t: number) => { if (!start) start = t; const p = Math.min(1, (t - start) / dur); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref} className={className}>{n.toLocaleString("en-US")}{suffix}</span>;
}

const STATS = [
  { to: 17, suffix: "", label: "Years advising" },
  { to: 10000, suffix: "+", label: "Families relocated" },
  { to: 25, suffix: "+", label: "Countries served" },
  { to: 98, suffix: "%", label: "Approval rate" },
];

/* ── P1 · Cinematic counters over a parallax skyline video ────────────── */
function VideoCounters({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden py-28 text-[#f3efe6]" style={{ background: "#0b0e13" }}>
      <Badge>P1 · Counters over parallax video</Badge>
      <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y }}>
        <video src={SKYLINE} autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ filter: "grayscale(0.5) sepia(0.18) contrast(1.05) brightness(0.5)" }} />
      </motion.div>
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.86) 0%, rgba(8,10,14,0.45) 50%, rgba(8,10,14,0.8) 100%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center sm:px-12 lg:px-20">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
          <span className="h-px w-8" style={{ background: GOLD }} />A credential, not a claim
          <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">سجل حافل</span>
        </p>
        <div className="mt-14 grid grid-cols-2 gap-y-14 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className={`${serifClass} text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none`} style={{ color: GOLD }}><CountUp to={s.to} suffix={s.suffix} /></div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-xl text-[15px] leading-relaxed text-white/70">Licensed in the UAE. Members of the IMC. Advisors retained for life — not for a transaction.</p>
      </div>
    </section>
  );
}

/* ── P2 · Testimonial (treated image) + reserved gold counters ────────── */
function Testimonial({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative min-h-screen px-6 py-28 text-[#f3efe6] sm:px-12 lg:px-20" style={{ background: "#0c0f14" }}>
      <Badge>P2 · Testimonial + counters</Badge>
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-[1.25fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg p-10">
          <Image src={DUBAI} alt="" fill sizes="60vw" className="object-cover [filter:grayscale(0.65)_sepia(0.25)_contrast(1.05)_brightness(0.55)] transition-[filter,transform] duration-[1200ms] group-hover:[filter:grayscale(0.2)_brightness(0.7)] group-hover:scale-[1.03]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.92) 0%, rgba(8,10,14,0.25) 60%, rgba(8,10,14,0.55) 100%)" }} />
          <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
          <div className="relative">
            <span className={`${serifClass} block text-[5rem] leading-[0.5]`} style={{ color: GOLD }}>“</span>
            <p className={`${serifClass} mt-4 max-w-xl text-[clamp(1.5rem,2.6vw,2.3rem)] font-medium italic leading-[1.25]`}>
              XIPHIAS arranged our second citizenship in four months — discreetly, and without a single surprise.
            </p>
            <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/60">A family-office principal · Dubai</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 rounded-lg border p-9" style={{ borderColor: `${GOLD}26`, background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0))" }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className={`${serifClass} text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-none`} style={{ color: GOLD }}><CountUp to={s.to} suffix={s.suffix} /></div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/45">{s.label}</div>
            </div>
          ))}
          <p className="col-span-2 mt-2 border-t pt-5 text-[13px] leading-relaxed text-white/55" style={{ borderColor: "#ffffff14" }}>Licensed in the UAE · Members of the IMC · advisors retained for life.</p>
        </div>
      </div>
    </section>
  );
}

export default function Section7Samples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <VideoCounters serifClass={serifClass} />
      <Testimonial serifClass={serifClass} />
    </main>
  );
}
