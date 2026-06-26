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

      {/* HERO — navy radial */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-[68vh] items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}
      >
        {hero ? (
          <>
            <Image
              src={hero.src}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-[0.16] [filter:grayscale(0.4)_contrast(1.05)]"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${NAVY} 0%, rgba(10,23,51,0.55) 60%, rgba(10,23,51,0.85) 100%)` }} />
          </>
        ) : null}

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
