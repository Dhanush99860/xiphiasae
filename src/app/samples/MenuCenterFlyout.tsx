"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const NAVY2 = "#13284f";
const OFFWHITE = "#eef3fb";

const LOGO = "/images/logo/xiphias-immigration-white.png";

const GRENADA = "/images/citizenship/grenada/grenada-citizenship.webp";
const DUBAI = "/images/residency/uae/uae-golden-visa.webp";
const PORTUGAL = "/images/residency/portugal/portugal-golden-visa.webp";
const MALTA = "/images/residency/malta/malta-mprp.webp";
const TURKEY = "/images/citizenship/turkey/bank-deposit-turkey.webp";

type Item = { name: string; href: string };
type Group = {
  label: string;
  items: Item[];
  // small flyout preview
  img: string;
  caption: string;
};

const GROUPS: Group[] = [
  {
    label: "Programmes",
    img: GRENADA,
    caption: "Grenada · Citizenship",
    items: [
      { name: "Citizenship by Investment", href: "/citizenship" },
      { name: "Residency & Golden Visas", href: "/residency" },
      { name: "Skilled Migration", href: "/skilled" },
      { name: "Corporate Mobility", href: "/corporate" },
    ],
  },
  {
    label: "Intelligence",
    img: PORTUGAL,
    caption: "Portugal · Residency",
    items: [
      { name: "Passport Index", href: "/passport-index" },
      { name: "Compare Programmes", href: "/compare-programs" },
      { name: "Cost Estimator", href: "/cost-estimator" },
      { name: "Eligibility Check", href: "/eligibility" },
    ],
  },
  {
    label: "Company",
    img: MALTA,
    caption: "Malta · Residency",
    items: [
      { name: "About", href: "/about" },
      { name: "Insights", href: "/insights" },
      { name: "Careers", href: "/careers" },
      { name: "Events", href: "/events" },
    ],
  },
  {
    label: "Get in touch",
    img: DUBAI,
    caption: "Dubai · Golden Visa",
    items: [
      { name: "Contact", href: "/contact" },
      { name: "Book a consultation", href: "/contact" },
    ],
  },
];

export default function MenuCenterFlyout({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  // index of the group whose flyout is open; default to first so the preview reads as "open"
  const [active, setActive] = useState<number>(0);

  const open = useCallback((i: number) => setActive(i), []);

  const activeGroup = GROUPS[active];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto"
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, ${NAVY2} 0%, ${NAVY} 70%)`,
        color: OFFWHITE,
      }}
    >
      {/* Logo — small, top-left, never clipped */}
      <a href="/" className="absolute left-6 top-6 z-50 block w-fit sm:left-10 sm:top-7" aria-label="XIPHIAS Immigration — home">
        <Image
          src={LOGO}
          alt="XIPHIAS Immigration"
          width={220}
          height={56}
          priority
          className="h-10 w-32 object-contain object-left"
        />
      </a>

      {/* Close — top-right */}
      <button
        type="button"
        aria-label="Close menu"
        className="absolute right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-white/10 sm:right-10 sm:top-7"
        style={{ borderColor: "rgba(191,161,92,0.5)", color: GOLD }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
      </button>

      {/* H1 for the open menu (visually subtle, single per page) */}
      <h1 className="sr-only">Navigation menu</h1>

      {/* CENTER STAGE — few top items + flyout */}
      <div className="flex flex-1 items-center px-6 pb-16 pt-28 sm:px-12 lg:px-24">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Top-level GROUP labels — generous spacing, very clean */}
          <nav aria-label="Primary" className="shrink-0">
            <ul className="flex flex-col gap-6 sm:gap-8">
              {GROUPS.map((g, i) => {
                const isActive = i === active;
                return (
                  <li key={g.label}>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onMouseEnter={() => open(i)}
                      onFocus={() => open(i)}
                      className={`group flex items-baseline gap-3 text-left transition-colors ${serifClass}`}
                      style={{ color: isActive ? "#fff" : "rgba(238,243,251,0.6)" }}
                    >
                      <span className="text-[34px] leading-none sm:text-[44px] lg:text-[52px]">
                        {g.label}
                      </span>
                      <span
                        aria-hidden
                        className={`text-lg transition-all duration-300 ${
                          isActive ? "translate-x-1 opacity-100" : "translate-x-0 opacity-0 group-hover:opacity-70"
                        }`}
                        style={{ color: GOLD }}
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* FLYOUT sub-panel — beside the labels */}
          <div className="relative min-h-[280px] flex-1 lg:min-h-[340px] lg:max-w-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, x: 8 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-8"
              >
                {/* SMALL image thumbnail */}
                <div
                  className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-44"
                  style={{ boxShadow: "0 12px 30px -12px rgba(0,0,0,0.6)" }}
                >
                  <Image
                    src={activeGroup.img}
                    alt={activeGroup.caption}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${NAVY}cc 0%, transparent 70%)` }}
                  />
                  <span
                    className="absolute bottom-2 left-2.5 text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: GOLD }}
                  >
                    {activeGroup.caption}
                  </span>
                </div>

                {/* Sub-items list */}
                <ul className="flex flex-1 flex-col gap-3 border-t pt-1 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0" style={{ borderColor: "rgba(191,161,92,0.25)" }}>
                  {activeGroup.items.map((it) => (
                    <li key={it.name + it.href}>
                      <a
                        href={it.href}
                        className="group flex items-center gap-2 text-[17px] transition-colors hover:text-white sm:text-[18px]"
                        style={{ color: "rgba(238,243,251,0.8)" }}
                      >
                        <span>{it.name}</span>
                        <span
                          aria-hidden
                          className="translate-x-0 text-sm opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          style={{ color: GOLD }}
                        >
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <p
        className="px-6 pb-7 text-[12px] tracking-[0.18em] sm:px-12 lg:px-24"
        style={{ color: "rgba(238,243,251,0.55)" }}
      >
        EN <span className="font-arabic-display">·&nbsp;ع</span>&nbsp;&nbsp;·&nbsp;&nbsp;Dubai · London · Bengaluru
      </p>
    </div>
  );
}
