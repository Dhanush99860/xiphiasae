"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

// Real flagship product from src/lib/payments/product-catalog.ts (premium_report).
// Amount is the live INR price; do not edit here.
const PRODUCT = {
  label: "XIPHIAS Personal Immigration Strategy Report",
  kind: "Personalised report",
  priceInr: 5000,
  delivery: "Delivered as a PDF to your inbox once payment is confirmed.",
};
const INR = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const INCLUDES = [
  "Advisor-prepared planning document, tailored to your profile",
  "Eligibility, route options, indicative cost and timeline",
  "Reviewed by a senior XIPHIAS migration strategist",
];
const TRUST = [
  { t: "Hosted by Jiopay", d: "Payment is taken on Jiopay's secure hosted checkout." },
  { t: "Card details never stored", d: "XIPHIAS never sees or stores your card information." },
  { t: "Verified server-side", d: "Payment is confirmed by secure server-to-server check before any report unlocks." },
];

const HERO_IMG = countryImage("uae", "Africa & Middle East");

function Eyebrow({ children, ar, deep = false }: { children: React.ReactNode; ar: string; deep?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: deep ? GOLD_DEEP : GOLD }}>
      <span className="h-px w-8" style={{ background: deep ? GOLD_DEEP : GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: `${INK}80` }}>{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
const inputCls = "w-full rounded-md border bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#bfa15c]";
const inputStyle = { borderColor: `${INK}22`, color: INK } as const;

export default function PaymentConcierge({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [paying, setPaying] = useState(false);
  const rise = reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } };

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
        Sample · Checkout · Concierge ③
      </div>
      <Header serifClass={serifClass} />

      {/* HERO — full-bleed image framing the report being purchased */}
      <section data-tone="dark" className="relative isolate flex min-h-[68vh] items-end overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <img src={HERO_IMG} alt="A global migration destination — the strategy report charts your route" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(180deg, rgba(10,23,51,0.45) 0%, rgba(10,23,51,0.82) 70%, ${NAVY} 100%)` }} />
        <Ambient tone="dark" />
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}>
            <a href="/payment" className="hover:text-[#bfa15c]">Reports &amp; checkout</a> <span style={{ color: GOLD }}>/</span> Secure checkout
          </p>
          <div className="mt-6"><Eyebrow ar="الدفع">Secure checkout</Eyebrow></div>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.5rem,5.5vw,4.4rem)] font-medium leading-[1.02]`}>
            Your <span className="italic" style={{ color: GOLD }}>Personal Immigration Strategy</span>, prepared by hand.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            An advisor-prepared planning document tailored to your profile. Payment is taken through Jiopay&apos;s secure hosted
            checkout — XIPHIAS never sees or stores your card details.
          </p>
        </div>
      </section>

      {/* CHECKOUT — single column on a pearl reading surface */}
      <section data-tone="light" className="relative isolate px-6 py-24 sm:px-12 lg:px-20" style={{ background: "#fbfaf7", color: INK }}>
        <Ambient tone="light" />
        <motion.div {...rise} className="mx-auto max-w-3xl">
          {/* Order summary */}
          <div className="rounded-2xl border bg-white p-8 sm:p-10" style={{ borderColor: `${GOLD}40`, boxShadow: "0 40px 110px -60px rgba(12,31,63,0.35)" }}>
            <Eyebrow ar="ملخص الطلب" deep>Order summary</Eyebrow>
            <div className="mt-6 flex flex-col gap-2 border-b pb-7 sm:flex-row sm:items-start sm:justify-between" style={{ borderColor: `${INK}14` }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD_DEEP }}>{PRODUCT.kind}</p>
                <h2 className={`${serifClass} mt-2 text-[1.7rem] font-medium leading-snug`}>{PRODUCT.label}</h2>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed" style={{ color: `${INK}99` }}>{PRODUCT.delivery}</p>
              </div>
              <p className={`${serifClass} shrink-0 text-[2.8rem] font-medium leading-none`} style={{ color: INK }}>{INR.format(PRODUCT.priceInr)}</p>
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] leading-relaxed" style={{ color: `${INK}cc` }}>
                  <span aria-hidden className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px]" style={{ background: GOLD, color: NAVY }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Payer details + pay */}
          <form
            onSubmit={(e) => { e.preventDefault(); setPaying(true); }}
            className="mt-8 rounded-2xl border bg-white p-8 sm:p-10"
            style={{ borderColor: `${INK}14`, boxShadow: "0 40px 110px -70px rgba(12,31,63,0.3)" }}
          >
            <h2 className={`${serifClass} text-[1.6rem] font-medium`}>Payer details</h2>
            <p className="mt-2 text-[14px]" style={{ color: `${INK}80` }}>Your report and receipt are sent to this email.</p>
            <div className="mt-7 flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name *"><input required className={inputCls} style={inputStyle} placeholder="Your name" /></Field>
                <Field label="Phone *"><input required type="tel" className={inputCls} style={inputStyle} placeholder="+971 …" /></Field>
              </div>
              <Field label="Email *"><input required type="email" className={inputCls} style={inputStyle} placeholder="you@example.com" /></Field>
              <label className="flex items-start gap-3 text-[13px]" style={{ color: `${INK}99` }}>
                <input type="checkbox" required className="mt-0.5 accent-[#bfa15c]" />
                I agree to the <a href="/refunds" className="font-semibold underline-offset-4 hover:underline" style={{ color: GOLD_DEEP }}>refund policy</a> and terms of service.
              </label>
            </div>

            <button
              type="submit"
              disabled={paying}
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] disabled:opacity-70"
              style={{ background: GOLD, color: NAVY }}
            >
              {paying ? "Redirecting to Jiopay…" : <>Pay {INR.format(PRODUCT.priceInr)} securely <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></>}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-[12px]" style={{ color: `${INK}80` }}>
              <span aria-hidden style={{ color: GOLD_DEEP }}>🔒</span>
              You&apos;ll complete payment on Jiopay&apos;s secure hosted page. XIPHIAS never stores your card details.
            </p>
          </form>

          {/* Trust marks */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TRUST.map((tr, i) => (
              <motion.div
                key={tr.t}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-t pt-5"
                style={{ borderColor: `${INK}1f` }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD_DEEP }}>{tr.t}</p>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: `${INK}99` }}>{tr.d}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-[12px] leading-6" style={{ color: `${INK}66` }}>
            The browser return page is not treated as final proof of payment — XIPHIAS confirms the final state through secure
            server-to-server verification before unlocking any report.
          </p>
        </motion.div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
