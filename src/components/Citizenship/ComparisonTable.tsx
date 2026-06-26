// src/components/Common/ComparisonTable.tsx
import * as React from "react";

/** A single column (besides the left "Dimension" column). */
type Column = {
  key: string;
  label: string;
  accent?: "blue" | "emerald" | "amber" | "purple";
};

/** A single row of comparison. Provide a `label` and values keyed by Column.key */
type Row = { label: string } & Record<string, React.ReactNode>;

type Props = {
  caption: string;
  columns: Column[]; // e.g. [{ key: "realEstate", label: "Approved Real Estate" }, ...]
  rows: Row[]; // e.g. [{ label: "Core requirement", realEstate: "...", entrepreneur: "..." }, ...]
  className?: string;
  footnote?: string; // optional small note under the table
};

export default function ComparisonTable({
  caption,
  columns,
  rows,
  className = "",
  footnote,
}: Props) {
  if (!columns?.length || !rows?.length) return null;

  // Build JSON-LD ItemList (dimensions)
  const jsonLd = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: caption,
      itemListElement: rows.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Thing", name: String(r.label) },
      })),
    }),
    [caption, rows],
  );

  // One gold accent for every column under Midnight Embassy.
  const accentRing = (_a?: Column["accent"]) => "ring-gold/30";

  const accentText = (_a?: Column["accent"]) => "text-gold";

  return (
    <section
      className={[
        "relative",
        "rounded-2xl bg-white border border-gold/45",
        "p-4 sm:p-5",
        className,
      ].join(" ")}
      aria-label={caption}
    >
      {/* subtle background grid + glows */}
      <Decor />

      {/* Header chip + caption */}
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center rounded-md border border-gold/45 bg-sand/50 px-2 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          Comparison
        </span>
        <h3 className="font-sora text-base font-semibold text-ink">
          {caption}
        </h3>
      </div>

      {/* Desktop/Large: table */}
      <div className="relative hidden sm:block">
        {/* edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-ink to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-ink to-transparent"
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <caption className="sr-only">{caption}</caption>
            <colgroup>
              <col className="w-[28%]" />
              {columns.map((_, i) => (
                <col key={i} />
              ))}
            </colgroup>

            <thead>
              <tr className="text-[12px] uppercase tracking-[0.14em] text-ink/45">
                <th className="sticky left-0 z-10 bg-white px-3 py-2.5 text-left font-semibold">
                  Dimension
                </th>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={`px-3 py-2.5 text-left font-semibold ${accentText(c.accent)}`}
                  >
                    <span
                      className={`inline-flex items-center gap-2 rounded-md bg-sand/50 border ${accentRing(c.accent)} px-2 py-1`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {c.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gold/5">
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  className="bg-white hover:bg-white/[0.03]"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-inherit px-3 py-3 text-left font-medium text-ink"
                  >
                    {r.label}
                  </th>
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className="px-3 py-3 align-top text-ink/70"
                    >
                      {r[c.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {footnote ? (
          <p className="mt-3 text-[12px] text-ink/45">
            {footnote}
          </p>
        ) : null}
      </div>

      {/* Mobile: cards */}
      <div
        className="sm:hidden space-y-3"
        role="list"
        aria-label={`${caption} (mobile view)`}
      >
        {rows.map((r, idx) => (
          <article
            role="listitem"
            key={idx}
            className="rounded-xl border border-gold/45 bg-sand/50 p-3"
          >
            <div className="mb-2 text-[13px] font-semibold text-ink">
              {r.label}
            </div>
            <dl className="grid grid-cols-1 gap-2">
              {columns.map((c) => (
                <div
                  key={c.key}
                  className="rounded-lg border p-2 bg-sand/50 text-sm border-gold/45"
                >
                  <dt
                    className={`text-[11px] uppercase tracking-[0.14em] ${accentText(c.accent)}`}
                  >
                    {c.label}
                  </dt>
                  <dd className="mt-0.5 text-ink/70">
                    {r[c.key] ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
        {footnote ? (
          <p className="text-[12px] text-ink/45">
            {footnote}
          </p>
        ) : null}
      </div>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

/* --- subtle, premium background --- */
function Decor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-16 h-48 w-48 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-gold/5 blur-3xl" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
        <defs>
          <pattern
            id="comp-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0V24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#comp-grid)"
          className="text-gold"
        />
      </svg>
    </div>
  );
}
