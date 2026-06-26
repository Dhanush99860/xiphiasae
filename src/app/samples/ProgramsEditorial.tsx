"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";

// ── Locked navy/gold luxury tokens ──
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const PEARL = "#fbfaf7";

// ── The 6 REAL programme categories. Each pairs a real route with a real,
//    on-disk image via countryImage(slug[, region]) — see
//    src/components/Countries/country-image.ts. ──
const CATEGORIES = [
  {
    no: "01",
    name: "Citizenship by Investment",
    ar: "الجنسية",
    route: "/citizenship",
    img: countryImage("grenada"),
    alt: "Caribbean coastline — citizenship by investment in Grenada",
    blurb:
      "A second passport for the whole family — donation and real-estate routes across the Caribbean, Europe and the Pacific, with visa-free reach to 140+ destinations and a clear path to a stronger plan-B.",
    tags: ["Donation & real estate", "Family included", "140+ visa-free"],
  },
  {
    no: "02",
    name: "Residency & Golden Visas",
    ar: "الإقامة",
    route: "/residency",
    img: countryImage("portugal"),
    alt: "Lisbon riverfront at golden hour — Portugal residency by investment",
    blurb:
      "Long-term residence in Europe, the Mediterranean and beyond. Real-estate, fund and deposit routes that secure a base abroad — schooling, healthcare and mobility for the next generation.",
    tags: ["From €250K", "Schengen mobility", "Path to PR"],
  },
  {
    no: "03",
    name: "Golden Visa",
    ar: "الفيزا الذهبية",
    route: "/golden-visa",
    img: countryImage("uae"),
    alt: "Dubai skyline at dusk — the UAE Golden Visa",
    blurb:
      "The UAE's flagship long-term residence — a 10-year visa, zero personal income tax and a Gulf base for your family and your business, sponsored by property, talent or investment.",
    tags: ["10-year visa", "0% income tax", "Family sponsorship"],
  },
  {
    no: "04",
    name: "Skilled Migration",
    ar: "الهجرة المهارية",
    route: "/skilled",
    img: countryImage("canada"),
    alt: "Canadian landscape — skilled migration and permanent residence",
    blurb:
      "Points-based permanent-residence pathways for professionals — Canada, Australia and beyond. We position your profile, file with precision and guide you through to settlement.",
    tags: ["Points-based", "Permanent residence", "Profile-led"],
  },
  {
    no: "05",
    name: "Corporate Mobility",
    ar: "تنقل الشركات",
    route: "/corporate",
    img: countryImage("singapore"),
    alt: "Singapore central business district — corporate mobility and relocation",
    blurb:
      "Relocate founders, executives and teams across borders. Investor, entrepreneur and intra-company routes — structured alongside the right jurisdiction for your company and your people.",
    tags: ["Founders & teams", "Investor routes", "Jurisdiction-led"],
  },
  {
    no: "06",
    name: "Work Permits",
    ar: "تصاريح العمل",
    route: "/work-permits",
    img: countryImage("uae", "Africa & Middle East"),
    alt: "Gulf business hub — employment work permits and sponsorship",
    blurb:
      "Employment-sponsored permits that put you on the ground, fast. From the Gulf to global hubs, we handle sponsorship, documentation and compliance end-to-end for individuals and employers.",
    tags: ["Employer-sponsored", "Fast onboarding", "End-to-end filing"],
  },
] as const;

// A few real headline figures for the hero ledger.
const STATS = [
  { v: "6", u: "Programme families" },
  { v: "30+", u: "Jurisdictions advised" },
  { v: "20+", u: "Years of practice" },
];

// Treated image filter for the dark editorial blocks.
const DUO = "object-cover [filter:grayscale(0.4)_brightness(0.72)_contrast(1.05)]";

export default function ProgramsEditorial({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7 },
      };

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (DARK · editorial split) ── */}
      <section
        data-tone="dark"
        className="relative grid min-h-screen items-stretch overflow-hidden text-[#eef3fb] lg:grid-cols-2"
        style={{ background: `radial-gradient(120% 120% at 18% 12%, #13284f 0%, ${NAVY} 62%)` }}
      >
        <div className="relative z-10 flex flex-col justify-center px-6 py-32 sm:px-12 lg:px-20">
          <p
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
            style={{ color: GOLD }}
          >
            <span className="h-px w-8" style={{ background: GOLD }} />
            Our Programmes
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
              برامجنا
            </span>
          </p>
          <h1
            className={`${serifClass} mt-6 max-w-xl text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.98]`}
          >
            Six routes to a
            <span className="block italic" style={{ color: GOLD }}>
              second life abroad.
            </span>
          </h1>
          <p className="mt-7 max-w-md text-[16px] leading-relaxed text-white/75">
            Citizenship, residency, the Golden Visa, skilled migration, corporate mobility and work
            permits — every pathway XIPHIAS advises on, mapped to your family, your timeline and your
            ambitions.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#programmes"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]"
            >
              Explore the six
            </a>
          </div>
          <div
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            {STATS.map((s) => (
              <div key={s.u} className="flex flex-col">
                <span
                  className="text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tabular-nums"
                  style={{ color: GOLD }}
                >
                  {s.v}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  {s.u}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[55vh] lg:min-h-full">
          <Image
            src={countryImage("portugal")}
            alt="Lisbon waterfront at golden hour — residence and citizenship by investment"
            fill
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,23,51,0.96) 0%, rgba(10,23,51,0.25) 46%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 lg:hidden"
            style={{ background: "linear-gradient(0deg, rgba(10,23,51,0.6), transparent 50%)" }}
          />
        </div>
      </section>

      {/* ── PROGRAMME CATEGORIES (alternating editorial split: dark → light → …) ── */}
      <div id="programmes">
        {CATEGORIES.map((c, i) => {
          const dark = i % 2 === 0; // 01 dark, 02 light, 03 dark, …
          const imageRight = i % 2 === 0; // alternate which side the image sits
          const accent = dark ? GOLD : GOLD_DEEP;
          const textColor = dark ? "#eef3fb" : INK;
          const bg = dark
            ? `radial-gradient(120% 120% at ${imageRight ? "82%" : "18%"} 0%, #13284f 0%, ${NAVY} 60%)`
            : PEARL;

          const Media = (
            <motion.div {...rise} className="relative min-h-[60vh] overflow-hidden lg:min-h-full">
              <Image
                src={c.img}
                alt={c.alt}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className={dark ? `${DUO}` : "object-cover"}
              />
              {dark ? (
                <div
                  className="absolute inset-0"
                  style={{
                    background: imageRight
                      ? "linear-gradient(90deg, rgba(10,23,51,0.55) 0%, transparent 55%)"
                      : "linear-gradient(270deg, rgba(10,23,51,0.55) 0%, transparent 55%)",
                  }}
                />
              ) : null}
              <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }} />
              {/* gold numeral badge over the image */}
              <span
                className={`${serifClass} absolute left-6 top-6 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-none drop-shadow-lg`}
                style={{ color: GOLD }}
              >
                {c.no}
              </span>
            </motion.div>
          );

          const Copy = (
            <div className="relative z-10 flex flex-col justify-center px-6 py-24 sm:px-12 lg:px-20">
              <p
                className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
                style={{ color: accent }}
              >
                <span className="h-px w-8" style={{ background: accent }} />
                <span className={`${serifClass} text-[1.05rem] tracking-normal`}>{c.no}</span>
                <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
                  {c.ar}
                </span>
              </p>
              <h2
                className={`${serifClass} mt-5 max-w-md text-[clamp(2rem,4.2vw,3.4rem)] font-medium leading-[1.04]`}
                style={{ color: textColor }}
              >
                {c.name}
              </h2>
              <p
                className="mt-6 max-w-md text-[16px] leading-relaxed"
                style={{ color: dark ? "rgba(255,255,255,0.75)" : `${INK}b3` }}
              >
                {c.blurb}
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      borderColor: dark ? "rgba(191,161,92,0.4)" : `${GOLD_DEEP}55`,
                      color: accent,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={c.route}
                className="group mt-9 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:opacity-80"
                style={{ color: accent }}
              >
                Explore{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          );

          return (
            <section
              key={c.route}
              data-tone={dark ? "dark" : "light"}
              className="relative grid items-stretch overflow-hidden lg:grid-cols-2"
              style={{ background: bg }}
            >
              <Ambient tone={dark ? "dark" : "light"} />
              {/* On lg, alternate image side; on mobile, image always first */}
              {imageRight ? (
                <>
                  <div className="order-2 lg:order-1">{Copy}</div>
                  <div className="order-1 lg:order-2">{Media}</div>
                </>
              ) : (
                <>
                  <div className="order-1">{Media}</div>
                  <div className="order-2">{Copy}</div>
                </>
              )}
            </section>
          );
        })}
      </div>

      {/* ── CLOSING CTA (DARK · full-bleed image · → /contact) ── */}
      <section
        data-tone="dark"
        className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <Image
          src={countryImage("grenada")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover [filter:grayscale(0.45)_brightness(0.4)_contrast(1.05)]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.62) 50%, rgba(8,18,42,0.9) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p
            className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
            style={{ color: GOLD }}
          >
            <span className="h-px w-8" style={{ background: GOLD }} />
            Begin the conversation
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
              ابدأ الآن
            </span>
          </p>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02]`}>
            One desk for <span className="italic" style={{ color: GOLD }}>every route.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Citizenship, residency, the Golden Visa, skilled migration, corporate mobility or work
            permits — tell us where you want to be, and a XIPHIAS advisor will map the right
            programme for your family.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/citizenship"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]"
            >
              Explore programmes
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
