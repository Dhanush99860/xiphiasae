"use client";

import React, { useMemo, useState } from "react";

type Props = {
  fullName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  /** Next.js 15-safe names */
  onBackAction: () => void;
  onNextAction: (patch: {
    fullName: string;
    email: string;
    phone?: string;
    notes?: string;
  }) => void;
};

const NOTE_MAX = 600;

export default function DetailsStep({
  fullName,
  email,
  phone,
  notes,
  onBackAction,
  onNextAction,
}: Props) {
  const [name, setName] = useState(fullName ?? "");
  const [em, setEm] = useState(email ?? "");
  const [ph, setPh] = useState(phone ?? "");
  const [nt, setNt] = useState(notes ?? "");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(em.trim())) e.email = "Enter a valid email address.";
    return e;
  }, [name, em]);

  const valid = Object.keys(errors).length === 0;

  function submit() {
    if (!valid) return;
    onNextAction({
      fullName: name.trim(),
      email: em.trim(),
      phone: ph.trim() || undefined,
      notes: nt.trim() || undefined,
    });
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      noValidate
    >
      <Field
        label="Full name*"
        htmlFor="fullName"
        error={touched.name ? errors.name : undefined}
      >
        {(a11y) => (
          <input
            id="fullName"
            name="fullName"
            type="text"
            inputMode="text"
            autoCapitalize="words"
            autoComplete="name"
            placeholder="e.g., Anish Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            {...a11y}
            className={inputClass(!!(touched.name && errors.name))}
            required
          />
        )}
      </Field>

      <Field
        label="Email*"
        htmlFor="email"
        error={touched.email ? errors.email : undefined}
      >
        {(a11y) => (
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={em}
            onChange={(e) => setEm(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            {...a11y}
            className={inputClass(!!(touched.email && errors.email))}
            required
          />
        )}
      </Field>

      <Field label="Phone (optional)" htmlFor="phone">
        {(a11y) => (
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98xxxx xxxx"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            {...a11y}
            className={inputClass(false)}
          />
        )}
      </Field>

      <Field
        label="Anything specific you want to discuss? (optional)"
        htmlFor="notes"
        helper={
          <span className="text-xs text-ink/45">
            {nt.length}/{NOTE_MAX}
          </span>
        }
      >
        {(a11y) => (
          <textarea
            id="notes"
            name="notes"
            rows={5}
            maxLength={NOTE_MAX}
            placeholder="Share context, goals or questions. This helps us prepare."
            value={nt}
            onChange={(e) => setNt(e.target.value)}
            {...a11y}
            className={textareaClass}
          />
        )}
      </Field>

      {/* Actions */}
      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBackAction}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-5 py-2.5 text-ink ring-1 ring-gold/15 hover:border-gold/65 hover:ring-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={!valid}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 font-semibold text-midnight transition enabled:hover:bg-gold_bright focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
        >
          Continue
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
            <path
              fill="currentColor"
              d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z"
            />
          </svg>
        </button>
      </div>

      <p className="text-xs text-ink/45">
        We’ll never share your details. Discreet & confidential.
      </p>
    </form>
  );
}

/* --------------------------------- Pieces --------------------------------- */

type A11yProps = Pick<React.AriaAttributes, "aria-invalid" | "aria-describedby">;

function Field({
  label,
  htmlFor,
  error,
  helper,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  helper?: React.ReactNode;
  /** Render-prop: we inject ARIA props directly into the control (no cloneElement) */
  children: (a11y: A11yProps) => React.ReactNode;
}) {
  const describedBy = error ? `${htmlFor}-error` : undefined;

  return (
    <div className="grid gap-1.5 text-sm">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="font-medium text-ink/70">
          {label}
        </label>
        {helper ?? null}
      </div>

      {children({
        "aria-invalid": !!error || undefined,
        "aria-describedby": describedBy,
      })}

      {error ? (
        <p
          id={describedBy}
          role="alert"
          className="text-xs text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "rounded-xl border px-3 py-2 outline-none",
    "bg-white text-ink placeholder:text-ink/40",
    hasError
      ? "border-red-500 ring-1 ring-red-500/40 focus:ring-red-500 focus:border-red-500"
      : "border-gold/45 ring-1 ring-transparent focus:border-gold focus:ring-gold",
  ].join(" ");
}

const textareaClass =
  "rounded-xl border px-3 py-2 outline-none " +
  "bg-white text-ink placeholder:text-ink/40 " +
  "border-gold/45 ring-1 ring-transparent focus:border-gold focus:ring-gold";
