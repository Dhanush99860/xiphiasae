"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Eyebrow, Button } from "@/components/ui";
import {
  SplitText,
  DrawLine,
  Stagger,
  StaggerItem,
  Magnetic,
  SandReveal,
  LatticeOverlay,
  ImageReveal,
  ParallaxLayer,
} from "@/components/motion";

import { XIA_FLOW } from "./data";

export default function XiaRouteDesk() {
  const [activeStep, setActiveStep] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-24 text-ink lg:py-28"
      aria-label="How XIA Intelligence works"
    >
      {/* Faint Emirati lattice texture so the white band isn't flat */}
      <LatticeOverlay opacity={0.06} />

      {/* Faint gold dot-grid so the white ground reads as a surface, not a void */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(168,125,31,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top gold hairline ties the band into the scroll guide */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 sm:px-10 xl:px-16">
        {/* Header + editorial image */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <SandReveal className="max-w-2xl">
            <Eyebrow tone="gold" arabic="الذكاء">
              XIA Intelligence
            </Eyebrow>
            <h2 className="mt-6 font-sora text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-ink">
              <SplitText text="How XIA maps your route" />
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60">
              Four considered steps — from intent to a verified shortlist reviewed
              by a licensed advisor before any consultation is scheduled.
            </p>
            <DrawLine
              d="M0 1 L260 1"
              viewBox="0 0 260 2"
              preserveAspectRatio="none"
              strokeWidth={2}
              duration={1.4}
              className="mt-8 h-px w-44"
            />
          </SandReveal>

          {/* Editorial advisory image — parallax depth on desktop */}
          <ParallaxLayer speed={34} className="hidden lg:block">
            <div className="relative">
              <ImageReveal
                src="/images/blogs/immigration-consultants-xiphias.webp"
                alt="A licensed XIPHIAS advisor reviewing an XIA-generated shortlist"
                ratio="aspect-[4/5]"
                position="center"
                sizes="(min-width:1024px) 36vw, 100vw"
                className="border border-gold/30 shadow-[0_24px_64px_-38px_rgba(168,125,31,0.5)]"
              />
              {/* gold caption tag */}
              <span className="pointer-events-none absolute start-4 top-4 rounded-full border border-gold/50 bg-pearl/85 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold_deep backdrop-blur-sm">
                Advisor-verified
              </span>
            </div>
          </ParallaxLayer>
        </div>

      {/* ── Horizontal stepper (md+) ─────────────────────────────────── */}
      <div className="mt-14 hidden md:block">
        <div className="relative">
          {/* Faint base rail — reads on white */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-7 h-px bg-gold/20"
          />
          {/* Gold connector that draws across */}
          <DrawLine
            d="M0 1 L100 1"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            strokeWidth={2}
            duration={1.8}
            className="pointer-events-none absolute inset-x-0 top-7 h-px w-full"
          />

          <Stagger className="relative grid grid-cols-4 gap-6" amount={0.3}>
            {XIA_FLOW.map((item, i) => {
              const isActive = i === activeStep;
              return (
                <StaggerItem key={item.step}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    onMouseEnter={() => setActiveStep(i)}
                    aria-current={isActive ? "step" : undefined}
                    className="group flex w-full flex-col items-start text-start focus:outline-none"
                  >
                    {/* Node */}
                    <span className="relative mb-6 inline-flex">
                      <span
                        className={`relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border font-sora text-[15px] font-bold transition-all duration-300 ${
                          isActive
                            ? "border-gold bg-gold text-ink shadow-[0_10px_30px_-8px_rgba(212,175,55,0.6)]"
                            : "border-gold/40 bg-sand text-gold_deep group-hover:border-gold/70"
                        }`}
                      >
                        {item.step}
                      </span>
                      {isActive && !reduce && (
                        <motion.span
                          layoutId="xia-node-ring"
                          className="absolute -inset-1.5 rounded-full border border-gold/40"
                          transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        />
                      )}
                    </span>

                    <h3
                      className={`font-sora text-[16px] font-semibold leading-snug transition-colors ${
                        isActive ? "text-ink" : "text-ink/70 group-hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </h3>

                    <AnimatePresence initial={false} mode="wait">
                      {isActive && (
                        <motion.p
                          key={item.step}
                          initial={reduce ? { opacity: 1 } : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden text-[13.5px] leading-relaxed text-ink/60"
                        >
                          <span className="block pt-3">{item.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>

      {/* ── Vertical stepper (mobile) ────────────────────────────────── */}
      <div className="relative mt-12 md:hidden">
        {/* Vertical connector — reads on white */}
        <span
          aria-hidden
          className="absolute bottom-6 start-7 top-6 w-px bg-gold/25"
        />
        <DrawLine
          d="M1 0 L1 100"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          strokeWidth={2}
          duration={1.6}
          className="pointer-events-none absolute bottom-6 start-7 top-6 h-[calc(100%-3rem)] w-px"
        />

        <Stagger className="relative flex flex-col gap-8" amount={0.15}>
          {XIA_FLOW.map((item) => (
            <StaggerItem key={item.step}>
              <div className="flex items-start gap-5">
                <span className="relative z-10 inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gold bg-gold font-sora text-[15px] font-bold text-ink shadow-[0_8px_24px_-8px_rgba(212,175,55,0.55)]">
                  {item.step}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-sora text-[16px] font-semibold leading-snug text-ink">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* ── CTA row ──────────────────────────────────────────────────── */}
      <div className="mt-16 flex flex-col flex-wrap items-start gap-4 border-t border-gold/40 pt-10 sm:flex-row sm:items-center">
        <Magnetic strength={0.3}>
          <Button href="/xia-intelligence">See XIA Intelligence</Button>
        </Magnetic>
        <Button variant="secondary" href="/booking">
          Book a consultation
        </Button>
      </div>
      </div>

      {/* Bottom gold hairline closes the band into the scroll guide */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />
    </section>
  );
}
