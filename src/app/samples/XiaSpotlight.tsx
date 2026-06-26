"use client";

/**
 * VARIANT ② — "Spotlight Engine" for the XIPHIAS XIA intelligence suite reskin.
 * App-like layout:
 *   HERO     — full-bleed REAL Dubai image (countryImage('uae')) with a navy
 *              gradient overlay, suite eyebrow + single <h1>.
 *   GATEWAY  — a large FEATURED tool SPOTLIGHT (real full-bleed image filling
 *              the panel, tool name, what it does, "Launch →") that swaps on
 *              hover / click / focus of the labelled tool list beside it
 *              (client state). Below: the remaining tools as a compact grid.
 *   CTA      — closing call to action → /eligibility.
 *
 * CONTENT: the four real XIA modules are mirrored verbatim from the live suite
 *   (src/components/XiaIntelligence/XiaSuiteGatewayClient.tsx) and their pages
 *   (/route-intelligence, /deep-analysis, /us-visa-intelligence,
 *   /document-readiness) — real names, real subtitle copy, real routes. The
 *   assessment engine row links the live /eligibility flow. No invented tools.
 *   Imagery resolves through the client-safe countryImage() helper
 *   (src/components/Countries/country-image.ts) — real /public assets only.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

type Tool = {
  id: string;
  name: string;
  index: string;
  href: string;
  what: string;
  detail: string;
  imageSlug: string;
  region: string;
};

// Real XIA modules — mirror of the live XiaSuiteGatewayClient + module pages.
const TOOLS: Tool[] = [
  {
    id: "route",
    name: "Route Intelligence",
    index: "01",
    href: "/route-intelligence",
    what: "Compare route options by goal, destination, budget, timeline, family needs and physical presence.",
    detail:
      "A focused route-fit workspace for destination, capital, timeline, family and presence preferences.",
    imageSlug: "uae",
    region: "Africa & Middle East",
  },
  {
    id: "deep",
    name: "Deep Analysis",
    index: "02",
    href: "/deep-analysis",
    what: "Add education, experience, skills, CV notes and evidence markers for a more detailed review.",
    detail:
      "A deeper profile review using skills, education, experience, CV notes and evidence markers before XIPHIAS advisor verification.",
    imageSlug: "singapore",
    region: "Asia-Pacific",
  },
  {
    id: "us",
    name: "US Visa Intelligence",
    index: "03",
    href: "/us-visa-intelligence",
    what: "Review US visa directions including EB1A, EB2 NIW, O1A, H-1B, L1, founder and employer routes.",
    detail:
      "A US-focused visa intelligence page for EB1A, EB2 NIW, O1A, H-1B, L1, founder, employer and evidence improvement guidance.",
    imageSlug: "usa",
    region: "Americas",
  },
  {
    id: "docs",
    name: "Document & Evidence Readiness",
    index: "04",
    href: "/document-readiness",
    what: "Organise the documents and evidence needed before advisor review or detailed report generation.",
    detail:
      "A focused readiness workspace for the documents and evidence needed before advisor review or detailed report generation.",
    imageSlug: "portugal",
    region: "Europe",
  },
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: light ? GOLD_DEEP : GOLD }}
    >
      <span className="h-px w-8" style={{ background: light ? GOLD_DEEP : GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        {ar}
      </span>
    </p>
  );
}

export default function XiaSpotlight({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(TOOLS[0].id);

  const active = useMemo(() => TOOLS.find((t) => t.id === activeId) ?? TOOLS[0], [activeId]);
  const rest = TOOLS.filter((t) => t.id !== active.id);

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (dark, full-bleed image) ── */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-[78vh] items-end overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-16"
        style={{ background: NAVY }}
      >
        <Image
          src={countryImage("uae", "Africa & Middle East")}
          alt="XIPHIAS XIA intelligence suite — Dubai skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:grayscale(0.2)_brightness(0.62)_contrast(1.05)]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(8,18,42,0.96) 0%, rgba(8,18,42,0.55) 45%, rgba(10,23,51,0.62) 100%)",
          }}
        />
        <Ambient tone="dark" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.div {...fade}>
            <Eyebrow ar="ذكاء زيفياس">XIPHIAS XIA · Intelligence Suite</Eyebrow>
          </motion.div>
          <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.7rem,6.6vw,5.6rem)] font-medium leading-[0.95]`}>
            One engine. Every route, read clearly.
          </h1>
          <motion.p
            {...(reduce
              ? {}
              : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.2 } })}
            className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75"
          >
            XIA is XIPHIAS&apos;s AI intelligence suite — a set of focused modules that read your
            profile, surface route-fit, and prepare evidence-grade direction for senior advisor
            review. Choose a module to begin.
          </motion.p>
        </div>
      </section>

      {/* ── SPOTLIGHT ENGINE (dark) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-24 pt-20 text-[#eef3fb] sm:px-12 lg:px-16"
        style={{ background: `radial-gradient(120% 100% at 12% 0%, #13284f 0%, ${NAVY} 58%)` }}
      >
        <Ambient tone="dark" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div {...fade}>
            <Eyebrow ar="الوحدات">The modules</Eyebrow>
          </motion.div>
          <h2 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.0]`}>
            Pick a module. The engine focuses on it.
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
            {/* LEFT — labelled tool list */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <ul className="flex flex-col gap-1" role="list" aria-label="XIA intelligence modules">
                {TOOLS.map((t) => {
                  const on = t.id === active.id;
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveId(t.id)}
                        onFocus={() => setActiveId(t.id)}
                        onClick={() => setActiveId(t.id)}
                        aria-pressed={on}
                        aria-label={`Preview ${t.name}`}
                        className="group flex w-full items-start gap-3 rounded-md px-3 py-3.5 text-left transition-colors"
                        style={{ background: on ? "rgba(191,161,92,0.12)" : "transparent" }}
                      >
                        <span
                          aria-hidden
                          className="mt-1 w-px self-stretch transition-all"
                          style={{ background: on ? GOLD : "rgba(255,255,255,0.16)" }}
                        />
                        <span className="flex-1">
                          <span className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold tracking-[0.18em] text-white/40">
                              {t.index}
                            </span>
                            <span
                              className={`text-[15px] leading-tight transition-colors ${on ? "font-semibold" : ""}`}
                              style={{ color: on ? GOLD : "rgba(238,243,251,0.88)" }}
                            >
                              {t.name}
                            </span>
                          </span>
                          <span className="mt-1 block text-[12px] leading-snug text-white/45">{t.what}</span>
                        </span>
                        <span
                          aria-hidden
                          className="mt-1 text-[13px] opacity-0 transition group-hover:opacity-100"
                          style={{ color: GOLD }}
                        >
                          →
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* RIGHT — featured spotlight panel */}
            <motion.div
              key={active.id}
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, y: 18 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  })}
              className="relative isolate min-h-[30rem] overflow-hidden rounded-lg border lg:min-h-[38rem] lg:self-stretch"
              style={{ borderColor: "rgba(191,161,92,0.35)" }}
            >
              <Image
                src={countryImage(active.imageSlug, active.region)}
                alt={`${active.name} module preview`}
                fill
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover [filter:grayscale(0.25)_brightness(0.66)_contrast(1.05)]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(8,18,42,0.97) 0%, rgba(8,18,42,0.5) 48%, rgba(8,18,42,0.2) 100%)",
                }}
              />
              <span aria-hidden className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
              <span aria-hidden className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2" style={{ borderColor: GOLD }} />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
                  Module {active.index} · XIA
                </span>
                <h3 className={`${serifClass} mt-3 text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[0.99]`}>
                  {active.name}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/78">{active.detail}</p>

                <a
                  href={active.href}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Launch {active.name}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Remaining tools — compact grid */}
          <div className="mt-12 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
              More in the suite
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {rest.map((t) => (
                <a
                  key={t.id}
                  href={t.href}
                  onMouseEnter={() => setActiveId(t.id)}
                  onFocus={() => setActiveId(t.id)}
                  className="group flex flex-col rounded-lg border p-5 transition"
                  style={{ borderColor: "rgba(191,161,92,0.28)", background: "rgba(255,255,255,0.04)" }}
                >
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-white/40">{t.index}</span>
                  <span className={`${serifClass} mt-2 text-[1.35rem] font-medium leading-tight`} style={{ color: GOLD }}>
                    {t.name}
                  </span>
                  <span className="mt-2 flex-1 text-[13px] leading-relaxed text-white/55">{t.what}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: GOLD }}>
                    Launch <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-6 rounded-lg border px-4 py-3 text-[13px] leading-6 text-white/55" style={{ borderColor: "rgba(191,161,92,0.28)" }}>
              XIA is an assessment aid, not a final visa decision. Final eligibility and filing
              strategy require XIPHIAS advisor review.
            </p>
          </div>
        </div>
      </section>

      {/* ── Closing CTA (light) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-28 text-center text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#fbfaf7" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="flex justify-center">
            <Eyebrow ar="ابدأ التقييم" light>
              Start the assessment
            </Eyebrow>
          </div>
          <h2 className={`${serifClass} mt-6 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02]`}>
            Not sure which module fits?{" "}
            <span className="italic" style={{ color: GOLD_DEEP }}>
              Let XIA point the way.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">
            Run the guided eligibility engine and XIA will route you to the right module — then a
            senior XIPHIAS advisor reviews the result privately, within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/eligibility"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: NAVY, color: "#eef3fb" }}
            >
              Run the eligibility engine
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ borderColor: GOLD_DEEP, color: GOLD_DEEP }}
            >
              Book a private consultation
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
