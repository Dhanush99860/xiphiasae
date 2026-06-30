"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import type { GalleryItem } from "@/lib/gallery";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

function Fade({ children, delay = 0, className, play }: { children: React.ReactNode; delay?: number; className?: string; play?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function GalleryView({ items, serifClass }: { items: GalleryItem[]; serifClass: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 120);
    return () => clearTimeout(t);
  }, []);

  const hero = items[0];

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* HERO — full-bleed navy + gold */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={play ? { scale: 1 } : { scale: 1.12 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src={hero?.src ?? "/images/gallery/xiphias-immigration-gallery-01.jpeg"}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover [filter:grayscale(0.5)_brightness(0.55)_contrast(1.05)]"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />

        <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl">
          <Fade play={play}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
              <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Gallery
            </p>
          </Fade>
          <Fade play={play} delay={0.1}>
            <p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
              <span className="h-px w-8" style={{ background: GOLD }} />
              Gallery
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">المعرض</span>
            </p>
          </Fade>
          <Fade play={play} delay={0.2}>
            <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.98]`}>
              Moments from
              <span className="block italic" style={{ color: GOLD }}>seventeen years.</span>
            </h1>
          </Fade>
          <Fade play={play} delay={0.35}>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
              Event highlights, team moments, office culture and CSR activities — a look inside XIPHIAS Immigration.
            </p>
          </Fade>
          <Fade play={play} delay={0.45}>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Events · Team · Office · CSR
            </p>
          </Fade>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} />
        </div>
      </section>

      {/* GALLERY GRID — light reading band */}
      <section
        data-tone="light"
        className="relative isolate px-4 py-16 text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#fbfaf7" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b pb-6" style={{ borderColor: `${NAVY}1a` }}>
            <h2 className={`${serifClass} text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight`}>
              The XIPHIAS gallery
            </h2>
            <p className="text-[13px] text-[#0c1f3f]/55" style={{ color: GOLD_DEEP }}>
              Browse highlights by category
            </p>
          </div>
          <GalleryGrid items={items} />
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
