"use client";

import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Brand tokens                                                       */
/*  gold #bfa15c · navy #0a1733 → #0d1f3f · off-white #eef3fb          */
/* ------------------------------------------------------------------ */

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
] as const;

const CARDS = [
  { name: "Grenada", tag: "Citizenship by Investment", href: "/citizenship/grenada", img: "/images/citizenship/grenada/grenada-citizenship.webp" },
  { name: "Dubai", tag: "Golden Visa", href: "/golden-visa", img: "/images/residency/uae/uae-golden-visa.webp" },
  { name: "Portugal", tag: "Residency", href: "/residency/portugal", img: "/images/residency/portugal/portugal-golden-visa.webp" },
  { name: "Malta", tag: "Residency", href: "/residency/malta", img: "/images/residency/malta/malta-mprp.webp" },
  { name: "Türkiye", tag: "Citizenship", href: "/citizenship/turkey", img: "/images/citizenship/turkey/bank-deposit-turkey.webp" },
] as const;

const GOLD = "#bfa15c";
const OFFWHITE = "#eef3fb";

export default function MenuShowcaseRail({ serifClass }: { serifClass: string }) {
  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col overflow-hidden text-[#eef3fb] motion-safe:animate-[fadeIn_.4s_ease-out]"
      style={{ background: "linear-gradient(135deg,#0a1733 0%,#0d1f3f 100%)" }}
    >
      {/* keyframes (motion-safe only) */}
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>

      {/* ---------------------------------------------------------- */}
      {/*  TOP BAR — logo pinned top-left, close top-right            */}
      {/* ---------------------------------------------------------- */}
      <header className="flex shrink-0 items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <Link href="/" aria-label="XIPHIAS home" className="block">
          <Image
            src="/images/logo/xiphias-immigration-white.png"
            alt="XIPHIAS Immigration"
            width={180}
            height={48}
            priority
            className="h-11 w-36 object-contain object-left"
          />
        </Link>

        <button
          type="button"
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#bfa15c]/40 text-[#bfa15c] transition-colors hover:border-[#bfa15c] hover:bg-[#bfa15c]/10"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </header>

      {/* ---------------------------------------------------------- */}
      {/*  BODY — two columns, each scrolls independently            */}
      {/* ---------------------------------------------------------- */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-y-10 px-6 pb-8 pt-8 sm:px-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-x-16">
        {/* LEFT — grouped serif nav (scrolls if tall, logo never clipped) */}
        <nav
          aria-label="Primary"
          className="min-h-0 overflow-y-auto pr-2"
        >
          <div className="grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2">
            {GROUPS.map((group) => (
              <div key={group.label}>
                <h2
                  className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.28em]"
                  style={{ color: GOLD }}
                >
                  {group.label}
                </h2>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`${serifClass} group inline-flex items-center gap-2 text-2xl leading-tight text-[#eef3fb] transition-colors hover:text-[#bfa15c] focus-visible:text-[#bfa15c] focus-visible:outline-none sm:text-[1.7rem]`}
                      >
                        <span>{item.name}</span>
                        {"arrow" in item && item.arrow && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* footer line */}
          <div
            className="mt-10 border-t border-white/10 pt-5 text-xs tracking-wide text-[#eef3fb]/60"
          >
            <span className="font-arabic-display">EN · ع</span>
            <span className="mx-3 text-[#bfa15c]">·</span>
            Dubai · London · Bengaluru
          </div>
        </nav>

        {/* RIGHT — showcase rail: uniform 3/2 tiles, object-cover */}
        <div className="min-h-0">
          <h2
            className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            Featured destinations
          </h2>

          {/* Desktop / tablet: tidy 2-col grid that scrolls.
              Mobile: horizontal scroll rail. */}
          <div
            className="
              flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2
              lg:grid lg:max-h-full lg:snap-none lg:auto-rows-fr lg:grid-cols-2
              lg:gap-4 lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0
            "
          >
            {CARDS.map((card) => (
              <Link
                key={card.name}
                href={card.href}
                className="
                  group relative block w-[78%] shrink-0 snap-start overflow-hidden rounded-md
                  border border-[#bfa15c]/30 transition-colors hover:border-[#bfa15c]
                  focus-visible:border-[#bfa15c] focus-visible:outline-none
                  sm:w-[55%] lg:w-auto
                "
              >
                {/* fixed 3/2 aspect → all tiles identical scale */}
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={card.img}
                    alt={`${card.name} — ${card.tag}`}
                    fill
                    sizes="(max-width:1024px) 60vw, 280px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                  {/* navy gradient for legibility */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,23,51,0.92) 0%, rgba(10,23,51,0.25) 45%, rgba(10,23,51,0) 75%)",
                    }}
                  />
                  {/* overlay text */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                      {card.tag}
                    </p>
                    <p className={`${serifClass} text-2xl leading-tight`} style={{ color: OFFWHITE }}>
                      {card.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
