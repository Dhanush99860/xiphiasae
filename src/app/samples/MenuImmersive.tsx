"use client";

import { useState } from "react";
import Image from "next/image";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

const GROUPS = [
  {
    label: "Programmes",
    items: [
      { name: "Citizenship by Investment", href: "/citizenship", arrow: true },
      { name: "Residency & Golden Visas", href: "/residency", arrow: true },
      { name: "Skilled Migration", href: "/skilled", arrow: true },
      { name: "Corporate Mobility", href: "/corporate", arrow: true },
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

const CARDS = [
  { name: "Grenada", tag: "Citizenship by Investment", href: "/citizenship/grenada", img: "/images/citizenship/grenada/grenada-citizenship.webp" },
  { name: "Dubai", tag: "Golden Visa", href: "/golden-visa", img: "/images/residency/uae/uae-golden-visa.webp" },
  { name: "Portugal", tag: "Residency", href: "/residency/portugal", img: "/images/residency/portugal/portugal-golden-visa.webp" },
  { name: "Malta", tag: "Residency", href: "/residency/malta", img: "/images/residency/malta/malta-mprp.webp" },
  { name: "Türkiye", tag: "Citizenship", href: "/citizenship/turkey", img: "/images/citizenship/turkey/bank-deposit-turkey.webp" },
];

const PROGRAMMES = GROUPS[0].items;
const SECONDARY = [...GROUPS[1].items, ...GROUPS[2].items, ...GROUPS[3].items];

export default function MenuImmersive({ serifClass }: { serifClass: string }) {
  // default background = Dubai (index 1)
  const [active, setActive] = useState(1);

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ backgroundColor: NAVY }}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      {/* Full-bleed crossfading background images (desktop) */}
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        {CARDS.map((c, i) => (
          <div
            key={c.name}
            className="absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={c.img}
              alt=""
              fill
              priority={i === 1}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        {/* Navy gradient for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,23,51,0.94) 0%, rgba(10,23,51,0.82) 38%, rgba(13,31,63,0.55) 70%, rgba(13,31,63,0.35) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,23,51,0.95) 0%, transparent 42%)" }}
        />
      </div>

      {/* Mobile: solid navy */}
      <div className="absolute inset-0 md:hidden" style={{ backgroundColor: NAVY }} aria-hidden="true" />

      {/* Content layer — pinned to top, scrolls if taller than viewport */}
      <div className="relative z-10 flex h-full flex-col overflow-y-auto">
        {/* Top bar: logo top-left + close top-right */}
        <header className="flex flex-shrink-0 items-start justify-between px-6 pt-7 md:px-12 md:pt-9">
          <a href="/" aria-label="XIPHIAS Immigration home" className="block">
            <Image
              src="/images/logo/xiphias-immigration-white.png"
              alt="XIPHIAS Immigration"
              width={144}
              height={44}
              priority
              className="h-11 w-36 object-contain"
            />
          </a>
          <button
            type="button"
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-2xl text-[#eef3fb] transition-colors hover:border-white/60 motion-reduce:transition-none"
            style={{ color: "#eef3fb" }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        {/* Main nav */}
        <nav
          aria-label="Primary"
          className="flex flex-1 flex-col justify-center gap-10 px-6 py-10 md:px-12 md:pb-8"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {/* Large serif programme links */}
            <ul className="flex flex-col gap-3 md:gap-4">
              {PROGRAMMES.map((item, i) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`${serifClass} group inline-flex items-baseline gap-3 text-[2rem] leading-tight text-[#eef3fb] transition-colors hover:text-[var(--gold)] focus-visible:text-[var(--gold)] motion-reduce:transition-none md:text-[3.25rem]`}
                    style={{ ["--gold" as string]: GOLD }}
                    onMouseEnter={() => i < CARDS.length && setActive(i)}
                    onFocus={() => i < CARDS.length && setActive(i)}
                  >
                    <span>{item.name}</span>
                    {item.arrow && (
                      <span
                        aria-hidden="true"
                        className="translate-x-0 text-xl opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none md:text-2xl"
                        style={{ color: GOLD }}
                      >
                        &rarr;
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Secondary links (Intelligence / Company / Get in touch) */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 md:max-w-md md:grid-cols-2">
              {SECONDARY.map((item) => (
                <a
                  key={item.name + item.href}
                  href={item.href}
                  className="text-sm text-[#eef3fb]/70 transition-colors hover:text-[var(--gold)] focus-visible:text-[var(--gold)] motion-reduce:transition-none"
                  style={{ ["--gold" as string]: GOLD }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom destination thumbnails — crossfade the background on hover */}
        <div className="flex-shrink-0 px-6 pb-6 md:px-12 md:pb-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-[#eef3fb]/55">
            Featured destinations
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-row md:gap-4">
            {CARDS.map((c, i) => (
              <li key={c.name} className="md:flex-1">
                <a
                  href={c.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-md ring-1 transition-all motion-reduce:transition-none ${
                    i === active ? "ring-2" : "ring-white/15"
                  }`}
                  style={i === active ? { boxShadow: `0 0 0 2px ${GOLD}` } : undefined}
                >
                  <Image
                    src={c.img}
                    alt={`${c.name} — ${c.tag}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 18vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,23,51,0.9) 0%, rgba(10,23,51,0.1) 60%, transparent 100%)" }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className={`${serifClass} text-lg leading-none text-[#eef3fb]`}>{c.name}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                      {c.tag}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Footer line */}
          <div className="mt-6 flex flex-wrap items-center gap-x-2 border-t border-white/10 pt-4 text-xs tracking-[0.15em] text-[#eef3fb]/60">
            <span>EN</span>
            <span aria-hidden="true">·</span>
            <span className="font-arabic-display">ع</span>
            <span className="mx-2 text-white/25" aria-hidden="true">·</span>
            <span>Dubai · London · Bengaluru</span>
          </div>
        </div>
      </div>
    </div>
  );
}
