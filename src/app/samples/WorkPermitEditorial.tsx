"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { workPermitCountries } from "@/lib/work-permits";

// ── Locked navy/gold luxury tokens ──
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const PEARL = "#fbfaf7";

// Treated image filter for the dark editorial blocks.
const DUO = "object-cover [filter:grayscale(0.4)_brightness(0.72)_contrast(1.05)]";

// A couple of REAL hero images, drawn from the work-permit dataset itself.
const HERO_IMG = workPermitCountries[0].image; // Canada — Global Talent Stream
const CTA_IMG = workPermitCountries[5].image; // UAE — Dubai mainland employment

export default function WorkPermitEditorial({ serifClass }: { serifClass: string }) {
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

      {/* ── HERO (DARK · editorial) ── */}
      <section
        data-tone="dark"
        className="relative flex min-h-[88vh] items-center overflow-hidden px-6 py-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 120% at 18% 12%, #13284f 0%, ${NAVY} 62%)` }}
      >
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:grayscale(0.5)_brightness(0.42)_contrast(1.05)]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,23,51,0.95) 0%, rgba(10,23,51,0.72) 48%, rgba(10,23,51,0.55) 100%)",
          }}
        />
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
            style={{ color: GOLD }}
          >
            <span className="h-px w-8" style={{ background: GOLD }} />
            XIA · Work Permit Intelligence
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
              ذكاء تصاريح العمل
            </span>
          </p>
          <h1
            className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.8rem,6.6vw,5.4rem)] font-medium leading-[0.98]`}
          >
            The world&apos;s work routes,
            <span className="block italic" style={{ color: GOLD }}>
              read like an editorial.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-white/75">
            Employer-led sponsorship and points-based work pathways across eight destinations —
            North America, Europe, the Gulf and Oceania. XIA maps your profile to the right permit
            category, surfaces the evidence each route demands, and flags where an advisor&apos;s eye
            changes the plan.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#routes"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: GOLD, color: NAVY }}
            >
              Read the eight routes{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]"
            >
              Speak to an advisor
            </a>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ROUTES (alternating dark → light → … · image on every block) ── */}
      <div id="routes">
        {workPermitCountries.map((c, i) => {
          const dark = i % 2 === 0; // 1 dark, 2 light, 3 dark, …
          const imageRight = i % 2 === 0; // alternate which side the image sits
          const accent = dark ? GOLD : GOLD_DEEP;
          const textColor = dark ? "#eef3fb" : INK;
          const numeral = String(i + 1).padStart(2, "0");
          const bg = dark
            ? `radial-gradient(120% 120% at ${imageRight ? "82%" : "18%"} 0%, #13284f 0%, ${NAVY} 60%)`
            : PEARL;

          const Media = (
            <motion.div {...rise} className="relative min-h-[62vh] overflow-hidden lg:min-h-full">
              <Image
                src={c.image}
                alt={`${c.country} — ${c.permitTypes[0]} work route`}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className={dark ? DUO : "object-cover"}
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
              <div
                className="absolute inset-0"
                style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
              />
              {/* gold numeral over the image */}
              <span
                className={`${serifClass} absolute left-6 top-6 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-none drop-shadow-lg`}
                style={{ color: GOLD }}
              >
                {numeral}
              </span>
              {/* region tag pinned to the frame */}
              <span
                className="absolute bottom-6 left-6 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm"
                style={{ borderColor: "rgba(191,161,92,0.5)", background: "rgba(10,23,51,0.45)" }}
              >
                {c.region}
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
                <span className={`${serifClass} text-[1.05rem] tracking-normal`}>{numeral}</span>
                <span
                  style={{ color: dark ? "rgba(255,255,255,0.5)" : `${INK}99` }}
                  className="tracking-[0.2em]"
                >
                  {c.region}
                </span>
              </p>
              <h2
                className={`${serifClass} mt-5 max-w-md text-[clamp(2rem,4.2vw,3.4rem)] font-medium leading-[1.04]`}
                style={{ color: textColor }}
              >
                {c.country}
              </h2>

              {/* permit types as gold chips */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {c.permitTypes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]"
                    style={{
                      borderColor: dark ? "rgba(191,161,92,0.4)" : `${GOLD_DEEP}55`,
                      color: accent,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* advisory focus — one line */}
              <p
                className="mt-7 max-w-md text-[16px] leading-relaxed"
                style={{ color: dark ? "rgba(255,255,255,0.78)" : `${INK}c2` }}
              >
                {c.advisoryFocus}
              </p>

              {/* route readiness signals */}
              <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-3">
                {c.routeReadiness.map((r) => (
                  <div key={r.label} className="flex flex-col">
                    <dt
                      className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: dark ? "rgba(255,255,255,0.5)" : `${INK}88` }}
                    >
                      {r.label}
                    </dt>
                    <dd
                      className={`${serifClass} mt-1 text-[1.35rem] font-medium leading-tight`}
                      style={{ color: accent }}
                    >
                      {r.value}
                    </dd>
                    <dd
                      className="mt-1.5 text-[12.5px] leading-snug"
                      style={{ color: dark ? "rgba(255,255,255,0.6)" : `${INK}99` }}
                    >
                      {r.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={c.href}
                className="group mt-9 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:opacity-80"
                style={{ color: accent }}
              >
                Explore {c.country} routes{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          );

          return (
            <section
              key={c.slug}
              data-tone={dark ? "dark" : "light"}
              className="relative grid items-stretch overflow-hidden lg:grid-cols-2"
              style={{ background: bg }}
            >
              <Ambient tone={dark ? "dark" : "light"} />
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
          src={CTA_IMG}
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
          <h2
            className={`${serifClass} mt-6 text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02]`}
          >
            Find your <span className="italic" style={{ color: GOLD }}>work route.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Tell us where you want to work, and a XIPHIAS advisor will map the right permit category,
            the sponsorship basis and the evidence your file needs — for you and your family.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: GOLD, color: NAVY }}
            >
              Speak to an advisor{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-lg text-[12px] leading-relaxed text-white/45">
            Work Permit Intelligence is an assessment aid only. Route viability, eligibility and
            timing require advisor review and are subject to each destination&apos;s current rules.
          </p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
