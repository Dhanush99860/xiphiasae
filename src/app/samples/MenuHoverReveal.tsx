"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const NAVY2 = "#0d1f3f";
const OFFWHITE = "#eef3fb";

const LOGO = "/images/logo/xiphias-immigration-white.png";

type Item = { name: string; href: string; arrow?: boolean; img?: string };
type Group = { label: string; items: Item[] };

const GRENADA = "/images/citizenship/grenada/grenada-citizenship.webp";
const DUBAI = "/images/residency/uae/uae-golden-visa.webp";
const PORTUGAL = "/images/residency/portugal/portugal-golden-visa.webp";
const MALTA = "/images/residency/malta/malta-mprp.webp";
const TURKEY = "/images/citizenship/turkey/bank-deposit-turkey.webp";

const GROUPS: Group[] = [
  {
    label: "Programmes",
    items: [
      { name: "Citizenship by Investment", href: "/citizenship", arrow: true, img: GRENADA },
      { name: "Residency & Golden Visas", href: "/residency", arrow: true, img: PORTUGAL },
      { name: "Skilled Migration", href: "/skilled", arrow: true, img: DUBAI },
      { name: "Corporate Mobility", href: "/corporate", arrow: true, img: MALTA },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { name: "Passport Index", href: "/passport-index" },
      { name: "Compare Programmes", href: "/compare-programs" },
      { name: "Cost Estimator", href: "/cost-estimator" },
      { name: "Eligibility Check", href: "/eligibility" },
    ],
  },
  {
    label: "Company",
    items: [
      { name: "About", href: "/about", arrow: true },
      { name: "Insights", href: "/insights" },
      { name: "Careers", href: "/careers" },
      { name: "Events", href: "/events" },
    ],
  },
  {
    label: "Get in touch",
    items: [
      { name: "Contact", href: "/contact" },
      { name: "Book a consultation", href: "/contact" },
    ],
  },
];

const CARDS: Item[] = [
  { name: "Grenada", href: "/citizenship/grenada", img: GRENADA },
  { name: "Dubai", href: "/golden-visa", img: DUBAI },
  { name: "Portugal", href: "/residency/portugal", img: PORTUGAL },
  { name: "Malta", href: "/residency/malta", img: MALTA },
  { name: "Türkiye", href: "/citizenship/turkey", img: TURKEY },
];

const TAGS: Record<string, string> = {
  [GRENADA]: "Citizenship by Investment",
  [DUBAI]: "Golden Visa",
  [PORTUGAL]: "Residency",
  [MALTA]: "Residency",
  [TURKEY]: "Citizenship",
};
const NAMES: Record<string, string> = {
  [GRENADA]: "Grenada",
  [DUBAI]: "Dubai",
  [PORTUGAL]: "Portugal",
  [MALTA]: "Malta",
  [TURKEY]: "Türkiye",
};

const DEFAULT_IMG = GRENADA;

export default function MenuHoverReveal({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [img, setImg] = useState(DEFAULT_IMG);

  const hover = useCallback((src?: string) => {
    if (src) setImg(src);
  }, []);
  const reset = useCallback(() => setImg(DEFAULT_IMG), []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto lg:flex-row lg:overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`, color: OFFWHITE }}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close menu"
        className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-white/10"
        style={{ borderColor: "rgba(191,161,92,0.5)", color: GOLD }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
      </button>

      {/* LEFT — logo pinned top + nav */}
      <div className="flex w-full flex-col px-6 pb-10 pt-7 sm:px-10 lg:w-[42%] lg:overflow-y-auto lg:pl-16 lg:pr-10 lg:pt-9">
        {/* Logo pinned top-left, never clipped */}
        <a href="/" className="mb-9 block w-fit shrink-0" aria-label="XIPHIAS Immigration — home">
          <Image
            src={LOGO}
            alt="XIPHIAS Immigration"
            width={220}
            height={56}
            priority
            className="h-11 w-36 object-contain object-left"
          />
        </a>

        <nav aria-label="Primary" className="flex flex-col gap-8">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <p
                className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: GOLD }}
              >
                {g.label}
              </p>
              <ul className="flex flex-col gap-1.5">
                {g.items.map((it) => (
                  <li key={it.name + it.href}>
                    <a
                      href={it.href}
                      onMouseEnter={() => hover(it.img)}
                      onFocus={() => hover(it.img)}
                      onMouseLeave={reset}
                      onBlur={reset}
                      className={`group flex items-center gap-2.5 text-[22px] leading-tight transition-colors hover:text-white sm:text-[26px] ${serifClass}`}
                      style={{ color: "rgba(238,243,251,0.82)" }}
                    >
                      <span>{it.name}</span>
                      {it.arrow && (
                        <span
                          aria-hidden
                          className="translate-x-0 text-base opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          style={{ color: GOLD }}
                        >
                          →
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Destination quick-links to drive the reveal (also useful on mobile) */}
        <div className="mt-9">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Destinations
          </p>
          <div className="flex flex-wrap gap-2">
            {CARDS.map((c) => (
              <a
                key={c.name}
                href={c.href}
                onMouseEnter={() => hover(c.img)}
                onFocus={() => hover(c.img)}
                onMouseLeave={reset}
                onBlur={reset}
                className="rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:bg-white/10"
                style={{ borderColor: "rgba(191,161,92,0.4)", color: OFFWHITE }}
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-auto pt-10 text-[12px] tracking-[0.18em]" style={{ color: "rgba(238,243,251,0.55)" }}>
          EN <span className="font-arabic-display">·&nbsp;ع</span>&nbsp;&nbsp;·&nbsp;&nbsp;Dubai · London · Bengaluru
        </p>
      </div>

      {/* RIGHT — full-bleed crossfading image (desktop) */}
      <div className="relative hidden flex-1 overflow-hidden lg:block">
        <AnimatePresence mode="sync">
          <motion.div
            key={img}
            className="absolute inset-0"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={img}
              alt={`${NAMES[img] ?? "Destination"} — ${TAGS[img] ?? ""}`}
              fill
              sizes="58vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* navy gradient for legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(to top, ${NAVY}cc 0%, transparent 45%), linear-gradient(to right, ${NAVY}66 0%, transparent 35%)` }}
        />
        {/* caption bottom-left */}
        <div className="absolute bottom-10 left-12 z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            {TAGS[img] ?? "Destination"}
          </p>
          <p className={`mt-1 text-5xl ${serifClass}`} style={{ color: OFFWHITE }}>
            {NAMES[img] ?? "Grenada"}
          </p>
        </div>
      </div>

      {/* Mobile featured image */}
      <div className="relative h-56 w-full shrink-0 overflow-hidden lg:hidden">
        <Image
          src={img}
          alt={`${NAMES[img] ?? "Destination"} — ${TAGS[img] ?? ""}`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(to top, ${NAVY}cc 0%, transparent 60%)` }}
        />
        <div className="absolute bottom-4 left-6 z-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            {TAGS[img] ?? "Destination"}
          </p>
          <p className={`mt-0.5 text-3xl ${serifClass}`} style={{ color: OFFWHITE }}>
            {NAMES[img] ?? "Grenada"}
          </p>
        </div>
      </div>
    </div>
  );
}
