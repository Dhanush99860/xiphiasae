"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#bfa15c";
const JET = "/videos/19666133-uhd_2160_3840_60fps.mp4"; // vertical jet
const SKYLINE = "/videos/14361063_1440_2560_30fps.mp4";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

function Eyebrow({ dark = true }: { dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${dark ? "" : "justify-center"}`} style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      Your next move
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">ابدأ الآن</span>
    </p>
  );
}

function Actions({ light = false }: { light?: boolean }) {
  return (
    <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <a href="#" className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0b0e13] transition-transform hover:-translate-y-0.5" style={{ background: GOLD }}>
        Book a private consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
      <a href="#" className={`inline-flex items-center gap-2 rounded-full border px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${light ? "border-[#14110c]/25 text-[#14110c] hover:border-[#14110c]/60" : "border-white/25 text-white hover:border-[#bfa15c]"}`}>
        WhatsApp our Dubai desk
      </a>
    </div>
  );
}

function Offices({ light = false }: { light?: boolean }) {
  return (
    <p className={`mt-10 text-[12px] uppercase tracking-[0.18em] ${light ? "text-[#14110c]/50" : "text-white/45"}`}>
      By appointment · Dubai &nbsp;·&nbsp; London &nbsp;·&nbsp; Bengaluru
    </p>
  );
}

/* ── C1 · Cinematic split (jet video in a tall parallax frame, dark) ───── */
function CinematicSplit({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden px-6 py-28 text-[#f3efe6] sm:px-12 lg:px-20" style={{ background: "#0b0e13" }}>
      <Badge>C1 · Cinematic split · jet video (parallax frame)</Badge>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow />
          <h2 className={`${serifClass} mt-7 text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.0]`}>
            Your global future
            <br /><span className="italic" style={{ color: GOLD }}>begins with a conversation.</span>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">
            Tell us your goal. A senior advisor will map your most secure, cost-effective pathway —
            privately, and entirely off the record.
          </p>
          <Actions />
          <p lang="ar" dir="rtl" className="mt-8 font-arabic-display text-2xl" style={{ color: GOLD }}>مستقبلك العالمي يبدأ من هنا</p>
          <Offices />
        </div>
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[24rem] overflow-hidden rounded-md" style={{ boxShadow: "0 40px 110px -40px rgba(0,0,0,0.7)" }}>
          <div className="absolute inset-0 z-10" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}45` }} />
          <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y }}>
            <video src={JET} autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ filter: "saturate(0.9) contrast(1.05) brightness(0.92)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,10,14,0.55), transparent 50%)" }} />
        </div>
      </div>
    </section>
  );
}

/* ── C2 · Light invitation (resolves dark→light) ──────────────────────── */
function LightInvitation({ serifClass }: { serifClass: string }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-28 text-center text-[#14110c]" style={{ background: "#f6f1e8" }}>
      <Badge>C2 · Light invitation (calm resolve)</Badge>
      <div className="mx-auto max-w-3xl">
        <div className="flex justify-center"><Eyebrow dark={false} /></div>
        <h2 className={`${serifClass} mt-7 text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[1.0]`}>
          A private conversation,
          <br /><span className="italic" style={{ color: GOLD }}>to begin.</span>
        </h2>
        <p lang="ar" dir="rtl" className="mt-6 font-arabic-display text-2xl sm:text-3xl" style={{ color: GOLD }}>مستقبلك العالمي يبدأ من هنا</p>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[#14110c]/65">
          Tell us your goal. A senior advisor will map your most secure, cost-effective pathway —
          privately, from the Emirates to the world.
        </p>
        <div className="flex justify-center"><Actions light /></div>
        <Offices light />
      </div>
    </section>
  );
}

/* ── C3 · Cinematic contained band (skyline video strip, dark) ────────── */
function ContainedBand({ serifClass }: { serifClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} className="relative flex min-h-screen items-center px-6 py-28 sm:px-12 lg:px-20" style={{ background: "#efe7d8" }}>
      <Badge>C3 · Cinematic contained video band</Badge>
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative aspect-[21/10] w-full overflow-hidden rounded-lg" style={{ boxShadow: "0 50px 120px -50px rgba(20,17,12,0.5)" }}>
          <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y }}>
            <video src={SKYLINE} autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ filter: "grayscale(0.4) sepia(0.15) contrast(1.05) brightness(0.55)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,10,14,0.9) 0%, rgba(8,10,14,0.3) 55%, transparent 100%)" }} />
          <div className="absolute inset-0 z-10" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}3a` }} />
          <div className="absolute inset-y-0 left-0 z-10 flex max-w-xl flex-col justify-center p-8 text-[#f3efe6] sm:p-14">
            <Eyebrow />
            <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.0]`}>
              Your global future
              <br /><span className="italic" style={{ color: GOLD }}>begins here.</span>
            </h2>
            <Actions />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Section8Samples({ serifClass }: { serifClass: string }) {
  return (
    <main>
      <CinematicSplit serifClass={serifClass} />
      <LightInvitation serifClass={serifClass} />
      <ContainedBand serifClass={serifClass} />
    </main>
  );
}
