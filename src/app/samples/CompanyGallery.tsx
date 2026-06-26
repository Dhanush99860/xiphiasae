"use client";

import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { awardsData } from "@/components/awards/awards.data";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const HEAD = "#eef3fb";
const BODY = "rgba(238,243,251,0.78)";

/* derived stats from the real award list */
const TOTAL = awardsData.length;
const YEARS = (() => {
  const ys = awardsData.map((a) => a.year);
  return Math.max(...ys) - Math.min(...ys) + 1;
})();
const ISSUERS = new Set(awardsData.map((a) => a.issuer)).size;

const STATS = [
  { n: String(TOTAL), l: "Independent honours" },
  { n: String(YEARS), l: "Years of recognition" },
  { n: `${ISSUERS}+`, l: "Awarding publications" },
];

export default function CompanyGallery({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  const rise = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div style={{ background: NAVY }}>
      <Header serifClass={serifClass} />

      {/* ───────── HERO ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #13284f 0%, #0a1733 60%, #0a1733 100%)",
        }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-36 text-center md:pt-44">
          <motion.div {...rise(0)} className="flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: `${GOLD}66` }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: GOLD }}
            >
              Recognition
            </span>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic-display text-base"
              style={{ color: `${GOLD}cc` }}
            >
              تقدير
            </span>
            <span className="h-px w-10" style={{ background: `${GOLD}66` }} />
          </motion.div>

          <motion.h1
            {...rise(1)}
            className={`${serifClass} mx-auto mt-6 max-w-3xl text-[clamp(2.6rem,5.6vw,4.6rem)] font-medium leading-[1.04]`}
            style={{ color: HEAD }}
          >
            Awards &amp; Recognition
          </motion.h1>

          <motion.p
            {...rise(2)}
            className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 md:text-base"
            style={{ color: BODY }}
          >
            The most awarded immigration company — independent publications have
            consistently recognised our innovation, industry leadership, and
            client-first execution.
          </motion.p>

          <motion.div
            {...rise(3)}
            className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t pt-8"
            style={{ borderColor: "rgba(191,161,92,0.22)" }}
          >
            {STATS.map((s) => (
              <div key={s.l}>
                <div
                  className={`${serifClass} text-[clamp(1.9rem,4vw,2.8rem)] font-medium leading-none`}
                  style={{ color: GOLD }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-2 text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: BODY }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── GALLERY GRID ───────── */}
      <section
        data-tone="dark"
        className="relative"
        style={{ background: NAVY }}
      >
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-8">
          <motion.h2
            {...rise(0)}
            className={`${serifClass} mb-10 text-center text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium`}
            style={{ color: HEAD }}
          >
            Most Awarded Immigration Company
          </motion.h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {awardsData.map((a, i) => {
              const initials = a.issuer
                .replace(/[•].*/, "")
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase();

              return (
                <motion.article
                  key={a.id}
                  {...rise(i % 6)}
                  whileHover={reduce ? undefined : { y: -6 }}
                  className="group flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-colors"
                  style={{
                    background:
                      "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0))",
                    borderColor: "rgba(191,161,92,0.22)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.image}
                        alt={`${a.issuer} award badge`}
                        className="h-12 w-12 rounded-lg object-contain"
                      />
                    ) : (
                      <div
                        className={`${serifClass} flex h-12 w-12 items-center justify-center rounded-lg border text-lg font-medium`}
                        style={{
                          borderColor: "rgba(191,161,92,0.35)",
                          color: GOLD,
                        }}
                        aria-hidden
                      >
                        {initials}
                      </div>
                    )}
                    <span
                      className={`${serifClass} text-[1.5rem] font-medium leading-none`}
                      style={{ color: GOLD }}
                    >
                      {a.year}
                    </span>
                  </div>

                  <h3
                    className={`${serifClass} mt-5 text-[1.25rem] font-medium leading-snug`}
                    style={{ color: HEAD }}
                  >
                    {a.title}
                  </h3>

                  <div
                    className="mt-auto pt-5 text-[12px] uppercase tracking-[0.16em]"
                    style={{ color: GOLD }}
                  >
                    {a.issuer}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── CLOSING CTA ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 100%, #13284f 0%, #0a1733 65%)",
        }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <motion.h2
            {...rise(0)}
            className={`${serifClass} text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-tight`}
            style={{ color: HEAD }}
          >
            Recognised by the industry.
            <br />
            <span className="italic" style={{ color: GOLD }}>
              Chosen by clients.
            </span>
          </motion.h2>
          <motion.p
            {...rise(1)}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-8"
            style={{ color: BODY }}
          >
            Speak with a senior advisor, in complete confidence, about your
            global mobility objectives.
          </motion.p>
          <motion.div {...rise(2)} className="mt-9">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
