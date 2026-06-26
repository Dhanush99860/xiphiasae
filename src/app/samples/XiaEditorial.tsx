"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";

/* ── LOCKED navy/gold system ── */
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* ── REAL XIA tools (verbatim names / routes / descriptions from
   src/app/(site)/{route-intelligence,deep-analysis,us-visa-intelligence,document-readiness}/page.tsx
   metadata + XiaSuiteGatewayClient). ── */
type Tool = {
  href: string;
  name: string;
  ar: string;
  copy: string;
  slug: string;
  region: string;
  num: string;
};

const TOOLS: Tool[] = [
  {
    href: "/route-intelligence",
    name: "Route Intelligence",
    ar: "ذكاء المسارات",
    copy: "Rank immigration routes by country, budget, timeline, family needs, and XIPHIAS programme knowledge — comparing every option by goal, destination, and physical-presence requirements.",
    slug: "portugal",
    region: "Europe",
    num: "01",
  },
  {
    href: "/deep-analysis",
    name: "Deep Analysis",
    ar: "تحليل معمّق",
    copy: "Run a deeper assessment with skills, education, CV notes, and evidence signals — producing advisor-ready route matching for high-skill and complex profiles.",
    slug: "singapore",
    region: "Asia-Pacific",
    num: "02",
  },
  {
    href: "/us-visa-intelligence",
    name: "US Visa Intelligence",
    ar: "ذكاء التأشيرة الأمريكية",
    copy: "Evaluate US visa directions including EB-1A, EB-2 NIW, O-1A, H-1B, L-1, founder, employer-sponsored, and evidence-led pathways for the United States.",
    slug: "usa",
    region: "Americas",
    num: "03",
  },
  {
    href: "/document-readiness",
    name: "Document & Evidence Readiness",
    ar: "جاهزية الوثائق",
    copy: "Check document and evidence readiness for CV, proof of funds, source of funds, awards, education, company, and family records before any filing.",
    slug: "uae",
    region: "Africa & Middle East",
    num: "04",
  },
];

function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar?: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD : GOLD_DEEP }}>
      <span className="h-px w-8" style={{ background: light ? GOLD : GOLD_DEEP }} />
      {children}
      {ar ? <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span> : null}
    </p>
  );
}

export default function XiaEditorial({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay },
        };

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
        Sample · XIA ③ Editorial
      </div>
      <Header serifClass={serifClass} />

      {/* ── HERO — full-bleed Dubai image, navy overlay ── */}
      <section
        data-tone="dark"
        className="relative isolate flex min-h-[78vh] items-end overflow-hidden px-6 pb-16 pt-40 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <Image
          src={countryImage("uae", "Africa & Middle East")}
          alt="XIPHIAS XIA intelligence suite"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 130% at 18% 100%, rgba(10,23,51,0.92) 0%, rgba(10,23,51,0.72) 55%, rgba(10,23,51,0.5) 100%)" }}
        />
        <Ambient tone="dark" />
        <div className="relative mx-auto w-full max-w-6xl">
          <Eyebrow light ar="مجموعة الذكاء">XIPHIAS XIA · Intelligence Suite</Eyebrow>
          <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0]`}>
            Intelligence that reads your route before you file.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80">
            XIA is the XIPHIAS AI intelligence suite — a set of focused engines for route-fit, high-skill visa
            evidence, US pathways and document readiness, each preparing a clear direction for advisor review.
          </p>
        </div>
      </section>

      {/* ── WHAT IT IS — light, image-right ── */}
      <section data-tone="light" className="relative isolate px-6 py-24 sm:px-12 lg:px-20" style={{ background: "#fbfaf7", color: INK }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div {...rise()}>
            <Eyebrow ar="ما هو">What XIA is</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06]`}>
              One suite, four purpose-built engines.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed" style={{ color: "rgba(12,31,63,0.72)" }}>
              Rather than a single calculator, XIA pairs the right engine to your question. Compare routes across the
              whole XIPHIAS catalogue, go deep on a high-skill profile, weigh US directions, or check whether your
              evidence is ready. Every engine ends the same way — a focused, advisor-reviewed direction.
            </p>
            <p className="mt-5 max-w-xl rounded-lg border px-4 py-3 text-[14px] leading-relaxed" style={{ borderColor: "rgba(168,125,31,0.4)", color: "rgba(12,31,63,0.7)" }}>
              This is an assessment aid, not a final visa decision. Final eligibility and filing strategy require
              XIPHIAS advisor review.
            </p>
          </motion.div>
          <motion.div {...rise(0.1)} className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              src={countryImage("portugal", "Europe")}
              alt="Comparing immigration routes with XIA"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(140deg, rgba(10,23,51,0.4) 0%, rgba(10,23,51,0.05) 55%)" }} />
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT HELPS — dark, image-left ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 140% at 85% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div {...rise(0.1)} className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-xl lg:order-1">
            <Image
              src={countryImage("usa", "Americas")}
              alt="Evidence and route direction prepared by XIA"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(140deg, rgba(10,23,51,0.55) 0%, rgba(10,23,51,0.15) 60%)" }} />
          </motion.div>
          <motion.div {...rise()} className="order-1 lg:order-2">
            <Eyebrow light ar="كيف يساعد">How the engines help</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06]`}>
              From scattered questions to one clear direction.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/78">
              You bring goals, budget, timeline, family needs and evidence. XIA weighs them against XIPHIAS programme
              knowledge and returns a ranked, explainable direction — so your advisor conversation starts from a short
              list, not a blank page.
            </p>
            <ul className="mt-7 space-y-3 text-[15px] text-white/82">
              {[
                "Route-fit ranked by goal, destination, budget and presence",
                "Deeper review of skills, education, CV and evidence signals",
                "US directions across EB-1A, EB-2 NIW, O-1A, H-1B, L-1 and more",
                "Document & evidence readiness before any filing",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ background: GOLD }} />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── THE TOOLS — light editorial cards, image on every block ── */}
      <section data-tone="light" className="relative isolate px-6 py-24 sm:px-12 lg:px-20" style={{ background: "#f7f4ef", color: INK }}>
        <Ambient tone="light" />
        <div className="mx-auto max-w-6xl">
          <motion.div {...rise()} className="max-w-2xl">
            <Eyebrow ar="المحرّكات">The XIA engines</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06]`}>
              Four engines. Open the one your case needs.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2">
            {TOOLS.map((tool, i) => (
              <motion.a
                key={tool.href}
                href={tool.href}
                {...rise(Math.min(i * 0.08, 0.3))}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-transform hover:-translate-y-1"
                style={{ borderColor: "rgba(168,125,31,0.4)" }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={countryImage(tool.slug, tool.region)}
                    alt={tool.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(10,23,51,0.55) 0%, rgba(10,23,51,0.1) 60%)" }} />
                  <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    XIA · {tool.num}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className={`${serifClass} text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-tight`}>{tool.name}</h3>
                    <span lang="ar" dir="rtl" className="font-arabic-display text-[15px]" style={{ color: GOLD_DEEP }}>{tool.ar}</span>
                  </div>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed" style={{ color: "rgba(12,31,63,0.7)" }}>
                    {tool.copy}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>
                    Open engine <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA — dark ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 140% at 50% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="relative mx-auto max-w-3xl">
          <Eyebrow light ar="ابدأ التقييم">Start your assessment</Eyebrow>
          <h2 className={`${serifClass} mx-auto mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.04]`}>
            Let XIA read your route — then talk to an advisor.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/78">
            Run the engine that fits your case, or have a XIPHIAS advisor interpret the direction with you, privately
            and end to end.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/eligibility"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Run an assessment <span aria-hidden>→</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}
            >
              Speak to an advisor
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
