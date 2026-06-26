// src/components/Shared/CostCalculator.tsx
"use client";

import React from "react";

/**
 * CostCalculator — professional, readable blue theme
 * -------------------------------------------------
 * UX
 *  • Clear 3-part flow: Base option → Family size → Add-ons → Summary.
 *  • White cards with neutral text; blue only for emphasis (AA contrast).
 *  • Accessible steppers, radios and checkboxes; keyboard & screen-reader friendly.
 *  • Sticky total bar on small screens; print-friendly layout.
 *
 * SEO
 *  • Outputs JSON-LD (Offer + PriceSpecification) for the computed estimate.
 *
 * Notes
 *  • No external UI/icon libs; only Tailwind + inline SVGs.
 */

type BaseOption = { id: string; label: string; amount: number };
type Addon = {
  id: string;
  label: string;
  amount: number;
  per?: "application" | "adult" | "child";
};

type Props = {
  currency?: string;
  baseOptions: BaseOption[]; // e.g. Donation vs Real Estate
  defaultBaseId?: string;
  adults?: number; // includes principal
  children?: number;
  addons?: Addon[]; // govt fees, due diligence, etc.
  className?: string;
  title?: string; // default: "Cost estimator"
  disclaimer?: string;
};

export default function CostCalculator({
  currency = "USD",
  baseOptions,
  defaultBaseId,
  adults = 2,
  children = 0,
  addons = [],
  className = "",
  title = "Cost estimator",
  disclaimer = "Indicative estimate. Excludes exchange/transfer charges and third-party legal costs. Official fees may change without notice.",
}: Props) {
  /* ---------- state ---------- */
  const safeDefaultBase = defaultBaseId ?? baseOptions[0]?.id ?? "";
  const [selectedBase, setSelectedBase] =
    React.useState<string>(safeDefaultBase);
  const [adultCount, setAdultCount] = React.useState(Math.max(1, adults));
  const [childCount, setChildCount] = React.useState(Math.max(0, children));
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(addons.map((a) => [a.id, true])), // default ON
  );

  /* ---------- helpers ---------- */
  const fmt = React.useCallback(
    (amt: number) => {
      try {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: currency.toUpperCase(),
          maximumFractionDigits: 0,
        }).format(amt);
      } catch {
        return `${amt.toLocaleString()} ${currency.toUpperCase()}`;
      }
    },
    [currency],
  );

  const base = React.useMemo(
    () =>
      baseOptions.find((b) => b.id === selectedBase) ?? {
        id: "",
        label: "—",
        amount: 0,
      },
    [selectedBase, baseOptions],
  );

  const rows = React.useMemo(() => {
    const list: Array<{
      id: string;
      label: string;
      unit: number;
      qty: number;
      total: number;
      per?: Addon["per"];
    }> = [];

    // Base
    list.push({
      id: `base-${base.id}`,
      label: base.label,
      unit: base.amount,
      qty: 1,
      total: base.amount,
    });

    // Add-ons
    for (const a of addons) {
      if (!enabled[a.id]) continue;
      const qty =
        a.per === "adult" ? adultCount : a.per === "child" ? childCount : 1;
      const lineTotal = a.amount * qty;
      list.push({
        id: a.id,
        label: a.label,
        unit: a.amount,
        qty,
        total: lineTotal,
        per: a.per,
      });
    }
    return list;
  }, [addons, enabled, adultCount, childCount, base]);

  const total = React.useMemo(
    () => rows.reduce((s, r) => s + r.total, 0),
    [rows],
  );

  // live region for screen readers when total changes
  const [announce, setAnnounce] = React.useState("");
  React.useEffect(() => {
    setAnnounce(`Estimated total updated: ${fmt(total)}.`);
  }, [fmt, total]);

  const reset = () => {
    setSelectedBase(safeDefaultBase);
    setAdultCount(Math.max(1, adults));
    setChildCount(Math.max(0, children));
    setEnabled(Object.fromEntries(addons.map((a) => [a.id, true])));
  };

  /* ---------- UI ---------- */
  return (
    <section
      aria-labelledby="cc-title"
      className={[
        "relative overflow-hidden",
        "rounded-2xl p-5 md:p-6 lg:p-8",
        "bg-white border border-gold/45 print:shadow-none",
        className,
      ].join(" ")}
    >
      <BackgroundGraphics />

      {/* Header */}
      <header className="relative mb-4 md:mb-5">
        <div className="flex items-center gap-2 text-[12px] text-gold">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-medium uppercase tracking-[0.2em]">Calculator</span>
        </div>

        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <h3
            id="cc-title"
            className="font-sora text-xl md:text-2xl font-semibold tracking-tight text-ink"
          >
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium
                         bg-sand/50 text-ink/70 border border-gold/45
                         hover:border-gold/65 hover:text-ink"
            >
              Reset
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm text-ink/55 max-w-3xl">
          {disclaimer}
        </p>

        {/* SR live region */}
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </header>

      {/* FLOW: Base options */}
      {baseOptions.length > 0 ? (
        <section aria-labelledby="cc-base" className="relative">
          <h4
            id="cc-base"
            className="text-sm font-semibold text-ink"
          >
            Choose a base option
          </h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {baseOptions.map((b) => {
              const checked = selectedBase === b.id;
              return (
                <label
                  key={b.id}
                  className={[
                    "flex items-center justify-between gap-3 rounded-xl p-3 cursor-pointer",
                    "bg-sand/50 border",
                    checked
                      ? "border-gold/60"
                      : "border-gold/45 hover:border-gold/65",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cc-base-option"
                      className="h-4 w-4 accent-gold"
                      checked={checked}
                      onChange={() => setSelectedBase(b.id)}
                      aria-label={b.label}
                    />
                    <span className="text-sm font-medium text-ink">
                      {b.label}
                    </span>
                  </span>
                  <span className="text-sm tabular-nums text-gold">
                    {fmt(b.amount)}
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* FLOW: Family size */}
      <section aria-labelledby="cc-family" className="relative mt-5">
        <h4
          id="cc-family"
          className="text-sm font-semibold text-ink"
        >
          Family size
        </h4>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <Stepper
            label="Adults (incl. principal)"
            value={adultCount}
            setValue={(v) => setAdultCount(Math.max(1, v))}
            min={1}
            ariaLabelDecrement="Decrease adults"
            ariaLabelIncrement="Increase adults"
          />
          <Stepper
            label="Children (<18)"
            value={childCount}
            setValue={(v) => setChildCount(Math.max(0, v))}
            min={0}
            ariaLabelDecrement="Decrease children"
            ariaLabelIncrement="Increase children"
          />
        </div>
      </section>

      {/* FLOW: Add-ons */}
      {addons.length ? (
        <section aria-labelledby="cc-addons" className="relative mt-6">
          <div className="flex items-center justify-between">
            <h4
              id="cc-addons"
              className="text-sm font-semibold text-ink"
            >
              Government &amp; due-diligence fees
            </h4>
            <button
              type="button"
              onClick={() =>
                setEnabled((s) =>
                  Object.fromEntries(Object.keys(s).map((k) => [k, false])),
                )
              }
              className="text-[12px] underline underline-offset-2 text-ink/55 hover:text-ink"
            >
              Clear all
            </button>
          </div>

          <ul className="mt-3 space-y-2" role="list">
            {addons.map((a) => {
              const qty =
                a.per === "adult"
                  ? adultCount
                  : a.per === "child"
                    ? childCount
                    : 1;
              const lineTotal = enabled[a.id] ? a.amount * qty : 0;
              return (
                <li
                  key={a.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-xl p-3
                             bg-sand/50 border border-gold/45"
                >
                  <input
                    id={`cc-addon-${a.id}`}
                    type="checkbox"
                    className="h-4 w-4 accent-gold"
                    checked={!!enabled[a.id]}
                    onChange={(e) =>
                      setEnabled((s) => ({ ...s, [a.id]: e.target.checked }))
                    }
                    aria-describedby={
                      a.per ? `cc-addon-per-${a.id}` : undefined
                    }
                  />
                  <label
                    htmlFor={`cc-addon-${a.id}`}
                    className="text-sm text-ink"
                  >
                    {a.label}{" "}
                    {a.per ? (
                      <span
                        id={`cc-addon-per-${a.id}`}
                        className="text-ink/40"
                      >
                        · per {a.per}
                      </span>
                    ) : null}
                  </label>

                  <div className="text-right">
                    <div className="text-sm tabular-nums text-ink">
                      {fmt(a.amount)}
                    </div>
                    <div className="text-[11px] text-ink/40">
                      {qty} × {fmt(a.amount)} ={" "}
                      <span className="font-medium text-gold">
                        {fmt(lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* SUMMARY */}
      <section aria-labelledby="cc-summary" className="relative mt-6">
        <h4
          id="cc-summary"
          className="text-sm font-semibold text-ink"
        >
          Summary
        </h4>

        <div className="mt-3 rounded-2xl border border-gold/45 bg-sand/50 overflow-hidden">
          {/* table-like list for clarity & printability */}
          <div className="divide-y divide-gold/5">
            {rows.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 hover:bg-white/[0.03]"
                itemScope
                itemType="https://schema.org/PriceSpecification"
              >
                <meta itemProp="name" content={r.label} />
                <div className="min-w-0">
                  <div
                    className="text-sm text-ink truncate"
                    title={r.label}
                  >
                    {r.label}
                  </div>
                  <div className="text-[11px] text-ink/40">
                    {r.per ? `per ${r.per}` : "fixed"} • Qty {r.qty}
                  </div>
                </div>
                <div
                  className="text-sm tabular-nums text-ink/55"
                  itemProp="price"
                >
                  {fmt(r.unit)}
                </div>
                <div
                  className="text-sm font-semibold tabular-nums text-ink"
                  itemProp="eligibleQuantity"
                >
                  {fmt(r.total)}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky total bar for mobile */}
          <div className="sticky bottom-0 flex items-center justify-between gap-3 px-4 py-3 bg-white/90 backdrop-blur border-t border-gold/45">
            <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/45">
              Estimated total
            </div>
            <div className="text-lg font-semibold tabular-nums text-gold">
              {fmt(total)}
            </div>
          </div>
        </div>
      </section>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toJsonLd(currency, base, rows, total)),
        }}
      />
    </section>
  );
}

/* ---------- Small subcomponents ---------- */

function Stepper({
  label,
  value,
  setValue,
  min = 0,
  ariaLabelDecrement,
  ariaLabelIncrement,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min?: number;
  ariaLabelDecrement: string;
  ariaLabelIncrement: string;
}) {
  return (
    <div className="rounded-xl border border-gold/45 p-3 bg-sand/50">
      <div className="text-xs text-ink/55">
        {label}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          aria-label={ariaLabelDecrement}
          onClick={() => setValue(Math.max(min, value - 1))}
          className="h-8 w-8 rounded-md border border-gold/45 text-ink grid place-items-center hover:border-gold/65"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <input
          type="number"
          className="w-14 text-center rounded-md border border-gold/45 bg-white text-ink py-1 tabular-nums focus:outline-none focus:border-gold"
          value={value}
          min={min}
          onChange={(e) => {
            const v = Number(e.target.value);
            setValue(Number.isFinite(v) ? Math.max(min, Math.floor(v)) : min);
          }}
          aria-label={label}
        />
        <button
          type="button"
          aria-label={ariaLabelIncrement}
          onClick={() => setValue(value + 1)}
          className="h-8 w-8 rounded-md border border-gold/45 text-ink grid place-items-center hover:border-gold/65"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- JSON-LD ---------- */

function toJsonLd(
  currency: string,
  base: { id: string; label: string; amount: number },
  rows: Array<{
    id: string;
    label: string;
    unit: number;
    qty: number;
    total: number;
    per?: "application" | "adult" | "child";
  }>,
  total: number,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    priceCurrency: currency.toUpperCase(),
    price: total,
    itemOffered: {
      "@type": "Service",
      name: "Residency / Citizenship program estimate",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Base",
        value: `${base.label} (${base.amount})`,
      },
      ...rows
        .filter((r) => r.id !== `base-${base.id}`)
        .map((r) => ({
          "@type": "PropertyValue",
          name: r.label,
          value: r.total,
          description: `${r.qty} × ${r.unit}${r.per ? `, per ${r.per}` : ""}`,
        })),
    ],
  } as const;
}

/* ---------- Background (light grid, neutral glows) ---------- */

function BackgroundGraphics() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 print:hidden"
    >
      <div className="absolute -top-24 -left-20 h-56 w-56 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
        <defs>
          <pattern
            id="cc-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0v24"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cc-grid)" />
      </svg>
    </div>
  );
}

/* ---------- Inline icons ---------- */

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M10 4v12M4 10h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 10h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
