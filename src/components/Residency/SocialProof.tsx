// components/Residency/SocialProof.tsx
export default function SocialProof() {
  const items = [
    { label: "Designated Incubator", icon: IncubatorIcon },
    { label: "VC Network", icon: NetworkIcon },
    { label: "XIPHIAS Groups", icon: AngelIcon },
    { label: "Legal Partners", icon: ScaleIcon },
  ];

  return (
    <section aria-labelledby="trust-title" className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-sand/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Trust
        </span>
        <h3 id="trust-title" className="font-sora text-lg font-semibold text-ink">
          Trusted by founders
        </h3>
      </div>

      {/* Badges */}
      <ul className="grid grid-cols-2 gap-3">
        {items.map(({ label, icon: Icon }) => (
          <li key={label}>
            <div className="group relative overflow-hidden rounded-xl p-3 bg-white border border-gold/45 hover:border-gold/65 transition-colors">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sand/50 border border-gold/45 text-gold">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[14px] font-medium leading-tight text-ink">
                  {label}
                </span>
              </div>
              {/* subtle sheen on hover */}
              <span className="pointer-events-none absolute -top-8 right-0 h-24 w-24 rotate-45 bg-gold/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </li>
        ))}
      </ul>

      {/* Quote */}
      <figure className="relative overflow-hidden rounded-2xl p-4 bg-white border border-gold/45">
        <QuoteMark className="absolute -top-3 -left-2 h-16 w-16 text-gold opacity-15" />
        <blockquote className="relative text-[15px] leading-7 text-ink/70">
          “We got our Letter of Support in 6 weeks. The team’s guidance was spot
          on.”
        </blockquote>
        <figcaption className="mt-2 flex items-center gap-2 text-[13px] text-ink/55">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand/50 border border-gold/45 text-[11px] font-semibold text-gold">
            AS
          </span>
          — A. Sharma, SUV Founder
        </figcaption>
      </figure>

      {/* Tiny reassurance row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink/45">
        <span className="inline-flex items-center gap-1">
          <ShieldIcon className="h-3.5 w-3.5" /> Data kept confidential
        </span>
        <span className="inline-flex items-center gap-1">
          <ClockIcon className="h-3.5 w-3.5" /> Fast response from our team
        </span>
        <span className="inline-flex items-center gap-1">
          <GlobeIcon className="h-3.5 w-3.5" /> Global founder community
        </span>
      </div>
    </section>
  );
}

/* ---------- Inline icons (no external libs) ---------- */
function IncubatorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M9 2h6v2l-1 1v4.2a6.5 6.5 0 1 1-4 0V5L9 4V2zm3 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
    </svg>
  );
}
function NetworkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 3a3 3 0 1 1-2.83 4H7a3 3 0 1 1 0-2h2.17A3 3 0 0 1 12 3zm5 8a3 3 0 1 1-2 5.236V17h-6v-0.764A3 3 0 1 1 7 11h10z" />
    </svg>
  );
}
function AngelIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 3c-4.97 0-9 1.12-9 2.5S7.03 8 12 8s9-1.12 9-2.5S16.97 3 12 3zm0 6c-2.21 0-4 1.79-4 4v6h8v-6c0-2.21-1.79-4-4-4z" />
    </svg>
  );
}
function ScaleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M11 3h2v3h5l-4 6h4a4 4 0 0 1-8 0h4l-4-6H11V3zM5 21h14v-2H5v2z" />
    </svg>
  );
}
function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M14 22c-2.2 0-4 1.8-4 4v8h8v-8h-4l4-8h-4l-4 8zm18 0c-2.2 0-4 1.8-4 4v8h8v-8h-4l4-8h-4l-4 8z" />
    </svg>
  );
}
function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2l8 4v6c0 5-3.4 9.7-8 10-4.6-.3-8-5-8-10V6l8-4z" />
    </svg>
  );
}
function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 6h-2v6l5 3 .999-1.732L13 13V8z" />
    </svg>
  );
}
function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.9 0 3.6.66 4.95 1.76L12 9 7.05 5.76A7.96 7.96 0 0 1 12 4z" />
    </svg>
  );
}
