import React from "react";

type Props = {
  taxNotes?: string[];
  residencyRequirement?: string;
  interviewRequired?: boolean;
  className?: string;
};

export default function TaxResidencyPanel({
  taxNotes = [],
  residencyRequirement,
  interviewRequired,
  className = "",
}: Props) {
  if (
    !taxNotes.length &&
    !residencyRequirement &&
    interviewRequired === undefined
  )
    return null;

  return (
    <section
      className={`rounded-2xl border border-gold/45 p-5 bg-white ${className}`}
    >
      <h3 className="font-sora text-base font-semibold text-ink">
        Tax &amp; Residency
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-ink/70">
        {taxNotes.map((t) => (
          <li key={t} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            <span>{t}</span>
          </li>
        ))}
        {residencyRequirement ? (
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            <span>Residency/visit: {residencyRequirement}</span>
          </li>
        ) : null}
        {typeof interviewRequired === "boolean" ? (
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            <span>Interview required: {interviewRequired ? "Yes" : "No"}</span>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
