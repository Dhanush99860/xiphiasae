// components/about/Compliance.tsx
import React from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";

type Item = {
  icon: React.FC<any>;
  title: string;
  text: string;
  points?: string[];
};

const items: Item[] = [
  {
    icon: Lock,
    title: "Confidentiality",
    text: "Restricted access, NDA on request, encrypted storage.",
    points: ["Role-based data access", "Clean-desk & redaction policy", "Secure file exchange portals"],
  },
  {
    icon: Eye,
    title: "Transparency",
    text: "No over-promising, regulator-aligned documentation standards.",
    points: ["Written scopes & fees", "Realistic timelines & caveats", "Source-of-funds clarity"],
  },
  {
    icon: Alert,
    title: "Risk Disclosure",
    text: "Clear eligibility, timelines and third-party dependencies.",
    points: ["Eligibility thresholds & tests", "Program rule change alerts", "Embassy / vendor SLAs"],
  },
  {
    icon: Shield,
    title: "Data Privacy",
    text: "Consent-based processing; regional data residency where applicable.",
    points: ["Purpose-limited use", "Data minimization & retention", "GDPR/DPDP-aligned handling*"],
  },
];

export default function Compliance() {
  const titleId = "compliance-title";

  return (
    <section
      id="compliance"
      aria-labelledby={titleId}
      className="py-6 md:py-6"
    >
      {/* container aligned with hero + overflow safety */}
      <div className="container mx-auto lg:max-w-screen-2xl px-4 sm:px-6 lg:px-8 overflow-x-clip">
        {/* dark ink wrapper (Midnight Embassy) */}
        <div
          className={[
            "relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10",
            "bg-white border border-gold/45",
            "text-ink",
          ].join(" ")}
        >
          {/* soft background accents (clipped) */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="hidden sm:block absolute -top-24 -end-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="hidden sm:block absolute -bottom-28 -start-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent_80%)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
            </div>
          </div>

          {/* header */}
          <header className="relative mb-6 md:mb-8">
            <Eyebrow arabic="نزاهة">Trust & Compliance</Eyebrow>

            <h2
              id={titleId}
              className="mt-3 font-sora text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-[32px] break-words"
            >
              Ethics, Privacy & Process
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-ink/55">
              Our model is built on compliance and clarity. HNIs and corporates rely on our discipline.
            </p>
          </header>

          {/* regulator alignment chips */}
          <div className="relative mb-5 flex flex-wrap gap-2">
            <Chip>ICCRC / CICC-aligned</Chip>
            <Chip>MARA-aligned</Chip>
            <Chip>IMC standards</Chip>
            <Chip>KYC / AML procedures</Chip>
          </div>

          {/* items grid */}
          <ul className="relative grid items-stretch gap-4 sm:grid-cols-2">
            {items.map(({ icon: Icon, title, text, points }) => (
              <li key={title} className="min-w-0">
                <div
                  className={[
                    "h-full rounded-2xl p-5",
                    "bg-sand/50 border border-gold/45",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/65",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 rounded-xl border border-gold/40 bg-white p-2">
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-sora text-base font-semibold leading-tight text-ink break-words">{title}</h3>
                      <p className="mt-1 text-sm text-ink/55 break-words">
                        {text}
                      </p>

                      {points?.length ? (
                        <ul className="mt-3 space-y-2">
                          {points.map((p) => (
                            <li
                              key={p}
                              className="flex items-start gap-2 text-sm text-ink/55"
                            >
                              <Check className="mt-[3px]" />
                              <span className="break-words">{p}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* process strip */}
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-sand/50 p-4">
            <p className="text-sm font-medium text-ink">How we operationalize compliance</p>
            <ol className="mt-2 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-5">
              <Step n="01" label="KYC & onboarding" />
              <Step n="02" label="Suitability & risk disclosure" />
              <Step n="03" label="Mandate & documentation" />
              <Step n="04" label="Submission & representation" />
              <Step n="05" label="Decision & post-landing support" />
            </ol>
          </div>

          {/* links */}
          <div className="relative mt-6 flex flex-wrap gap-2">
            <Link
              href="/privacy-policy"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-2 text-sm font-semibold text-midnight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
            >
              Read our Privacy Policy
              <ArrowRight />
            </Link>
            <Link
              href="/terms"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-gold/60"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* disclaimer */}
          <p className="relative mt-3 text-[11px] text-ink/45">
            *Alignment denotes internal policies and workflows built to mirror regulator expectations; it is
            not a license assertion. Program availability and requirements may change. No guarantees.
            Eligibility &amp; rules apply.
          </p>
        </div>
      </div>
    </section>
  );
}

/* small UI atoms + icons (inline) */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gold/45 bg-sand/50 px-2.5 py-1 text-[11px] font-medium text-ink/70">
      {children}
    </span>
  );
}
function Step({ n, label }: { n: string; label: string }) {
  return (
    <li className="flex items-center gap-2 rounded-lg border border-gold/45 bg-white px-3 py-2 text-ink/70">
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold text-xs font-semibold text-midnight">
        {n}
      </span>
      <span className="text-xs">{label}</span>
    </li>
  );
}
function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-3.5 w-3.5 shrink-0 fill-gold ${className}`}
      aria-hidden="true"
    >
      <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 5.457 8.543l3.293 3.293 6.543-6.543a1 1 0 0 1 1.414 0z" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z"
      />
    </svg>
  );
}
function Lock() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function Eye() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function Alert() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}
function Shield() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" />
    </svg>
  );
}