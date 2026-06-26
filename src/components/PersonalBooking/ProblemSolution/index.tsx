// src/components/PersonalBooking/ProblemSolution/index.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldCheck,
  ClipboardList,
  FileCheck2,
  Globe2,
  Landmark,
  TimerReset,
  BadgeCheck,
  Banknote,
  Building2,
  Scale,
  FileText,
  Fingerprint,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

/**
 * ProblemSolutionCompare (HNI edition)
 * - Tailored for HNIs: RBI/CBI, corporate mobility, and high-net-worth skilled routes
 * - Mobile-first; md+ shows side-by-side rows
 * - Designed for paid booking pages: includes a deliverables box ("What you get")
 * - Neutral, compliance-first copy aligned with IMC/FATF expectations
 */

type Pair = {
  id: string;
  problem: { title: string; desc: string; tag?: string; icon?: React.ReactNode };
  solution: { title: string; desc: string; note?: string; icon?: React.ReactNode };
};

const PAIRS: Pair[] = [
  {
    id: "pathway-fit",
    problem: {
      title: "Program noise, shifting rules, and one-size-fits-all advice",
      desc:
        "HNI families face a maze of options (RBI/CBI, entrepreneur, skilled, family) with frequent policy changes and conflicting market narratives.",
      tag: "Strategy Risk",
      icon: <Globe2 className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "IMC-Aligned Discovery & Dual-Track Strategy",
      desc:
        "We independently shortlist jurisdictions to design a primary and contingency route, whether fund, investment, or skills-based, so you stay agile when regulations evolve.",
      note: "Keeps optionality while avoiding dead-ends.",
      icon: <ShieldCheck className="h-5 w-5 text-gold" />,
    },
  },
  {
    id: "sof-aml",
    problem: {
      title: "Complex Source-of-Funds (SoF) & AML/KYC scrutiny",
      desc:
        "Layered wealth structures, private equity exits, trusts, and family holdings often trigger extended due diligence reviews, PEP checks, and compliance slowdowns across jurisdictions.",
      tag: "Due-Diligence",
      icon: <Fingerprint className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "Forensic SoF Mapping & Pre-Due-Diligence File",
      desc:
        "We create regulator-ready documentation that traces fund origins, ownership layers, and transaction flows aligned with IMC and FATF standards to minimize due-diligence friction.",
      note: "Reduces risk of delays and regulatory escalations.",
      icon: <FileCheck2 className="h-5 w-5 text-gold" />,
    },
  },
  {
    id: "investment-execution",
    problem: {
      title: "Capital risk in complex instruments & fund mechanics",
      desc:
        "Instrument complexity and opaque fund mechanics, escrow terms, side letters, and redemption clauses can expose capital to lock-ups or liquidity delays, especially in restricted real-estate routes.",
      tag: "Capital Risk",
      icon: <Banknote className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "Policy-Compliant Structuring & Risk Brief",
      desc:
        "We align your investment route with current program policy, outline key risks around governance, liquidity, and fees, and coordinate independent counsel for escrow and subscription review.",
      note: "Compliance-focused; no investment advice.",
      icon: <Scale className="h-5 w-5 text-gold" />,
    },
  },
  {
    id: "tax-residency",
    problem: {
      title: "Tax & reporting risk",
      desc:
        "Unplanned presence days, tie-breaker rules, and global reporting frameworks (CRS, AEOI) can trigger unintended tax residency or dual reporting for mobile HNI families.",
      tag: "Tax/Reporting",
      icon: <Landmark className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "Pre-Landing Tax Planning with Accredited Advisors",
      desc:
        "We identify tax-residency implications early, coordinate specialist counsel on domicile, timing, and reporting, and structure travel or relocation plans to prevent cross-jurisdiction exposure.",
      note: "Sequencing prevents accidental tax residency.",
      icon: <FileText className="h-5 w-5 text-gold" />,
    },
  },
  {
    id: "governance-family",
    problem: {
      title: "Family & dependent planning",
      desc:
        "Cut-off ages, dependency rules, and education timelines often misalign with the chosen migration route, while succession and estate considerations may be overlooked.",
      tag: "Family",
      icon: <GraduationCap className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "Whole-Household Routing & Documentation Map",
      desc:
        "We blueprint eligibility across family members, align education and relocation timelines, and flag succession or estate touchpoints for counsel review.",
      note: "Prevents last-minute dependent issues.",
      icon: <ClipboardList className="h-5 w-5 text-gold" />,
    },
  },
  {
    id: "corporate-mobility",
    problem: {
      title: "Corporate mobility & compliance risk",
      desc:
        "C-suite relocations, intra-company transfers, and remote leadership can trigger permanent establishment exposure, payroll gaps, or licensing breaches across jurisdictions.",
      tag: "Corporate",
      icon: <BriefcaseBusiness className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "Business-Case Kits & Host-Country Compliance",
      desc:
        "We prepare visa-fit business cases, coordinate with local counsel on entity, PE, and payroll checks, and stage entry to keep licenses and reporting aligned.",
      note: "Safeguards both executive and corporate interests.",
      icon: <Building2 className="h-5 w-5 text-gold" />,
    },
  },
  {
    id: "timelines",
    problem: {
      title: "Missed timelines & expiring documents",
      desc:
        "Critical documents—PCCs, bank letters, medicals—can lapse or arrive out of sequence, causing rework and delays in processing.",
      tag: "Execution",
      icon: <TimerReset className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "Milestone Calendar with Proactive Refreshes",
      desc:
        "We maintain a live tracker for time-sensitive documents, file early, and respond promptly to clarifications until approval and landing.",
      note: "Reduces idle time and duplicate effort.",
      icon: <ShieldCheck className="h-5 w-5 text-gold" />,
    },
  },
  {
    id: "misrepresentation",
    problem: {
      title: "Unlicensed intermediaries & over-promising",
      desc:
        "Informal advisors and unverified claims expose HNIs to application refusals and reputational risk.",
      tag: "Governance",
      icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
    },
    solution: {
      title: "IMC-Certified Leadership & Transparent Scope",
      desc:
        "All engagements follow clear documentation, compliant marketing, and ethics-first guidance under IMC’s code of conduct.",
      note: "Led by a FIMC-certified expert.",
      icon: <BadgeCheck className="h-5 w-5 text-gold" />,
    },
  },
];

const GOLD = "#bfa15c";
const NAVY = "#0a1733";

export default function ProblemSolutionCompare({
  className = "",
  serifClass = "",
}: {
  className?: string;
  serifClass?: string;
}) {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5">
      <section
        className={[
          "relative w-full py-16 sm:py-20",
          "overflow-hidden",
          className,
        ].join(" ")}
        style={{ background: NAVY, color: "#fff" }}
        aria-labelledby="ps-compare-title"
      >
        {/* background accents — gold guiding glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(191,161,92,0.12)" }} />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(191,161,92,0.07)" }} />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4">
          {/* header */}
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              Problems we solve
            </span>
            <h2
              id="ps-compare-title"
              className={`${serifClass} mt-3 text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.05]`}
            >
              Built for{" "}
              <span className="italic" style={{ color: GOLD }}>
                HNI families &amp; leaders
              </span>
              : problems we solve—side by side
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/60">
              At XIPHIAS Immigration, we provide a compliance-first pathway aligned with Investment
              Migration Council (IMC) standards. Our approach blends strategy, due diligence, and
              coordinated execution, guiding clients from discovery to landing with clarity and
              confidence.
            </p>
          </div>

          {/* rows */}
          <div className="mt-10 space-y-4">
            {PAIRS.map((row) => (
              <Row key={row.id} pair={row} />
            ))}
          </div>

          {/* Deliverables: What they get in a paid consultation */}
          <DeliverablesBox serifClass={serifClass} />

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Book your paid strategy call
            </Link>
            <p className="mt-3 text-xs text-white/45">
              Note: We do not provide investment or tax advice; we coordinate with licensed
              advisors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------- Row component ----------------------------- */

function Row({ pair }: { pair: Pair }) {
  const { problem, solution } = pair;
  return (
    <article
      className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl"
      style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
      role="group"
      aria-label={`${problem.title} vs ${solution.title}`}
    >
      {/* Problem side */}
      <div
        className="p-5 sm:p-6 border-b md:border-b-0 md:border-r"
        style={{ borderColor: "rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.015)" }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Problem
          </span>
          {problem.tag && (
            <span
              className="ml-2 rounded-full px-2 py-0.5 text-[11px] text-white/70"
              style={{ border: "1px solid rgba(191,161,92,0.3)", background: "rgba(255,255,255,0.03)" }}
            >
              {problem.tag}
            </span>
          )}
        </div>
        <h3 className="mt-2 text-[17px] sm:text-lg font-semibold text-white">
          {problem.title}
        </h3>
        <p className="mt-2 text-[15px] text-white/55">
          {problem.desc}
        </p>
        {problem.icon && (
          <div
            className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/70"
            style={{ border: "1px solid rgba(191,161,92,0.3)", background: "rgba(255,255,255,0.03)" }}
          >
            {problem.icon}
            Risk to timelines/compliance
          </div>
        )}
      </div>

      {/* Solution side */}
      <div className="p-5 sm:p-6" style={{ background: "rgba(191,161,92,0.06)" }}>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70">
            <ShieldCheck className="h-4 w-4" style={{ color: GOLD }} />
            Solution
          </span>
        </div>
        <h3 className="mt-2 text-[17px] sm:text-lg font-semibold text-white">
          {solution.title}
        </h3>
        <p className="mt-2 text-[15px] text-white/55">
          {solution.desc}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {solution.icon && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/70"
              style={{ border: "1px solid rgba(191,161,92,0.3)", background: "rgba(255,255,255,0.03)" }}
            >
              {solution.icon}
              Implemented by experts
            </span>
          )}
          {solution.note && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/70"
              style={{ border: "1px solid rgba(191,161,92,0.3)", background: "rgba(255,255,255,0.03)" }}
            >
              <BadgeCheck className="h-4 w-4" style={{ color: GOLD }} />
              {solution.note}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* --------------------------- Deliverables component --------------------------- */

function DeliverablesBox({ serifClass = "" }: { serifClass?: string }) {
  const points: { icon: React.ReactNode; title: string; desc: string }[] = [
    {
      icon: <ClipboardList className="h-4 w-4 text-gold" />,
      title: "Primary + contingency route",
      desc:
        "A short-listed primary program with a ready-to-pivot Plan B that fits your timelines and risk profile.",
    },
    {
      icon: <FileCheck2 className="h-4 w-4 text-gold" />,
      title: "DD-ready document map",
      desc:
        "Program-specific checklist, SoF narrative outline, and translation/notarization plan to reduce queries.",
    },
    {
      icon: <FileText className="h-4 w-4 text-gold" />,
      title: "Timeline & milestone calendar",
      desc:
        "Presence-day guidance, expiring docs, and filing windows organized into a live milestone schedule.",
    },
    {
      icon: <Scale className="h-4 w-4 text-gold" />,
      title: "Risk & assumption brief",
      desc:
        "A plain-English summary of policy dependencies and operational risks; we coordinate legal/tax counsel where required.",
    },
  ];

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 mt-10"
      style={{ border: "1px solid rgba(191,161,92,0.3)", background: "rgba(255,255,255,0.03)" }}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD }}>
        <BadgeCheck className="h-4 w-4" style={{ color: GOLD }} />
        What you get in a paid strategy call
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {points.map((p, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{ background: "rgba(191,161,92,0.1)", boxShadow: "inset 0 0 0 1px rgba(191,161,92,0.25)" }}
            >
              {p.icon}
            </div>
            <div>
              <div className={`${serifClass} text-[1.05rem] font-medium text-white`}>
                {p.title}
              </div>
              <div className="text-[13px] text-white/55">
                {p.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}