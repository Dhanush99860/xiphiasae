// src/components/careers/Perks.tsx
const GOLD = "#bfa15c";

export default function Perks({ serifClass }: { serifClass: string }) {
  const perks = [
    { t: "Office-first culture", d: "Work from our Bengaluru headquarters and branch offices with close-knit teams." },
    { t: "Learning support", d: "Certification reimbursements & structured training." },
    { t: "Career growth", d: "Clear paths to move into senior, specialist, and leadership roles." },
    { t: "Wellbeing", d: "Paid time off, medical cover, and a supportive work environment." },
    { t: "Tools & workspace", d: "Modern office setup, laptop, and professional software stack." },
    { t: "Performance bonus", d: "Role-based incentives linked to results and impact." },
    { t: "Inclusive leave", d: "Parental, medical, and compassionate leave policies." },
    { t: "Immigration expertise", d: "Hands-on exposure to PR, citizenship, and global mobility programs." },
  ];

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-8" style={{ background: GOLD }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
          Why join us
        </span>
      </div>
      <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium`}>
        Benefits &amp; <span className="italic" style={{ color: GOLD }}>perks</span>
      </h2>

      <ul role="list" className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((p) => (
          <li
            key={p.t}
            className="flex h-full flex-col gap-3 rounded-2xl p-6 transition-colors hover:border-[#bfa15c]"
            style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
          >
            <span
              aria-hidden
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ border: `1px solid ${GOLD}55`, color: GOLD, background: "rgba(191,161,92,0.06)" }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M5 10l3 3 7-7" />
              </svg>
            </span>
            <h3 className={`${serifClass} text-[1.2rem] font-medium leading-snug text-white`}>{p.t}</h3>
            <p className="text-sm text-white/55">{p.d}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-white/40">Benefits may vary by location and role seniority.</p>
    </div>
  );
}
