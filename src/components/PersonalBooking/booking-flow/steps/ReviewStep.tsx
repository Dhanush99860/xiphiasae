"use client";

import React from "react";
import type { BookingInput } from "../connectors";

type Props = {
  data: BookingInput;
  loading: boolean;
  /** ✅ Next 15-safe names */
  onBackAction: () => void;
  onConfirmAction: () => void;
};

export default function ReviewStep({ data, loading, onBackAction, onConfirmAction }: Props) {
  const priceDisplay = formatINR(data.priceCents);
  const appt = formatDateTime(data.dateISO, data.timeISO, data.timezone);
  const consultationLabel =
    data.plan === "free"
      ? `Discovery Call (${data.durationMin}m)`
      : `Strategy Consultation (${data.durationMin}m)`;

  return (
    <div className="grid gap-4">
      {/* Summary card */}
      <section className="rounded-2xl bg-white text-ink ring-1 ring-gold/10 p-4">
        <h3 className="text-base font-semibold tracking-tight text-ink">Review & confirm</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {/* Appointment */}
          <div className="rounded-xl ring-1 ring-gold/10 bg-sand/50 p-3">
            <div className="flex items-start gap-2">
              <CalendarIcon />
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-ink/45">Appointment</div>
                <div className="mt-1 font-medium text-ink">
                  {consultationLabel}
                </div>
                <div className="text-sm text-ink/70">
                  {appt || "—"}
                </div>
                <div className="text-xs text-ink/45">Timezone: {data.timezone}</div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-xl ring-1 ring-gold/10 bg-sand/50 p-3">
            <div className="flex items-start gap-2">
              <UserIcon />
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-ink/45">Contact</div>
                <div className="mt-1 font-medium text-ink">{data.fullName || "—"}</div>
                <div className="text-sm text-ink/70 break-all">
                  <MailIcon className="mr-1 inline-block align-[-2px]" /> {data.email || "—"}
                </div>
                {data.phone ? (
                  <div className="text-sm text-ink/70 break-all">
                    <PhoneIcon className="mr-1 inline-block align-[-2px]" /> {data.phone}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes ? (
          <div className="mt-3 rounded-xl ring-1 ring-gold/10 bg-sand/50 p-3">
            <div className="flex items-start gap-2">
              <NoteIcon />
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-ink/45">Notes</div>
                <p className="mt-1 text-sm text-ink/70 whitespace-pre-wrap break-words">
                  {data.notes}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Total / CTA */}
      <section
        aria-live="polite"
        aria-atomic="true"
        className="rounded-2xl bg-white text-ink ring-1 ring-gold/10 p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-ink/70">Total</div>
            <div className="text-2xl font-semibold text-gold">{priceDisplay}</div>
            {data.priceCents > 0 ? (
              <div className="mt-0.5 text-xs text-ink/45">
                Secure payment via Razorpay • UPI / Cards / Netbanking
              </div>
            ) : (
              <div className="mt-0.5 text-xs text-ink/45">
                No payment required for the discovery call
              </div>
            )}
          </div>

          <button
            onClick={onConfirmAction}
            disabled={loading}
            className={[
              "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 font-semibold text-midnight transition hover:bg-gold_bright focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              loading ? "opacity-70 cursor-wait" : "",
            ].join(" ")}
            aria-busy={loading || undefined}
          >
            {loading ? (
              <>
                <Spinner />
                <span>Processing…</span>
              </>
            ) : data.priceCents > 0 ? (
              <>
                <LockIcon />
                <span>Proceed to Payment</span>
              </>
            ) : (
              <>
                <CheckIcon />
                <span>Confirm Booking</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBackAction}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full px-5 py-2.5 text-ink ring-1 ring-gold/15 hover:ring-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Back
        </button>
        <span className="text-xs text-ink/45">
          You’ll receive an email confirmation immediately.
        </span>
      </div>
    </div>
  );
}

/* ------------------------------ helpers/ui ------------------------------- */

function formatINR(cents: number) {
  if (!cents || cents <= 0) return "₹0";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    Math.round(cents / 100)
  );
}

function formatDateTime(dateISO?: string, timeISO?: string, tz?: string) {
  if (!dateISO || !timeISO) return "";
  // Combine into a naive ISO string; format with provided timezone
  const d = new Date(`${dateISO}T${timeISO}:00`);
  try {
    const f = new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: tz || "UTC",
    });
    return f.format(d);
  } catch {
    return `${dateISO} ${timeISO}`;
  }
}

/* ------------------------------- icons ----------------------------------- */

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 text-gold" aria-hidden="true">
      <path fill="currentColor" d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 1 1 2 0v1zm12 6H5v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 text-gold" aria-hidden="true">
      <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5C21 16.5 17 14 12 14Z" />
    </svg>
  );
}
function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 text-ink/45 ${className}`} aria-hidden="true">
      <path fill="currentColor" d="M4 6a2 2 0 0 0-2 2v.217l10 5.556 10-5.556V8a2 2 0 0 0-2-2H4Zm20 4.383-9.447 5.243a3 3 0 0 1-3.106 0L2 10.383V16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.617Z" />
    </svg>
  );
}
function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 text-ink/45 ${className}`} aria-hidden="true">
      <path fill="currentColor" d="M6.62 10.79a15.466 15.466 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.06-.23 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h2.46a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.23 1.06Z" />
    </svg>
  );
}
function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 text-gold" aria-hidden="true">
      <path fill="currentColor" d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V7h3.5L14 3.5Z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-midnight" aria-hidden="true">
      <path fill="currentColor" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 5.457 8.543l3.293 3.293 6.543-6.543a1 1 0 0 1 1.414 0z" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-midnight" aria-hidden="true">
      <path fill="currentColor" d="M17 9V7a5 5 0 1 0-10 0v2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2Zm-8 0V7a3 3 0 1 1 6 0v2H9Z" />
    </svg>
  );
}
function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}
