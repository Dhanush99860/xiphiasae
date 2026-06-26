// src/components/Skilled/JobOfferBadge.tsx
import React from "react";
import { Briefcase, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

type Props = {
  required?: boolean;  // true, false, or unknown
  note?: string;       // optional clarifying note
  className?: string;
};

export default function JobOfferBadge({ required, note, className = "" }: Props) {
  const variant = required === true ? "required" : required === false ? "not_required" : "unclear";

  const styles: Record<
    typeof variant,
    {
      chip: string;
      icon: React.ReactNode;
      chipText: string;
      hint: string;
    }
  > = {
    required: {
      chip:
        "bg-sand/50 text-gold ring-gold/40",
      icon: <Briefcase className="h-4 w-4 text-gold" aria-hidden />,
      chipText: "Job offer required",
      hint: "An employer job offer is needed to apply.",
    },
    not_required: {
      chip:
        "bg-sand/50 text-gold ring-gold/40",
      icon: <CheckCircle2 className="h-4 w-4 text-gold" aria-hidden />,
      chipText: "No job offer required",
      hint: "You can apply without an employer sponsor.",
    },
    unclear: {
      chip:
        "bg-sand/50 text-ink/70 ring-gold/15",
      icon: <HelpCircle className="h-4 w-4 text-ink/70" aria-hidden />,
      chipText: "Job offer may be required",
      hint: "Requirement can vary by stream or profile.",
    },
  };

  const s = styles[variant];

  return (
    <div
      className={[
        "rounded-2xl border border-gold/45 px-4 py-3 sm:px-5 sm:py-4 bg-white",
        className,
      ].join(" ")}
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{s.icon}</div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold font-sora text-ink">Job offer</h3>
            <span
              className={[
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ring-1",
                s.chip,
              ].join(" ")}
              title={s.chipText}
              aria-label={s.chipText}
            >
              {s.chipText}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] mt-1.5 text-ink/55">
            {note?.trim() ? note : s.hint}
          </p>
        </div>
      </div>
    </div>
  );
}
