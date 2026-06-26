import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Optional Arabic word rendered in the calligraphic display face, RTL. */
  arabic?: string;
  /** `onDark` mutes the Latin label for use over the midnight ground. */
  tone?: "gold" | "onDark";
  className?: string;
};

/**
 * Section kicker — a gold rule, an uppercase Latin label, and an optional
 * Arabic calligraphic word. The signature UAE-refresh eyebrow (mirrors the
 * hero kicker) so every section opens with the same grammar.
 */
export default function Eyebrow({ children, arabic, tone = "gold", className }: Props) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.28em]",
          tone === "gold" ? "text-gold_deep" : "text-ink/55"
        )}
      >
        {children}
      </span>
      {arabic ? (
        <span lang="ar" dir="rtl" className="font-arabic-display text-base leading-none text-gold_deep">
          {arabic}
        </span>
      ) : null}
    </span>
  );
}
