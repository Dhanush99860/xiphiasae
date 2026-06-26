"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

export default function RegistrationFallback({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  return (
    <main style={{ background: NAVY, color: "#fff" }}>
      <Header serifClass={serifClass} />

      {/* ───────── REGISTRATION FALLBACK — SPOTLIGHT (dark) ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden px-6 pb-28 pt-36 md:px-10 lg:px-16"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`,
          color: "#fff",
        }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: GOLD }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
                XIPHIAS Registration
              </span>
              <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>
                التسجيل
              </span>
            </div>
          </motion.div>

          {/* FEATURED spotlight card */}
          <motion.div
            className="mt-12 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
            style={{ border: "1px solid rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.03)" }}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-start gap-4">
              <span
                className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`}
                style={{ color: GOLD }}
              >
                01
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                Detailed Assessment
              </span>
            </div>
            <div>
              <h1
                className={`${serifClass} text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.02]`}
              >
                Detailed assessment <span className="italic" style={{ color: GOLD }}>registration</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/60 md:text-base">
                Online registration for the detailed assessment is currently unavailable. In the meantime, you
                can begin your eligibility assessment or reach our team directly and we will guide you through
                the next steps.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/eligibility#start"
                  className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c]"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Start assessment
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c]"
                  style={{ border: "1px solid rgba(191,161,92,0.45)", color: "#fff" }}
                >
                  Contact XIPHIAS
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </main>
  );
}
