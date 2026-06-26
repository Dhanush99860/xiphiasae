import React from "react";

/**
 * DocumentChecklistNeo — professional, readable blue theme
 * - Server-component friendly (no hooks / client libs)
 * - White cards on a very light grid; blue only for emphasis
 * - Mobile-first; keyboard-focus rings; print-friendly
 * - SEO: ItemList JSON-LD
 */

export type ChecklistGroup = { group: string; documents: string[]; notes?: string };

type Props = {
  groups: ChecklistGroup[];
  note?: string;
  className?: string;
  title?: string; // overrides default heading
  renderJsonLd?: boolean; // default true
};

export default function DocumentChecklistNeo({
  groups,
  note,
  className = "",
  title = "Document checklist",
  renderJsonLd = true,
}: Props) {
  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 64);

  // ensure unique ids even if labels repeat
  const groupIds = groups.map((g, i) => `${slug(g.group)}-${i + 1}`);
  const sectionId = slug(title) || "document-checklist";

  const total = groups.reduce((a, g) => a + g.documents.length, 0);

  return (
    <section
      id={sectionId}
      aria-label={title}
      className={[
        "relative overflow-hidden",
        "rounded-2xl p-5 md:p-6 lg:p-8",
        "bg-white border border-gold/45",
        "print:shadow-none",
        className,
      ].join(" ")}
    >
      {/* --- Background: gold grid + glows --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* gold soft glows */}
        <div className="absolute -top-24 -left-20 h-56 w-56 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
        {/* faint grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="doc-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M24 0H0v24"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doc-grid)" />
        </svg>
      </div>

      {/* --- Header --- */}
      <header className="relative mb-5 md:mb-6">
        <div className="flex items-center gap-2 text-[12px] text-gold">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-medium uppercase tracking-[0.2em]">Checklist</span>
        </div>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sand/50 text-gold border border-gold/45">
              {/* file icon */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </span>
            <h2
              id={sectionId + "-title"}
              className="font-sora text-xl md:text-2xl font-semibold tracking-tight text-ink"
            >
              {title}
            </h2>
          </div>

          <p
            className="text-xs sm:text-[13px] font-medium px-2 py-1 rounded-lg border border-gold/45 bg-sand/50 text-gold self-start"
            aria-label="Total items in the checklist"
          >
            {total} total item{total === 1 ? "" : "s"}
          </p>
        </div>

        {note ? (
          <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-ink/55 max-w-3xl">
            {note}
          </p>
        ) : null}
      </header>

      {/* --- Quick navigator (group chips) --- */}
      {groups.length > 1 ? (
        <nav aria-label="Checklist contents" className="relative mb-5 md:mb-6">
          <ul className="flex flex-wrap gap-2" role="list">
            {groups.map((g, i) => (
              <li key={groupIds[i]}>
                <a
                  href={`#${groupIds[i]}`}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px]
                             border border-gold/45 bg-sand/50 text-ink/70 hover:border-gold/65 hover:text-ink
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70
                             transition motion-reduce:transition-none"
                >
                  {/* hash icon */}
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 9h14M5 15h14M11 4 7 20M17 4l-4 16" />
                  </svg>
                  <span className="truncate max-w-[14ch] md:max-w-[22ch]">
                    {g.group}
                  </span>
                  <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded-md border border-gold/45 bg-sand/50 text-gold">
                    {g.documents.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {/* --- Groups --- */}
      <div className="relative space-y-3">
        {groups.map((g, idx) => (
          <details
            key={groupIds[idx]}
            id={groupIds[idx]}
            open={idx === 0}
            className="group overflow-hidden rounded-xl bg-sand/50
                       border border-gold/45 open:border-gold/45
                       focus-within:border-gold/60"
          >
            <summary
              className="list-none cursor-pointer select-none"
              // native summary receives focus; ensure visible ring
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70">
                <div className="flex items-center gap-2.5">
                  {/* chevron */}
                  <span
                    aria-hidden
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-sand/50 text-gold border border-gold/40"
                  >
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                  <span className="font-medium text-[15px] md:text-base leading-tight text-ink">
                    {g.group}
                  </span>
                </div>
                <span className="text-[11px] md:text-xs px-2 py-1 rounded-lg border border-gold/45 bg-sand/50 text-gold">
                  {g.documents.length} item{g.documents.length === 1 ? "" : "s"}
                </span>
              </div>
            </summary>

            {/* items */}
            <div className="px-4 sm:px-5 pb-4">
              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2"
                role="list"
              >
                {g.documents.map((d, di) => (
                  <li key={`${d}-${di}`} className="flex items-start gap-2">
                    {/* check bullet */}
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sand/50 text-gold border border-gold/40"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M4.5 10.5l3 3 7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm md:text-[15px] leading-relaxed text-ink/70">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
              {g.notes ? (
                <p className="mt-3 text-sm leading-relaxed text-ink/55">
                  {g.notes}
                </p>
              ) : null}
            </div>
          </details>
        ))}
      </div>

      {/* --- JSON-LD (SEO) --- */}
      {renderJsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(toItemListJsonLd(title, note, groups)),
          }}
        />
      ) : null}
    </section>
  );
}

/* ---------------- JSON-LD builder ---------------- */
function toItemListJsonLd(
  title: string,
  note: string | undefined,
  groups: ChecklistGroup[],
) {
  const items = groups.flatMap((g, gi) =>
    g.documents.map((d, di) => ({
      "@type": "ListItem",
      position: gi * 1000 + di + 1,
      item: {
        "@type": "CreativeWork",
        name: d,
        about: `Group: ${g.group}`,
        description: note || undefined,
      },
    })),
  );
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListOrder: "Ascending",
    numberOfItems: items.length,
    itemListElement: items,
  } as const;
}
