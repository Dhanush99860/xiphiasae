// src/components/careers/Hero.tsx
import type { Job } from "@/lib/jobs";

const GOLD = "#bfa15c";

/**
 * Careers hero — navy/gold "Spotlight Feature".
 * A featured lead role is called out large (serif + gold numeral) when available.
 */
export default function Hero({
  serifClass,
  featured,
  openCount,
}: {
  serifClass: string;
  featured?: Job;
  openCount?: number;
}) {
  return (
    <header className="relative">
      <div className="flex items-center gap-3">
        <span className="h-px w-10" style={{ background: GOLD }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
          Careers
        </span>
        <span lang="ar" dir="rtl" className="font-arabic-display text-base" style={{ color: `${GOLD}cc` }}>
          انضم إلينا
        </span>
      </div>

      <h1 className={`${serifClass} mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.98]`}>
        Build a career in <span className="italic" style={{ color: GOLD }}>global mobility</span>
      </h1>

      <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/60 md:text-base">
        Help people move, work, and thrive across borders. Join our experts in citizenship, residency,
        skilled migration, and corporate immigration from our Bengaluru headquarters and branch offices.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#open-roles"
          className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
          style={{ background: GOLD, color: "#0a1733" }}
        >
          View open roles
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-white"
          style={{ border: `1px solid ${GOLD}55` }}
        >
          Submit resume
        </a>
      </div>

      {/* FEATURED lead role — called out big */}
      {featured && (
        <div
          className="mt-14 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12"
          style={{ border: `1px solid rgba(191,161,92,0.4)`, background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex flex-col items-start gap-4">
            <span className={`${serifClass} text-[clamp(3rem,8vw,6rem)] font-medium leading-none`} style={{ color: GOLD }}>
              01
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
              Featured role
            </span>
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
              {featured.dept || "Open position"}
            </span>
            <h2 className={`${serifClass} mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight`}>
              {featured.title}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-white/55">
              {featured.location}
              {featured.employmentType ? ` · ${featured.employmentType}` : ""}
            </p>
            <a
              href={`/careers/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:translate-x-0.5"
              style={{ color: GOLD }}
            >
              View &amp; apply
              <span>→</span>
            </a>
          </div>
        </div>
      )}

      {typeof openCount === "number" && openCount > 0 && (
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          {openCount} open role{openCount === 1 ? "" : "s"} · on-site across India
        </p>
      )}
    </header>
  );
}
