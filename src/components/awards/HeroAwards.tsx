"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { awardsData } from "@/components/awards/awards.data";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const HERO_IMG = "/images/gallery/xiphias-immigration-gallery-16.jpeg";

/* The featured lead award, derived from the real data. */
const FEATURED = awardsData[0];

/* tasteful 2-letter initial badge from an issuer name */
function initials(name: string) {
  const parts = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "")).toUpperCase();
}

function Rise({
  children,
  delay = 0,
  reduce,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Badge({ issuer }: { issuer: string }) {
  return (
    <span
      aria-hidden
      className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-[13px] font-semibold tracking-[0.06em]"
      style={{ border: `1px solid rgba(191,161,92,0.45)`, color: GOLD, background: "rgba(191,161,92,0.06)" }}
    >
      {initials(issuer)}
    </span>
  );
}

export function HeroAwards({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), []);

  return (
    <section
      data-tone="dark"
      aria-labelledby="hero-awards"
      className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]"
      style={{ background: NAVY }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={play ? { scale: 1 } : { scale: 1.12 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <Image
          src={HERO_IMG}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover [filter:grayscale(0.5)_brightness(0.55)_contrast(1.05)]"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 sm:px-12 lg:px-20">
        <Rise reduce={reduce}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              Recognition
            </span>
            <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>
              تقدير
            </span>
          </div>
        </Rise>

        <Rise reduce={reduce} delay={0.1}>
          <h1
            id="hero-awards"
            className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.98]`}
          >
            Most Awarded <span className="italic" style={{ color: GOLD }}>Immigration Company</span>
          </h1>
        </Rise>

        <Rise reduce={reduce} delay={0.2}>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/60 md:text-base">
            Independent publications have recognised our innovation, industry leadership, and client-first
            execution across more than a decade of practice.
          </p>
        </Rise>

        {/* FEATURED lead award — called out big */}
        {FEATURED && (
          <Rise reduce={reduce} delay={0.32}>
            <div
              className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
              style={{ border: `1px solid rgba(191,161,92,0.4)`, background: "rgba(255,255,255,0.03)" }}
            >
              <div className="flex flex-col items-start gap-4">
                <span className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`} style={{ color: GOLD }}>
                  01
                </span>
                <Badge issuer={FEATURED.issuer} />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                  {FEATURED.tag}
                </span>
                <h2 className={`${serifClass} mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight`}>
                  {FEATURED.title}
                </h2>
                <p className="mt-4 text-sm uppercase tracking-[0.14em] text-white/55">
                  {FEATURED.issuer} · {FEATURED.year}
                </p>
              </div>
            </div>
          </Rise>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} />
      </div>
    </section>
  );
}
