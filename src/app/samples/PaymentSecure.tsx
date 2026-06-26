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

// ── Real order, mirrored from src/app/(site)/payment/page.tsx + product-catalog ──
// Flagship advisor-prepared report sold through JioPay's secure hosted checkout.
const ORDER = {
  fulfillment: "Report",
  label: "XIPHIAS Personal Immigration Strategy Report",
  // priceInr: 5000 (premium_report) → INR formatted exactly as the real page does.
  amount: new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(5000),
  blurb:
    "An advisor-prepared planning document tailored to your profile, delivered as a PDF to your inbox once payment is confirmed.",
};

const HERO_IMG = countryImage("uae", "Africa & Middle East");

const TRUST = [
  { t: "256-bit encryption", d: "Hosted checkout by Jiopay — XIPHIAS never sees or stores your card details." },
  { t: "Advisor-backed", d: "Every report is prepared by a senior XIPHIAS immigration advisor." },
  { t: "Verified settlement", d: "Server-to-server confirmation before any report is unlocked." },
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD_DEEP : GOLD }}>
      <span className="h-px w-8" style={{ background: light ? GOLD_DEEP : GOLD }} />
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

const inputCls = "w-full rounded-md border bg-white px-4 py-3 text-[15px] text-[#0c1f3f] outline-none transition-colors focus:border-[#bfa15c]";

export default function PaymentSecure({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [paying, setPaying] = useState(false);
  const rise = reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } };

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
        Sample · Secure checkout ①
      </div>
      <Header serifClass={serifClass} />

      {/* HERO + CHECKOUT — dark navy */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-24 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 15% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        {/* full-bleed brand image, softened into the navy */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover opacity-[0.16]" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${NAVY}cc 0%, ${NAVY}f2 65%, ${NAVY} 100%)` }} />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
            <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Checkout
          </p>
          <div className="mt-7 flex justify-center"><Eyebrow ar="الدفع الآمن">Secure checkout</Eyebrow></div>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.02]`}>
            Complete your <span className="italic" style={{ color: GOLD }}>report.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
            Payment is taken through Jiopay&apos;s secure hosted checkout. XIPHIAS never sees or stores your card details.
          </p>
        </div>

        <motion.div
          {...rise}
          className="mx-auto mt-14 max-w-2xl rounded-2xl border p-7 sm:p-10"
          style={{ borderColor: `${GOLD}40`, background: "#f6f9fd", boxShadow: "0 40px 110px -50px rgba(0,0,0,0.7)" }}
        >
          {/* ORDER SUMMARY */}
          <div className="rounded-xl border p-6" style={{ borderColor: `${INK}1a`, background: "linear-gradient(160deg,#fbfaf7, #f7f4ef)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD_DEEP }}>{ORDER.fulfillment}</p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h2 className={`${serifClass} text-[1.5rem] font-medium leading-snug`} style={{ color: INK }}>{ORDER.label}</h2>
                <p className="mt-2 text-[14px] leading-6" style={{ color: `${INK}99` }}>{ORDER.blurb}</p>
              </div>
              <p className={`${serifClass} whitespace-nowrap text-[2rem] font-medium`} style={{ color: INK }}>{ORDER.amount}</p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t pt-4 text-[14px]" style={{ borderColor: `${INK}14` }}>
              <span className="font-semibold uppercase tracking-[0.14em]" style={{ color: `${INK}80` }}>Total due</span>
              <span className={`${serifClass} text-[1.4rem] font-medium`} style={{ color: GOLD_DEEP }}>{ORDER.amount}</span>
            </div>
          </div>

          {/* PAYER DETAILS */}
          <form onSubmit={(e) => { e.preventDefault(); setPaying(true); }} className="mt-7 flex flex-col gap-5">
            <h3 className={`${serifClass} text-[1.4rem] font-medium`} style={{ color: INK }}>Payer details</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name *"><input required name="name" autoComplete="name" className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="Your name" /></Field>
              <Field label="Phone *"><input required name="phone" autoComplete="tel" className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="+971 …" /></Field>
            </div>
            <Field label="Email for delivery *">
              <input required type="email" name="email" autoComplete="email" className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="you@example.com" />
            </Field>
            <label className="flex items-start gap-3 text-[12px]" style={{ color: `${INK}99` }}>
              <input type="checkbox" required className="mt-0.5 accent-[#bfa15c]" />
              I agree to the{" "}
              <a href="/refunds" className="font-semibold underline-offset-4 hover:underline" style={{ color: GOLD_DEEP }}>refund policy</a>{" "}
              and to my report being delivered to the email above.
            </label>

            <button
              type="submit"
              disabled={paying}
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] disabled:opacity-70"
              style={{ background: GOLD, color: NAVY }}
            >
              {paying ? "Redirecting to Jiopay…" : <>Pay securely · {ORDER.amount} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></>}
            </button>
            <p className="text-center text-[12px]" style={{ color: `${INK}73` }}>
              You will be redirected to Jiopay&apos;s hosted page to enter your card details.
            </p>
          </form>
        </motion.div>
      </section>

      {/* TRUST / REASSURANCE — light */}
      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f7f4ef" }}>
        <Ambient tone="light" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow ar="الأمان والثقة" light>Security &amp; reassurance</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(1.8rem,4vw,2.8rem)] font-medium`}>Pay with complete confidence.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TRUST.map((x, i) => (
              <motion.div
                key={x.t}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-lg border bg-white p-8"
                style={{ borderColor: `${INK}14` }}
              >
                <span className={`${serifClass} text-[2.2rem] font-medium leading-none`} style={{ color: GOLD_DEEP }}>0{i + 1}</span>
                <h3 className={`${serifClass} mt-3 text-[1.4rem] font-medium`}>{x.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: `${INK}a6` }}>{x.d}</p>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[13px] leading-6" style={{ color: `${INK}80` }}>
            Payments are processed by Jiopay. The browser return page is not treated as final proof of payment — XIPHIAS confirms the final state through secure server-to-server verification before unlocking any report.{" "}
            <a href="/refunds" className="font-semibold underline-offset-4 hover:underline" style={{ color: GOLD_DEEP }}>Refund policy</a>.
          </p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
