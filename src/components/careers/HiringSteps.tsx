// src/components/careers/HiringSteps.tsx
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const INK = "#0c1f3f";

export default function HiringSteps({ serifClass }: { serifClass: string }) {
  const steps = [
    { t: "Apply", d: "Share your resume and a few basic details.", time: "~5 min" },
    { t: "Intro Call", d: "15–20 min chat to align on role and expectations.", time: "~20 min" },
    { t: "Skill Interview", d: "Role-specific discussion or case/portfolio review.", time: "~45–60 min" },
    { t: "Assignment (Light)", d: "Only for some roles; practical, time-boxed task.", time: "~60–90 min" },
    { t: "Offer", d: "Compensation, start date, and onboarding next steps.", time: "~24–48 hrs" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-8" style={{ background: GOLD_DEEP }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD_DEEP }}>
          How we hire
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className={`${serifClass} max-w-2xl text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`} style={{ color: INK }}>
          Our hiring <span className="italic" style={{ color: GOLD_DEEP }}>process</span>
        </h2>
        <p className="text-sm uppercase tracking-[0.14em]" style={{ color: "rgba(12,31,63,0.5)" }}>
          Typical timeline: 2–4 weeks
        </p>
      </div>

      <ol className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li
            key={s.t}
            className="flex h-full flex-col rounded-2xl p-6"
            style={{ border: "1px solid rgba(168,125,31,0.2)", background: "#ffffff" }}
          >
            <span className={`${serifClass} text-3xl font-medium leading-none`} style={{ color: GOLD_DEEP }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold" style={{ color: INK }}>{s.t}</h3>
              {s.time && (
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{ border: "1px solid rgba(168,125,31,0.25)", color: "rgba(12,31,63,0.6)" }}
                >
                  {s.time}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm" style={{ color: "rgba(12,31,63,0.6)" }}>{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs" style={{ color: "rgba(12,31,63,0.45)" }}>
          We&apos;re flexible on scheduling and can provide reasonable accommodations on request.
        </p>
        <a
          href="#apply"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
          style={{ background: GOLD, color: "#0a1733" }}
        >
          Apply now
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}
