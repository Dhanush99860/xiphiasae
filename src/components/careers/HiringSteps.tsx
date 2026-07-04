// src/components/careers/HiringSteps.tsx
const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const INK = "#0c1f3f";

const STEPS = [
  { t: "Apply", d: "Share your resume and a few details.", time: "~5 min" },
  { t: "Intro Call", d: "15–20 min alignment on role and expectations.", time: "~20 min" },
  { t: "Skill Interview", d: "Role-specific discussion or portfolio review.", time: "~45–60 min" },
  { t: "Task (some roles)", d: "Practical, time-boxed assignment if required.", time: "~60–90 min" },
  { t: "Offer", d: "Compensation, start date and onboarding next steps.", time: "~24–48 hrs" },
];

export default function HiringSteps({ serifClass }: { serifClass: string }) {
  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD_DEEP }}>
            <span className="h-px w-8" style={{ background: GOLD_DEEP }} />How we hire
          </p>
          <h2 className={`${serifClass} mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium leading-[1.06]`} style={{ color: INK }}>
            Our hiring <span className="italic" style={{ color: GOLD_DEEP }}>process</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(12,31,63,0.4)" }}>Typical timeline: 2–4 weeks</p>
          <a
            href="#apply"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: "#0a1733" }}
          >
            Apply now
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <ol className="mt-7 grid items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <li
            key={s.t}
            className="flex flex-col rounded-xl p-5"
            style={{ border: "1px solid rgba(168,125,31,0.18)", background: "#ffffff" }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`${serifClass} text-[1.5rem] font-medium leading-none`} style={{ color: GOLD_DEEP }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ border: "1px solid rgba(168,125,31,0.22)", color: "rgba(12,31,63,0.5)" }}
              >
                {s.time}
              </span>
            </div>
            <p className="mt-2.5 text-[13px] font-semibold" style={{ color: INK }}>{s.t}</p>
            <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "rgba(12,31,63,0.55)" }}>{s.d}</p>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-[11px]" style={{ color: "rgba(12,31,63,0.38)" }}>
        We&apos;re flexible on scheduling and can provide reasonable accommodations on request.
      </p>
    </div>
  );
}
