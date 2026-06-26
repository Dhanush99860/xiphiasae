import Link from "next/link";
import TestimonialCarousel, { type Testimonial } from "@/components/Citizenship/TestimonialCarousel";
import type { LegacyReply, LegacyTopLevelReview } from "@/lib/reviews/legacyReviews";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Ambient from "@/components/HomeLuxe/Ambient";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import ReviewCard from "./ReviewCard";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

type ReviewThread = {
  review: LegacyTopLevelReview;
  replies: readonly LegacyReply[];
};

type Props = {
  serifClass: string;
  featuredItems: readonly Testimonial[];
  reviewThreads: readonly ReviewThread[];
  currentPage: number;
  totalPages: number;
  totalReviews: number;
};

function getPageHref(page: number) {
  return page > 1 ? `/reviews?page=${page}` : "/reviews";
}

function getPageNumbers(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) pages.push("ellipsis");
  for (let page = windowStart; page <= windowEnd; page++) pages.push(page);
  if (windowEnd < totalPages - 1) pages.push("ellipsis");

  pages.push(totalPages);
  return pages;
}

const verticalLinks = [
  { href: "/residency", label: "Residency" },
  { href: "/citizenship", label: "Citizenship" },
  { href: "/corporate", label: "Corporate" },
  { href: "/skilled", label: "Skilled" },
];

export default function ReviewsPageShell({
  serifClass,
  featuredItems,
  reviewThreads,
  currentPage,
  totalPages,
  totalReviews,
}: Props) {
  const startReview = totalReviews === 0 ? 0 : (currentPage - 1) * 20 + 1;
  const endReview = Math.min(totalReviews, currentPage * 20);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const spotlight = featuredItems[0];
  const restFeatured = featuredItems.slice(1);

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
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              Client reviews
            </span>
            <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>
              آراء العملاء
            </span>
          </div>

          <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.98]`}>
            What our clients <span className="italic" style={{ color: GOLD }}>say</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/60 md:text-base">
            Public client feedback about XIPHIAS Immigration across residency, citizenship, skilled migration, and
            corporate mobility journeys — in their own words.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {verticalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white/75 transition hover:text-white"
                style={{ border: "1px solid rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.03)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* FEATURED spotlight review — called out big */}
          {spotlight && (
            <div
              className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
              style={{ border: `1px solid rgba(191,161,92,0.4)`, background: "rgba(255,255,255,0.03)" }}
            >
              <div className="flex flex-col items-start gap-4">
                <span
                  aria-hidden
                  className={`${serifClass} text-[clamp(4rem,10vw,7rem)] font-medium leading-none`}
                  style={{ color: GOLD }}
                >
                  &ldquo;
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                  Featured review
                </span>
              </div>
              <div>
                <blockquote className={`${serifClass} text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-snug`}>
                  {spotlight.quote}
                </blockquote>
                <p className="mt-5 text-sm uppercase tracking-[0.16em] text-white/55">
                  {spotlight.author}
                  {spotlight.role ? ` · ${spotlight.role}` : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───────── FEATURED CAROUSEL (light band) ───────── */}
      {restFeatured.length > 0 && (
        <section
          data-tone="light"
          className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
          style={{ background: "#fbfaf7", color: INK }}
        >
          <Ambient tone="light" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="flex items-baseline gap-4">
              <span className={`${serifClass} text-3xl font-medium`} style={{ color: GOLD_DEEP }}>
                01
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_DEEP }}>
                Featured
              </span>
            </div>
            <h2
              className={`${serifClass} mt-3 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`}
              style={{ color: INK }}
            >
              Voices from across the <span className="italic" style={{ color: GOLD_DEEP }}>journey</span>.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7" style={{ color: "rgba(12,31,63,0.55)" }}>
              A quick way to explore client feedback across different XIPHIAS Immigration journeys.
            </p>

            <div className="mt-10">
              <TestimonialCarousel
                items={restFeatured.slice()}
                title="Featured client reviews"
                ariaLabel="Featured client reviews"
              />
            </div>
          </div>
        </section>
      )}

      {/* ───────── ALL REVIEWS — EDITORIAL GRID (dark) ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: NAVY, color: "#fff" }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                Public feedback
              </span>
              <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`}>
                {totalReviews} client reviews, and counting.
              </h2>
            </div>

            <p className="text-sm text-white/45">
              Showing {startReview}-{endReview} of {totalReviews} reviews
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {reviewThreads.map(({ review, replies }) => (
              <ReviewCard key={review.postId} review={review} replies={replies} serifClass={serifClass} />
            ))}
          </div>

          {totalPages > 1 ? (
            <nav
              aria-label="Reviews pagination"
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={getPageHref(Math.max(1, currentPage - 1))}
                  aria-disabled={currentPage === 1}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                    currentPage === 1
                      ? "pointer-events-none text-white/25"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                  style={{
                    border: "1px solid rgba(191,161,92,0.3)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>

                {pageNumbers.map((pageNumber, index) =>
                  pageNumber === "ellipsis" ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="inline-flex h-10 min-w-10 items-center justify-center px-2 text-sm text-white/40"
                    >
                      ...
                    </span>
                  ) : (
                    <Link
                      key={pageNumber}
                      href={getPageHref(pageNumber)}
                      aria-current={pageNumber === currentPage ? "page" : undefined}
                      className="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition"
                      style={
                        pageNumber === currentPage
                          ? { border: `1px solid ${GOLD}`, background: "rgba(191,161,92,0.15)", color: GOLD }
                          : {
                              border: "1px solid rgba(191,161,92,0.3)",
                              background: "rgba(255,255,255,0.02)",
                              color: "rgba(255,255,255,0.8)",
                            }
                      }
                    >
                      {pageNumber}
                    </Link>
                  ),
                )}

                <Link
                  href={getPageHref(Math.min(totalPages, currentPage + 1))}
                  aria-disabled={currentPage === totalPages}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                    currentPage === totalPages
                      ? "pointer-events-none text-white/25"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                  style={{
                    border: "1px solid rgba(191,161,92,0.3)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="text-sm text-white/45">
                Page {currentPage} of {totalPages}
              </p>
            </nav>
          ) : null}
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
          <h2
            className={`${serifClass} text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04]`}
            style={{ color: INK }}
          >
            Your story, <span className="italic" style={{ color: GOLD_DEEP }}>next</span>.
          </h2>
          <a
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            Book a private consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </main>
  );
}
