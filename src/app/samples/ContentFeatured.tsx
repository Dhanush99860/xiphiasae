"use client";

/**
 * ContentFeatured — Variant ② "Featured + Grid" for the XIPHIAS content-index reskin.
 * Representative: the Articles list (applies equally to news / blog / articles / media / events).
 *
 * DATA: posts below are a FAITHFUL SNAPSHOT of REAL articles. The live loader
 * (src/lib/insights-content.ts → getAllInsights({ kind: "articles" })) is server-only
 * ("use server" / "server-only"), so it cannot run inside this client sample component.
 * Fields mirror the real InsightMeta shape (title, slug, date, summary, hero, tags).
 * Every cover image is a REAL file in /public/images/articles and links to /articles/[slug].
 * Image fallback: a post with no hero gets a category-tinted navy panel (never blank).
 */

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

type Post = {
  title: string;
  slug: string;
  date: string; // ISO
  category: string;
  hero?: string; // real cover image
  summary: string;
  tags: string[];
};

/* REAL articles snapshot (titles/dates/summaries/heroes/tags from content/articles/*.mdx) */
const POSTS: Post[] = [
  {
    title: "Why Dubai Is a Top Choice for Global Expats — and How XIPHIAS Makes Relocating Seamless",
    slug: "dubai-expats-xiphias-immigration-relocation",
    date: "2025-08-12",
    category: "Residency",
    hero: "/images/articles/dubai-is-a-top-choice.webp",
    summary:
      "Discover why Dubai is a top choice for expats with tax-free income, safety, and global opportunities — and how XIPHIAS ensures a smooth relocation.",
    tags: ["Dubai", "Expats", "Residency"],
  },
  {
    title: "No Investment, Tax-Free: Perks of the Dubai Startup Visa",
    slug: "dubai-startup-visa-perks-2024",
    date: "2024-02-17",
    category: "Startup Visa",
    hero: "/images/articles/no-investment-tax-free.webp",
    summary:
      "Dubai's Startup Visa offers global entrepreneurs a tax-free, no-investment pathway to build innovative ventures with mentorship, funding and residency.",
    tags: ["Dubai", "Startup Visa", "Entrepreneurs"],
  },
  {
    title: "Canada Start-Up Visa (SUV) 2025 — Founder's Guide",
    slug: "canada-startup-visa-2025-guide",
    date: "2025-09-16",
    category: "Startup Visa",
    hero: "/images/articles/canada-startup-visa.webp",
    summary:
      "Plain-English walkthrough of Canada's SUV: Letter of Support, CLB 5, funds, ownership rules, timeline, and FAQs.",
    tags: ["Canada", "Startup Visa"],
  },
  {
    title: "Planning Your Move to Germany Through the Opportunity Card",
    slug: "germany-opportunity-card-guide",
    date: "2026-03-11",
    category: "Skilled",
    hero: "/images/articles/germany-opportunity-card-guide.webp",
    summary:
      "Germany offers multiple pathways for skilled professionals, and the Opportunity Card is a practical route for applicants without an existing job offer.",
    tags: ["Germany", "Opportunity Card", "Skilled"],
  },
  {
    title: "Express Entry CRS Score System Explained",
    slug: "express-entry-crs-score-system-explained",
    date: "2026-03-14",
    category: "Skilled",
    hero: "/images/articles/express-entry-crs-score.webp",
    summary:
      "Understand how the Express Entry CRS score system works, what affects your ranking in the pool, and how to improve your profile for Canada PR.",
    tags: ["Canada", "Express Entry", "PR"],
  },
  {
    title: "How the Australia PR Process Works from Start to Finish",
    slug: "australia-pr-process-complete-guide",
    date: "2026-03-18",
    category: "Residency",
    hero: "/images/articles/australia-pr-process-guide.webp",
    summary:
      "Australia PR is not a single visa but a process spanning points-tested, state-nominated, regional and employer-sponsored pathways.",
    tags: ["Australia", "PR Process", "Skilled Migration"],
  },
  {
    title: "American Green Card: Pathways to Live and Build a Career in the US",
    slug: "american-green-card-pathways-2024",
    date: "2024-08-13",
    category: "Residency",
    hero: "/images/articles/american-green-card.webp",
    summary:
      "Obtaining a US green card has become harder, but several visa options like EB, L1, and O-1 still offer viable pathways.",
    tags: ["Green Card", "US Immigration", "EB Visa"],
  },
  {
    title: "Antigua, Grenada, Dominica: Citizenship-Related Visas Explained",
    slug: "antigua-grenada-dominica-citizenship-visas-explained",
    date: "2024-05-06",
    category: "Citizenship",
    hero: "/images/articles/antigua-grenada.webp",
    summary:
      "A detailed explanation of Caribbean Citizenship by Investment programs in Antigua, Grenada and Dominica — options, benefits and CARICOM advantages.",
    tags: ["Caribbean", "Citizenship", "CBI"],
  },
  {
    title: "What Is France's Startup Visa? From Duration to Advantages",
    slug: "france-startup-visa-2024",
    date: "2024-07-25",
    category: "Startup Visa",
    hero: "/images/articles/what-is-frances.webp",
    summary:
      "France's Startup Visa offers a streamlined path for founders, investors and tech employees to establish startups and live in France for up to four years.",
    tags: ["France", "Startup Visa", "Founders"],
  },
  {
    title: "Greece & Cyprus Golden Visa Residency-by-Investment, Modified",
    slug: "greece-cyprus-golden-visa-modifications-2024",
    date: "2024-04-17",
    category: "Golden Visa",
    hero: "/images/articles/golden-visa-programs.webp",
    summary:
      "Modifications to the Greek and Cyprus Golden Visa programs mark a pivotal moment in investment immigration, reshaping residency in Europe.",
    tags: ["Greece", "Cyprus", "Golden Visa"],
  },
  {
    title: "Caribbean Islands Citizenship by Investment Programs — A Comparison",
    slug: "caribbean-citizenship-by-investment-programs-comparison",
    date: "2024-05-05",
    category: "Citizenship",
    hero: "/images/articles/caribbean-islands.webp",
    summary:
      "A comprehensive comparison of Caribbean CBI programs across Antigua and Barbuda, Grenada and Dominica — benefits, requirements and CARICOM advantages.",
    tags: ["Caribbean", "Citizenship", "CBI"],
  },
  {
    title: "Golden Visas & Residency: India's Growing Influence in Global Diplomacy",
    slug: "golden-visas-india-global-diplomacy",
    date: "2025-09-16",
    category: "Golden Visa",
    hero: "/images/articles/indias-growing-influence.webp",
    summary:
      "Countries are using residency and Golden Visa programmes to attract India's wealthy and skilled professionals, reshaping global influence.",
    tags: ["India", "Golden Visa", "Diplomacy"],
  },
  {
    title: "EU Bans Malta's Golden Passport Scheme: What's Next for Investors?",
    slug: "eu-bans-malta-golden-passport-scheme",
    date: "2025-05-01",
    category: "Citizenship",
    hero: "/images/articles/maltas-golden-passport-scheme.webp",
    summary:
      "The EU Court of Justice has ruled Malta's 'golden passport' scheme illegal, stating EU citizenship cannot be granted in exchange for investment.",
    tags: ["Malta", "EU", "Citizenship"],
  },
  {
    title: "Germany vs Canada Immigration: Jobs, PR & Costs (2026)",
    slug: "germany-vs-canada-2026-job-market-pr-cost-comparison",
    date: "2026-01-10",
    category: "Skilled",
    hero: "/images/articles/germany-and-canada.webp",
    summary:
      "A 2026 comparison of job market, PR timelines and migration costs to help skilled professionals choose between Germany and Canada.",
    tags: ["Germany", "Canada", "Skilled Migration"],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* Category-tinted fallback panel (never blank) for posts with no real cover. */
function FallbackPanel({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `radial-gradient(120% 120% at 30% 20%, #13284f 0%, ${NAVY} 70%)` }}
    >
      <span className="font-arabic-display text-4xl" style={{ color: `${GOLD}55` }}>
        {label}
      </span>
    </div>
  );
}

export default function ContentFeatured({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [cat, setCat] = React.useState("All");

  const sorted = React.useMemo(
    () => [...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    []
  );
  const featured = sorted[0];
  const rest = React.useMemo(
    () => sorted.slice(1).filter((p) => cat === "All" || p.category === cat),
    [sorted, cat]
  );

  const anim = reduce
    ? {}
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6 } };

  return (
    <main>
      <LuxeHeader serifClass={serifClass} />

      {/* ───── FEATURED HERO (dark navy, full-bleed real cover) ───── */}
      <section data-tone="dark" className="relative isolate overflow-hidden" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="absolute inset-0 -z-0">
          {featured.hero ? (
            <Image src={featured.hero} alt={featured.title} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <FallbackPanel label={featured.category} />
          )}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${NAVY}aa 0%, ${NAVY}33 38%, ${NAVY}f2 92%)` }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-12 sm:pt-40 lg:px-20">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            Insights · Articles
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal text-white/80">
              مقالات
            </span>
          </p>

          <h1 className={`${serifClass} mt-5 max-w-4xl text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.04] text-white`}>
            Expert insight on investment migration.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
            {POSTS.length} articles of long-form analysis on residency, citizenship and global mobility —
            written to help you choose the right country and the right route.
          </p>

          {/* Featured latest post */}
          <motion.a {...anim} href={`/articles/${featured.slug}`} className="group mt-12 block max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a1733]" style={{ background: GOLD }}>
                {featured.category}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Latest · {fmtDate(featured.date)}</span>
            </div>
            <h2 className={`${serifClass} mt-4 text-[clamp(1.7rem,3.4vw,2.8rem)] font-medium leading-tight text-white transition-colors group-hover:text-[#bfa15c]`}>
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">{featured.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>
              Read article <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </motion.a>
        </div>
      </section>

      {/* ───── LIGHT PEARL GRID + FILTER CHIPS ───── */}
      <section data-tone="light" className="relative px-6 py-20 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#fbfaf7" }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className={`${serifClass} text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-tight`}>
              More articles
            </h2>
            <span className="text-[12px] uppercase tracking-[0.16em] text-[#0c1f3f]/45">{rest.length} of {POSTS.length}</span>
          </div>

          {/* Category filter chips */}
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCat(c)}
                  className="rounded-full border px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={
                    active
                      ? { background: GOLD, borderColor: GOLD, color: NAVY }
                      : { background: "transparent", borderColor: `${INK}26`, color: GOLD_DEEP }
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Uniform thumbnail card grid */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <motion.a
                key={p.slug}
                {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, delay: (i % 3) * 0.06 } })}
                href={`/articles/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#0a1733]">
                  {p.hero ? (
                    <Image
                      src={p.hero}
                      alt={p.title}
                      fill
                      sizes="(min-width:1024px) 20rem, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <FallbackPanel label={p.category} />
                  )}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, ${NAVY}cc 100%)` }} />
                  <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}26` }} />
                  <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a1733]" style={{ background: GOLD }}>
                    {p.category}
                  </span>
                </div>
                <h3 className={`${serifClass} mt-4 text-[1.3rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#0c1f3f]/65 line-clamp-2">{p.summary}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#0c1f3f]/45">{fmtDate(p.date)}</p>
              </motion.a>
            ))}
          </div>

          {rest.length === 0 && (
            <p className="mt-12 text-center text-[15px] text-[#0c1f3f]/55" role="status">
              No articles in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ───── CLOSING CTA (navy) ───── */}
      <section data-tone="dark" className="relative px-6 py-24 text-center sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>Stay informed</p>
          <h2 className={`${serifClass} mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-tight text-white`}>
            Speak with an advisor before you decide.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            Get a private, no-obligation assessment of the residency and citizenship routes that fit your goals.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1733] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD }}
          >
            Book a consultation <span>→</span>
          </a>
        </div>
      </section>

      <LuxeFooter serifClass={serifClass} />
    </main>
  );
}
