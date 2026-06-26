// src/components/about/CaseStudies.tsx
import React from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";

type CaseItem = {
  title: string;
  challenge: string;
  outcome: string;
};

const cases: CaseItem[] = [
  {
    title: "HNWI Family – Gulf to EU",
    challenge: "Time-bound relocation; school admissions for 2 kids.",
    outcome: "Secured EU residency in 6.5 months; education & housing set-up.",
  },
  {
    title: "Founder – Mobility & Tax",
    challenge: "Travel constraints & optimization for cross-border income.",
    outcome: "Residency + compliant structure; 120+ visa-free destinations.",
  },
  {
    title: "Enterprise – Talent Deployment",
    challenge: "Multi-country, multi-role deployments with compliance risk.",
    outcome: "Standardized corporate immigration playbook; on-schedule moves.",
  },
];

export default function CaseStudies() {
  const titleId = "about-case-studies-title";

  return (
    <section
      id="case-studies"
      aria-labelledby={titleId}
      className="py-6 md:py-6"
    >
      {/* container aligned with hero + overflow safety */}
      <div className="container mx-auto lg:max-w-screen-2xl px-4 sm:px-6 lg:px-8 overflow-x-clip">
        {/* dark ink wrapper (Midnight Embassy) */}
        <div
          className={[
            "relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10",
            "bg-white border border-gold/45",
            "text-ink",
          ].join(" ")}
        >
          {/* soft background accents (clipped) */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="hidden sm:block absolute -top-24 -end-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="hidden sm:block absolute -bottom-28 -start-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent_80%)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
            </div>
          </div>

          {/* header */}
          <header className="relative mb-6 md:mb-8">
            <Eyebrow arabic="إنجازات">Client Outcomes</Eyebrow>

            <h2
              id={titleId}
              className="mt-3 font-sora text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-[32px] break-words"
            >
              Selected Case Highlights
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-ink/55">
              Anonymized summaries illustrating our approach and results. Detailed
              references on request.
            </p>
          </header>

          {/* cards */}
          <ul className="relative grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <li key={c.title} className="min-w-0">
                <article
                  className={[
                    "h-full rounded-2xl p-5",
                    "bg-sand/50 border border-gold/45",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65",
                  ].join(" ")}
                >
                  <header className="flex items-start gap-3">
                    <span className="shrink-0 rounded-xl border border-gold/40 bg-white p-2">
                      <CaseIcon />
                    </span>
                    <h3 className="font-sora text-base font-semibold leading-tight text-ink break-words">
                      {c.title}
                    </h3>
                  </header>

                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Target className="mt-[2px]" />
                      <dt className="font-medium text-ink/70">Challenge:</dt>
                      <dd className="ms-1 text-ink/55 break-words">
                        {c.challenge}
                      </dd>
                    </div>

                    <div className="flex items-start gap-2 text-gold">
                      <Check className="mt-[2px]" />
                      <dt className="font-medium">Outcome:</dt>
                      <dd className="ms-1 break-words text-ink/70">{c.outcome}</dd>
                    </div>
                  </dl>

                  {/* tiny meta row */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-gold/45 bg-white px-2 py-0.5 text-[11px] font-medium text-ink/60">
                      Anonymized
                    </span>
                    <span className="inline-flex items-center rounded-full border border-gold/45 bg-white px-2 py-0.5 text-[11px] font-medium text-ink/60">
                      Private Client
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* subtle CTA bar to mirror hero’s tone */}
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-sand/50 p-4 text-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <p className="font-medium text-ink">See how we work</p>
                <p className="text-xs text-ink/55">
                  Review our methodology, governance and confidentiality standards
                  for private clients.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/personal-booking"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-2 font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                >
                  Book Paid Expert
                  <ArrowRight />
                </Link>
                <Link
                  href="/insights"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.03] px-3.5 py-2 text-ink transition-colors hover:border-gold/60"
                >
                  Latest Insights
                </Link>
              </div>
            </div>
          </div>

          {/* disclaimer */}
          <p className="relative mt-3 text-[11px] text-ink/45">
            *Outcomes are specific to each client’s facts and jurisdictional rules. No
            guarantees. Eligibility &amp; rules apply.
          </p>
        </div>
      </div>
    </section>
  );
}

/* inline icons */
function CaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h10M7 13h6" />
    </svg>
  );
}

function Target({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 text-ink/45 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" />
    </svg>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 shrink-0 fill-gold ${className}`}
    >
      <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 5.457 8.543l3.293 3.293 6.543-6.543a1 1 0 0 1 1.414 0z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z"
      />
    </svg>
  );
}