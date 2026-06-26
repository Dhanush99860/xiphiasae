// components/Corporate/PostSetupChecklist.tsx
"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

type PostSetupChecklistProps = {
  title?: string;
  items: string[];
  className?: string;
};

export default function PostSetupChecklist({
  title = "Post-setup checklist",
  items,
  className,
}: PostSetupChecklistProps) {
  return (
    <section
      className={`rounded-2xl border border-gold/45 bg-white p-5 font-sora ${className || ""}`}
      aria-labelledby="post-setup-title"
    >
      <header className="mb-4">
        <h2 id="post-setup-title" className="text-lg font-semibold text-ink">
          {title}
        </h2>
        <p className="text-sm text-ink/55">
          Typical actions after license & visas are issued.
        </p>
      </header>

      <ol className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 rounded-xl border border-gold/45 bg-sand/50 p-3"
          >
            <div className="mt-0.5">
              <CheckCircle2 className="h-5 w-5 text-gold" aria-hidden="true" />
            </div>
            <div className="text-sm leading-6 text-ink/70">{item}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
