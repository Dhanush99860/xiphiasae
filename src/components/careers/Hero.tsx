"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const HERO_IMG = "/images/home/dubai-global-mobility.webp";

export default function Hero({ serifClass, openCount }: { serifClass: string; openCount?: number }) {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);

  return (
    <section
      data-tone="dark"
      className="relative flex items-end overflow-hidden text-[#eef3fb]"
      style={{ background: NAVY, minHeight: "54vh", paddingTop: "9rem", paddingBottom: "3.5rem" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={play ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <Image
          src={HERO_IMG}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover [filter:grayscale(0.25)_brightness(0.5)_contrast(1.05)]"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.96) 0%, rgba(8,18,42,0.65) 55%, rgba(8,18,42,0.28) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, transparent 55%)" }} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
        <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
          <span className="h-px w-8" style={{ background: GOLD }} />
          Careers
          <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal" style={{ color: `${GOLD}cc` }}>انضم إلينا</span>
        </p>

        <h1 className={`${serifClass} text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.0]`}>
          Build a career in <span className="italic" style={{ color: GOLD }}>global mobility.</span>
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/60">
          Help people move, work and thrive across borders — from our Bengaluru headquarters and branch offices worldwide.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#open-roles"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: "#0a1733" }}
          >
            View open roles
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:text-white"
            style={{ borderColor: `${GOLD}44` }}
          >
            Submit resume
          </a>
        </div>

        {/* quick stats */}
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {[
            [typeof openCount === "number" ? String(openCount) : "—", "Open roles"],
            ["10+", "Global offices"],
            ["2007", "Est."],
            ["Bengaluru", "HQ"],
          ].map(([v, u]) => (
            <div key={u} className="flex items-baseline gap-2">
              <span className={`${serifClass} text-[1.3rem] font-medium`} style={{ color: GOLD }}>{v}</span>
              <span className="text-[11px] text-white/38">{u}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
