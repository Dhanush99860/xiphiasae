// components/Corporate/AuthorityNotes.tsx
"use client";

import * as React from "react";

type AuthorityNotesProps = {
  authority: string; // e.g., "DMCC", "IFZA", "Mainland (MoHRE/GDRFA)"
  points: string[];
  badgeTone?: "indigo" | "emerald" | "amber" | "slate";
  className?: string;
};

export default function AuthorityNotes({
  authority,
  points,
  badgeTone = "indigo",
  className,
}: AuthorityNotesProps) {
  // Single gold accent across all tones — Midnight Embassy uses one accent.
  void badgeTone;
  const tone = "border border-gold/45 bg-gold/10 text-gold";

  return (
    <section
      className={`rounded-2xl border border-gold/45 bg-white p-5 font-sora ${className || ""}`}
      aria-labelledby="authority-notes-title"
    >
      <header className="mb-4 flex items-center gap-2">
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${tone}`}>
          {authority}
        </span>
        <h2 id="authority-notes-title" className="text-lg font-semibold text-ink">
          Authority-specific notes
        </h2>
      </header>

      <ul className="list-disc pl-5 space-y-2 text-sm leading-6 text-ink/70 marker:text-gold/60">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
