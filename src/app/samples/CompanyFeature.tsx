"use client";

import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { awardsData } from "@/components/awards/awards.data";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* The featured lead award + the rest, derived from the real data. */
const FEATURED = awardsData[0];
const SPOTLIGHT = awardsData.slice(1, 5); // big alternating editorial rows
const REST = awardsData.slice(5); // mosaic on the closing navy band

/* tasteful 2-letter initial badge from an issuer name */
function initials(name: string) {
  const parts = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "")).toUpperCase();
}

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

function Badge({ issuer, tone = "dark" }: { issuer: string; tone?: "dark" | "light" }) {
  const ring = tone === "dark" ? "rgba(191,161,92,0.45)" : "rgba(168,125,31,0.4)";
  const col = tone === "dark" ? GOLD : GOLD_DEEP;
  return (
    <span
      aria-hidden
      className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-[13px] font-semibold tracking-[0.06em]"
      style={{ border: `1px solid ${ring}`, color: col, background: "rgba(191,161,92,0.06)" }}
    >
      {initials(issuer)}
    </span>
  );
}

export default function CompanyFeature({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  return (
    <main style={{ background: NAVY, color: "#fff" }}>
      <Header serifClass={serifClass} />

      {/* ───────── HERO + FEATURED SPOTLIGHT (dark) ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-16"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`, color: "#fff" }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: GOLD }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
                Recognition
              </span>
              <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>
                تقدير
              </span>
            </div>
          </Rise>

          <Rise reduce={reduce} delay={0.1}>
            <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.98]`}>
              Most Awarded <span className="italic" style={{ color: GOLD }}>Immigration Company</span>
            </h1>
          </Rise>

          <Rise reduce={reduce} delay={0.2}>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/60 md:text-base">
              Independent publications have recognised our innovation, industry leadership, and client-first
              execution across more than a decade of practice.
            </p>
          </Rise>

          {/* FEATURED lead award — called out big */}
          {FEATURED && (
            <Rise reduce={reduce} delay={0.32}>
              <div
                className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
                style={{ border: `1px solid rgba(191,161,92,0.4)`, background: "rgba(255,255,255,0.03)" }}
              >
                <div className="flex flex-col items-start gap-4">
                  <span className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`} style={{ color: GOLD }}>
                    01
                  </span>
                  <Badge issuer={FEATURED.issuer} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                    {FEATURED.tag}
                  </span>
                  <h2 className={`${serifClass} mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight`}>
                    {FEATURED.title}
                  </h2>
                  <p className="mt-4 text-sm uppercase tracking-[0.14em] text-white/55">
                    {FEATURED.issuer} · {FEATURED.year}
                  </p>
                </div>
              </div>
            </Rise>
          )}
        </div>
      </section>

      {/* ───────── EDITORIAL ALTERNATING ROWS (light band) ───────── */}
      <section
        data-tone="light"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: "#fbfaf7", color: INK }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <h2 className={`${serifClass} max-w-2xl text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`}>
              A record written by <span className="italic" style={{ color: GOLD_DEEP }}>others</span>.
            </h2>
          </Rise>

          <div className="mt-14 flex flex-col gap-14">
            {SPOTLIGHT.map((a, i) => {
              const flip = i % 2 === 1;
              return (
                <Rise key={a.id} reduce={reduce} delay={0.05}>
                  <article
                    className={`grid items-center gap-6 md:grid-cols-[1fr_auto] ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className={flip ? "md:text-right" : ""}>
                      <div className={`flex items-baseline gap-4 ${flip ? "md:justify-end" : ""}`}>
                        <span className={`${serifClass} text-3xl font-medium`} style={{ color: GOLD_DEEP }}>
                          {String(i + 2).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_DEEP }}>
                          {a.tag}
                        </span>
                      </div>
                      <h3 className={`${serifClass} mt-3 text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-tight`} style={{ color: INK }}>
                        {a.title}
                      </h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.14em]" style={{ color: "rgba(12,31,63,0.5)" }}>
                        {a.issuer} · {a.year}
                      </p>
                    </div>
                    <Badge issuer={a.issuer} tone="light" />
                  </article>
                  <div className="mt-14 h-px w-full" style={{ background: "rgba(168,125,31,0.18)" }} />
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── FULL RECORD MOSAIC (dark) ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: NAVY, color: "#fff" }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              The full record
            </span>
            <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`}>
              {awardsData.length} honours, and counting.
            </h2>
          </Rise>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REST.map((a) => (
              <Rise key={a.id} reduce={reduce} delay={0.04}>
                <div
                  className="flex h-full flex-col gap-3 rounded-2xl p-6 transition-colors hover:border-[#bfa15c]"
                  style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex items-center justify-between">
                    <Badge issuer={a.issuer} />
                    <span className={`${serifClass} text-2xl font-medium`} style={{ color: GOLD }}>
                      {a.year}
                    </span>
                  </div>
                  <h3 className={`${serifClass} mt-1 text-[1.2rem] font-medium leading-snug`}>{a.title}</h3>
                  <p className="mt-auto text-xs uppercase tracking-[0.14em] text-white/45">{a.issuer}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CLOSING CTA (light) ───────── */}
      <section
        data-tone="light"
        className="relative overflow-hidden px-6 py-28 md:px-10 lg:px-16"
        style={{ background: "#f7f4ef", color: INK }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Rise reduce={reduce}>
            <h2 className={`${serifClass} text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04]`} style={{ color: INK }}>
              The same standard, <span className="italic" style={{ color: GOLD_DEEP }}>for you</span>.
            </h2>
          </Rise>
          <Rise reduce={reduce} delay={0.12}>
            <a
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Rise>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </main>
  );
}
