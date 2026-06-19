"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { XIA_FLOW } from "./data";

export default function XiaRouteDesk() {
  const [activeStep, setActiveStep] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#040b1a] py-24"
      aria-label="XIA Route Intelligence desk"
    >
      {/* Divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Blue accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-80 w-96 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(28,87,180,0.12)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-screen-2xl px-6 sm:px-10 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left: description */}
          <div>
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#60a5fa]">
              XIA Intelligence
            </span>
            <h2 className="mt-1 text-[clamp(1.75rem,4vw,3rem)] font-black leading-tight tracking-tight text-white">
              Your AI-assisted
              <br />
              <span className="text-secondary">advisory desk</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/50">
              XIA analyses your profile against 50+ global programs in seconds —
              then a licensed advisor reviews and refines your shortlist before
              any consultation is booked.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/xia-intelligence"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14px] font-bold text-white transition-all hover:bg-[#1a4ea8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Start Route Assessment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Right: flow desk */}
          <div className="rounded-2xl border border-white/10 bg-[#060e1e] p-6 sm:p-8">
            {/* Desk header */}
            <div className="mb-6 flex items-center gap-3 border-b border-white/8 pb-4">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                XIA Route Desk
              </span>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3">
              {XIA_FLOW.map((item, i) => {
                const isDone = i < activeStep;
                const isActive = i === activeStep;

                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveStep(i)}
                    className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                      isActive
                        ? "border-secondary/30 bg-secondary/6"
                        : isDone
                          ? "border-white/10 bg-white/3"
                          : "border-white/6 bg-transparent hover:border-white/12 hover:bg-white/3"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {/* Step badge */}
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-black transition-colors ${
                        isActive
                          ? "bg-secondary text-[#040b1a]"
                          : isDone
                            ? "bg-white/20 text-white/70"
                            : "bg-white/8 text-white/30"
                      }`}
                      aria-hidden="true"
                    >
                      {isDone ? "✓" : item.step}
                    </span>

                    <div>
                      <p
                        className={`text-[14px] font-bold leading-tight transition-colors ${
                          isActive ? "text-secondary" : isDone ? "text-white/60" : "text-white/50"
                        }`}
                      >
                        {item.label}
                      </p>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={reduce ? {} : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={reduce ? {} : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.28 }}
                            className="mt-1.5 overflow-hidden text-[12.5px] leading-relaxed text-white/45"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
              <button
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                disabled={activeStep === 0}
                className="text-[12px] font-semibold text-white/30 transition-colors hover:text-white/60 disabled:pointer-events-none disabled:opacity-30"
              >
                Previous
              </button>
              <div className="flex gap-1.5" aria-hidden="true">
                {XIA_FLOW.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === activeStep ? "w-5 bg-secondary" : "w-1 bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveStep((s) => Math.min(XIA_FLOW.length - 1, s + 1))}
                disabled={activeStep === XIA_FLOW.length - 1}
                className="text-[12px] font-semibold text-white/50 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
