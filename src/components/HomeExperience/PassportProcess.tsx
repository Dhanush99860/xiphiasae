"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

import { PROCESS_STEPS } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function PassportProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll<HTMLElement>(".process-card");
      const bar = progressRef.current;

      // Animate progress bar width with scroll
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      }

      // Stagger each card on scroll entry
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#040b1a] py-24"
      aria-label="Immigration journey process"
    >
      {/* Divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 xl:px-16">

        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            The Process
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-black leading-tight tracking-tight text-white">
            From first meeting to
            <span className="text-secondary"> landing day</span>
          </h2>
        </div>

        {/* Progress bar */}
        <div className="relative mb-10 hidden h-px w-full bg-white/8 lg:block" aria-hidden="true">
          <div
            ref={progressRef}
            className="absolute inset-0 origin-left bg-gradient-to-r from-secondary/60 to-primary/60"
          />
        </div>

        {/* Step cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="process-card group rounded-2xl border border-white/8 bg-[#060e1e] p-7 transition-colors hover:border-white/16"
            >
              {/* Step number — passport-stamp styling */}
              <div className="mb-5 flex items-start justify-between">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-secondary/40 text-[13px] font-black text-secondary"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                {/* Decorative stamp ring */}
                <span
                  className="inline-block h-8 w-8 rounded-full border border-dashed border-white/12 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-2 text-[17px] font-bold text-white">{step.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-white/50">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
