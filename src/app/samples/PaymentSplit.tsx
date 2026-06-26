"use client";

/**
 * VARIANT ② — "Split Summary" for the XIPHIAS /payment checkout reskin.
 *
 * Classic premium two-pane checkout in the locked navy/gold luxury system:
 *  LEFT  — a sticky ORDER SUMMARY on a darker panel: a REAL full-bleed brand
 *          image, what you're paying for, the line item + amount, what's
 *          included, and the order total.
 *  RIGHT — the payment FORM on navy glass: labelled payer details, a
 *          "Pay securely" CTA, and trust/security reassurance.
 *
 * CONTENT is mirrored verbatim from the live page
 *  (src/app/(site)/payment/page.tsx + src/lib/payments/product-catalog.ts):
 *  the flagship product "XIPHIAS Personal Immigration Strategy Report" at the
 *  real catalog price of ₹5,000 (INR, formatted en-IN like the live page).
 *  Payment runs through Jiopay's secure hosted checkout — XIPHIAS never sees
 *  or stores card details; the final state is confirmed by server-to-server
 *  verification before any report is unlocked. No invented prices.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

// Real flagship product from PRODUCT_CATALOG (premium_report).
const ORDER = {
  kind: "Report",
  label: "XIPHIAS Personal Immigration Strategy Report",
  priceInr: 5000,
  blurb:
    "An advisor-prepared planning document tailored to your profile, delivered as a PDF to your inbox once payment is confirmed.",
  includes: [
    "Advisor-prepared, profile-specific strategy",
    "Recommended routes & realistic timelines",
    "Indicative costs & document readiness",
    "PDF delivered after payment is confirmed",
  ],
} as const;

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: light ? GOLD_DEEP : GOLD }}
    >
      <span className="h-px w-8" style={{ background: light ? GOLD_DEEP : GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  className = "",
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-md border bg-white/[0.04] px-4 py-3 text-[15px] text-[#eef3fb] outline-none transition placeholder:text-white/30 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/35"
        style={{ borderColor: "rgba(255,255,255,0.16)", ["--gold" as string]: GOLD }}
      />
    </div>
  );
}

export default function PaymentSplit({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [submitting, setSubmitting] = useState(false);

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── CHECKOUT (dark navy) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-24 pt-28 text-[#eef3fb] sm:px-12 lg:px-16"
        style={{ background: `radial-gradient(120% 100% at 12% 0%, #13284f 0%, ${NAVY} 58%)` }}
      >
        <Ambient tone="dark" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div {...fade}>
            <Eyebrow ar="الدفع">Reports &amp; checkout</Eyebrow>
          </motion.div>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[0.98]`}>
            Secure checkout
          </h1>
          <motion.p
            {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.2 } })}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75"
          >
            Payment is taken through Jiopay&apos;s secure hosted checkout — XIPHIAS
            never sees or stores your card details.
          </motion.p>

          {/* Split: order summary + payment form */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            {/* LEFT — sticky order summary (darker panel, real image) */}
            <motion.aside
              {...fade}
              className="lg:sticky lg:top-24 lg:h-fit"
              aria-labelledby="order-summary-heading"
            >
              <div
                className="overflow-hidden rounded-lg border"
                style={{ borderColor: "rgba(191,161,92,0.32)", background: "rgba(4,11,28,0.6)" }}
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={countryImage("uae", "Africa & Middle East")}
                    alt="XIPHIAS immigration advisory"
                    fill
                    sizes="(min-width:1024px) 44vw, 100vw"
                    className="object-cover [filter:grayscale(0.25)_brightness(0.65)_contrast(1.05)]"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(4,11,28,0.96) 0%, rgba(4,11,28,0.35) 100%)" }} />
                  <span aria-hidden className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2" style={{ borderColor: GOLD }} />
                  <p className="absolute bottom-4 left-5 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
                    {ORDER.kind}
                  </p>
                </div>

                <div className="p-6 sm:p-7">
                  <h2 id="order-summary-heading" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    Order summary
                  </h2>
                  <p className={`${serifClass} mt-3 text-[1.5rem] font-medium leading-tight`}>{ORDER.label}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/70">{ORDER.blurb}</p>

                  <ul className="mt-5 space-y-2.5 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                    {ORDER.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/80">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 space-y-2 border-t pt-5 text-[14px]" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                    <div className="flex items-baseline justify-between text-white/65">
                      <dt>Report fee</dt>
                      <dd>{INR.format(ORDER.priceInr)}</dd>
                    </div>
                    <div className="flex items-baseline justify-between text-white/65">
                      <dt>Processing</dt>
                      <dd>Included</dd>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">Total due</dt>
                      <dd className={`${serifClass} text-[1.85rem] font-medium`} style={{ color: GOLD }}>
                        {INR.format(ORDER.priceInr)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </motion.aside>

            {/* RIGHT — payment form on navy glass */}
            <motion.div
              {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 } })}
              className="rounded-lg border p-6 sm:p-9"
              style={{ borderColor: "rgba(191,161,92,0.28)", background: "rgba(255,255,255,0.04)" }}
            >
              <h2 className={`${serifClass} text-[1.6rem] font-medium leading-tight`}>Payer details</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                Your report is delivered to this email once payment is confirmed.
              </p>

              <form
                className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitting(true);
                }}
              >
                <Field id="firstName" label="First name" autoComplete="given-name" placeholder="Aisha" />
                <Field id="lastName" label="Last name" autoComplete="family-name" placeholder="Al Mansoori" />
                <Field id="email" label="Email address" type="email" autoComplete="email" placeholder="you@email.com" className="sm:col-span-2" />
                <Field id="phone" label="Phone (with country code)" type="tel" autoComplete="tel" placeholder="+971 50 000 0000" className="sm:col-span-2" />
                <Field id="country" label="Country / region" autoComplete="country-name" placeholder="United Arab Emirates" className="sm:col-span-2" />

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition disabled:opacity-70"
                    style={{ background: GOLD, color: NAVY }}
                    disabled={submitting}
                  >
                    {submitting ? "Redirecting to Jiopay…" : `Pay securely · ${INR.format(ORDER.priceInr)}`}
                    {!submitting && <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
                  </button>
                </div>
              </form>

              {/* Trust / security reassurance */}
              <div className="mt-7 grid gap-3 border-t pt-6 sm:grid-cols-2" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                {[
                  { k: "Hosted by Jiopay", v: "Card details are entered on Jiopay’s secure gateway — never on XIPHIAS." },
                  { k: "Verified server-side", v: "Final payment state is confirmed by server-to-server verification before any report unlocks." },
                ].map((t) => (
                  <div key={t.k} className="flex items-start gap-3">
                    <span aria-hidden className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[12px]" style={{ borderColor: GOLD, color: GOLD }}>
                      ✓
                    </span>
                    <p className="text-[13px] leading-relaxed text-white/65">
                      <span className="font-semibold text-white/85">{t.k}.</span> {t.v}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[12px] leading-relaxed text-white/45">
                Payments are processed by Jiopay. The browser return page is not treated
                as final proof of payment.{" "}
                <a href="/refunds" className="font-semibold underline-offset-4 hover:underline" style={{ color: GOLD }}>
                  Refund policy
                </a>
                .
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Reassurance band (light) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-24 text-center text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#fbfaf7" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="flex justify-center">
            <Eyebrow ar="تحدث إلينا" light>Prefer to speak first</Eyebrow>
          </div>
          <h2 className={`${serifClass} mt-6 text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.04]`}>
            Not sure which report fits?{" "}
            <span className="italic" style={{ color: GOLD_DEEP }}>Speak to an advisor first.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#0c1f3f]/70">
            Start with a free eligibility assessment or book a consultation — our team
            will recommend the right report for your profile before you pay.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/eligibility#start"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: NAVY, color: "#eef3fb" }}
            >
              Start free assessment <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ borderColor: GOLD_DEEP, color: GOLD_DEEP }}
            >
              Contact XIPHIAS
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
