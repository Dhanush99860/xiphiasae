"use client";

// Navy/gold "Tool Panel" shell for the main /eligibility assessment funnel.
// PRESENTATION ONLY — it wraps the existing <Flow/> wizard (and its scoring,
// API submit, lead-gate, autosave, results) verbatim inside a glass panel.
// Dark navy hero (real image) → a light "tool surface" card holding the wizard,
// because the wizard's own step/question cards are light by design. Renders its
// own LuxeHeader/LuxeFooter. Cormorant serif + bilingual eyebrow.

import { Suspense } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Shield, Zap } from "lucide-react";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";
import Flow from "@/app/(site)/eligibility/Flow";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

const STEPS: [string, string, string][] = [
  ["1", "Choose pathway", "Residency, citizenship, skilled, or corporate."],
  ["2", "Answer profile questions", "Budget, timeline, family, and goal inputs."],
  ["3", "Receive preview", "Website result plus a branded trailer email."],
  ["4", "Register for full report", "Registration unlocks the detailed workflow."],
];

const FAQS: [string, string][] = [
  ["Is this assessment free?", "Yes. It’s a free preliminary assessment to guide your next steps."],
  ["How accurate are the results?", "They’re indicative and based on your answers. Final outcomes depend on official review."],
  ["Do I need to share my email to get the preview?", "Enter your name and email to receive the branded trailer and view the preview. The full detailed report unlocks after registration."],
  ["How long does it take?", "Typically 2–4 minutes."],
];

export default function EligibilityToolShell({ serifClass }: { serifClass: string }) {
  useReducedMotion();
  const heroImg = countryImage("uae", "Africa & Middle East");

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (real full-bleed image, navy overlay) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="Immigration assessment" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.86) 0%, rgba(10,23,51,0.94) 60%, ${NAVY} 100%)` }}
          />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
            <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> XIA Intelligence{" "}
            <span style={{ color: GOLD }}>/</span> Eligibility Assessment
          </p>
          <p className="mt-7"><Eyebrow ar="تقييم الأهلية">XIA · Eligibility Assessment</Eyebrow></p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>
            Where in the world could you <span className="italic" style={{ color: GOLD }}>belong?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
            Start with a guided assessment, receive a branded preview by email, and register for a
            detailed personal report. Indicative, private, and built around your family.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5 text-[13px]">
            {[
              { icon: Zap, label: "Step-by-step" },
              { icon: FileText, label: "Email trailer" },
              { icon: Shield, label: "Private" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-white/80"
                style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}
              >
                <Icon className="size-3.5" style={{ color: GOLD }} /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ASSESSMENT PANEL (wizard preserved verbatim) ── */}
      <section
        id="start"
        data-tone="dark"
        className="relative isolate scroll-mt-24 px-6 pb-24 pt-16 sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <Ambient tone="dark" />
        <div
          className="mx-auto max-w-7xl rounded-3xl border p-6 sm:p-10 lg:p-12"
          style={{ borderColor: `${GOLD}40`, background: "rgba(8,18,40,0.6)", boxShadow: "0 50px 130px -60px rgba(0,0,0,0.85)" }}
        >
          {/* Funnel steps */}
          <Eyebrow ar="مسار التقييم">Assessment funnel</Eyebrow>
          <h2 className={`${serifClass} mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-white`}>
            Start your guided assessment preview
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([step, title, copy]) => (
              <div
                key={step}
                className="rounded-2xl border px-4 py-4"
                style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="grid size-7 shrink-0 place-items-center rounded-full text-xs font-black"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    {step}
                  </span>
                  <span className="text-[14px] font-semibold text-white">{title}</span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">{copy}</p>
              </div>
            ))}
          </div>

          {/* Light tool surface holding the existing wizard (logic untouched) */}
          <div className="mt-8 overflow-hidden rounded-2xl border bg-pearl p-3 sm:p-5 text-ink" style={{ borderColor: `${GOLD}55` }}>
            <Suspense
              fallback={
                <div className="px-2 pb-2">
                  <div className="h-28 animate-pulse rounded-xl border border-gold/45 bg-sand/50" />
                </div>
              }
            >
              <Flow />
            </Suspense>
          </div>

          <p className="mt-4 text-[12.5px] leading-relaxed text-white/45">
            Indicative only — final outcomes depend on official review. Your information stays
            confidential and is never sold to third parties.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-20 pt-4 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-3xl">
          <Eyebrow ar="الأسئلة الشائعة">Frequently asked questions</Eyebrow>
          <div
            className="mt-6 overflow-hidden rounded-2xl border"
            style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
          >
            {FAQS.map(([q, a], i) => (
              <details
                key={q}
                className="group px-5 py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-white marker:hidden">
                  {q}
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-md border text-[13px] transition-transform group-open:rotate-45"
                    style={{ borderColor: `${GOLD}55`, color: GOLD }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 100% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-2xl">
          <p className="flex justify-center"><Eyebrow ar="ابدأ الآن">Your route, assessed precisely</Eyebrow></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.05]`}>
            Turn this preview into a <span className="italic" style={{ color: GOLD }}>committed plan.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/70">
            A senior advisor will refine your result against current government schedules and your
            family structure — privately, under NDA.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            Request a private consultation <ArrowRight className="size-4" />
          </a>
          <p className="mt-4 text-[12.5px]" style={{ color: GOLD_DEEP }}>
            Confidential · Indicative figures verified by your advisor before any decision.
          </p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
