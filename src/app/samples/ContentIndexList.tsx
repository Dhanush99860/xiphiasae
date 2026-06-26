"use client";

/**
 * Variant ③ — "Index List" · LIGHT editorial (NYT-like) reskin for the XIPHIAS
 * content index (representative: Articles; the same layout applies to
 * news / blog / articles / media / events).
 *
 * DATA SOURCE: the live loader `getAllInsights({ kind: "articles" })` in
 * src/lib/insights-content.ts is "use server" / server-only, so this client
 * preview embeds a FAITHFUL SNAPSHOT of real published articles taken from
 * e:/Xiphias_dubai/content/articles/*.mdx frontmatter.
 * Fields used per the InsightMeta shape: title, slug, date, summary, tags
 * (first tag → category), hero (real cover image). Cards link to the real
 * detail route /articles/[slug]. Every row shows a REAL cover image
 * (object-cover, fixed aspect). No invented posts.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
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
  date: string; // ISO
  summary: string;
  category: string; // first tag / topic
  hero: string; // real cover image
};

// Faithful snapshot of real /content/articles posts (frontmatter verified).
const POSTS: Post[] = [
  { slug: "express-entry-crs-score-system-explained", title: "Express Entry CRS Score System Explained", date: "2026-03-14", category: "Canada PR", summary: "Understand how the Express Entry CRS score system works, what affects your ranking in the pool, and how to improve your profile for Canada PR.", hero: "/images/articles/express-entry-crs-score.webp" },
  { slug: "germany-opportunity-card-guide", title: "Planning Your Move to Germany Through the Opportunity Card", date: "2026-03-11", category: "Skilled", summary: "Germany offers multiple immigration pathways for skilled professionals, and the Opportunity Card can be a practical route for applicants without an existing job offer.", hero: "/images/articles/germany-opportunity-card-guide.webp" },
  { slug: "canada-startup-visa-2025-guide", title: "Canada Start-Up Visa (SUV) 2025 — Founder’s Guide", date: "2025-09-16", category: "Start-Up Visa", summary: "Plain-English walkthrough of Canada’s SUV: Letter of Support, CLB 5, funds, ownership rules, timeline, and FAQs.", hero: "/images/articles/canada-startup-visa.webp" },
  { slug: "h1b-visa-demand-fy2026", title: "H-1B visa demand remains strong in FY2026 despite tighter US scrutiny", date: "2025-05-19", category: "US Immigration", summary: "USCIS reveals 343,981 eligible registrations for FY2026, far exceeding the 85,000 cap, showing continued strong demand despite tighter scrutiny.", hero: "/images/articles/h-1b-visa-demands.webp" },
  { slug: "eu-bans-malta-golden-passport-scheme", title: "EU bans Malta's golden passport scheme: What's next for rich investors?", date: "2025-05-01", category: "Citizenship", summary: "The EU Court of Justice has ruled Malta’s ‘golden passport’ scheme illegal, stating EU citizenship cannot be granted in exchange for investment.", hero: "/images/articles/maltas-golden-passport-scheme.webp" },
  { slug: "greece-golden-visa-popularity-2025", title: "Why the Greece ‘golden visa’ is one of the world’s most popular", date: "2025-03-04", category: "Golden Visa", summary: "Greece’s golden visa tops the 2025 Global Residence Program Index, attracting global investors through affordable thresholds and fast processing.", hero: "/images/articles/Why-the-greece-golden-visa.webp" },
  { slug: "australia-permanent-residency-new-opportunities-2025", title: "Australia Permanent Residency: New opportunities in 2025", date: "2024-12-22", category: "Australia PR", summary: "Australia’s 2025 migration reforms include the National Innovation Visa, higher English requirements, student caps, and easier skilled pathways.", hero: "/images/articles/australia-res.webp" },
  { slug: "grenada-citizenship-by-investment-2024", title: "Grenada: a desirable option for a second passport", date: "2024-09-04", category: "Citizenship", summary: "Grenada stands out among Caribbean CBI programmes thanks to its unique E-2 Visa Treaty with the United States and favourable tax policies.", hero: "/images/articles/grenada -remains.webp" },
  { slug: "american-green-card-pathways-2024", title: "American Green Card: Various pathways to live and build a career in the US", date: "2024-08-13", category: "Green Card", summary: "A US green card is increasingly difficult to obtain, but EB, L-1, and O-1 visa options still offer viable pathways for ambitious applicants.", hero: "/images/articles/american-green-card.webp" },
  { slug: "antigua-grenada-dominica-citizenship-visas-explained", title: "Antigua, Grenada, Dominica: Citizenship-related Visas Explained", date: "2024-05-06", category: "Citizenship", summary: "A detailed look at Caribbean Citizenship by Investment programmes — their investment options, visa benefits, and CARICOM residency advantages.", hero: "/images/articles/antigua-grenada.webp" },
  { slug: "caribbean-citizenship-by-investment-programs-comparison", title: "Caribbean Islands Citizenship by Investment Programs — A Comparison", date: "2024-05-05", category: "Citizenship", summary: "A comprehensive comparison across Antigua and Barbuda, Grenada, and Dominica, highlighting benefits, requirements, and CARICOM advantages.", hero: "/images/articles/caribbean-islands.webp" },
  { slug: "dubai-startup-visa-perks-2024", title: "No investment, tax-free: Perks of the Dubai Startup Visa", date: "2024-02-17", category: "Start-Up Visa", summary: "Dubai’s Startup Visa offers global entrepreneurs a tax-free, no-investment pathway with access to mentorship, funding, and residency.", hero: "/images/articles/no-investment-tax-free.webp" },
];

const CATS = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];
const PAGE_SIZE = 8;

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function ContentIndexList({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => POSTS.filter((p) => cat === "All" || p.category === cat),
    [cat]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const selectCat = (c: string) => {
    setCat(c);
    setPage(1);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
        Sample · Index List ③
      </div>

      <Header serifClass={serifClass} />

      {/* SLIM NAVY HERO BAND */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-12 pt-32 text-[#eef3fb] sm:px-10 lg:px-16"
        style={{ background: `radial-gradient(120% 120% at 80% 0%, #13284f 0%, ${NAVY} 62%)` }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            <span className="h-px w-8" style={{ background: GOLD }} />
            Immigration Insights
            <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">مقالات</span>
          </p>
          <h1 className={`${serifClass} mt-4 max-w-3xl text-[clamp(2.3rem,5vw,3.9rem)] font-medium leading-[1.02]`}>
            Articles &amp; insight on investment migration.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
            Expert, long-form perspective on residency, citizenship and investment-migration programmes.
          </p>
          <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/55">
            {POSTS.length} articles
          </p>
        </div>
      </section>

      {/* EDITORIAL INDEX — pearl ground, filter sidebar + list rows */}
      <section
        data-tone="light"
        className="relative isolate px-6 py-16 sm:px-10 lg:px-16"
        style={{ background: "#fbfaf7", color: INK }}
      >
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[14rem_1fr]">
          {/* FILTER SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD_DEEP }}>
              Topics
            </h2>
            <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {CATS.map((c) => {
                const active = c === cat;
                return (
                  <button
                    key={c}
                    onClick={() => selectCat(c)}
                    aria-pressed={active}
                    className="rounded-md px-3 py-2 text-left text-[13px] transition-colors lg:rounded-none lg:border-b lg:border-black/5"
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

          {/* LIST ROWS */}
          <div>
            <ol className="border-t" style={{ borderColor: "rgba(191,161,92,0.4)" }}>
              {rows.map((p, i) => (
                <motion.li
                  key={p.slug}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.2) }}
                  className="border-b"
                  style={{ borderColor: "rgba(191,161,92,0.4)" }}
                >
                  <a
                    href={`/articles/${p.slug}`}
                    className="group flex flex-col gap-5 py-7 sm:flex-row sm:items-start"
                  >
                    {/* REAL cover image thumbnail, fixed aspect, object-cover */}
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md sm:w-52 sm:aspect-[4/3]">
                      <Image
                        src={p.hero}
                        alt={p.title}
                        fill
                        sizes="(min-width:640px) 13rem, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(10,23,51,0.34), transparent 55%)" }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
                        <span style={{ color: GOLD_DEEP }}>{p.category}</span>
                        <span className="h-1 w-1 rounded-full" style={{ background: "rgba(12,31,63,0.3)" }} />
                        <time dateTime={p.date} style={{ color: "rgba(12,31,63,0.5)" }}>
                          {fmtDate(p.date)}
                        </time>
                      </div>
                      <h3 className={`${serifClass} mt-2 text-[1.5rem] font-medium leading-tight transition-colors group-hover:text-[#0a1733]`} style={{ color: INK }}>
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed" style={{ color: "rgba(12,31,63,0.66)" }}>
                        {p.summary}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DEEP }}>
                        Read article
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ol>

            {/* PAGINATION — gold */}
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
              <button
                onClick={() => setPage((n) => Math.max(1, n - 1))}
                disabled={safePage === 1}
                className="rounded-md border px-4 py-2 text-[13px] transition-colors disabled:opacity-40"
                style={{ borderColor: "rgba(191,161,92,0.5)", color: GOLD_DEEP }}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                const active = n === safePage;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    aria-current={active ? "page" : undefined}
                    className="h-9 min-w-9 rounded-md border px-3 text-[13px] transition-colors"
                    style={{
                      borderColor: active ? GOLD : "rgba(191,161,92,0.5)",
                      background: active ? "rgba(191,161,92,0.12)" : "transparent",
                      color: active ? GOLD_DEEP : "rgba(12,31,63,0.6)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((n) => Math.min(totalPages, n + 1))}
                disabled={safePage === totalPages}
                className="rounded-md border px-4 py-2 text-[13px] transition-colors disabled:opacity-40"
                style={{ borderColor: "rgba(191,161,92,0.5)", color: GOLD_DEEP }}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* CLOSING CTA → /contact */}
      <section
        data-tone="dark"
        className="relative isolate px-6 py-20 text-center text-[#eef3fb] sm:px-10 lg:px-16"
        style={{ background: `radial-gradient(120% 120% at 50% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
            Speak with an advisor
          </p>
          <h2 className={`${serifClass} mt-4 text-[clamp(1.9rem,4vw,3rem)] font-medium leading-tight`}>
            Turn insight into a route that fits your family.
          </h2>
          <a
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-md px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            Book a consultation
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
