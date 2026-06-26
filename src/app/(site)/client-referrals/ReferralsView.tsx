"use client";

import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import ReferralForm from "@/components/Referral/ReferralForm";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

function Rise({
  children,
  delay = 0,
  reduce,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const STEPS = [
  {
    n: "01",
    t: "Submit the form",
    d: "Share your details and your friend’s details with basic context about their plans.",
  },
  {
    n: "02",
    t: "Our team reaches out discreetly",
    d: "A referrals specialist contacts them, mentions your name, and schedules a consultation if they are interested.",
  },
  {
    n: "03",
    t: "You earn rewards on successful cases",
    d: "Once they sign up and progress with us, your referral rewards are processed as per the current program terms.",
  },
];

const FIT = [
  "Professionals exploring PR or work routes (Canada, Australia, etc.)",
  "Investors evaluating Golden Visa / residency-by-investment options",
  "Families planning relocation for better education and lifestyle",
  "Entrepreneurs and HNIs seeking global mobility or second citizenship",
];

const CHIPS = [
  "Dedicated referral & relationship desk",
  "Discreet and consent-based outreach",
  "Earn rewards on successful sign-ups",
];

export default function ReferralsView({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  return (
    <div style={{ background: NAVY, color: "#fff" }}>
      <Header serifClass={serifClass} />

      {/* ───────── HERO + FEATURED SPOTLIGHT (dark) ───────── */}
      <section
        data-tone="dark"
        aria-labelledby="hero-referral-title"
        className="relative overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-16"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`,
          color: "#fff",
        }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: GOLD }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                style={{ color: GOLD }}
              >
                Client Referral Program
              </span>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic-display text-base"
                style={{ color: `${GOLD}cc` }}
              >
                إحالة
              </span>
            </div>
          </Rise>

          <Rise reduce={reduce} delay={0.1}>
            <h1
              id="hero-referral-title"
              className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.98]`}
            >
              Refer a friend. Reward their{" "}
              <span className="italic" style={{ color: GOLD }}>
                move
              </span>{" "}
              — and yours.
            </h1>
          </Rise>

          <Rise reduce={reduce} delay={0.2}>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/60 md:text-base">
              Many of our new clients come through recommendations from existing
              clients. Use this dedicated referral page to introduce friends,
              family, or colleagues who are serious about relocating, investing,
              or studying abroad.
            </p>
          </Rise>

          <Rise reduce={reduce} delay={0.3}>
            <ul className="mt-7 flex flex-wrap gap-2.5 text-xs">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-medium text-white/70"
                  style={{
                    border: "1px solid rgba(191,161,92,0.4)",
                    background: "rgba(191,161,92,0.06)",
                  }}
                >
                  <Check />
                  <span>{chip}</span>
                </li>
              ))}
            </ul>
          </Rise>

          {/* FEATURED spotlight — the call to refer, called out big */}
          <Rise reduce={reduce} delay={0.4}>
            <div
              className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
              style={{
                border: "1px solid rgba(191,161,92,0.4)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div className="flex flex-col items-start gap-4">
                <span
                  className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`}
                  style={{ color: GOLD }}
                >
                  01
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: GOLD }}
                >
                  Start a referral
                </span>
              </div>
              <div>
                <h2
                  className={`${serifClass} text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight`}
                >
                  An introduction that opens a global future.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                  Someone you know is ready to invest, relocate, or study abroad.
                  A single introduction connects them to a senior advisory desk —
                  discreetly, by appointment, and entirely on their terms.
                </p>
                <a
                  href="#referral-form"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                  style={{ background: GOLD, color: NAVY }}
                  aria-label="Refer a client now"
                >
                  Refer a client now
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <p className="mt-3 text-xs text-white/40">
                  No spam · We only contact people you refer about immigration
                  options
                </p>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* ───────── PROGRAM EXPLAINER + FORM (light band) ───────── */}
      <section
        data-tone="light"
        aria-labelledby="referral-how-it-works"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: "#fbfaf7", color: INK }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Explainer */}
          <div>
            <Rise reduce={reduce}>
              <h2
                id="referral-how-it-works"
                className={`${serifClass} max-w-xl text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`}
              >
                How the referral{" "}
                <span className="italic" style={{ color: GOLD_DEEP }}>
                  program
                </span>{" "}
                works
              </h2>
            </Rise>

            <div className="mt-12 flex flex-col gap-12">
              {STEPS.map((step) => (
                <Rise key={step.n} reduce={reduce} delay={0.05}>
                  <article className="grid items-start gap-6 md:grid-cols-[auto_1fr]">
                    <span
                      className={`${serifClass} text-3xl font-medium`}
                      style={{ color: GOLD_DEEP }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3
                        className={`${serifClass} text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium leading-tight`}
                        style={{ color: INK }}
                      >
                        {step.t}
                      </h3>
                      <p
                        className="mt-2 text-sm leading-7"
                        style={{ color: "rgba(12,31,63,0.6)" }}
                      >
                        {step.d}
                      </p>
                    </div>
                  </article>
                  <div
                    className="mt-12 h-px w-full"
                    style={{ background: "rgba(168,125,31,0.18)" }}
                  />
                </Rise>
              ))}
            </div>

            <Rise reduce={reduce} delay={0.08}>
              <h3
                className={`${serifClass} mt-2 text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium`}
                style={{ color: INK }}
              >
                Who is a good fit to refer?
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-7">
                {FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: GOLD_DEEP }}
                      aria-hidden
                    />
                    <span style={{ color: "rgba(12,31,63,0.7)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise reduce={reduce} delay={0.1}>
              <div
                className="mt-10 rounded-2xl px-6 py-5 text-sm"
                style={{
                  border: "1px solid rgba(168,125,31,0.22)",
                  background: "rgba(191,161,92,0.06)",
                }}
              >
                <p
                  className={`${serifClass} mb-1.5 text-lg font-medium`}
                  style={{ color: GOLD_DEEP }}
                >
                  Compliance & confidentiality
                </p>
                <p className="leading-7" style={{ color: "rgba(12,31,63,0.65)" }}>
                  All referrals are handled in line with our privacy policy and
                  anti-fraud standards. We will never sell or misuse the
                  information you share. Your referral is always free to decline
                  further contact.
                </p>
              </div>
            </Rise>
          </div>

          {/* Form (shared component — light treatment) */}
          <Rise reduce={reduce} delay={0.12} className="lg:sticky lg:top-28">
            <ReferralForm
              id="referral-form"
              onSuccessRedirect="/client-referrals/thank-you"
            />
          </Rise>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}

/* --------------------------- tiny inline icons --------------------------- */

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      style={{ fill: GOLD }}
    >
      <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 5.457 8.543l3.293 3.293 6.543-6.543a1 1 0 0 1 1.414 0z" />
    </svg>
  );
}
