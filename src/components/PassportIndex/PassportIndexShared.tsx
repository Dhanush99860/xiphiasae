import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Compass,
  FileCheck2,
  Globe2,
  Landmark,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { PassportRecord, PassportRegion } from "@/data/passport-index";
import LuxeHeader from "@/components/HomeLuxe/LuxeHeader";
import LuxeFooter from "@/components/HomeLuxe/LuxeFooter";
import Flag from "@/components/Countries/Flag";

/**
 * Navy/gold luxury system for the entire passport journey.
 * Brand: gold #bfa15c, gold_deep #a87d1f, navy #0a1733 (radial to #13284f),
 * ink #0c1f3f, pearl #fbfaf7. Cormorant serif headings (serif.className),
 * Arabic via font-arabic-display. Each page renders its own LuxeHeader/LuxeFooter.
 *
 * Real passport data: src/data/passport-index.ts (passportRecords +
 * passportIndexStats). Flags via @/components/Countries/Flag.
 */

export const GOLD = "#bfa15c";
export const GOLD_DEEP = "#a87d1f";
export const NAVY = "#0a1733";
export const NAVY_2 = "#13284f";

// Cormorant serif — defined module-side so both server pages and client
// components that import this shell share the exact same headline font.
export const passportSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
export const serifClass = passportSerif.className;

export type PassportStats = {
  snapshotLabel: string;
  sourceLabel: string;
  trackedPassports: number;
  trackedDestinations: number;
  topScore: number;
  lowestScore: number;
  mobilityGap: number;
};

type SectionId = "overview" | "ranking" | "compare" | "my-passport" | "improve" | "methodology";

type SectionLink = {
  id: SectionId;
  label: string;
  href: string;
  summary: string;
  icon: ComponentType<{ className?: string }>;
};

export const passportSectionLinks: SectionLink[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/passport-index",
    summary: "Visual snapshot and client journey.",
    icon: Globe2,
  },
  {
    id: "ranking",
    label: "Ranking",
    href: "/passport-index/ranking",
    summary: "Search the passport strength table.",
    icon: BarChart3,
  },
  {
    id: "compare",
    label: "Compare",
    href: "/passport-index/compare",
    summary: "Side-by-side mobility gap.",
    icon: Compass,
  },
  {
    id: "my-passport",
    label: "My Passport",
    href: "/passport-index/my-passport",
    summary: "Start from a client passport.",
    icon: MapPinned,
  },
  {
    id: "improve",
    label: "Improve",
    href: "/passport-index/improve",
    summary: "Turn ranking into route options.",
    icon: Route,
  },
  {
    id: "methodology",
    label: "Methodology",
    href: "/passport-index/methodology",
    summary: "Sources, scoring, and caution notes.",
    icon: FileCheck2,
  },
];

export function scoreWidth(score: number, topScore: number) {
  return `${Math.max(5, Math.round((score / topScore) * 100))}%`;
}

export function bandClass(band: PassportRecord["band"]) {
  if (band === "Elite access") return "border-[#bfa15c]/60 bg-[#bfa15c]/15 text-[#bfa15c]";
  if (band === "High access") return "border-[#bfa15c]/45 bg-[#bfa15c]/10 text-[#bfa15c]/90";
  if (band === "Strategic mobility") return "border-white/20 bg-white/[0.06] text-white/80";
  return "border-white/15 bg-white/[0.04] text-white/60";
}

export function regionClass(_region: PassportRegion) {
  return "border border-white/15 bg-white/[0.06] text-white/75";
}

export function passportProfileHref(record: PassportRecord) {
  return `/passport-index/passport/${record.code.toLowerCase()}`;
}

export function getRecordByCode(records: PassportRecord[], code: string) {
  return records.find((record) => record.code.toLowerCase() === code.toLowerCase());
}

export function PassportSectionNav({ active }: { active: SectionId }) {
  return (
    <nav
      aria-label="Passport index sections"
      className="sticky top-0 z-20 border-b border-white/10 bg-[#0a1733]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-screen-2xl overflow-x-auto">
        {passportSectionLinks.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "group flex min-w-[90px] flex-1 flex-col items-center gap-1.5 border-b-2 px-3 py-4 text-center transition-colors duration-150 md:min-w-[120px] md:py-5",
                isActive
                  ? "border-[#bfa15c] bg-white/[0.05]"
                  : "border-transparent hover:border-[#bfa15c]/45 hover:bg-white/[0.04]",
              ].join(" ")}
            >
              {/* Icon badge */}
              <span
                className={[
                  "flex size-8 items-center justify-center rounded-lg transition-colors duration-150 md:size-9",
                  isActive
                    ? "bg-[#bfa15c] text-[#0c1f3f]"
                    : "bg-white/[0.06] text-white/45 group-hover:bg-[#bfa15c]/15 group-hover:text-[#bfa15c]",
                ].join(" ")}
              >
                <Icon className="size-3.5 md:size-4" aria-hidden="true" />
              </span>

              {/* Label */}
              <span
                className={[
                  "text-[11.5px] font-semibold leading-none md:text-[12.5px]",
                  isActive ? "text-[#bfa15c]" : "text-white/70 group-hover:text-[#bfa15c]",
                ].join(" ")}
              >
                {item.label}
              </span>

              {/* Summary — visible md+ */}
              <span className="hidden text-[10px] leading-[1.4] text-white/35 lg:block">
                {item.summary}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function PassportIndexShell({
  active,
  eyebrow,
  title,
  description,
  children,
}: {
  active: SectionId;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#0a1733] text-[#eef3fb]">
      <LuxeHeader serifClass={serifClass} />

      <main className="bg-[#0a1733] text-[#eef3fb]">
        {/* ── Hero header — centered ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, ${NAVY_2} 0%, ${NAVY} 62%)` }}
        >
          {/* Subtle branded background */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(191,161,92,0.14),transparent_70%)]" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(circle, #bfa15c 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-screen-2xl px-4 pb-12 pt-28 text-center md:px-6 md:pb-16 md:pt-36">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#bfa15c]/40 bg-[#bfa15c]/[0.1] px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#bfa15c]">
              <Sparkles className="size-3.5 text-[#bfa15c]" aria-hidden="true" />
              {eyebrow}
            </div>

            {/* Main heading */}
            <h1
              className={`${serifClass} mx-auto mt-6 max-w-[820px] font-medium leading-[1.08] tracking-tight text-white`}
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.8rem)" }}
            >
              {title}
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-[620px] text-[1.0625rem] leading-[1.85] text-white/65">
              {description}
            </p>

            {/* Gold accent rule */}
            <div
              className="mx-auto mt-9 h-px w-14 bg-gradient-to-r from-transparent via-[#bfa15c] to-transparent"
              aria-hidden="true"
            />
          </div>
        </section>

        <PassportSectionNav active={active} />
        {children}
      </main>

      <LuxeFooter serifClass={serifClass} />
    </div>
  );
}

export function PassportBookVisual({ featured }: { featured?: PassportRecord }) {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px]">
      <div className="absolute left-[12%] top-[14%] h-[70%] w-[56%] rotate-[-8deg] rounded-lg border border-[#bfa15c]/60 bg-[#0c1f3f] shadow-2xl shadow-black/50 transition duration-500 motion-safe:group-hover:rotate-[-6deg]">
        <div className="absolute inset-4 rounded-md border border-[#bfa15c]/40" />
        <div className="absolute inset-x-10 top-12 h-px bg-[#bfa15c]/40" />
        <div className="absolute left-1/2 top-[30%] flex size-20 -translate-x-1/2 items-center justify-center rounded-full border border-[#bfa15c]/60 bg-[#0a1733]">
          {featured ? <Flag code={featured.code} size={48} /> : null}
        </div>
        <div className="absolute inset-x-10 bottom-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#bfa15c]">XIPHIAS</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-[#bfa15c]/80">Global Mobility</p>
        </div>
        <div className="absolute inset-y-0 left-8 w-px bg-white/10" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute -left-24 top-0 h-full w-24 rotate-12 bg-[#bfa15c]/10 motion-safe:animate-shine" />
        </div>
      </div>

      <div className="absolute right-[6%] top-[24%] h-[58%] w-[46%] rotate-[7deg] rounded-lg border border-[#bfa15c]/40 bg-[#0c1f3f] p-4 shadow-2xl shadow-black/40 transition duration-500 motion-safe:group-hover:rotate-[5deg]">
        <div className="h-full rounded-md border border-[#bfa15c]/35 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bfa15c]">Mobility profile</span>
            <span className="rounded-full border border-[#bfa15c]/40 bg-[#bfa15c]/[0.1] px-2 py-1 text-[10px] font-semibold text-[#bfa15c]">
              {featured?.code ?? "XP"}
            </span>
          </div>
          <div className="mt-5 grid grid-cols-[72px_1fr] gap-4">
            <div className="aspect-[3/4] rounded-md border border-[#bfa15c]/35 bg-white/[0.04] p-2">
              <div className="mx-auto mt-2 size-8 rounded-full bg-[#bfa15c]/30" />
              <div className="mx-auto mt-3 h-14 w-12 rounded-t-full bg-[#bfa15c]/25" />
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-white/15" />
              <div className="h-2 w-4/5 rounded-full bg-white/15" />
              <div className="h-2 w-3/5 rounded-full bg-white/15" />
              <div className="mt-4 rounded-md bg-[#bfa15c]/15 px-3 py-2 text-center text-sm font-semibold text-[#bfa15c]">
                {featured?.score ?? 192}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <span className="h-8 rounded border border-[#bfa15c]/35 bg-white/[0.03]" />
            <span className="h-8 rounded border border-[#bfa15c]/35 bg-white/[0.03]" />
            <span className="h-8 rounded border border-[#bfa15c]/35 bg-white/[0.03]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScorePill({ score }: { score: number }) {
  return (
    <span className="inline-flex min-w-14 items-center justify-center rounded-full bg-[#bfa15c] px-3 py-1 text-sm font-semibold text-[#0c1f3f]">
      {score}
    </span>
  );
}

export function PassportSourceNote() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-12 md:px-6">
      <div className="grid gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 text-sm leading-7 text-white/65 shadow-xl shadow-black/30 backdrop-blur-sm lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className={`${serifClass} text-xl font-medium text-white`}>Data position</h2>
          <p className="mt-2">
            This is a XIPHIAS advisory presentation layer. It uses a neutral public mobility snapshot and adds route-planning context for residence, citizenship, family, and risk strategy.
          </p>
        </div>
        <div>
          <h2 className={`${serifClass} text-xl font-medium text-white`}>Important caution</h2>
          <p className="mt-2">
            Passport ranking is not legal advice. Visa rules, sanctions, source-of-funds checks, and program rules can change, so an advisor must verify the latest details before decisions.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#bfa15c]/40 px-3 py-1 text-xs font-semibold text-[#bfa15c]">
              XIPHIAS advisory layer
            </span>
            <span className="rounded-full border border-[#bfa15c]/40 px-3 py-1 text-xs font-semibold text-[#bfa15c]">
              Staff verification required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RouteCard({
  icon,
  title,
  description,
  href,
  cta = "Open",
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  cta?: string;
}) {
  const Icon = icon;

  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#bfa15c]/55 hover:bg-white/[0.06]"
    >
      <span className="flex size-11 items-center justify-center rounded-md bg-[#bfa15c]/15 text-[#bfa15c] transition group-hover:bg-[#bfa15c] group-hover:text-[#0c1f3f]">
        <Icon className="size-5" />
      </span>
      <h3 className={`${serifClass} mt-4 text-lg font-medium text-white`}>{title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-white/60">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#bfa15c]">
        {cta}
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function PassportMiniCard({ record, stats }: { record: PassportRecord; stats: PassportStats }) {
  return (
    <Link
      href={passportProfileHref(record)}
      className="group rounded-2xl border border-white/12 bg-white/[0.04] p-4 shadow-lg shadow-black/20 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#bfa15c]/55 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Flag code={record.code} size={34} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#bfa15c]">{record.rank}</p>
            <h3 className={`${serifClass} mt-1 text-lg font-medium text-white`}>{record.country}</h3>
            <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${regionClass(record.region)}`}>
              {record.region}
            </span>
          </div>
        </div>
        <ScorePill score={record.score} />
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#bfa15c]" style={{ width: scoreWidth(record.score, stats.topScore) }} />
      </div>
      <p className="mt-3 text-sm leading-6 text-white/60">{record.xiphiasLens}</p>
    </Link>
  );
}

export const indexValueCards = [
  {
    icon: Landmark,
    title: "Rank",
    description: "Shows current travel access strength.",
  },
  {
    icon: ShieldCheck,
    title: "Risk",
    description: "Adds program, compliance, and document review.",
  },
  {
    icon: BookOpen,
    title: "Route",
    description: "Connects ranking to residence or citizenship actions.",
  },
];
