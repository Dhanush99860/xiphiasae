/**
 * TrustEmbassy — high-trust section for premium clients.
 * Shows licensed advisory credentials, stats, and trust indicators.
 * Server component — no client runtime needed.
 */

import { TRUST_POINTS } from "./data";

export default function TrustEmbassy() {
  return (
    <section
      className="relative overflow-hidden bg-[#04091a] py-24"
      aria-label="Trust and credentials"
    >
      {/* Top divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Gold accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(225,185,35,0.06)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-screen-2xl px-6 sm:px-10 xl:px-16">

        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary/80">
            Advisory Standards
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-black leading-tight tracking-tight text-white">
            Built for clients who expect more
          </h2>
          <p className="mt-4 max-w-lg text-[15px] text-white/45">
            We operate as a private advisory firm, not a visa processing shop.
            Every engagement is compliance-first, family-aware, and advisor-led.
          </p>
        </div>

        {/* Stats / trust grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              className="group rounded-2xl border border-white/8 bg-[#060e1e]/80 p-7 transition-colors hover:border-white/16"
            >
              {/* Stat */}
              <div className="mb-4 flex items-baseline gap-1.5">
                <span className="text-[2.5rem] font-black leading-none tracking-tight text-secondary">
                  {point.stat}
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/35">
                  {point.statLabel}
                </span>
              </div>

              {/* Content */}
              <h3 className="mb-2 text-[16px] font-bold text-white">{point.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-white/50">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom credentials strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/8 pt-8">
          {[
            "AML & KYC Compliant",
            "Source-of-Funds Guidance",
            "Family Relocation Support",
            "Licensed in All Jurisdictions",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 text-[12px] font-medium text-white/35">
              <svg
                className="size-3.5 flex-shrink-0 text-secondary/70"
                viewBox="0 0 12 12"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm2.77 4.47-3 3a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.97.97 2.47-2.47a.75.75 0 0 1 1.06 1.06Z" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
