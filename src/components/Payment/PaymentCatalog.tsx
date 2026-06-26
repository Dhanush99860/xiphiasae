"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";
import type { ProductConfig } from "@/lib/payments/product-catalog";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

const INR = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
function priceLabel(p: ProductConfig) {
  return p.priceInr <= 0 ? "Custom amount" : INR.format(p.priceInr);
}

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  const c = light ? GOLD_DEEP : GOLD;
  return (
    <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: c }}>
      <span className="h-px w-8" style={{ background: c }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span>
    </p>
  );
}

/**
 * Navy/gold reports catalog for /payment — lists every real catalog product at its
 * server-enforced price. Checkout is gated by `checkoutEnabled`; `?product=` links and
 * the JioPay/refund logic mirror the original page exactly (presentation only).
 */
export default function PaymentCatalog({
  serifClass,
  products,
  checkoutEnabled,
  isTestPricing,
}: {
  serifClass: string;
  products: ProductConfig[];
  checkoutEnabled: boolean;
  isTestPricing: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO ── */}
      <section data-tone="dark" className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="absolute inset-0 -z-10">
          <Image src={countryImage("uae", "Africa & Middle East")} alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.88) 0%, rgba(10,23,51,0.96) 60%, ${NAVY} 100%)` }} />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow ar="التقارير والدفع">Reports &amp; checkout</Eyebrow>
          <h1 className={`${serifClass} mt-5 text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.04]`}>
            Personalised immigration <span className="italic" style={{ color: GOLD }}>reports.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
            Each report is an advisor-prepared planning document tailored to your profile. Payment is taken through Jiopay&apos;s secure hosted checkout — XIPHIAS never sees or stores your card details.
          </p>
          {!checkoutEnabled ? (
            <span className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-semibold" style={{ borderColor: `${GOLD}55`, background: "rgba(255,255,255,0.04)", color: "rgba(238,243,251,0.85)" }}>
              <span aria-hidden className="size-2 rounded-full" style={{ background: GOLD }} />
              Online checkout is coming soon
            </span>
          ) : null}
          {isTestPricing ? (
            <p className="mx-auto mt-4 max-w-md text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
              Test pricing mode is active — displayed amounts are not live prices.
            </p>
          ) : null}
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section data-tone="dark" className="relative isolate px-6 pb-24 pt-16 sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}>
        <Ambient tone="dark" />
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.productType}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
              className="flex h-full flex-col rounded-2xl border p-6 transition-colors hover:border-[#bfa15c]/55"
              style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                  {product.fulfillment === "registration" ? "Registration" : "Report"}
                </p>
                <h2 className={`${serifClass} mt-3 text-[1.5rem] font-medium leading-snug text-[#eef3fb]`}>{product.label}</h2>
                <p className={`${serifClass} mt-4 text-[2.4rem] font-semibold leading-none tabular-nums`} style={{ color: GOLD }}>{priceLabel(product)}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                  {product.fulfillment === "registration"
                    ? "Full X-Hub onboarding and case workspace."
                    : "Delivered as a PDF to your inbox after payment is confirmed."}
                </p>
              </div>
              <div className="mt-6">
                {checkoutEnabled ? (
                  <a
                    href={`/payment?product=${encodeURIComponent(product.productType)}`}
                    className="inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    Continue to checkout
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Coming soon"
                    className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-md border px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] opacity-60"
                    style={{ borderColor: `${GOLD}40`, color: "rgba(238,243,251,0.7)" }}
                  >
                    Coming soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ADVISOR CTA + DISCLAIMER ── */}
      <section data-tone="light" className="relative isolate px-6 py-24 sm:px-12 lg:px-20" style={{ background: "#fbfaf7" }}>
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="rounded-2xl border bg-white p-8 text-center sm:p-10" style={{ borderColor: `${GOLD}40`, boxShadow: "0 40px 110px -60px rgba(10,23,51,0.35)" }}>
            <Eyebrow ar="تحدّث إلى مستشار" light>Prefer to speak first?</Eyebrow>
            <h2 className={`${serifClass} mt-4 text-[clamp(1.8rem,4vw,2.6rem)] font-medium`} style={{ color: NAVY }}>
              We&apos;ll recommend the <span className="italic" style={{ color: GOLD_DEEP }}>right report</span> for you.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#0c1f3f]/65">
              Start with a free eligibility assessment or book a consultation. Our team will recommend the right report for your profile before you pay.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="/eligibility#start" className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em]" style={{ background: NAVY, color: "#eef3fb" }}>Start free assessment</a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-md border px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${NAVY}33`, color: NAVY }}>Contact XIPHIAS</a>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[12.5px] leading-6 text-[#0c1f3f]/50">
            Payments are processed by Jiopay. The browser return page is not treated as final proof of payment — XIPHIAS confirms the final state through secure server-to-server verification before unlocking any report.{" "}
            <a href="/refunds" className="font-semibold underline underline-offset-4" style={{ color: GOLD_DEEP }}>Refund policy</a>.
          </p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
