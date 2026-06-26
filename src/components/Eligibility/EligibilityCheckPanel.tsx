"use client";

// Navy/gold "Tool Panel" reskin for the per-track eligibility-check landing
// pages (citizenship / residency / corporate / skilled). PRESENTATION ONLY —
// content (copy, features, steps, faqs) and routes are passed in by each server
// page, which keeps its own metadata + JSON-LD. Dark navy hero (real image) →
// glass panels with gold accents, Cormorant serif, bilingual eyebrow.

import { useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

export type EligibilityCheckContent = {
  /** Eyebrow above the title (English) */
  eyebrow: string;
  /** Arabic eyebrow (RTL) */
  eyebrowAr: string;
  /** Hero heading, with an italic-gold tail after the pipe `|` */
  title: string;
  titleAccent: string;
  subtitle: string;
  features: string[];
  steps: { k: string; t: string; d: string }[];
  highlights: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  /** Start CTA → /eligibility?track=… */
  startHref: string;
  startLabel: string;
  /** Breadcrumb middle crumb */
  crumbLabel: string;
  crumbHref: string;
  /** country-image slug + region for the full-bleed hero */
  imageSlug: string;
  imageRegion?: string;
  /** Secondary CTA card */
  ctaTitle: string;
  ctaCopy: string;
};

function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

export default function EligibilityCheckPanel({
  serifClass,
  content,
}: {
  serifClass: string;
  content: EligibilityCheckContent;
}) {
  useReducedMotion();
  const heroImg = countryImage(content.imageSlug, content.imageRegion);

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (real full-bleed image, navy overlay) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-20 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt={content.crumbLabel} className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.86) 0%, rgba(10,23,51,0.94) 60%, ${NAVY} 100%)` }}
          />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
            <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span>{" "}
            <a href={content.crumbHref} className="hover:text-[#bfa15c]">{content.crumbLabel}</a>{" "}
            <span style={{ color: GOLD }}>/</span> Eligibility Check
          </p>
          <p className="mt-7"><Eyebrow ar={content.eyebrowAr}>{content.eyebrow}</Eyebrow></p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>
            {content.title} <span className="italic" style={{ color: GOLD }}>{content.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">{content.subtitle}</p>

          <ul className="mt-7 flex flex-wrap gap-2.5 text-[13px]">
            {content.features.map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-white/80"
                style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}
              >
                <Check className="size-3.5" style={{ color: GOLD }} /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={content.startHref}
              className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              {content.startLabel} <ArrowRight className="size-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:bg-white/10"
              style={{ borderColor: `${GOLD}55` }}
            >
              How it works
            </a>
            <span className="text-[12.5px] text-white/55">No sign-up · Instant result · Free</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS + HIGHLIGHTS ── */}
      <section
        id="how-it-works"
        data-tone="dark"
        className="relative isolate px-6 pb-20 pt-16 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-7xl">
          <Eyebrow ar="كيف تعمل">How it works</Eyebrow>
          <ol className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((s) => (
              <li
                key={s.k}
                className="relative overflow-hidden rounded-2xl border p-6"
                style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
              >
                <div className={`${serifClass} text-3xl font-semibold`} style={{ color: GOLD }}>{s.k}</div>
                <h3 className="mt-3 text-[15px] font-semibold text-white">{s.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16">
            <Eyebrow ar="لماذا">Why use this checker?</Eyebrow>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.highlights.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
                >
                  <h3 className="text-[15px] font-semibold text-white">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-20 pt-16 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-3xl">
          <Eyebrow ar="الأسئلة الشائعة">Frequently asked questions</Eyebrow>
          <div
            className="mt-6 overflow-hidden rounded-2xl border"
            style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
          >
            {content.faqs.map((f, i) => (
              <details
                key={f.q}
                className="group px-5 py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-white marker:hidden">
                  {f.q}
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-md border text-[13px] transition-transform group-open:rotate-45"
                    style={{ borderColor: `${GOLD}55`, color: GOLD }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">{f.a}</p>
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
          <p className="flex justify-center"><Eyebrow ar="ابدأ الآن">{content.ctaTitle}</Eyebrow></p>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.05]`}>
            {content.ctaCopy}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={content.startHref}
              className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              {content.startLabel} <ArrowRight className="size-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:bg-white/10"
              style={{ borderColor: `${GOLD}55` }}
            >
              Talk to an advisor <ArrowUpRight className="size-4" />
            </a>
          </div>
          <p className="mt-5 text-[12.5px]" style={{ color: GOLD_DEEP }}>
            Confidential · Indicative screen — final outcomes depend on official review.
          </p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
