"use client";

/**
 * ContentIndex — shared, reusable navy/gold editorial content index.
 *
 * Generalised from the approved sample src/app/samples/ContentMix.tsx ("Mix ① + ③"):
 *   - DARK navy radial hero (eyebrow + bilingual label + one <h1> + intro + live
 *     count) with GOLD topic FILTER chips.
 *   - A top row of up to 3 FEATURED full-bleed cover-image cards on a dark navy band.
 *   - The remaining posts as scannable LIST ROWS on a light pearl band, with a
 *     sticky topic sidebar that mirrors the hero chips (shared filter state).
 *   - A closing CTA → /contact on a dark navy radial band.
 *
 * Filtering is driven by a single useMemo over the `posts` prop. Categories are
 * DERIVED from the posts (never hardcoded). Cards/rows link to `post.href`.
 * Every <section> sets an explicit background; useReducedMotion respected;
 * exactly one <h1>; gold-on-light text uses GOLD_DEEP for contrast.
 *
 * Chrome reused: LuxeHeader, LuxeFooter, Ambient.
 *
 * ─── PROP API ───────────────────────────────────────────────────────────────
 *  serifClass : string            // Cormorant serif className applied to display text
 *  eyebrow    : string            // small uppercase kicker above the title (e.g. "Immigration Insights")
 *  eyebrowAr? : string            // optional Arabic kicker rendered RTL beside the eyebrow
 *  title      : string            // the page <h1> (e.g. "Insights & Articles")
 *  intro      : string            // lead paragraph under the title
 *  posts      : Post[]            // the content items (see Post type below)
 *  allLabel?  : string            // label for the "show everything" filter (default "All")
 *
 *  type Post = {
 *    title    : string            // headline
 *    slug     : string            // unique key
 *    href     : string            // destination URL (cards + rows link here)
 *    date     : string            // ISO date string
 *    category : string            // topic; drives the derived filter chips
 *    excerpt  : string            // summary / dek
 *    image?   : string            // real cover image; omit → category-tinted fallback
 *    author?  : string            // optional byline
 *  }
 * ────────────────────────────────────────────────────────────────────────────
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

export type ContentIndexPost = {
  title: string;
  slug: string;
  href: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  author?: string;
};

export type ContentIndexProps = {
  serifClass: string;
  eyebrow: string;
  eyebrowAr?: string;
  title: string;
  intro: string;
  posts: ContentIndexPost[];
  allLabel?: string;
};

// Category tint for the no-image fallback panel (never blank).
const CAT_TINT: Record<string, string> = {
  "Golden Visa": "#2a2410",
  Citizenship: "#10212a",
  Residency: "#0e1f33",
  Skilled: "#161a2c",
  "Startup Visa": "#22162a",
  "US Immigration": "#2a1414",
};

function tintFor(category: string) {
  return CAT_TINT[category] ?? INK;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ① Featured cover-image card (dark, full-bleed real cover). */
function FeaturedCard({
  post,
  serifClass,
  index,
}: {
  post: ContentIndexPost;
  serifClass: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const tint = tintFor(post.category);
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : Math.min(index, 3) * 0.06 }}
      className="group h-full"
    >
      <Link
        href={post.href}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c]/55 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1733]"
      >
        {/* REAL full-bleed cover image with navy gradient overlay */}
        <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ background: tint }}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-end p-4"
              aria-hidden
              style={{ background: `linear-gradient(140% 120% at 80% 0%, ${tint} 0%, ${NAVY} 100%)` }}
            >
              <span className={`${serifClass} text-2xl text-white/30`}>XIPHIAS</span>
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,23,51,0.92) 0%, rgba(10,23,51,0.15) 48%, rgba(10,23,51,0) 75%)" }}
          />
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
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60 line-clamp-3">{post.excerpt}</p>
          <div className="mt-auto flex items-center gap-2 pt-4 text-[11.5px] uppercase tracking-[0.12em] text-white/45">
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            {post.author ? (
              <>
                <span aria-hidden className="text-white/25">·</span>
                <span className="truncate">{post.author}</span>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ③ Scannable list row (light, real cover thumbnail). */
function ListRow({
  post,
  serifClass,
  index,
}: {
  post: ContentIndexPost;
  serifClass: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const tint = tintFor(post.category);
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : Math.min(index * 0.04, 0.2) }}
      className="border-b"
      style={{ borderColor: "rgba(191,161,92,0.4)" }}
    >
      <Link
        href={post.href}
        className="group flex flex-col gap-5 py-7 outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c] sm:flex-row sm:items-start"
      >
        {/* REAL cover thumbnail, fixed aspect, object-cover (fallback = tint) */}
        <div
          className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md sm:aspect-[4/3] sm:w-52"
          style={{ background: tint }}
        >
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width:640px) 13rem, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-end p-3" aria-hidden>
              <span className={`${serifClass} text-lg text-white/30`}>XIPHIAS</span>
            </div>
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,23,51,0.34), transparent 55%)" }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <span style={{ color: GOLD_DEEP }}>{post.category}</span>
            <span className="h-1 w-1 rounded-full" style={{ background: "rgba(12,31,63,0.3)" }} />
            <time dateTime={post.date} style={{ color: "rgba(12,31,63,0.5)" }}>
              {fmtDate(post.date)}
            </time>
          </div>
          <h3
            className={`${serifClass} mt-2 text-[1.5rem] font-medium leading-tight transition-colors group-hover:text-[#0a1733]`}
            style={{ color: INK }}
          >
            {post.title}
          </h3>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed" style={{ color: "rgba(12,31,63,0.66)" }}>
            {post.excerpt}
          </p>
          <span
            className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: GOLD_DEEP }}
          >
            Read more
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export default function ContentIndex({
  serifClass,
  eyebrow,
  eyebrowAr,
  title,
  intro,
  posts,
  allLabel = "All",
}: ContentIndexProps) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState(allLabel);

  // Categories DERIVED from posts (never hardcoded).
  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts, allLabel]
  );

  // One source of truth: a single filtered list, then split into featured + rows.
  const filtered = useMemo(
    () => (cat === allLabel ? posts : posts.filter((p) => p.category === cat)),
    [cat, posts, allLabel]
  );
  const featured = filtered.slice(0, 3);
  const rows = filtered.slice(3);

  return (
    <div className="relative bg-[#0a1733]">
      <Header serifClass={serifClass} />

      {/* HERO (dark navy radial) + topic filter chips */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-14 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 80% 0%, #13284f 0%, ${NAVY} 60%)` }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            {eyebrow}
            {eyebrowAr ? (
              <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
                {eyebrowAr}
              </span>
            ) : null}
          </p>
          <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-[0.98]`}>
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">{intro}</p>
          <p className="mt-6 text-sm text-white/55">
            <span style={{ color: GOLD }} className="font-semibold">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "item" : "items"}
            {cat !== allLabel ? (
              <>
                {" "}
                in <span className="text-white/75">{cat}</span>
              </>
            ) : (
              <> across {categories.length - 1} topics</>
            )}
            .
          </p>

          {/* Gold topic filter chips */}
          <div className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter by topic">
            {categories.map((c) => {
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

      {/* FEATURED ROW (① dark navy band, full-bleed cover cards) */}
      <section data-tone="dark" className="relative px-6 pb-16 pt-2 sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex items-baseline justify-between border-b border-white/10 pb-4">
            <h2 className={`${serifClass} text-2xl font-medium text-[#eef3fb]`}>
              {cat === allLabel ? "Featured" : `Featured in ${cat}`}
            </h2>
            <span className="text-[12px] uppercase tracking-[0.14em] text-white/45" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </span>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post, i) => (
                <FeaturedCard key={post.slug} post={post} serifClass={serifClass} index={i} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/55">
              Nothing in this topic yet.
            </p>
          )}
        </div>
      </section>

      {/* INDEX ROWS (③ light pearl band) + sticky topic sidebar */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-16 sm:px-10 lg:px-16"
        style={{ background: "#fbfaf7", color: INK }}
      >
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[14rem_1fr]">
          {/* FILTER SIDEBAR (mirrors hero chips, shared state) */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD_DEEP }}>
              Topics
            </h2>
            <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-0" aria-label="Filter by topic">
              {categories.map((c) => {
                const active = c === cat;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    aria-pressed={active}
                    className="rounded-md px-3 py-2 text-left text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfa15c] lg:rounded-none lg:border-b lg:border-black/5"
                    style={{
                      color: active ? GOLD_DEEP : "rgba(12,31,63,0.62)",
                      fontWeight: active ? 600 : 400,
                      background: active ? "rgba(191,161,92,0.10)" : "transparent",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* LIST ROWS — the remaining (non-featured) posts */}
          <div>
            <div className="mb-6 flex items-baseline justify-between border-b pb-3" style={{ borderColor: "rgba(191,161,92,0.4)" }}>
              <h2 className={`${serifClass} text-2xl font-medium`} style={{ color: INK }}>
                {cat === allLabel ? `${allLabel} ${eyebrow}`.trim() : cat}
              </h2>
              <span className="text-[12px] uppercase tracking-[0.14em]" style={{ color: "rgba(12,31,63,0.5)" }}>
                {rows.length} more
              </span>
            </div>

            {rows.length > 0 ? (
              <ol className="border-t" style={{ borderColor: "rgba(191,161,92,0.4)" }}>
                {rows.map((post, i) => (
                  <ListRow key={post.slug} post={post} serifClass={serifClass} index={i} />
                ))}
              </ol>
            ) : (
              <p
                className="rounded-xl border border-dashed p-10 text-center text-[14px]"
                style={{ borderColor: "rgba(191,161,92,0.5)", color: "rgba(12,31,63,0.6)" }}
              >
                {featured.length > 0
                  ? "Everything in this topic is featured above."
                  : "Nothing in this topic yet."}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CLOSING CTA → /contact (dark navy radial) */}
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
