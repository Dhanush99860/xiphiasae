// components/Corporate/SponsorshipRules.tsx
"use client";

import * as React from "react";

type Threshold = {
  /** e.g., "Skilled worker", "Manager", "Executive" */
  level: string;
  amount?: number;
  currency?: string; // AED, SGD, etc.
  note?: string;
};

type SponsorshipRulesProps = {
  title?: string;
  thresholds?: Threshold[];
  notes?: string[];
  className?: string;
};

export default function SponsorshipRules({
  title = "Sponsorship & salary rules",
  thresholds = [],
  notes = [],
  className,
}: SponsorshipRulesProps) {
  const hasTable = thresholds.length > 0;

  return (
    <section
      className={`rounded-2xl border border-gold/45 bg-white p-5 font-sora ${className || ""}`}
      aria-labelledby="sponsorship-rules-title"
    >
      <header className="mb-4">
        <h2 id="sponsorship-rules-title" className="text-lg font-semibold text-ink">
          {title}
        </h2>
        <p className="text-sm text-ink/55">
          Salary/role guidance used by authorities when issuing employment
          visas/sponsorship.
        </p>
      </header>

      {hasTable && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink/45 border-b border-gold/45">
                <th className="py-2 pr-3 font-semibold">Level</th>
                <th className="py-2 pr-3 font-semibold">Minimum salary</th>
                <th className="py-2 pr-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {thresholds.map((t) => {
                const amount =
                  typeof t.amount === "number"
                    ? `${t.currency ?? ""} ${t.amount.toLocaleString()}`
                    : "Varies";
                return (
                  <tr
                    key={t.level}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-2 pr-3 text-ink">{t.level}</td>
                    <td className="py-2 pr-3 text-gold font-medium">{amount}</td>
                    <td className="py-2 pr-3 text-ink/55">{t.note ?? "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!!notes.length && (
        <ul className="mt-4 list-disc pl-5 space-y-1 text-sm leading-6 text-ink/70 marker:text-gold/60">
          {notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
