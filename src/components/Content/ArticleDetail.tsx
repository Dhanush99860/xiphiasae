"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* ─────────────────────────────────────────────────────────────────────────
   ArticleDetail — shared navy/gold article-detail template.

   Based on the approved /samples ArticleSample look. Renders:
     Header → dark navy hero (full-bleed hero image if `heroImage`, else navy
     gradient) → light reading section wrapping {children} in a navy/gold-themed
     prose column → closing CTA → Footer.

   PROP API (for page agents)
   ──────────────────────────
   serifClass   string            REQUIRED. Cormorant serif class for headings/title.
   eyebrow      string            REQUIRED. Small uppercase kicker over the title
                                  (e.g. category or breadcrumb tail like "Golden Visa").
   eyebrowAr    string?           Optional Arabic eyebrow, shown after the English one
                                  (font-arabic-display, RTL-friendly).
   title        string            REQUIRED. Article headline (rendered in Cormorant, one <h1>).
   date         string            REQUIRED. Display date string (already formatted, e.g. "21 Oct 2025").
   author       string?           Optional author name. Shows an avatar initial + name in the meta line.
   category     string?           Optional category label, shown in the hero breadcrumb (gold).
   heroImage    string?           Optional full-bleed hero image path. If omitted, a pure
                                  navy gradient is used (no blank box).
   backHref     string            REQUIRED. Href for the "back to {backLabel}" link.
   backLabel    string            REQUIRED. Label for the back link (e.g. "Insights", "Blog").
   children     ReactNode         REQUIRED. The rendered MDX/prose body. Wrapped in a readable
                                  prose column themed navy/gold on light (NO prose-invert).

   NOTES
   - The reading column uses a comfortable max-width (~68ch via `prose` + max-w-[72ch]).
   - Prose is themed for a LIGHT background (dark navy text, gold links/accents).
   - Reduced-motion safe; framer-motion entrance animations are subtle and once-only.
   - Exactly one <h1> (the title). Body headings from MDX should start at <h2>.
   ───────────────────────────────────────────────────────────────────────── */

export type ArticleDetailProps = {
  serifClass: string;
  eyebrow: string;
  eyebrowAr?: string;
  title: string;
  date: string;
  author?: string;
  category?: string;
  heroImage?: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

export default function ArticleDetail({
  serifClass,
  eyebrow,
  eyebrowAr,
  title,
  date,
  author,
  category,
  heroImage,
  backHref,
  backLabel,
  children,
}: ArticleDetailProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const initials = author
    ? author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : null;

  return (
    <div className="relative bg-white">
      {/* reading progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left"
        style={{ scaleX: progress, background: GOLD }}
      />
      <Header serifClass={serifClass} />

      {/* ── HERO ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 text-[#eef3fb] sm:px-12 lg:px-20 lg:pb-24 lg:pt-40"
        style={{ background: NAVY }}
      >
        {heroImage ? (
          <div className="absolute inset-0 -z-10">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30 [filter:grayscale(0.3)]"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, rgba(10,23,51,0.55) 0%, rgba(10,23,51,0.82) 60%, ${NAVY} 100%)`,
              }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(120% 90% at 50% -10%, #13284f 0%, ${NAVY} 60%)`,
            }}
          />
        )}
        <Ambient tone="dark" />

        <div className="mx-auto max-w-3xl">
          <nav className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-white/45">
            <a href={backHref} className="transition-colors hover:text-[#bfa15c]">
              {backLabel}
            </a>
            <span>/</span>
            <span style={{ color: GOLD }}>{category ?? eyebrow}</span>
          </nav>

          <p className="mt-6 flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            <span>{eyebrow}</span>
            {eyebrowAr ? (
              <span className="font-arabic-display text-[13px] tracking-normal" dir="rtl">
                {eyebrowAr}
              </span>
            ) : null}
          </p>

          <h1
            className={`${serifClass} mt-5 text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.04]`}
          >
            {title}
          </h1>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/55">
            {author ? (
              <>
                <span className="flex items-center gap-2.5">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-[13px] font-semibold text-[#0a1733]"
                    style={{ background: GOLD }}
                  >
                    {initials}
                  </span>
                  <span className="font-medium text-white/85">{author}</span>
                </span>
                <span className="h-8 w-px bg-white/15" />
              </>
            ) : null}
            <span>{date}</span>
            {category ? (
              <>
                <span className="h-8 w-px bg-white/15" />
                <span>{category}</span>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── BODY (reading column) ── */}
      <section
        data-tone="light"
        className="relative px-6 py-20 sm:px-12 lg:px-20"
        style={{ background: "#fbfcfe" }}
      >
        <article className="mx-auto max-w-[72ch]">
          <div
            className={[
              "prose prose-lg max-w-none",
              // base text
              "prose-p:text-[#142745]/85 prose-p:leading-[1.85] prose-li:text-[#142745]/85",
              // headings — Cormorant serif, navy ink
              `prose-headings:${serifClass} prose-headings:font-medium prose-headings:text-[${INK}]`,
              "prose-headings:scroll-mt-28",
              `prose-h2:text-[${INK}] prose-h3:text-[${INK}]`,
              // strong / links / accents in navy + gold
              `prose-strong:text-[${NAVY}] prose-strong:font-semibold`,
              `prose-a:text-[${GOLD}] prose-a:no-underline hover:prose-a:underline`,
              // blockquote — gold left rule
              `prose-blockquote:border-l-2 prose-blockquote:border-[${GOLD}] prose-blockquote:not-italic prose-blockquote:text-[${INK}]`,
              `prose-blockquote:font-medium`,
              // lists & markers
              `marker:prose-li:text-[${GOLD}]`,
              // images
              "prose-img:rounded-xl prose-img:shadow-[0_24px_60px_-30px_rgba(10,23,51,0.4)]",
              // code
              "prose-code:text-[#0a1733] prose-code:bg-[#bfa15c]/12 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none",
              "prose-hr:border-[#0c1f3f]/10",
            ].join(" ")}
          >
            {children}
          </div>

          {/* back link */}
          <div className="mt-14 border-t border-[#0c1f3f]/10 pt-7">
            <a
              href={backHref}
              className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[#0a1733]"
              style={{ color: GOLD }}
            >
              <span aria-hidden>←</span> Back to {backLabel}
            </a>
          </div>
        </article>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 py-24 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-2xl">
          <h2
            className={`${serifClass} text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-tight`}
          >
            Ready to make your <span className="italic" style={{ color: GOLD }}>next move?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            Speak with a XIPHIAS advisor — one team, end to end, from first call to residency.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1733] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD }}
            >
              Book a consultation
            </a>
            <a
              href={backHref}
              className="rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors hover:border-[#bfa15c] hover:text-[#bfa15c]"
            >
              Back to {backLabel}
            </a>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
