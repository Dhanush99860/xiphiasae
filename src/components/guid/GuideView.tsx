"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import GuideCatalog from "@/components/guid/GuideCatalog";
import GuideSidebar, { type SitemapGroup, type ExtraLinkGroup } from "@/components/guid/GuideSidebar";
import type { ProgramItem } from "@/components/guid/GuideCatalog";

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

export default function GuideView({
  items,
  sitemap,
  extraGroups,
  serifClass,
}: {
  items: ProgramItem[];
  sitemap: SitemapGroup[];
  extraGroups: ExtraLinkGroup[];
  serifClass: string;
}) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* HERO — navy radial */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-[64vh] items-center overflow-hidden px-6 pb-16 pt-28 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 100% at 15% 0%, #13284f 0%, ${NAVY} 55%)` }}
      >
        <Image
          src="/images/gallery/xiphias-immigration-gallery-09.jpeg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.14] [filter:grayscale(0.4)_contrast(1.05)]"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${NAVY} 0%, rgba(10,23,51,0.55) 60%, rgba(10,23,51,0.85) 100%)` }} />

        <div className="lcp-instant relative z-10 mx-auto w-full max-w-6xl">
          <Fade play={play}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
              <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Guide
            </p>
          </Fade>
          <Fade play={play} delay={0.1}>
            <p className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
              <span className="h-px w-8" style={{ background: GOLD }} />
              Resource Guide
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">الدليل</span>
            </p>
          </Fade>
          <Fade play={play} delay={0.2}>
            <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.0]`}>
              Every programme,
              <span className="block italic" style={{ color: GOLD }}>in one place.</span>
            </h1>
          </Fade>
          <Fade play={play} delay={0.35}>
            <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-white/75">
              Browse every <strong className="font-semibold text-white">Residency by Investment</strong>,{" "}
              <strong className="font-semibold text-white">Citizenship by Investment</strong>,{" "}
              <strong className="font-semibold text-white">Corporate formation</strong>, and{" "}
              <strong className="font-semibold text-white">Skilled migration</strong> programme we support. Search and filter,
              compare routes, download brochures, and run an eligibility check before you apply.
            </p>
          </Fade>
        </div>
      </section>

      {/* CATALOG — light reading band */}
      <section
        data-tone="light"
        className="relative isolate px-4 py-16 text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#fbfaf7" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto w-full max-w-screen-2xl">
          <div className="mb-8 border-b pb-6" style={{ borderColor: `${NAVY}1a` }}>
            <h2 className={`${serifClass} text-[clamp(1.7rem,3.2vw,2.6rem)] font-medium leading-tight`}>
              Programs Resource Guide: Residency, Citizenship, Corporate &amp; Skilled
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#0c1f3f]/65">
              Use search and filters, compare routes, download brochures, and run an{" "}
              <span style={{ color: GOLD_DEEP }} className="font-semibold">eligibility check</span> before you apply.
            </p>
          </div>

          {/* 12-col grid, sticky sitemap on the left (desktop) */}
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar / Sitemap */}
            <aside className="col-span-12 lg:col-span-4">
              <GuideSidebar
                eligibilityHref="/eligibility"
                residencyEligibilityHref="/residency/eligibility-check"
                corporateEligibilityHref="/corporate/eligibility-check"
                sitemap={sitemap}
                extraGroups={extraGroups}
              />
            </aside>

            {/* Catalog */}
            <div id="catalog" className="col-span-12 lg:col-span-8">
              <GuideCatalog
                items={items}
                residencyEligibilityHref="/residency/eligibility-check"
                corporateEligibilityHref="/corporate/eligibility-check"
                eligibilityHref="/eligibility"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
