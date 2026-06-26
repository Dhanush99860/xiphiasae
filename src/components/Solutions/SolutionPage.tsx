"use client";

// SolutionPage — audience-led "Solutions" landing for the five /for-* routes.
// Navy/gold luxury idiom matching GoldenVisaHub / CountryHub / VerticalHub:
// brings its OWN chrome (LuxeHeader / LuxeFooter / Ambient) instead of the old
// sand global chrome, uses Cormorant via `serifClass`, real full-bleed images,
// and honours reduced motion. ALL copy — eyebrow, title, intro, value props,
// recommended programmes, tools and CTAs — comes straight from the live
// SolutionConfig (`cfg`) and the curated `programmes` the server page resolves.

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Wallet } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import { countryImage } from "@/components/Countries/country-image";
import type { SolutionConfig, SolutionSlug } from "@/lib/solutions";
import type { ProgrammeExplorerItem } from "@/lib/programme-explorer";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const NAVY_DEEP = "#13284f";
const INK = "#0c1f3f";

const TRACK_PILL: Record<string, string> = {
  citizenship: "Citizenship",
  residency: "Residency",
  skilled: "Skilled",
  corporate: "Corporate",
};

/**
 * Per-audience cinematic media. Every path is verified to exist under
 * `public/images/**`. `heroSlug` resolves a real full-bleed frame via
 * countryImage(); `chapter` is the framed editorial image in the light band;
 * `band` is the full-bleed image behind the mid-page navy "moment". All copy,
 * points, tools and programmes still come from the SolutionConfig untouched.
 */
type Media = {
  heroSlug: string;
  heroRegion?: string;
  heroAlt: string;
  chapter: string;
  chapterAlt: string;
  band: string;
  bandAlt: string;
  /** Short editorial line for the light "Why this route" chapter. */
  chapterLede: string;
  /** Pull-quote rendered over the mid-page navy band. */
  bandQuote: string;
};

const MEDIA: Record<SolutionSlug, Media> = {
  "for-investors": {
    heroSlug: "uae",
    heroRegion: "Africa & Middle East",
    heroAlt: "Dubai skyline at dusk — a capital city for global investors",
    chapter: "/images/blogs/dubai-investment.webp",
    chapterAlt: "Investment-led residency and citizenship planning in Dubai",
    band: "/images/blogs/why-dubai-dominating.webp",
    bandAlt: "Dubai cityscape rising at golden hour",
    chapterLede:
      "Capital, deployed with intent — every route below is sized against your portfolio, mobility and tax goals.",
    bandQuote: "A passport is the highest-yield asset most portfolios never hold.",
  },
  "for-families": {
    heroSlug: "__custom__",
    heroAlt: "A family together — building a safer future across borders",
    chapter: "/images/blogs/dubai-expat-destination.webp",
    chapterAlt: "An expat family settling into life in the Emirates",
    band: "/images/blogs/residency-dubai-tranformation.webp",
    bandAlt: "A new home and a new horizon for the whole family",
    chapterLede:
      "One plan, every generation — spouse, children and parents included, with schooling, healthcare and travel in view.",
    bandQuote: "The strongest plan B is the one your whole family can stand on.",
  },
  "for-professionals": {
    heroSlug: "canada",
    heroAlt: "A leading skilled-migration destination at dusk",
    chapter: "/images/skilled/australia/skilled-australia-xiphias-immigration.webp",
    chapterAlt: "Skilled professionals on a points-based migration route",
    band: "/images/blogs/dubai-perks.webp",
    bandAlt: "A skilled professional's new city skyline",
    chapterLede:
      "Your occupation, experience and language scores — mapped to the points systems that actually pay off.",
    bandQuote: "Talent is global. Your shortlist should be evidence, not advice.",
  },
  "for-businesses": {
    heroSlug: "__custom__",
    heroAlt: "Dubai's corporate district — a base for cross-border teams",
    chapter: "/images/corporate/uae/dubai-investor-visa.webp",
    chapterAlt: "Corporate mobility and compliant workforce relocation",
    band: "/images/corporate/uae/dubai-freezone-visa.webp",
    bandAlt: "A business gateway in the Emirates at golden hour",
    chapterLede:
      "Market entry, intra-company transfers and compliant relocation — one accountable partner for the whole move.",
    bandQuote: "Mobility that scales is a system, not a series of favours.",
  },
  "for-entrepreneurs": {
    heroSlug: "australia",
    heroAlt: "A founder building a venture from a new base",
    chapter: "/images/blogs/australia-startup-hub.webp",
    chapterAlt: "A startup hub — entrepreneur and self-sponsorship routes",
    band: "/images/articles/uae-investment-migration-2026.webp",
    bandAlt: "A founder's new market skyline at dawn",
    chapterLede:
      "Residency tied to building something real — start-up visas and self-sponsorship into the markets that matter.",
    bandQuote: "Build where the talent, the capital and the residency all line up.",
  },
};

// A couple of personas read better against a real editorial frame than a single
// country hero; resolve those explicitly (still real, verified /public paths).
const CUSTOM_HERO: Partial<Record<SolutionSlug, string>> = {
  "for-families": "/images/blogs/family-unity.webp",
  "for-businesses": "/images/corporate/uae/dubai-corporate-immigration.webp",
};

function heroImageFor(slug: SolutionSlug, media: Media): string {
  return (
    CUSTOM_HERO[slug] ?? countryImage(media.heroSlug, media.heroRegion)
  );
}

/* ── motion primitives (match GoldenVisaHub) ───────────────────────────────── */

function Rise({
  text,
  className,
  delay = 0,
  reduce,
}: {
  text: string;
  className?: string;
  delay?: number;
  reduce?: boolean;
}) {
  if (reduce) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined,
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function Fade({
  children,
  delay = 0,
  className,
  reduce,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  reduce?: boolean;
}) {
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  ar,
  onDark = false,
}: {
  children: React.ReactNode;
  ar: string;
  onDark?: boolean;
}) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: onDark ? GOLD : GOLD_DEEP }}
    >
      <span className="h-px w-8" style={{ background: onDark ? GOLD : GOLD_DEEP }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
        {ar}
      </span>
    </p>
  );
}

const DUO =
  "object-cover [filter:grayscale(0.5)_brightness(0.7)_contrast(1.05)] transition-[filter,transform] duration-700 group-hover:[filter:grayscale(0)_brightness(0.85)] group-hover:scale-105";

/**
 * Audience-led "Solutions" landing — navy/gold luxury rebuild.
 *
 * Rhythm: DARK full-bleed hero → LIGHT "why this route" value props (framed
 * editorial image) → LIGHT recommended programmes grid → DARK full-bleed
 * mid-page "moment" with a pull-quote → LIGHT tools + closing CTA. Brings its
 * own chrome. All copy / points / tools / programmes come straight from `cfg`.
 */
export default function SolutionPage({
  cfg,
  programmes,
  serifClass,
}: {
  cfg: Omit<SolutionConfig, "select">;
  programmes: ProgrammeExplorerItem[];
  serifClass: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const media = MEDIA[cfg.slug];
  const heroImg = heroImageFor(cfg.slug, media);

  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const bandY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (DARK, full-bleed real image via countryImage) ── */}
      <section
        aria-label={cfg.eyebrow}
        data-tone="dark"
        className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt={media.heroAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover [filter:grayscale(0.5)_brightness(0.58)_contrast(1.05)]"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <Fade reduce={reduce}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.55)" }}>
              <a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a>{" "}
              <span style={{ color: GOLD }}>/</span> Solutions{" "}
              <span style={{ color: GOLD }}>/</span> {cfg.eyebrow}
            </p>
          </Fade>
          <Fade reduce={reduce} delay={0.1}>
            <div className="mt-8">
              <Eyebrow ar="الحلول" onDark>
                {cfg.eyebrow}
              </Eyebrow>
            </div>
          </Fade>
          <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,5.6vw,5rem)] font-medium leading-[1.0]`}>
            <Rise text={cfg.title} reduce={reduce} delay={0.2} />
          </h1>
          <Fade reduce={reduce} delay={0.45}>
            <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-white/75">{cfg.intro}</p>
          </Fade>
          <Fade reduce={reduce} delay={0.6}>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
                style={{ background: GOLD, color: NAVY }}
              >
                Book a consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/eligibility#start"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]"
              >
                Check eligibility
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── WHY THIS ROUTE (LIGHT, value props + framed editorial image) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#fbfaf7" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Framed media */}
          <Fade reduce={reduce} className="order-last lg:order-first">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src={media.chapter}
                alt={media.chapterAlt}
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
            </div>
          </Fade>

          {/* Copy + the config points (value props), kept verbatim */}
          <div>
            <Eyebrow ar="لماذا">Why this route</Eyebrow>
            <h2 className={`${serifClass} mt-5 max-w-xl text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06]`}>
              <Rise text="Built around what matters to you." reduce={reduce} />
            </h2>
            <Fade reduce={reduce} delay={0.1}>
              <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed" style={{ color: `${INK}a6` }}>
                {media.chapterLede}
              </p>
            </Fade>
            <span aria-hidden className="mt-7 block h-px w-28" style={{ background: `${GOLD}` }} />

            <ul className="mt-8 grid gap-4">
              {cfg.points.map((p, i) => (
                <Fade key={p} reduce={reduce} delay={i * 0.06}>
                  <li
                    className="flex items-start gap-4 border-t pt-4"
                    style={{ borderColor: `${INK}14` }}
                  >
                    <span
                      className={`${serifClass} mt-0.5 text-[1.3rem] font-medium tabular-nums leading-none`}
                      style={{ color: GOLD_DEEP }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-relaxed" style={{ color: `${INK}d9` }}>
                      {p}
                    </span>
                  </li>
                </Fade>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED PROGRAMMES (LIGHT, real full-bleed image cards) ── */}
      {programmes.length > 0 && (
        <section
          id="programmes"
          data-tone="light"
          className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20"
          style={{ background: "#f3f7fd" }}
        >
          <Ambient tone="light" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow ar="البرامج">Programmes that fit</Eyebrow>
                <h2 className={`${serifClass} mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium`}>
                  <Rise text={`${programmes.length} curated routes.`} reduce={reduce} />
                </h2>
              </div>
              <Link
                href="/programme-explorer"
                className="text-[13px] font-semibold underline-offset-4 hover:underline"
                style={{ color: GOLD_DEEP }}
              >
                Explore the full catalogue →
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programmes.map((item, i) => (
                <Fade key={item.id} reduce={reduce} delay={(i % 3) * 0.06}>
                  <ProgrammeCard item={item} serifClass={serifClass} />
                </Fade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MID-PAGE MOMENT (DARK, full-bleed parallax image + pull-quote) ── */}
      <section
        ref={bandRef}
        data-tone="dark"
        className="relative flex min-h-[60vh] items-center overflow-hidden px-6 py-28 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : bandY }}>
          <Image
            src={media.band}
            alt={media.bandAlt}
            fill
            sizes="100vw"
            className="object-cover [filter:grayscale(0.45)_brightness(0.45)_contrast(1.05)]"
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, rgba(8,18,42,0.55) 50%, rgba(8,18,42,0.85) 100%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}73, transparent)` }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span aria-hidden className={`${serifClass} text-5xl leading-none`} style={{ color: `${GOLD}b3` }}>
            “
          </span>
          <p className={`${serifClass} mx-auto mt-2 max-w-3xl text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.16]`}>
            {media.bandQuote}
          </p>
          <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: `${GOLD}cc` }}>
            XIPHIAS Immigration · {cfg.eyebrow}
          </p>
        </div>
      </section>

      {/* ── TOOLS + CLOSING CTA (LIGHT) ── */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-28 text-[#0c1f3f] sm:px-12 lg:px-20"
        style={{ background: "#f7f4ef" }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Eyebrow ar="الأدوات">Plan it with our tools</Eyebrow>
            <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium`}>
              <Rise text="Tools to map your route." reduce={reduce} />
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {cfg.tools.map((t, i) => (
              <Fade key={t.href} reduce={reduce} delay={i * 0.06}>
                <Link href={t.href} className="group block h-full">
                  <div
                    className="flex h-full flex-col rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#bfa15c] hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.35)] motion-reduce:transform-none"
                    style={{ borderColor: `${GOLD}33`, background: "#fbfaf7" }}
                  >
                    <span
                      className={`${serifClass} text-[2.4rem] font-medium leading-none`}
                      style={{ color: GOLD_DEEP }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <h3 className={`${serifClass} text-[1.4rem] font-medium`}>{t.label}</h3>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: GOLD }}
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed" style={{ color: `${INK}99` }}>
                      {t.desc}
                    </p>
                  </div>
                </Link>
              </Fade>
            ))}
          </div>

          {/* Closing CTA — keeps both consultation + eligibility entry points */}
          <Fade reduce={reduce} className="mt-16">
            <div
              className="flex flex-col items-start justify-between gap-6 rounded-2xl border p-10 sm:flex-row sm:items-center"
              style={{
                borderColor: `${GOLD}33`,
                background: `radial-gradient(120% 140% at 0% 0%, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
              }}
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                  {cfg.eyebrow}
                </p>
                <p className={`${serifClass} mt-3 max-w-xl text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight text-[#eef3fb]`}>
                  Find your route in one conversation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Book a consultation <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/eligibility#start"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bfa15c]"
                >
                  Check eligibility
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}

function ProgrammeCard({
  item,
  serifClass,
}: {
  item: ProgrammeExplorerItem;
  serifClass: string;
}) {
  const img = item.heroImage ?? countryImage(item.countrySlug);
  return (
    <Link href={item.href} className="group block aspect-[4/5]">
      <div className="relative h-full w-full overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-30px_rgba(8,18,42,0.6)]">
        <Image src={img} alt={item.title} fill sizes="(min-width:1024px) 22rem, 50vw" className={DUO} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.1) 55%, rgba(8,18,42,0.4) 100%)" }}
        />
        <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}33` }} />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span
            className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ borderColor: `${GOLD}73`, color: GOLD, background: "rgba(8,18,42,0.35)" }}
          >
            {TRACK_PILL[item.track] ?? item.track}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{item.country}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 text-[#eef3fb]">
          <h3 className={`${serifClass} text-[1.5rem] font-medium leading-tight`}>{item.title}</h3>
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-white/70">{item.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-semibold text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Wallet className="size-3.5" style={{ color: GOLD }} aria-hidden /> {item.investmentLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" style={{ color: GOLD }} aria-hidden /> {item.timelineLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
