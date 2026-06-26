// components/Residency/QuickFacts.tsx
// Signature unchanged: { minInvestment, currency, timelineMonths, tags }
//
// Professional, immigration-site appropriate “at-a-glance” block.
// • Clear hierarchy with tabular figures
// • Dark/light theme polished
// • Mobile-first, responsive grid
// • Zero JS (SSR friendly)
// • Accessible semantics (dl/dt/dd), ARIA labels
// • Basic Schema.org microdata for Offer (price) & Duration
//
// Usage: <QuickFacts minInvestment={...} currency="USD" timelineMonths={6} tags={["Fast", "Family eligible"]} />

import * as React from "react";
import { Banknote, Clock, Sparkles } from "lucide-react";
import {
  formatTimelineLong,
  hasTimelineValue,
  timelineISODuration,
} from "@/lib/timeline";

export default function QuickFacts({
  minInvestment,
  currency,
  timelineMonths,
  timelineLabel,
  tags,
}: {
  minInvestment?: number;
  currency?: string;
  timelineMonths?: number;
  timelineLabel?: string;
  tags?: string[];
}) {
  const hasMin =
    typeof minInvestment === "number" && !Number.isNaN(minInvestment);
  const hasTimeline = hasTimelineValue(timelineMonths, timelineLabel);

  const minDisplay = hasMin
    ? formatMoney(minInvestment!, currency)
    : "No minimum";
  const timelineDisplay = formatTimelineLong(
    timelineMonths,
    timelineLabel,
    "Varies",
  );

  const allTags = Array.isArray(tags) ? tags.filter(Boolean) : [];
  const MAX_TAGS = 6;
  const shownTags = allTags.slice(0, MAX_TAGS);
  const extraCount = Math.max(0, allTags.length - shownTags.length);

  // Screen reader summary (compact)
  const a11ySummary = [
    hasMin ? `Minimum investment ${minDisplay}` : "No minimum investment",
    hasTimeline ? `Typical timeline ${timelineDisplay}` : "Timeline varies",
    shownTags.length
      ? `${shownTags.length} highlights`
      : "No highlights listed",
  ].join("; ");

  return (
    <section
      aria-labelledby="quickfacts-title"
      aria-describedby="quickfacts-desc"
      className="scroll-mt-28"
    >
      {/* Eyebrow + Title */}
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          At a glance
        </span>
        <h2 id="quickfacts-title" className="font-sora text-sm font-semibold text-ink/55">
          Quick facts
        </h2>
      </div>

      {/* Container card */}
      <div
        className="
          relative overflow-hidden
          rounded-2xl p-4 sm:p-6
          bg-white
          border border-gold/45
        "
        role="group"
        aria-label="Program quick facts"
      >
        {/* Subtle official-style watermark glow (pure CSS; no images) */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/[0.06] blur-2xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-gold/[0.04] blur-2xl"
        />

        <p id="quickfacts-desc" className="sr-only">
          {a11ySummary}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Minimum investment (microdata Offer/price) */}
          <dl
            className="grid gap-2"
            itemScope
            itemType="https://schema.org/Offer"
            aria-label="Minimum investment"
          >
            <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink/40">
              <IconBadge>
                <Banknote className="h-4 w-4" aria-hidden />
              </IconBadge>
              Minimum investment
            </dt>

            <dd className="font-sora text-3xl sm:text-4xl font-semibold tabular-nums leading-none text-gold">
              <span itemProp="price">{minDisplay}</span>
              {/* Currency microdata only when we have a valid ISO code */}
              {hasMin && isISO4217(currency) ? (
                <meta itemProp="priceCurrency" content={currency} />
              ) : null}
            </dd>

            {currency ? (
              <dd className="text-xs text-ink/45">
                Currency:{" "}
                <abbr title={currencyFullName(currency)}>{currency}</abbr>
              </dd>
            ) : null}
          </dl>

          {/* Typical timeline (Duration) */}
          <dl
            className="
              grid gap-2
              md:border-l md:border-gold/45 md:pl-6
            "
            aria-label="Typical timeline"
          >
            <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink/40">
              <IconBadge>
                <Clock className="h-4 w-4" aria-hidden />
              </IconBadge>
              Typical timeline
            </dt>

            <dd className="font-sora text-3xl sm:text-4xl font-semibold tabular-nums leading-none text-ink">
              <time
                itemProp="duration"
                // ISO 8601 duration (months → PnM), only when we know months
                dateTime={timelineISODuration(timelineMonths, timelineLabel)}
              >
                {timelineDisplay}
              </time>
            </dd>

            <dd className="text-xs text-ink/45">From application start</dd>
          </dl>

          {/* Highlights (tags) */}
          <div
            className="
              grid gap-2
              md:border-l md:border-gold/45 md:pl-6
            "
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink/40">
              <IconBadge>
                <Sparkles className="h-4 w-4" aria-hidden />
              </IconBadge>
              Highlights
            </div>

            <ul
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Program highlights"
            >
              {shownTags.length > 0 ? (
                <>
                  {shownTags.map((t) => (
                    <li key={t}>
                      <span
                        className="
                          inline-flex items-center gap-1.5 rounded-full
                          bg-sand/50 px-3 py-1 text-xs text-ink/70
                          border border-gold/45
                          transition-colors
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                        {t}
                      </span>
                    </li>
                  ))}
                  {extraCount > 0 ? (
                    <li>
                      <span
                        aria-label={`${extraCount} more highlights`}
                        className="
                          inline-flex items-center rounded-full
                          bg-sand/50 px-3 py-1 text-xs text-ink/55
                          border border-gold/45
                        "
                      >
                        +{extraCount} more
                      </span>
                    </li>
                  ) : null}
                </>
              ) : (
                <li className="text-xs text-ink/45">
                  Add highlights in front-matter
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Helpers ---------------- */

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        inline-flex h-6 w-6 items-center justify-center rounded-md
        bg-sand/50 text-gold border border-gold/45
      "
      aria-hidden
    >
      {children}
    </span>
  );
}

function formatMoney(amount: number, currency?: string) {
  if (Number.isNaN(amount)) return "—";
  if (!currency) return compactNumber(amount);

  if (isISO4217(currency)) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      // fall through to generic
    }
  }
  return `${compactNumber(amount)} ${currency}`;
}

function compactNumber(n: number) {
  try {
    return new Intl.NumberFormat(undefined, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  } catch {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
  }
}

function isISO4217(c?: string): c is string {
  return !!c && /^[A-Z]{3}$/.test(c);
}

function currencyFullName(code?: string) {
  // Light hint for screen readers/tooltip; keep generic if unknown
  if (!code) return "";
  const map: Record<string, string> = {
    USD: "US Dollars",
    EUR: "Euro",
    GBP: "British Pounds",
    CAD: "Canadian Dollars",
    AUD: "Australian Dollars",
    AED: "United Arab Emirates Dirham",
    SGD: "Singapore Dollars",
  };
  return map[code] || code;
}
