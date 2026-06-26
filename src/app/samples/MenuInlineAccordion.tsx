"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const NAVY2 = "#0d1f3f";
const OFFWHITE = "#eef3fb";

const LOGO = "/images/logo/xiphias-immigration-white.png";

const GRENADA = "/images/citizenship/grenada/grenada-citizenship.webp";
const DUBAI = "/images/residency/uae/uae-golden-visa.webp";
const PORTUGAL = "/images/residency/portugal/portugal-golden-visa.webp";
const MALTA = "/images/residency/malta/malta-mprp.webp";

type Item = { name: string; href: string; arrow?: boolean };
type Group = {
  label: string;
  blurb: string;
  img: string;
  imgCaption: string;
  items: Item[];
};

const GROUPS: Group[] = [
  {
    label: "Programmes",
    blurb: "Routes to a second passport, residency and mobility.",
    img: GRENADA,
    imgCaption: "Grenada · Citizenship",
    items: [
      { name: "Citizenship by Investment", href: "/citizenship", arrow: true },
      { name: "Residency & Golden Visas", href: "/residency", arrow: true },
      { name: "Skilled Migration", href: "/skilled", arrow: true },
      { name: "Corporate Mobility", href: "/corporate", arrow: true },
    ],
  },
  {
    label: "Intelligence",
    blurb: "Compare, estimate and check your eligibility.",
    img: DUBAI,
    imgCaption: "Dubai · Golden Visa",
    items: [
      { name: "Passport Index", href: "/passport-index" },
      { name: "Compare Programmes", href: "/compare-programs" },
      { name: "Cost Estimator", href: "/cost-estimator" },
      { name: "Eligibility Check", href: "/eligibility" },
    ],
  },
  {
    label: "Company",
    blurb: "Who we are, what we publish, and where to meet us.",
    img: PORTUGAL,
    imgCaption: "Portugal · Residency",
    items: [
      { name: "About", href: "/about", arrow: true },
      { name: "Insights", href: "/insights" },
      { name: "Careers", href: "/careers" },
      { name: "Events", href: "/events" },
    ],
  },
  {
    label: "Get in touch",
    blurb: "Speak with a private client adviser.",
    img: MALTA,
    imgCaption: "Malta · Residency",
    items: [
      { name: "Contact", href: "/contact" },
      { name: "Book a consultation", href: "/contact" },
    ],
  },
];

export default function MenuInlineAccordion({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  // First group open by default for a calm, populated preview.
  const [open, setOpen] = useState(0);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto"
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

      {/* Logo pinned top-left, never clipped */}
      <a
        href="/"
        className="block w-fit shrink-0 px-6 pt-7 sm:px-10 lg:px-16"
        aria-label="XIPHIAS Immigration — home"
      >
        <Image
          src={LOGO}
          alt="XIPHIAS Immigration"
          width={220}
          height={56}
          priority
          className="h-11 w-36 object-contain object-left"
        />
      </a>

      <div className="flex flex-1 flex-col px-6 pb-10 pt-9 sm:px-10 lg:px-16">
        <h1 className={`mb-8 text-sm font-semibold uppercase tracking-[0.3em] ${serifClass}`} style={{ color: GOLD }}>
          Menu
        </h1>

        <nav aria-label="Primary" className="flex flex-col">
          {GROUPS.map((g, i) => {
            const isOpen = open === i;
            const panelId = `menu-panel-${i}`;
            const btnId = `menu-btn-${i}`;
            return (
              <div
                key={g.label}
                className="border-b"
                style={{ borderColor: "rgba(191,161,92,0.18)" }}
                onMouseEnter={() => setOpen(i)}
              >
                {/* Top-level GROUP row — large serif */}
                <h2 className="m-0">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    onFocus={() => setOpen(i)}
                    className={`group flex w-full items-center gap-4 py-5 text-left transition-colors sm:py-6 ${serifClass}`}
                    style={{ color: isOpen ? "#ffffff" : "rgba(238,243,251,0.82)" }}
                  >
                    <span
                      aria-hidden
                      className="text-xs tabular-nums tracking-[0.2em]"
                      style={{ color: GOLD }}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex-1 text-[34px] leading-none sm:text-[46px]">{g.label}</span>
                    <span
                      aria-hidden
                      className="text-2xl transition-transform duration-300"
                      style={{ color: GOLD, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>
                </h2>

                {/* Inline expanded panel — "one inside the other" */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-7 pb-8 pl-9 sm:flex-row sm:items-start sm:gap-10 sm:pl-12">
                        {/* Indented sub-items */}
                        <div className="flex-1">
                          <p
                            className="mb-4 max-w-md text-sm leading-relaxed"
                            style={{ color: "rgba(238,243,251,0.6)" }}
                          >
                            {g.blurb}
                          </p>
                          <ul className="flex flex-col gap-2.5">
                            {g.items.map((it) => (
                              <li key={it.name + it.href}>
                                <a
                                  href={it.href}
                                  className={`group/link inline-flex items-center gap-2.5 text-[20px] leading-tight transition-colors hover:text-white sm:text-[22px] ${serifClass}`}
                                  style={{ color: "rgba(238,243,251,0.85)" }}
                                >
                                  <span>{it.name}</span>
                                  {it.arrow && (
                                    <span
                                      aria-hidden
                                      className="translate-x-0 text-base opacity-0 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:opacity-100"
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

                        {/* SMALL image thumbnail beside the expanded group */}
                        <a
                          href={g.items[0].href}
                          className="group/thumb relative block h-28 w-44 shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-52"
                          style={{ border: "1px solid rgba(191,161,92,0.35)" }}
                          aria-label={g.imgCaption}
                        >
                          <Image
                            src={g.img}
                            alt={g.imgCaption}
                            fill
                            sizes="208px"
                            className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                          />
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: `linear-gradient(to top, ${NAVY}cc 0%, transparent 55%)` }}
                          />
                          <span
                            className="absolute bottom-2 left-3 text-[10px] font-semibold uppercase tracking-[0.22em]"
                            style={{ color: GOLD }}
                          >
                            {g.imgCaption}
                          </span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <p className="mt-auto pt-12 text-[12px] tracking-[0.18em]" style={{ color: "rgba(238,243,251,0.55)" }}>
          EN <span className="font-arabic-display">·&nbsp;ع</span>&nbsp;&nbsp;·&nbsp;&nbsp;Dubai · London · Bengaluru
        </p>
      </div>
    </div>
  );
}
