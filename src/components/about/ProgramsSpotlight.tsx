// components/about/ProgramsSpotlight.tsx
import React from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";

type Program = {
  tag: "Residency" | "Citizenship";
  title: string;
  text: string;
  href: string;
};

const programs: Program[] = [
  {
    tag: "Residency",
    title: "UAE Golden Visa",
    text: "Investor & talent pathways with regional benefits.",
    href: "/residency/uae",
  },
  {
    tag: "Residency",
    title: "Portugal Residency",
    text: "Compliant routes with family inclusion & mobility.",
    href: "/residency/portugal",
  },
  {
    tag: "Citizenship",
    title: "Grenada CBI",
    text: "Donation and real-estate based citizenship options.",
    href: "/citizenship/grenada",
  },
  {
    tag: "Citizenship",
    title: "Dominica CBI",
    text: "Established Caribbean citizenship by investment program.",
    href: "/citizenship/dominica",
  },
];

function tagStyles(_tag: Program["tag"]) {
  return "border-gold/45 bg-sand/60 text-ink/70";
}

export default function ProgramsSpotlight() {
  const titleId = "programs-spotlight-title";

  return (
    <section
      id="programs-spotlight"
      className="py-6 md:py-6"
      aria-labelledby={titleId}
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
          {/* soft background accents (clipped by parent) */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="hidden sm:block absolute -top-24 -end-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="hidden sm:block absolute -bottom-28 -start-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent_80%)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
            </div>
          </div>

          {/* header */}
          <header className="relative mb-6 md:mb-8">
            <Eyebrow arabic="برامج">Flagship Programs</Eyebrow>

            <h2
              id={titleId}
              className="mt-3 font-sora text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-[32px] break-words"
            >
              Strategic Pathways We Lead
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-ink/55">
              Explore top-demand programs curated for mobility, preservation and family outcomes. Links
              point to your existing landing pages—update slugs as needed.
            </p>
          </header>

          {/* cards */}
          <ul className="relative grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => (
              <li key={p.title} className="min-w-0">
                <Link
                  href={p.href}
                  prefetch={false}
                  className={[
                    "group flex h-full flex-col rounded-2xl p-5",
                    "bg-sand/50 border border-gold/45",
                    "transition-all duration-300 will-change-transform",
                    "hover:-translate-y-0.5 hover:border-gold/65",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand",
                  ].join(" ")}
                  aria-label={`${p.title} — View Program`}
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 rounded-xl border border-gold/40 bg-white p-2">
                      {p.tag === "Residency" ? <Globe2 /> : <Passport />}
                    </span>

                    <div className="min-w-0">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                          tagStyles(p.tag),
                        ].join(" ")}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                        {p.tag}
                      </span>

                      <h3 className="mt-1 font-sora text-base font-semibold leading-tight text-ink break-words">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink/55 break-words">
                        {p.text}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold underline-offset-4 group-hover:underline">
                        View Program
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* subtle CTA row to mirror hero’s tone */}
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-sand/50 p-4 text-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <p className="font-medium text-ink">Not sure which route fits best?</p>
                <p className="text-xs text-ink/55">
                  Get a licensed view of eligibility, timelines and investment implications for your profile.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/personal-booking"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-2 font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                  aria-label="Book a Private Consultation"
                >
                  Book Paid Expert
                  <ArrowRight />
                </Link>
                <Link
                  href="/insights"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.03] px-3.5 py-2 text-ink transition-colors hover:border-gold/60"
                  aria-label="See Latest Insights"
                >
                  Latest Insights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* inline icons */
function Globe2() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2c3 4 3 14 0 20M12 2c-3 4-3 14 0 20" />
    </svg>
  );
}
function Passport() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M8 16h8" />
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