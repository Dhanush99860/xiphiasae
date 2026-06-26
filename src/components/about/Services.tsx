// components/about/Services.tsx
import React from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { DrawLine } from "@/components/motion";

const items = [
  {
    icon: Globe2,
    title: "Residency",
    text: "Golden Visa & investment routes, relocation readiness.",
    href: "/residency",
  },
  {
    icon: Passport,
    title: "Citizenship",
    text: "Citizenship-by-investment with rigorous due diligence.",
    href: "/citizenship",
  },
  {
    icon: Building,
    title: "Corporate Mobility",
    text: "Enterprise immigration & compliant deployments.",
    href: "/corporate",
  },
  {
    icon: Briefcase,
    title: "Skilled Migration",
    text: "End-to-end skilled worker pathways.",
    href: "/skilled",
  },
];

export default function Services() {
  const titleId = "services-title";

  return (
    <section
      id="services"
      className="py-6 md:py-6"
      aria-labelledby={titleId}
    >
      {/* container matches hero spacing + mobile safety */}
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
            <Eyebrow arabic="خدماتنا">What We Do</Eyebrow>

            <h2
              id={titleId}
              className="mt-3 font-sora text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-[32px] break-words"
            >
              Boutique Advisory Across 4 Pillars
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink/55">
              White-glove, regulation-first strategies for investors, leaders and enterprises.
            </p>
            <DrawLine
              d="M0 6 H 300"
              viewBox="0 0 300 12"
              className="mt-4 h-3 w-48"
              strokeWidth={1.4}
            />
          </header>

          {/* cards */}
          <ul className="relative grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ icon: Icon, title, text, href }) => (
              <li key={title} className="min-w-0">
                <Link
                  href={href}
                  prefetch={false}
                  className={[
                    "group flex h-full flex-col rounded-2xl",
                    "bg-sand/50 border border-gold/45",
                    "p-5 transition-all duration-300 will-change-transform",
                    "hover:-translate-y-0.5 hover:border-gold/65",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand",
                  ].join(" ")}
                  aria-label={`${title} — Explore`}
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 rounded-xl border border-gold/40 bg-white p-2">
                      <Icon />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-sora text-base font-semibold leading-tight text-ink break-words">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-ink/55 break-words">
                        {text}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold underline-offset-4 group-hover:underline">
                        Explore
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
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
function Building() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="8" height="18" rx="1" />
      <rect x="13" y="7" width="8" height="14" rx="1" />
      <path d="M7 7h2M7 11h2M7 15h2M17 11h2M17 15h2" />
    </svg>
  );
}
function Briefcase() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M3 12h18" />
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