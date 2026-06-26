"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

/* ---------------- Types ---------------- */
type Ans = "yes" | "no" | "";
type Question = { id: string; label: string; desc?: string };
type Policy =
  | { type: "all" }
  | { type: "any" }
  | { type: "threshold"; minYes: number };
type VerdictText = {
  successTitle: string;
  successText: string;
  cautionTitle: string;
  cautionText: string;
};
type QuickCheckCTAs = {
  primaryHref?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
};
type QuickCheckConfig = {
  questions: Question[];
  policy?: Policy;
  verdict?: VerdictText;
  ctas?: QuickCheckCTAs;
};

/* ---------------- Defaults ---------------- */
const DEFAULT_POLICY: Policy = { type: "all" };
const DEFAULT_VERDICT: VerdictText = {
  successTitle: "Looks eligible",
  successText:
    "You seem to meet the key criteria — talk to an advisor to confirm.",
  cautionTitle: "May be eligible",
  cautionText: "Some answers need review. There may be alternative routes.",
};
const DEFAULT_CTAS: Required<QuickCheckCTAs> = {
  primaryHref: "/eligibility",
  primaryText: "Check Eligibility",
  secondaryHref: "/contact",
  secondaryText: "Get free Consultation",
};

/* ---------------- Component ---------------- */
export default function EligibilityQuickCheck({
  config,
}: {
  config?: QuickCheckConfig | null;
}) {
  const reduceMotion = useReducedMotion();

  const questions = Array.isArray(config?.questions) ? config!.questions : [];
  if (!questions.length) return null;

  const policy = config?.policy ?? DEFAULT_POLICY;
  const verdictText = config?.verdict ?? DEFAULT_VERDICT;
  const ctas = { ...DEFAULT_CTAS, ...(config?.ctas || {}) };

  /* Persist answers per unique question set */
  const storageKey = useMemo(
    () => `eligibility-quickcheck:${questions.map((q) => q.id).join("|")}`,
    [questions],
  );

  const [answers, setAnswers] = useState<Record<string, Ans>>(
    Object.fromEntries(questions.map((q) => [q.id, ""])) as Record<string, Ans>,
  );
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, Ans>;
        const filtered = Object.fromEntries(
          questions.map((q) => [q.id, parsed[q.id] ?? ""]),
        ) as Record<string, Ans>;
        setAnswers(filtered);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {}
  }, [answers, storageKey]);

  const answered = Object.values(answers).filter((v) => v !== "").length;
  const yesCount = Object.values(answers).filter((v) => v === "yes").length;
  const noCount = Object.values(answers).filter((v) => v === "no").length;
  const progress = Math.round((answered / questions.length) * 100);
  const ready = answered === questions.length;

  /* Focus management (no jumping): only scroll if the next item is out of view */
  const qRefs = useRef<Record<string, HTMLFieldSetElement | null>>({});
  const setFieldsetRef =
    (id: string) =>
    (el: HTMLFieldSetElement | null): void => {
      qRefs.current[id] = el;
    };
  const isPartiallyInView = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top >= 0 && r.bottom <= vh
      ? true
      : r.top < vh - 80 && r.bottom > 80;
  };

  function setAns(id: string, value: "yes" | "no") {
    setAnswers((s) => ({ ...s, [id]: value }));
    if (!autoAdvance) return;

    const idx = questions.findIndex((q) => q.id === id);
    const next =
      questions
        .slice(idx + 1)
        .find((q) => !answers[q.id] || answers[q.id] === "") ||
      questions.find((q) => !answers[q.id] || answers[q.id] === "");
    if (next && next.id !== id) {
      const el = qRefs.current[next.id];
      if (el) {
        if (!reduceMotion && !isPartiallyInView(el)) {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        // focus the first radio of the next question (no layout shift)
        setTimeout(
          () =>
            el.querySelector<HTMLInputElement>('input[type="radio"]')?.focus(),
          32,
        );
      }
    }
  }

  function reset() {
    const fresh = Object.fromEntries(
      questions.map((q) => [q.id, ""]),
    ) as Record<string, Ans>;
    setAnswers(fresh);
    try {
      sessionStorage.removeItem(storageKey);
    } catch {}
  }

  const ok = useMemo(() => {
    if (!ready) return null;
    switch (policy.type) {
      case "all":
        return yesCount === questions.length;
      case "any":
        return yesCount >= 1;
      case "threshold":
        return yesCount >= policy.minYes;
      default:
        return false;
    }
  }, [ready, yesCount, questions.length, policy]);

  /* JSON-LD (SEO) */
  const jsonLd = useMemo(
    () => toItemListLd("Quick eligibility questions", questions),
    [questions],
  );

  /* ---------------- Subcomponent: Radio pill ---------------- */
  function PillRadio({
    name,
    value,
    checked,
    onChange,
    label,
  }: {
    name: string;
    value: "yes" | "no";
    checked: boolean;
    onChange: (v: "yes" | "no") => void;
    label: string;
  }) {
    const inputId = useId();
    const onKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        onChange(value === "yes" ? "no" : "yes");
      }
    };
    const palette =
      value === "yes"
        ? checked
          ? "bg-gold text-midnight hover:bg-gold_bright"
          : "bg-sand/50 text-ink/70 border border-gold/45 hover:border-gold/65"
        : checked
          ? "bg-pearl/15 text-ink border border-gold/40"
          : "bg-sand/50 text-ink/55 border border-gold/45 hover:border-gold/45";

    return (
      <div className="relative">
        <input
          id={`${inputId}-${name}-${value}`}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        <label
          htmlFor={`${inputId}-${name}-${value}`}
          onKeyDown={onKeyDown}
          tabIndex={0}
          className={[
            // fixed size + padding to prevent any jitter
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
            "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
            palette,
          ].join(" ")}
          aria-label={`${label}: ${value === "yes" ? "Yes" : "No"}`}
        >
          {value === "yes" ? (
            <CheckCircle className="h-4 w-4" aria-hidden />
          ) : (
            <AlertTriangle className="h-4 w-4" aria-hidden />
          )}
          {value === "yes" ? "Yes" : "No"}
        </label>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="eligibility-heading"
      role="region"
      className="
        relative overflow-hidden
        rounded-2xl p-5 sm:p-6
        bg-white
        border border-gold/45
        text-ink
      "
    >
      <BackgroundGraphics />

      {/* Header */}
      <header className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            ~10 sec
          </span>
          <h3 id="eligibility-heading" className="font-sora text-lg font-semibold pt-2 text-ink">
            Quick eligibility check
          </h3>
          <p className="text-sm text-ink/55 mt-1">
            Answer {questions.length} short question
            {questions.length > 1 ? "s" : ""}. No data is sent to our servers.
          </p>
        </div>

        {/* User controls (no layout-jump) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] border border-gold/45 text-ink/70 hover:border-gold/65"
            aria-label="Reset answers"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="relative z-10 mt-4" aria-live="polite">
        <div
          className="w-full h-2 rounded-full overflow-hidden bg-sand/60 border border-gold/45"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Eligibility questions progress"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 140, damping: 18 }
            }
            className="h-2 rounded-full bg-gradient-to-r from-gold_deep via-gold to-gold_bright"
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[13px]">
          <span className="font-medium text-ink">
            {answered}/{questions.length} answered
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-sand/50 text-gold border border-gold/45 px-2 py-0.5">
              <CheckCircle className="h-3.5 w-3.5" /> {yesCount} yes
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-sand/50 text-ink/55 border border-gold/45 px-2 py-0.5">
              <AlertTriangle className="h-3.5 w-3.5" /> {noCount} no
            </span>
            <span className="text-ink/45">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="relative z-10 mt-4 space-y-3">
        {questions.map((q, idx) => {
          const val = answers[q.id];
          return (
            <fieldset
              key={q.id}
              ref={setFieldsetRef(q.id)}
              className="
                p-3 sm:p-4 rounded-xl
                bg-sand/40
                border border-gold/45
                focus-within:border-gold/50
              "
            >
              <legend className="text-sm font-semibold text-ink">
                <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-midnight text-[11px] align-middle">
                  {idx + 1}
                </span>
                <span className="sr-only">
                  Question {idx + 1} of {questions.length} —{" "}
                </span>
                {q.label}
              </legend>
              {q.desc ? (
                <p id={`${q.id}-desc`} className="mt-1 text-xs text-ink/55">
                  {q.desc}
                </p>
              ) : null}

              <div
                className="mt-2 flex flex-wrap items-center gap-2"
                role="radiogroup"
                aria-label={q.label}
                aria-describedby={q.desc ? `${q.id}-desc` : undefined}
              >
                <PillRadio
                  name={q.id}
                  value="yes"
                  checked={val === "yes"}
                  onChange={(v) => setAns(q.id, v)}
                  label={q.label}
                />
                <PillRadio
                  name={q.id}
                  value="no"
                  checked={val === "no"}
                  onChange={(v) => setAns(q.id, v)}
                  label={q.label}
                />
              </div>
            </fieldset>
          );
        })}
      </div>

      {/* Result / CTA */}
      <div
        id="eligibility-result"
        className="relative z-10 mt-5"
        aria-live="polite"
      >
        {ready ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
            className={[
              "rounded-xl p-4 border",
              ok
                ? "bg-sand/50 border-gold/40"
                : "bg-sand/50 border-gold/45",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5" aria-hidden>
                {ok ? (
                  <CheckCircle className="w-6 h-6 text-gold" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-ink/55" />
                )}
              </div>
              <div>
                <div className="font-sora font-semibold text-ink">
                  {ok ? verdictText.successTitle : verdictText.cautionTitle}
                </div>
                <div className="text-sm text-ink/55 mt-1">
                  {ok ? verdictText.successText : verdictText.cautionText}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-2">
              <Link
                href={ctas.primaryHref!}
                className="inline-flex justify-center rounded-lg bg-gold px-4 py-2 text-midnight font-medium hover:bg-gold_bright focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={ctas.primaryText}
              >
                {ctas.primaryText}
              </Link>

              {ctas.secondaryHref && ctas.secondaryText ? (
                <Link
                  href={ctas.secondaryHref}
                  className="inline-flex justify-center rounded-lg border border-gold/45 px-4 py-2 text-sm text-ink hover:border-gold/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={ctas.secondaryText}
                >
                  {ctas.secondaryText}
                </Link>
              ) : null}
            </div>

            <p className="mt-2 text-[12px] text-ink/45">
              This is an indicative check only. Final eligibility depends on
              your full profile and current regulations.
            </p>
          </motion.div>
        ) : (
          <p className="mt-2 text-sm text-ink/55">
            Select answers above to get an instant indication and tailored next
            steps.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-ink/45">
          We respect your privacy — answers stay in your browser.
        </p>
        <Link
          href="/contact"
          className="text-sm text-gold underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          aria-label="Contact us"
        >
          Contact us
        </Link>
      </footer>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

/* ---------------- Background (subtle, white-first, light grid) ---------------- */
function BackgroundGraphics() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 print:hidden"
    >
      {/* gold glows */}
      <div className="absolute -top-24 -left-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
      {/* faint grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
        <defs>
          <pattern
            id="qc-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0v24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#qc-grid)"
          className="text-gold/60"
        />
      </svg>
      {/* top gloss for mobile legibility */}
      <div className="absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-pearl/[0.04] to-transparent" />
    </div>
  );
}

/* ---------------- SEO helper: ItemList of questions ---------------- */
function toItemListLd(name: string, questions: Question[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: questions.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: questions.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Question", name: q.label, text: q.desc || undefined },
    })),
  } as const;
}
