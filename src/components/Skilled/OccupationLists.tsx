// src/components/Skilled/OccupationLists.tsx
"use client";

import React from "react";
import { Briefcase, Search, ChevronDown, Hash } from "lucide-react";
import type { ProgramMeta } from "@/lib/skilled-content";

type Props = {
  lists?: ProgramMeta["occupationLists"];
  codes?: ProgramMeta["occupationCodes"];
  className?: string;
};

export default function OccupationLists({ lists, codes, className = "" }: Props) {
  const [query, setQuery] = React.useState("");

  const normLists = React.useMemo(
    () =>
      (lists ?? []).map((l) => ({
        listName: l.listName?.trim() || "Occupation list",
        occupations: (l.occupations ?? []).map((o) => String(o).trim()).filter(Boolean),
      })),
    [lists],
  );

  const filtered = React.useMemo(() => {
    if (!query.trim()) return normLists;
    const q = query.toLowerCase();
    return normLists
      .map((l) => ({
        ...l,
        occupations: l.occupations.filter((o) => o.toLowerCase().includes(q)),
      }))
      .filter((l) => l.occupations.length > 0);
  }, [normLists, query]);

  const totalCount = normLists.reduce((acc, l) => acc + l.occupations.length, 0);
  const shownCount = filtered.reduce((acc, l) => acc + l.occupations.length, 0);

  // Simple highlighter for search matches
  const highlight = (text: string, needle: string) => {
    if (!needle.trim()) return text;
    const q = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${q})`, "ig"));
    return parts.map((part, i) =>
      part.toLowerCase() === needle.toLowerCase() ? (
        <mark key={i} className="rounded px-0.5 bg-gold/20 text-gold">
          {part}
        </mark>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    );
  };

  if (!normLists.length && !(codes?.length)) return null;

  return (
    <section
      aria-label="Eligible occupations"
      className={[
        "rounded-2xl border border-gold/45 overflow-hidden bg-white",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-gold/45 bg-sand/40">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gold" aria-hidden />
          <h3 className="text-sm font-semibold font-sora text-ink">
            Eligible occupations
            {totalCount ? (
              <span className="ml-2 text-xs font-normal text-ink/45">({shownCount}/{totalCount})</span>
            ) : null}
          </h3>
        </div>

        {/* Search */}
        {normLists.length > 8 ? (
          <label className="relative w-full sm:w-64">
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search occupations…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-gold/45 bg-white text-ink placeholder:text-ink/40 outline-none focus:border-gold"
            />
          </label>
        ) : null}
      </div>

      {/* Codes (optional) */}
      {codes?.length ? (
        <div className="px-4 sm:px-5 py-3 border-b border-gold/45">
          <div className="text-[10px] uppercase tracking-[0.14em] text-ink/40 mb-1">Codes</div>
          <div className="flex flex-wrap gap-1.5">
            {codes.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-md bg-sand/50 text-ink/70 ring-1 ring-gold/10 px-2 py-1 text-xs font-medium"
                title={c}
              >
                <Hash className="h-3.5 w-3.5 text-gold/70" aria-hidden />
                <code className="font-mono">{c}</code>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Lists */}
      <div className="px-2 sm:px-3 py-3">
        {!filtered.length ? (
          <p className="px-2 py-3 text-sm text-ink/45">No occupations matched your search.</p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((l, idx) => (
              <li key={`${l.listName}-${idx}`}>
                <details
                  className="group rounded-xl border border-gold/45 bg-sand/40 open:border-gold/45"
                  {...(filtered.length <= 2 && idx === 0 ? { open: true } : {})}
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-2 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-gold/40 text-gold text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-ink">{l.listName}</span>
                      <span className="ml-1 text-xs text-ink/45">({l.occupations.length})</span>
                    </div>
                    <ChevronDown
                      className="h-4 w-4 transition-transform group-open:rotate-180 text-gold"
                      aria-hidden
                    />
                  </summary>

                  {/* Occupations as chips */}
                  <div className="px-3 pb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {l.occupations.map((o) => (
                        <span
                          key={o}
                          className="inline-flex items-center rounded-md bg-sand/50 text-ink/70 ring-1 ring-gold/10 px-2 py-1 text-xs"
                          title={o}
                        >
                          {highlight(o, query)}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
