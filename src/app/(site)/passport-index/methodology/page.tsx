import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Compass,
  FileCheck2,
  RefreshCw,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { PassportIndexShell, PassportSourceNote, serifClass } from "@/components/PassportIndex/PassportIndexShared";

const SITE_URL = "https://www.xiphiasimmigration.com";

export const metadata: Metadata = {
  title: "Passport Power Methodology - XIPHIAS",
  description:
    "Understand the XIPHIAS passport power presentation layer, source notes, advisory limitations, and how passport scores are used in mobility planning.",
  alternates: { canonical: "/passport-index/methodology" },
  openGraph: {
    title: "Passport Power Methodology - XIPHIAS",
    description: "Source notes, ranking limits, and XIPHIAS advisory interpretation for passport mobility.",
    url: `${SITE_URL}/passport-index/methodology`,
    siteName: "XIPHIAS Immigration",
    type: "website",
    images: ["/xiphias-immigration.png"],
  },
};

export const revalidate = 86400;

const principles = [
  {
    icon: BarChart3,
    title: "Public mobility score",
    body: "The score is used as a travel-access signal based on public passport power information. It reflects the number of destinations accessible without a prior visa.",
  },
  {
    icon: Compass,
    title: "XIPHIAS advisory lens",
    body: "The route suggestion considers family goals, investment appetite, physical presence, risk, and implementation fit — beyond what the score alone can show.",
  },
  {
    icon: UserCheck,
    title: "Human verification",
    body: "No passport ranking should be treated as legal, tax, or investment advice without staff review. An advisor must confirm the latest rules before any decision.",
  },
  {
    icon: RefreshCw,
    title: "Update discipline",
    body: "The launch version is a curated static snapshot. A licensed feed or admin-managed update workflow can replace it later for real-time accuracy.",
  },
];

const pillars = [
  {
    icon: Scale,
    color: "text-[#bfa15c]",
    bg: "bg-[#bfa15c]/15",
    title: "Ranking",
    body: "Useful for travel access comparison and initial client positioning.",
  },
  {
    icon: ShieldCheck,
    color: "text-[#bfa15c]",
    bg: "bg-[#bfa15c]/15",
    title: "Risk",
    body: "Requires source-of-funds, sanctions screening, and compliance review.",
  },
  {
    icon: RefreshCw,
    color: "text-[#bfa15c]",
    bg: "bg-[#bfa15c]/15",
    title: "Updates",
    body: "Should be refreshed through staff-approved content updates only.",
  },
];

const limits = [
  "Visa rules can change without notice — always verify before client advice.",
  "Sanctions, source-of-funds, and background checks are not captured in a score.",
  "A high score does not mean a client is eligible for a specific program.",
  "Family, tax, and compliance factors require separate advisor review.",
];

export default function PassportMethodologyPage() {
  return (
    <PassportIndexShell
      active="methodology"
      eyebrow="Methodology"
      title="A transparent passport power layer for advisory conversations."
      description="This section explains what the XIPHIAS Passport Power displays, how it should be interpreted, and why advisor review remains mandatory."
    >

      {/* ── Principles ── */}
      <section className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bfa15c]">How it works</p>
          <h2 className={`${serifClass} mt-1.5 text-xl font-medium text-white`}>Four principles behind the index</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:border-[#bfa15c]/55 hover:bg-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-[#bfa15c]/15 text-[#bfa15c]">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#bfa15c] text-[10px] font-semibold text-[#0c1f3f]">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-[13.5px] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 flex-1 text-[12.5px] leading-[1.65] text-white/60">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── How to use + pillars ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-8 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">

          {/* Main card */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#bfa15c]/15 text-[#bfa15c]">
                <FileCheck2 className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h2 className={`${serifClass} text-lg font-medium text-white`}>How XIPHIAS should use this page</h2>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-white/60">
                  The page is built for client education and presentation. It helps visitors browse mobility strength, compare passports, and enter the correct XIPHIAS workflow. It does not replace eligibility, legal, tax, due-diligence, or document review.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
                    <span className={`flex size-8 items-center justify-center rounded-lg ${p.bg}`}>
                      <Icon className={`size-4 ${p.color}`} aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 text-[13px] font-semibold text-white">{p.title}</h3>
                    <p className="mt-1.5 text-[12px] leading-[1.55] text-white/60">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <Link
              href="/passport-index/ranking"
              className="group flex flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-4 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#bfa15c]/55 hover:bg-white/[0.06]"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#bfa15c]/15 text-[#bfa15c] transition group-hover:bg-[#bfa15c] group-hover:text-[#0c1f3f]">
                <Scale className="size-4" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-[13.5px] font-semibold text-white">Ranking table</h3>
              <p className="mt-1 text-[12px] leading-[1.55] text-white/60">Search country ranks and open individual passport profiles.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#bfa15c]">
                Open ranking <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/x-hub/x-passport"
              className="group flex flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-4 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#bfa15c]/55 hover:bg-white/[0.06]"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#bfa15c]/15 text-[#bfa15c] transition group-hover:bg-[#bfa15c] group-hover:text-[#0c1f3f]">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-[13.5px] font-semibold text-white">Advisor workflow</h3>
              <p className="mt-1 text-[12px] leading-[1.55] text-white/60">Move a serious inquiry into eligibility, documents, and X-Hub.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#bfa15c]">
                Open X-Hub <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Important limits ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-8 md:px-6">
        <div className="rounded-2xl border border-[#bfa15c]/35 bg-[#bfa15c]/[0.08] p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#bfa15c]/20">
              <AlertTriangle className="size-4 text-[#bfa15c]" aria-hidden="true" />
            </span>
            <h2 className="text-[13.5px] font-semibold text-white">Important limitations to communicate to clients</h2>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {limits.map((limit) => (
              <div key={limit} className="flex gap-2.5 rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#bfa15c]" />
                <p className="text-[12.5px] leading-[1.6] text-white/70">{limit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future note + CTA ── */}
      <section className="mx-auto max-w-screen-2xl px-4 pb-10 md:px-6">
        <div className="grid gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/45">Production note</p>
            <h2 className="mt-1 text-[14px] font-semibold text-white">Future upgrade path</h2>
            <p className="mt-1.5 text-[12.5px] leading-[1.65] text-white/60">
              For production, this can be connected to an admin-managed passport dataset, licensed index source, scheduled review task, and content approval workflow — keeping the public page fast while maintaining accuracy.
            </p>
          </div>
          <Link
            href="/passport-index"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2.5 text-[13px] font-semibold text-[#bfa15c] transition hover:border-[#bfa15c] hover:bg-[#bfa15c]/10"
          >
            Back to overview <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <PassportSourceNote />
    </PassportIndexShell>
  );
}
