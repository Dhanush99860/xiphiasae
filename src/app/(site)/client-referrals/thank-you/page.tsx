// src/app/(site)/client-referrals/thank-you/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

const CANONICAL = "/client-referrals/thank-you";

export const metadata: Metadata = {
  title: "Thank You for Your Referral | XIPHIAS Immigration",
  description:
    "We’ve received your referral. Our team will reach out to your contact shortly and keep you updated as their case progresses.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: { index: false, follow: true }, // you can change to true if you want it indexed
};

const POINTS = [
  "Your referral will hear from us via phone or email on working days.",
  "If they sign up and progress with a case, your referral rewards will be processed as per the program terms.",
  "You can always share this page again to refer more people.",
];

export default function ReferralThankYouPage() {
  const heroId = "referral-thank-you-title";

  return (
    <div style={{ background: NAVY, color: "#fff" }}>
      <Header serifClass={serif.className} />

      <section
        data-tone="dark"
        aria-labelledby={heroId}
        className="relative overflow-hidden px-6 pb-28 pt-36 md:px-10 lg:px-16"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`,
          color: "#fff",
        }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: GOLD }}
            >
              Referral submitted
            </span>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic-display text-base"
              style={{ color: `${GOLD}cc` }}
            >
              شكراً
            </span>
          </div>

          <div
            className="mx-auto mt-10 grid h-20 w-20 place-items-center rounded-full text-3xl"
            style={{ background: GOLD, color: NAVY }}
            aria-hidden
          >
            ✓
          </div>

          <h1
            id={heroId}
            className={`${serif.className} mt-8 text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.02]`}
          >
            Thank you for your{" "}
            <span className="italic" style={{ color: GOLD }}>
              referral.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-white/60 md:text-base">
            We’ve received your details and the information of the person you’ve
            referred. Our team will review the submission and contact them
            shortly to understand their plans and guide them on the best
            options.
          </p>

          <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-4 text-left">
            {POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 border-t pt-4 text-sm leading-7 text-white/70"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: GOLD }}
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/client-referrals"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Refer another client
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors"
              style={{
                border: "1px solid rgba(191,161,92,0.45)",
                color: "#fff",
              }}
            >
              Go back to homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer serifClass={serif.className} />
    </div>
  );
}
