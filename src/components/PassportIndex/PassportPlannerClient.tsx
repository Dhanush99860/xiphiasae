"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Home,
  MapPin,
  Plane,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { PassportRecord } from "@/data/passport-index";
import Flag from "@/components/Countries/Flag";
import {
  bandClass,
  passportProfileHref,
  PassportIndexShell,
  PassportMiniCard,
  PassportSourceNote,
  regionClass,
  scoreWidth,
  serifClass,
  type PassportStats,
} from "@/components/PassportIndex/PassportIndexShared";

type GoalId = "travel" | "education" | "business" | "plan-b" | "eu-life";

const goals: Array<{ id: GoalId; label: string; description: string; icon: typeof Plane }> = [
  { id: "travel",    label: "Travel access",       description: "Increase visa-free movement for family and business travel.",            icon: Plane },
  { id: "education", label: "Children's education", description: "Plan residence and long-term settlement around schooling.",              icon: GraduationCap },
  { id: "business",  label: "Business expansion",   description: "Improve access for company setup, investor visas, or founder mobility.", icon: BriefcaseBusiness },
  { id: "plan-b",    label: "Family Plan B",        description: "Build a second-residence or citizenship safety route.",                  icon: ShieldCheck },
  { id: "eu-life",   label: "EU lifestyle",         description: "Explore Schengen residence, eventual citizenship, and low-presence options.", icon: Home },
];

type Props = { records: PassportRecord[]; stats: PassportStats };

function recommendationFor(goal: GoalId, record: PassportRecord) {
  if (goal === "education") return {
    eyebrow: "Education route",
    title: "Start with residence and schooling fit.",
    body: "Prioritize Canada, Europe, UK, Australia, or US-linked routes where school access, parent status, timeline, and document readiness can be mapped cleanly.",
    href: "/eligibility", cta: "Check eligibility",
    checks: ["School enrollment eligibility per country", "Parent residence rights and stay obligations", "Language and age-entry requirements", "Timeline from application to enrollment"],
  };
  if (goal === "business") return {
    eyebrow: "Corporate mobility",
    title: "Start with corporate mobility and investor residence.",
    body: "Compare UAE, Portugal, US, Canada, and EU company routes against ownership structure, funds, hiring plan, and travel needs.",
    href: "/corporate", cta: "View corporate routes",
    checks: ["Company structure and ownership compatibility", "Investor visa thresholds per country", "Source of funds documentation depth", "Founder travel frequency vs. stay requirements"],
  };
  if (goal === "plan-b") return {
    eyebrow: "Citizenship & residency",
    title: "Start with a second-residence safety route.",
    body: "Shortlist residence and citizenship options by physical presence, due diligence, family inclusion, timeline, and total cost.",
    href: "/citizenship", cta: "View citizenship routes",
    checks: ["Physical presence obligations per program", "Family inclusion and dependent eligibility", "Due diligence depth and source-of-funds review", "Program timeline: residency → citizenship"],
  };
  if (goal === "eu-life") return {
    eyebrow: "EU residency",
    title: "Start with Europe residence routes.",
    body: "Look at Portugal, Greece, Spain, Malta, Hungary, Latvia, and Switzerland depending on investment appetite, stay requirement, and tax planning.",
    href: "/residency", cta: "View residency routes",
    checks: ["Investment threshold varies: €250k–€500k+", "Minimum annual stay obligations by country", "Tax residence and reporting implications", "Eventual citizenship eligibility timeline"],
  };
  if (record.score >= 170) return {
    eyebrow: "High-access passport",
    title: "Your passport is already high access.",
    body: "The next discussion should focus less on visa-free score and more on tax residence, lifestyle, asset protection, and family optionality.",
    href: "/personal-booking", cta: "Talk to advisor",
    checks: ["Tax residence optimisation opportunities", "Asset protection and holding structure", "Lifestyle and low-presence route options", "Family optionality and long-term planning"],
  };
  return {
    eyebrow: "Mobility upgrade",
    title: "A mobility upgrade may be meaningful.",
    body: "Use residence or citizenship planning to improve travel access, but keep due diligence, source of funds, and timeline realistic from the start.",
    href: "/passport-index/improve", cta: "See improvement routes",
    checks: ["Due diligence readiness and background check", "Source of funds clarity and documentation", "Realistic timeline: 12–36 months typical", "Program eligibility pre-check before applying"],
  };
}

export default function PassportPlannerClient({ records, stats }: Props) {
  const [passportCode, setPassportCode] = useState("IN");
  const [goal, setGoal] = useState<GoalId>("plan-b");

  const selected   = records.find((r) => r.code === passportCode) ?? records[0];
  const rec        = useMemo(() => recommendationFor(goal, selected), [goal, selected]);
  const targetRecs = useMemo(() => records.filter((r) => r.score > selected.score).slice(0, 3), [records, selected]);

  return (
    <PassportIndexShell
      active="my-passport"
      eyebrow="My passport"
      title="Start from the client profile, not from a generic ranking."
      description="Choose the current passport and primary goal. The page gives a concise direction and the next XIPHIAS action."
    >
      <section className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">

          {/* ══ LEFT — profile builder ══ */}
          <aside className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/30 backdrop-blur-sm">

            {/* Header */}
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">My passport</p>
              <h2 className={`${serifClass} mt-0.5 text-lg font-medium text-white`}>Build your profile</h2>
            </div>

            {/* Passport select */}
            <div>
              <label htmlFor="planner-passport" className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Current passport
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2">
                  <Flag code={selected.code} size={20} />
                </span>
                <select
                  id="planner-passport"
                  value={passportCode}
                  onChange={(e) => setPassportCode(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-white/15 bg-white/[0.05] py-2.5 pl-9 pr-8 text-[13px] font-semibold text-white outline-none focus:border-[#bfa15c] focus:ring-1 focus:ring-[#bfa15c] [&>option]:bg-[#0c1f3f] [&>option]:text-white"
                >
                  {records.map((r) => (
                    <option key={r.code} value={r.code}>{r.country} · {r.score}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-white/45" aria-hidden="true" />
              </div>

              {/* Passport mini stats */}
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                <div className="rounded-lg border border-white/12 bg-white/[0.04] px-2 py-2 text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">Code</p>
                  <p className="mt-0.5 text-[12px] font-semibold text-white">{selected.code}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-white/[0.04] px-2 py-2 text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">Rank</p>
                  <p className="mt-0.5 text-[12px] font-semibold text-white">{selected.rank}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-white/[0.04] px-2 py-2 text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">Score</p>
                  <p className="mt-0.5 text-[12px] font-semibold text-[#bfa15c]">{selected.score}</p>
                </div>
              </div>

              {/* Score bar */}
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#bfa15c] transition-all duration-500" style={{ width: scoreWidth(selected.score, stats.topScore) }} />
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className={`rounded-full border px-2 py-0.5 text-[9.5px] font-semibold ${bandClass(selected.band)}`}>{selected.band}</span>
                <span className="text-[10px] text-white/40 tabular-nums">{selected.score} / {stats.topScore}</span>
              </div>
            </div>

            <div className="border-t border-white/12" />

            {/* Goal list — compact: only active shows description */}
            <div>
              <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/70">Primary goal</p>
              <div className="grid gap-1.5">
                {goals.map((item) => {
                  const Icon = item.icon;
                  const active = goal === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id)}
                      className={[
                        "flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all duration-150",
                        active ? "border-[#bfa15c] bg-[#bfa15c]/[0.1]" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      <span className={[
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md transition-colors",
                        active ? "bg-[#bfa15c] text-[#0c1f3f]" : "bg-white/[0.06] text-[#bfa15c]",
                      ].join(" ")}>
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[12.5px] font-semibold leading-tight ${active ? "text-[#bfa15c]" : "text-white"}`}>
                          {item.label}
                        </span>
                        {active && (
                          <span className="mt-1 block text-[11px] leading-[1.5] text-white/60">
                            {item.description}
                          </span>
                        )}
                      </span>
                      {active && <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-[#bfa15c]" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Talk to advisor CTA */}
            <Link
              href="/personal-booking"
              className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-[12.5px] font-semibold text-[#bfa15c] transition hover:border-[#bfa15c] hover:bg-[#bfa15c]/10"
            >
              Talk to an advisor <ArrowRight className="size-3.5" />
            </Link>
          </aside>

          {/* ══ RIGHT — results ══ */}
          <div className="flex flex-col gap-5">

            {/* Direction card */}
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] shadow-xl shadow-black/30 backdrop-blur-sm overflow-hidden">

              {/* Passport bar */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/12 bg-white/[0.05] px-5 py-3">
                <MapPin className="size-3.5 text-[#bfa15c]" aria-hidden="true" />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/55">Current passport</span>
                <span className="h-3 w-px bg-white/15" />
                <Flag code={selected.code} size={22} />
                <span className="text-[13px] font-semibold text-white">{selected.country}</span>
                <span className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/55">{selected.code}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${regionClass(selected.region)}`}>{selected.region}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${bandClass(selected.band)}`}>{selected.band}</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#bfa15c] px-3 py-1 text-[11.5px] font-semibold text-[#0c1f3f] tabular-nums">
                  {selected.score} <span className="font-normal opacity-70">score</span>
                </span>
              </div>

              {/* Direction body — single column */}
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-md bg-[#bfa15c]/15">
                    <TrendingUp className="size-3.5 text-[#bfa15c]" aria-hidden="true" />
                  </span>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">{rec.eyebrow}</p>
                </div>
                <h2 className={`${serifClass} mt-3 text-[1.4rem] font-medium leading-snug text-white`}>{rec.title}</h2>
                <p className="mt-2 text-[13px] leading-[1.7] text-white/60">{rec.body}</p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <Link
                    href={rec.href}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#bfa15c] px-4 py-2.5 text-[12.5px] font-semibold text-[#0c1f3f] transition hover:bg-[#d8bd78]"
                  >
                    {rec.cta} <ArrowRight className="size-3.5" />
                  </Link>
                  <Link
                    href={passportProfileHref(selected)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2.5 text-[12.5px] font-semibold text-[#bfa15c] transition hover:border-[#bfa15c] hover:bg-[#bfa15c]/10"
                  >
                    Passport profile
                  </Link>
                </div>

                {/* Key checks — 2×2 grid below CTAs */}
                <div className="mt-4 border-t border-white/12 pt-4">
                  <p className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">Key checks</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {rec.checks.map((check) => (
                      <div key={check} className="flex gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2.5">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#bfa15c]" aria-hidden="true" />
                        <p className="text-[12px] leading-[1.5] text-white/60">{check}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrades section */}
            {targetRecs.length > 0 && (
              <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/30 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">Possible upgrades</p>
                    <h2 className={`${serifClass} mt-0.5 text-lg font-medium text-white`}>Passports with higher access</h2>
                  </div>
                  <Link
                    href="/passport-index/ranking"
                    className="hidden items-center gap-1 text-[12px] font-semibold text-[#bfa15c] sm:inline-flex hover:underline"
                  >
                    Full ranking <ArrowRight className="size-3.5" />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {targetRecs.map((record) => (
                    <PassportMiniCard key={record.code} record={record} stats={stats} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <PassportSourceNote />
    </PassportIndexShell>
  );
}
