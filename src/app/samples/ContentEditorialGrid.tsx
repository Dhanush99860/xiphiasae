"use client";

/**
 * Sample · Content index reskin — Variant ① "Editorial Grid" (DARK navy)
 * Representative of the Articles list (applies to news/blog/articles/media/events).
 *
 * DATA SOURCE: posts mirror the REAL Articles index. The loader
 * (`getAllInsights` in src/lib/insights-content.ts) reads MDX from
 * content/articles/**.mdx and is server-only ("use server" + "server-only"),
 * so it cannot run inside this client preview component. Below is a FAITHFUL
 * SNAPSHOT of 14 real published articles — title / slug / date / tags / summary /
 * author / hero — copied verbatim from each post's frontmatter. Cards link to the
 * real detail route /articles/[slug].
 *
 * IMAGE SOURCE: each post's real `hero` frontmatter field (under
 * /images/articles/…). Every card shows a REAL full-bleed object-cover image.
 * If a post had no hero the code falls back to a category-tinted gradient panel
 * (not blank) — all 14 snapshot posts here have a real hero.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  author: string;
  hero?: string;
};

// Real published articles (snapshot of content/articles/**.mdx frontmatter).
const POSTS: Post[] = [
  {
    slug: "greece-golden-visa-popularity-2025",
    title: "Why the Greece ‘golden visa’ is one of the world’s most popular",
    category: "Golden Visa",
    date: "2025-03-04",
    summary:
      "Greece’s golden visa programme tops the 2025 Global Residence Program Index, attracting global investors through affordable thresholds and fast processing.",
    author: "Gauri Ghadi & Isha Mehrotra",
    hero: "/images/articles/Why-the-greece-golden-visa.webp",
  },
  {
    slug: "dubai-expats-xiphias-immigration-relocation",
    title: "Why Dubai Is a Top Choice for Global Expats — and How XIPHIAS Makes Relocating Seamless",
    category: "Residency",
    date: "2025-08-12",
    summary:
      "Discover why Dubai is a top choice for expats with tax-free income, safety and global opportunity — and how XIPHIAS ensures a smooth relocation.",
    author: "The Arab Today",
    hero: "/images/articles/dubai-is-a-top-choice.webp",
  },
  {
    slug: "canada-startup-visa-2025-guide",
    title: "Canada Start-Up Visa (SUV) 2025 — Founder’s Guide",
    category: "Startup Visa",
    date: "2025-09-16",
    summary:
      "A plain-English walkthrough of Canada’s SUV: Letter of Support, CLB 5, funds, ownership rules, timeline and the questions founders ask most.",
    author: "XIPHIAS",
    hero: "/images/articles/canada-startup-visa.webp",
  },
  {
    slug: "planning-your-move-to-germany-through-the-opportunity-card",
    title: "Planning Your Move to Germany Through the Opportunity Card",
    category: "Skilled",
    date: "2026-03-11",
    summary:
      "The Opportunity Card is a practical route for skilled professionals who want to enter Germany without an existing job offer in hand.",
    author: "Jyothi P.",
    hero: "/images/articles/germany-opportunity-card-guide.webp",
  },
  {
    slug: "australia-pr-process-complete-guide",
    title: "How the Australia PR Process Works from Start to Finish",
    category: "Skilled",
    date: "2026-03-18",
    summary:
      "Australia PR is a process, not one visa — points-tested, state-nominated, regional or employer-sponsored routes, mapped end to end.",
    author: "Jyothi P.",
    hero: "/images/articles/australia-pr-process-guide.webp",
  },
  {
    slug: "express-entry-crs-score-system-explained",
    title: "Express Entry CRS Score System Explained",
    category: "Skilled",
    date: "2026-03-14",
    summary:
      "How the Express Entry CRS score works, what affects your ranking in the pool, and how to improve your profile for Canada PR.",
    author: "Jyothi P.",
    hero: "/images/articles/express-entry-crs-score.webp",
  },
  {
    slug: "caribbean-citizenship-by-investment-programs-comparison",
    title: "Caribbean Islands Citizenship by Investment Programs — A Comparison",
    category: "Citizenship",
    date: "2024-05-05",
    summary:
      "A comparison of Caribbean CBI programmes across Antigua & Barbuda, Grenada and Dominica — benefits, requirements and the CARICOM advantage.",
    author: "Varun Singh",
    hero: "/images/articles/caribbean-islands.webp",
  },
  {
    slug: "american-green-card-pathways-2024",
    title: "American Green Card: Various pathways to live and build a career in the US",
    category: "US Immigration",
    date: "2024-08-13",
    summary:
      "The US green card is harder than ever, but EB, L-1 and O-1 routes still offer viable pathways. Here is how each one really works.",
    author: "Varun Singh",
    hero: "/images/articles/american-green-card.webp",
  },
  {
    slug: "eu-bans-malta-golden-passport-scheme",
    title: "EU bans Malta’s golden passport scheme: What’s next for rich investors?",
    category: "Citizenship",
    date: "2025-05-01",
    summary:
      "The EU Court of Justice ruled Malta’s ‘golden passport’ scheme illegal — EU citizenship cannot be granted in exchange for investment.",
    author: "Surbhi Gloria Singh",
    hero: "/images/articles/maltas-golden-passport-scheme.webp",
  },
  {
    slug: "h1b-visa-renewal-process-2025-no-travel",
    title: "H-1B visa renewal process to change in 2025: No travel to India required",
    category: "US Immigration",
    date: "2025-01-08",
    summary:
      "The US is set to introduce a formal H-1B renewal process in 2025, letting holders renew domestically without returning to India.",
    author: "Surbhi Gloria Singh",
    hero: "/images/articles/h-1b-visa-renewal-process.webp",
  },
  {
    slug: "germany-vs-canada-2026-job-market-pr-cost-comparison",
    title: "Germany vs Canada Immigration: Jobs, PR & Costs (2026)",
    category: "Skilled",
    date: "2026-01-10",
    summary:
      "A 2026 comparison of job market, PR timelines and migration costs to help skilled professionals choose the best destination.",
    author: "Jyothi P.",
    hero: "/images/articles/germany-and-canada.webp",
  },
  {
    slug: "grenada-citizenship-by-investment-2024",
    title: "Grenada remains a desirable option for those seeking a secondary passport",
    category: "Citizenship",
    date: "2024-09-04",
    summary:
      "Grenada stands out among Caribbean CBI programmes thanks to its unique E-2 Visa Treaty with the US and favourable tax policies.",
    author: "Varun Singh",
    hero: "/images/articles/grenada -remains.webp",
  },
  {
    slug: "greece-golden-visa-vs-european-investment-programs",
    title: "Greece Golden Visa vs Other European Investment Programs 2026",
    category: "Golden Visa",
    date: "2026-01-20",
    summary:
      "Compare the Greece Golden Visa with Portugal, Spain, Malta and Italy — thresholds, processing, family inclusion and citizenship pathways.",
    author: "Jyothi P.",
    hero: "/images/articles/greece-vs-other-investment.webp",
  },
  {
    slug: "france-startup-visa-2024",
    title: "What Is France’s Startup Visa? From Duration to Advantages, Here’s All About It",
    category: "Startup Visa",
    date: "2024-07-25",
    summary:
      "France’s Startup Visa offers a streamlined path for founders, investors and tech employees to build a startup and live in France for up to four years.",
    author: "Shreya Ghosh",
    hero: "/images/articles/what-is-frances.webp",
  },
];

const CATEGORIES = ["All", "Golden Visa", "Citizenship", "Residency", "Skilled", "Startup Visa", "US Immigration"];

// Category tint for the no-image fallback panel (never blank).
const CAT_TINT: Record<string, string> = {
  "Golden Visa": "#2a2410",
  Citizenship: "#10212a",
  Residency: "#0e1f33",
  Skilled: "#161a2c",
  "Startup Visa": "#22162a",
  "US Immigration": "#2a1414",
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
      {children}
    </div>
  );
}

function PostCard({ post, serifClass, index }: { post: Post; serifClass: string; index: number }) {
  const reduce = useReducedMotion();
  const tint = CAT_TINT[post.category] ?? INK;
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : Math.min(index, 5) * 0.05 }}
      className="group h-full"
    >
      <Link
        href={`/articles/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c]/55 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1733]"
      >
        {/* REAL full-bleed cover image (object-cover) with navy gradient overlay */}
        <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ background: tint }}>
          {post.hero ? (
            <Image
              src={post.hero}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 flex items-end p-4" aria-hidden style={{ background: `linear-gradient(140% 120% at 80% 0%, ${tint} 0%, ${NAVY} 100%)` }}>
              <span className={`${serifClass} text-2xl text-white/30`}>XIPHIAS</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,23,51,0.92) 0%, rgba(10,23,51,0.15) 48%, rgba(10,23,51,0) 75%)" }} />
          <span
            className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#bfa15c]/50 bg-black/40 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] backdrop-blur"
            style={{ color: GOLD }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} aria-hidden />
            {post.category}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <h3 className={`${serifClass} text-[1.3rem] font-medium leading-[1.18] text-[#eef3fb] transition-colors group-hover:text-white`}>
            {post.title}
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60 line-clamp-3">{post.summary}</p>
          <div className="mt-auto flex items-center gap-2 pt-4 text-[11.5px] uppercase tracking-[0.12em] text-white/45">
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            <span aria-hidden className="text-white/25">·</span>
            <span className="truncate">{post.author}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ContentEditorialGrid({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState("All");

  const list = useMemo(() => (cat === "All" ? POSTS : POSTS.filter((p) => p.category === cat)), [cat]);

  return (
    <div className="relative bg-[#0a1733]">
      <Badge>Sample · Articles index · Editorial Grid</Badge>
      <Header serifClass={serifClass} />

      {/* HERO (dark navy radial) */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-14 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 80% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            Immigration Insights
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
              مقالات
            </span>
          </p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-[0.98]`}>
            Insights &amp; Articles
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
            Expert analysis on residency, citizenship and investment-migration programmes — long-form perspective to help you choose the
            right country and the right route with confidence.
          </p>
          <p className="mt-6 text-sm text-white/55">
            <span style={{ color: GOLD }} className="font-semibold">
              {POSTS.length}
            </span>{" "}
            articles, authored by our advisors.
          </p>

          {/* Gold category filter chips */}
          <div className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter articles by topic">
            {CATEGORIES.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  aria-pressed={active}
                  className="rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1733]"
                  style={{
                    borderColor: active ? GOLD : "rgba(255,255,255,0.2)",
                    background: active ? GOLD : "transparent",
                    color: active ? NAVY : "rgba(238,243,251,0.72)",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRID (dark navy band) */}
      <section data-tone="dark" className="relative px-6 py-14 sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex items-baseline justify-between border-b border-white/10 pb-4">
            <h2 className={`${serifClass} text-2xl font-medium text-[#eef3fb]`}>
              {cat === "All" ? "Latest articles" : cat}
            </h2>
            <span className="text-[12px] uppercase tracking-[0.14em] text-white/45" aria-live="polite">
              {list.length} {list.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {list.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((post, i) => (
                <PostCard key={post.slug} post={post} serifClass={serifClass} index={i} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/55">
              No articles in this topic yet.
            </p>
          )}
        </div>
      </section>

      {/* CLOSING CTA (dark navy radial) */}
      <section
        data-tone="dark"
        className="relative isolate px-6 py-20 text-center text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(110% 120% at 50% 0%, #13284f 0%, ${INK} 70%)` }}
      >
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            Speak with an advisor
          </p>
          <h2 className={`${serifClass} mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05]`}>
            Turn insight into your next passport or residency.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
            Our team translates programme intelligence into a route built around your family, timeline and goals.
          </p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1f3f]"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
