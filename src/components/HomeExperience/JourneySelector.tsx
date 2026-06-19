"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { JOURNEY_PATHS, type JourneyId } from "./data";

export default function JourneySelector() {
  const [active, setActive] = useState<JourneyId>("residency");
  const reduce = useReducedMotion();

  const activeData = JOURNEY_PATHS.find((p) => p.id === active)!;

  return (
    <section
      className="relative overflow-hidden bg-[#040b1a] py-24"
      aria-label="Select your immigration journey"
    >
      {/* Subtle top border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 xl:px-16">

        {/* Section label */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            Your Pathway
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-black leading-tight tracking-tight text-white">
            Which route fits your goals?
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-white/45">
            Select a pathway to see relevant programs and destination options.
          </p>
        </div>

        {/* Tab row */}
        <div
          role="tablist"
          aria-label="Journey pathways"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {JOURNEY_PATHS.map((path) => {
            const isActive = active === path.id;
            return (
              <button
                key={path.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(path.id)}
                className="relative rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={
                  isActive
                    ? {
                        borderColor: path.accentColor,
                        color: path.accentColor,
                        background: path.bgColor,
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.5)",
                        background: "transparent",
                      }
                }
              >
                {path.title}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? {} : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
            className="grid gap-6 lg:grid-cols-5"
          >
            {/* Description card */}
            <div
              className="flex flex-col justify-between rounded-2xl border border-white/10 p-7 lg:col-span-2"
              style={{ background: activeData.bgColor }}
            >
              <div>
                <p
                  className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: activeData.accentColor }}
                >
                  {activeData.subtitle}
                </p>
                <h3 className="text-2xl font-black text-white">{activeData.title}</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-white/55">
                  {activeData.description}
                </p>
              </div>
              <Link
                href={activeData.href}
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold transition-opacity hover:opacity-80"
                style={{ color: activeData.accentColor }}
              >
                Explore {activeData.title}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Countries grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
              {activeData.countries.map((country, i) => (
                <motion.div
                  key={country}
                  initial={reduce ? {} : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center justify-center rounded-xl border border-white/8 bg-white/4 p-5 text-[14px] font-semibold text-white/75 transition-colors hover:border-white/20 hover:bg-white/8 hover:text-white"
                >
                  {country}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
