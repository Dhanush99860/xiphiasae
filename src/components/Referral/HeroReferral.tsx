import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Eyebrow } from "@/components/ui";
import { DrawLine } from "@/components/motion";

type Props = {
  className?: string;
};

export default function HeroReferral({ className = "" }: Props) {
  const heroId = "hero-referral-title";

  return (
    <>
      <section
        aria-labelledby={heroId}
        className={[
          "relative overflow-hidden rounded-[32px] border border-gold/45 bg-white p-6 md:p-8 lg:p-10",
          className,
        ].join(" ")}
      >
        {/* Decorative background accents (Midnight Embassy gold glow) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-gold/[0.06] blur-3xl" />
        </div>
        <DrawLine
          d="M2 8 H98"
          viewBox="0 0 100 16"
          className="pointer-events-none absolute inset-x-8 top-6 h-4 w-[calc(100%-4rem)] opacity-60"
          strokeWidth={1}
        />

        <div className="relative text-start md:max-w-3xl">
          {/* Eyebrow */}
          <Eyebrow arabic="إحالة">Client Referral Program</Eyebrow>

          {/* Title */}
          <h1
            id={heroId}
            className="mt-4 font-sora text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-ink"
          >
            Refer a Friend. Reward Their Move – and Yours.
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-[15px] leading-8 text-ink/70 md:text-base">
            Introduce friends, family, or colleagues to XIPHIAS Immigration.
            They get priority advisory and you earn referral rewards once they
            sign up for our services.
          </p>

          {/* Feature chips */}
          <ul className="mt-6 flex flex-wrap gap-2.5 text-xs">
            <li className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-3 py-2 font-medium text-ink/70">
              <Check />
              <span>Rewards up to ₹5,000 per successful case</span>
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-3 py-2 font-medium text-ink/70">
              <Check />
              <span>Dedicated referral desk &amp; priority handling</span>
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-3 py-2 font-medium text-ink/70">
              <Check />
              <span>Simple, 2-step online form</span>
            </li>
          </ul>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* Primary: scrolls to form */}
            <Link
              href="#referral-form"
              className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 font-semibold text-ink transition hover:bg-gold_bright focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-sand"
              aria-label="Refer a client now"
            >
              Refer a client now
              <ArrowRight />
            </Link>

            {/* Secondary: contact expert – connects to CRM via your normal flow */}
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-xl border border-gold/45 bg-sand/60 px-5 py-3 font-semibold text-ink/80 transition hover:border-gold/65 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Talk to an advisor"
            >
              <Open />
              Talk to an advisor
            </Link>

            <span className="ms-0 md:ms-2 text-xs text-ink/45">
              No spam · We only contact referred clients with consent
            </span>
          </div>
        </div>
      </section>

      {/* Keep breadcrumb exactly like your other premium pages */}
      <div className="mt-3">
        <Breadcrumb />
      </div>
    </>
  );
}

/* ---------- tiny inline icons (Midnight Embassy gold) ---------- */

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5 fill-gold"
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
function Open() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M14 3a1 1 0 0 0 0 2h3.586l-7.293 7.293a1 1 0 0 0 1.414 1.414L19 6.414V10a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-6z"
      />
      <path
        fill="currentColor"
        d="M5 6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H5z"
      />
    </svg>
  );
}
