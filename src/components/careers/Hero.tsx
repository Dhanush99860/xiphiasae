// src/components/careers/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Job } from "@/lib/jobs";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const HERO_IMG = "/images/gallery/xiphias-immigration-gallery-04.jpeg";

/**
 * Careers hero — navy/gold full-screen, full-bleed image hero.
 * Matches the gold-standard pattern (CitizenshipHub / AboutPage):
 * full-viewport cover image with navy scrims and overlaid text.
 *
 * NOTE: This component is rendered inside the careers page's padded
 * (pt-36 pb-24, max-w-6xl) wrapper. The root section breaks out of that
 * wrapper (full-bleed + negative margins) so the hero is truly full-screen,
 * while the featured-role card / open-role count flow normally below it.
 */
export default function Hero({
  serifClass,
  featured,
  openCount,
}: {
  serifClass: string;
  featured?: Job;
  openCount?: number;
}) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Full-bleed full-screen hero — breaks out of the page's padded container */}
      <section
        data-tone="dark"
        className="relative left-1/2 right-1/2 -mt-36 -mb-24 flex min-h-screen w-screen -translate-x-1/2 items-center overflow-hidden text-[#eef3fb]"
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

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              Careers
            </span>
            <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>
              انضم إلينا
            </span>
          </div>

          <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.98]`}>
            Build a career in <span className="italic" style={{ color: GOLD }}>global mobility</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/70 md:text-base">
            Help people move, work, and thrive across borders. Join our experts in citizenship, residency,
            skilled migration, and corporate immigration from our Bengaluru headquarters and branch offices.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#open-roles"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: "#0a1733" }}
            >
              View open roles
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-white"
              style={{ border: `1px solid ${GOLD}55` }}
            >
              Submit resume
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} />
        </div>
      </section>

      {/* FEATURED lead role — called out big (flows below the full-screen hero) */}
      {featured && (
        <div
          className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
          style={{ border: `1px solid rgba(191,161,92,0.4)`, background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex flex-col items-start gap-4">
            <span className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`} style={{ color: GOLD }}>
              01
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
              Featured role
            </span>
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
              {featured.dept || "Open position"}
            </span>
            <h2 className={`${serifClass} mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight`}>
              {featured.title}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-white/55">
              {featured.location}
              {featured.employmentType ? ` · ${featured.employmentType}` : ""}
            </p>
            <a
              href={`/careers/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:translate-x-0.5"
              style={{ color: GOLD }}
            >
              View &amp; apply
              <span>→</span>
            </a>
          </div>
        </div>
      )}

      {typeof openCount === "number" && openCount > 0 && (
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          {openCount} open role{openCount === 1 ? "" : "s"} · on-site across India
        </p>
      )}
    </>
  );
}
