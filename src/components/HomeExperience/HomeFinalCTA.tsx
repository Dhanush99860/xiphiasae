/**
 * HomeFinalCTA — premium closing CTA section.
 * Server component — static markup.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeFinalCTA() {
  return (
    <section
      className="relative overflow-hidden bg-[#04091a] py-28"
      aria-label="Begin your journey"
    >
      {/* Top divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Centered radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(28,87,180,0.14)_0%,transparent_65%)]" />
      </div>

      {/* Gold top accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-[2px] w-32 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35">
          Your next move
        </p>
        <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.05] tracking-tight text-white">
          Begin with a private
          <br />
          <span className="text-secondary">route assessment</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/45">
          Tell us your goal. We will map the fastest, safest, most cost-effective
          pathway and introduce you to the advisor best suited for your case.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/eligibility"
            className="inline-flex items-center gap-2.5 rounded-full bg-secondary px-8 py-3.5 text-[14px] font-bold text-[#040b1a] shadow-[0_0_28px_rgba(225,185,35,0.25)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Start Your Route
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-[14px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Book Consultation
          </Link>
        </div>

        {/* Social proof footnote */}
        <p className="mt-8 text-[12px] text-white/25">
          Trusted by 4,500+ families · 98% approval rate · 17 years of advisory excellence
        </p>
      </div>
    </section>
  );
}
