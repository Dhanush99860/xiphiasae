"use client";

/**
 * VARIANT ① "Command Suite" — DARK navy gateway for the XIPHIAS XIA intelligence suite.
 * Real XIA tools + routes sourced from
 *   src/components/XiaIntelligence/XiaSuiteGatewayClient.tsx (Route/Deep/US Visa Intelligence)
 *   src/app/(site)/document-readiness/page.tsx (Document & Evidence Readiness)
 *   src/app/(site)/eligibility/page.tsx (Eligibility engine)
 * Hero + card imagery via countryImage() (real /images webp assets).
 */

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BrainCircuit, FileCheck2, GraduationCap, Route, Sparkles, Wand2 } from "lucide-react";

import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";
const PEARL = "#fbfaf7";

const HERO_IMAGE = countryImage("uae"); // real Dubai / UAE golden-visa frame

/** REAL XIA tools — names, copy and routes taken verbatim from the live suite. */
const TOOLS = [
  {
    href: "/route-intelligence",
    label: "Route Intelligence",
    copy: "Compare route options by goal, destination, budget, timeline, family needs, and physical presence.",
    icon: Route,
    image: countryImage("portugal"),
  },
  {
    href: "/deep-analysis",
    label: "Deep Analysis",
    copy: "Add education, experience, skills, CV notes, and evidence markers for a more detailed profile review.",
    icon: GraduationCap,
    image: countryImage("singapore"),
  },
  {
    href: "/us-visa-intelligence",
    label: "US Visa Intelligence",
    copy: "Review US directions including EB1A, EB2 NIW, O1A, H-1B, L1, founder, and employer routes.",
    icon: BrainCircuit,
    image: countryImage("usa"),
  },
  {
    href: "/document-readiness",
    label: "Document & Evidence Readiness",
    copy: "Map the documents and evidence needed before advisor review or detailed report generation.",
    icon: FileCheck2,
    image: countryImage("switzerland"),
  },
  {
    href: "/eligibility",
    label: "Eligibility Engine",
    copy: "Run a fast eligibility check to surface the pathways that fit your profile and ambitions.",
    icon: Wand2,
    image: countryImage("greece"),
  },
] as const;

export default function XiaCommandSuite({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  const rise = reduce
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <div style={{ background: PEARL, color: INK }}>
      <Header serifClass={serifClass} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: NAVY, color: PEARL }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Dubai skyline at dusk — XIPHIAS XIA intelligence suite"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 120% at 75% 10%, rgba(10,23,51,0.55), rgba(10,23,51,0.92) 60%, #0a1733 100%)",
          }}
        />
        <Ambient tone="dark" />

        <div className="relative mx-auto w-full max-w-screen-xl px-6 py-28 sm:py-36 lg:px-10 lg:py-44">
          <motion.div {...rise} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.34em]"
              style={{ borderColor: "rgba(191,161,92,0.5)", color: GOLD }}
            >
              <Sparkles className="size-3.5" aria-hidden />
              XIA · Intelligence
            </span>

            <h1
              className={`${serifClass} mt-7 max-w-4xl text-[clamp(2.7rem,6.5vw,5.4rem)] font-medium leading-[0.98]`}
            >
              The XIPHIAS intelligence command suite.
            </h1>

            <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-white/75">
              XIA is our AI assessment suite. Choose a module to evaluate route-fit,
              high-skill visa evidence, US directions, and document readiness — each one
              prepares a focused direction for XIPHIAS advisor review.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/eligibility"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition hover:brightness-110"
                style={{ background: GOLD, color: NAVY }}
              >
                Begin an assessment
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <span className="text-xs uppercase tracking-[0.28em] text-white/55">
                Five live modules
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── SUITE GATEWAY ───────────────────────── */}
      <section
        className="relative"
        style={{ background: NAVY, color: PEARL }}
        aria-labelledby="suite-heading"
      >
        <div className="relative mx-auto w-full max-w-screen-xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span
              className="text-[0.7rem] font-semibold uppercase tracking-[0.34em]"
              style={{ color: GOLD }}
            >
              The suite
            </span>
            <h2
              id="suite-heading"
              className={`${serifClass} mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04]`}
            >
              Choose the intelligence module you want to run.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-7 text-white/65">
              This is an assessment aid, not a final visa decision. Final eligibility and
              filing strategy require XIPHIAS advisor review.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.href}
                  {...rise}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.06 }}
                >
                  <Link
                    href={tool.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: "rgba(191,161,92,0.32)",
                      background: "rgba(251,250,247,0.04)",
                    }}
                  >
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={tool.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(10,23,51,0.25) 0%, rgba(10,23,51,0.9) 100%)",
                        }}
                      />
                      <span
                        className="absolute left-4 top-4 grid size-10 place-items-center rounded-lg border"
                        style={{
                          borderColor: "rgba(191,161,92,0.5)",
                          background: "rgba(10,23,51,0.55)",
                          color: GOLD,
                        }}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="absolute right-4 top-4 text-xs font-semibold text-white/55">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className={`${serifClass} text-[1.45rem] font-medium leading-[1.1]`}>
                        {tool.label}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-white/65">
                        {tool.copy}
                      </p>
                      <span
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                        style={{ color: GOLD }}
                      >
                        Open
                        <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CLOSING CTA ───────────────────────── */}
      <section
        className="relative"
        style={{ background: PEARL, color: INK }}
        aria-labelledby="cta-heading"
      >
        <Ambient tone="light" />
        <div className="relative mx-auto w-full max-w-screen-xl px-6 py-24 text-center lg:px-10 lg:py-32">
          <span
            className="text-[0.7rem] font-semibold uppercase tracking-[0.34em]"
            style={{ color: GOLD_DEEP }}
          >
            Advisor review
          </span>
          <h2
            id="cta-heading"
            className={`${serifClass} mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02]`}
          >
            Let intelligence inform the conversation.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-8" style={{ color: "rgba(12,31,63,0.66)" }}>
            Run a module, then sit with a XIPHIAS advisor to translate the direction into a
            filing-ready strategy.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition hover:brightness-110"
              style={{ background: NAVY, color: PEARL }}
            >
              Speak with an advisor
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold transition hover:bg-black/[0.03]"
              style={{ borderColor: GOLD_DEEP, color: GOLD_DEEP }}
            >
              Check eligibility
            </Link>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
