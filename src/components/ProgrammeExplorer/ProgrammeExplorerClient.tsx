"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Timer,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";

import type { ProgrammeExplorerData, ProgrammeExplorerItem } from "@/lib/programme-explorer";
import type { Vertical } from "@/lib/content/types";
import { BOOKING_ROUTE } from "@/lib/topmate";

type Inputs = {
  mode: "quick" | "deep";
  track: Vertical | "all";
  budget: number;
  timeline: number;
  family: boolean;
  presence: "any" | "low" | "moderate" | "high";
  profile: "investor" | "entrepreneur" | "professional" | "family" | "company" | "remote" | "researcher" | "student";
  priority: "speed" | "cost" | "mobility" | "stability" | "tax" | "business";
  destination: string;
  query: string;
  age: number;
  nationality: string;
  currentResidence: string;
  education: "unknown" | "high-school" | "diploma" | "bachelor" | "master" | "phd";
  yearsExperience: number;
  languageScore: number;
  netWorthUsd: number;
  sourceOfFunds: "unknown" | "salary" | "business" | "property" | "inheritance" | "gift" | "crypto";
  familyMembers: number;
  previousRefusal: boolean;
  admissibilityConcern: boolean;
  businessOwnership: boolean;
  jobOffer: boolean;
  resumeFileName: string;
  profileSummary: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactConsent: boolean;
};

type ScoredItem = ProgrammeExplorerItem & {
  fitScore: number;
  reasons: string[];
  warnings: string[];
};

const trackOptions: { value: Inputs["track"]; label: string }[] = [
  { value: "all", label: "All programmes" },
  { value: "residency", label: "Residency" },
  { value: "citizenship", label: "Citizenship" },
  { value: "corporate", label: "Corporate mobility" },
  { value: "skilled", label: "Skilled migration" },
];

const profileOptions: { value: Inputs["profile"]; label: string }[] = [
  { value: "investor", label: "Investor" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "professional", label: "Skilled professional" },
  { value: "family", label: "Family relocation" },
  { value: "company", label: "Company mobility" },
  { value: "remote", label: "Remote worker" },
  { value: "researcher", label: "Researcher / talent" },
  { value: "student", label: "Student / graduate" },
];

const priorityOptions: { value: Inputs["priority"]; label: string }[] = [
  { value: "speed", label: "Fast decision" },
  { value: "cost", label: "Lower capital" },
  { value: "mobility", label: "Passport mobility" },
  { value: "stability", label: "Low risk" },
  { value: "tax", label: "Tax/residency planning" },
  { value: "business", label: "Business expansion" },
];

const budgetOptions = [
  { value: 0, label: "No investment route" },
  { value: 100000, label: "Up to USD 100k" },
  { value: 250000, label: "Up to USD 250k" },
  { value: 500000, label: "Up to USD 500k" },
  { value: 1000000, label: "USD 1M+" },
];

const timelineOptions = [
  { value: 3, label: "0-3 months" },
  { value: 6, label: "0-6 months" },
  { value: 12, label: "0-12 months" },
  { value: 24, label: "12-24 months" },
];

const educationOptions: { value: Inputs["education"]; label: string }[] = [
  { value: "unknown", label: "Not specified" },
  { value: "high-school", label: "High school" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "PhD / Doctorate" },
];

const sourceOfFundsOptions: { value: Inputs["sourceOfFunds"]; label: string }[] = [
  { value: "unknown", label: "Not specified" },
  { value: "salary", label: "Salary / savings" },
  { value: "business", label: "Business income" },
  { value: "property", label: "Property sale" },
  { value: "inheritance", label: "Inheritance" },
  { value: "gift", label: "Gift / family support" },
  { value: "crypto", label: "Crypto / digital assets" },
];

const deepToggleOptions: {
  key: "businessOwnership" | "jobOffer" | "previousRefusal" | "admissibilityConcern";
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}[] = [
  { key: "businessOwnership", label: "Owns business / founder profile", icon: BriefcaseBusiness, color: "#d4af37" },
  { key: "jobOffer", label: "Has employer or job offer", icon: GraduationCap, color: "#d4af37" },
  { key: "previousRefusal", label: "Previous visa refusal", icon: ShieldCheck, color: "#e6c66a" },
  { key: "admissibilityConcern", label: "Criminal/admissibility concern", icon: ShieldCheck, color: "#f87171" },
];

const profileKeywords: Record<Inputs["profile"], string[]> = {
  investor: ["investment", "investor", "property", "fund", "capital", "golden", "bank deposit"],
  entrepreneur: ["business", "startup", "entrepreneur", "company", "founder", "innovation", "d2"],
  professional: ["skilled", "talent", "employment", "worker", "points", "job", "occupation"],
  family: ["family", "spouse", "dependent", "children", "settlement", "residence"],
  company: ["corporate", "company", "transfer", "sponsorship", "employer", "entity", "freezone"],
  remote: ["remote", "digital nomad", "freelancer", "low presence", "work remotely"],
  researcher: ["research", "publication", "citation", "award", "extraordinary", "talent", "o-1", "eb-1", "niw"],
  student: ["student", "study", "graduate", "university", "f-1", "j-1", "opt", "stem"],
};

const priorityKeywords: Record<Inputs["priority"], string[]> = {
  speed: ["fast", "weeks", "quick", "expedited", "streamlined"],
  cost: ["low", "affordable", "donation", "deposit", "no investment", "n/a"],
  mobility: ["citizenship", "passport", "visa free", "global mobility", "naturalization"],
  stability: ["pr", "permanent", "residency", "renewal", "settlement", "standard"],
  tax: ["tax", "presence", "residence", "lump sum", "non-dom"],
  business: ["business", "company", "entrepreneur", "startup", "entity", "founder"],
};

const startingInputs: Inputs = {
  mode: "quick",
  track: "all",
  budget: 300000,
  timeline: 12,
  family: true,
  presence: "low",
  profile: "investor",
  priority: "stability",
  destination: "",
  query: "",
  age: 32,
  nationality: "",
  currentResidence: "",
  education: "unknown",
  yearsExperience: 5,
  languageScore: 0,
  netWorthUsd: 0,
  sourceOfFunds: "unknown",
  familyMembers: 1,
  previousRefusal: false,
  admissibilityConcern: false,
  businessOwnership: false,
  jobOffer: false,
  resumeFileName: "",
  profileSummary: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  contactConsent: true,
};

const visitorKey = "xiphias_visitor_id";
const sessionKey = "xiphias_session_id";

function getBrowserId(key: string, prefix: string) {
  try {
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;
    const next = `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    window.localStorage.setItem(key, next);
    return next;
  } catch {
    return `${prefix}_${Date.now().toString(36)}`;
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalize(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenise(value: string) {
  return normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 2)
    .slice(0, 12);
}

function compactTrack(track: Vertical) {
  if (track === "skilled") return "Skilled";
  if (track === "corporate") return "Corporate";
  return track.charAt(0).toUpperCase() + track.slice(1);
}

function moneyLabel(value: number) {
  if (value <= 0) return "No investment route";
  if (value >= 1_000_000) return `USD ${(value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0)}M`;
  return `USD ${Math.round(value / 1000)}k`;
}

function presenceLabel(value: ProgrammeExplorerItem["presence"]) {
  if (value === "low") return "Low presence";
  if (value === "moderate") return "Moderate presence";
  if (value === "high") return "High presence";
  return "Case dependent";
}

function effectiveBudget(input: Inputs) {
  return input.mode === "deep" ? Math.max(input.budget, Math.floor(input.netWorthUsd * 0.45)) : input.budget;
}

function familyRequested(input: Inputs) {
  return input.mode === "deep" ? input.familyMembers > 1 : input.family;
}

function deepProfileCompletion(input: Inputs) {
  if (input.mode !== "deep") return 0;
  const checks = [
    input.age > 0,
    Boolean(input.nationality.trim()),
    Boolean(input.currentResidence.trim()),
    input.education !== "unknown",
    input.yearsExperience > 0,
    input.languageScore > 0,
    input.netWorthUsd > 0,
    input.sourceOfFunds !== "unknown",
    input.familyMembers > 0,
    Boolean(input.profileSummary.trim() || input.resumeFileName),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function scoreProgramme(item: ProgrammeExplorerItem, input: Inputs): ScoredItem {
  let score = 42;
  const reasons: string[] = [];
  const warnings: string[] = [];
  const keywords = item.keywords;
  const destination = normalize(input.destination);
  const capital = effectiveBudget(input);
  const needsFamily = familyRequested(input);

  if (input.track === "all") {
    score += 8;
    reasons.push("No pathway restriction applied.");
  } else if (item.track === input.track) {
    score += 22;
    reasons.push(`Matches ${compactTrack(input.track)} pathway.`);
  } else {
    score -= 16;
    warnings.push(`Different pathway: ${compactTrack(item.track)}.`);
  }

  if (destination) {
    const countryMatch = normalize(item.country).includes(destination) || item.countrySlug.includes(destination.replace(/\s+/g, "-"));
    if (countryMatch) {
      score += 18;
      reasons.push(`Destination match: ${item.country}.`);
    } else if (keywords.includes(destination)) {
      score += 8;
      reasons.push("Destination appears in approved content.");
    } else {
      score -= 7;
      warnings.push("Not an exact destination match.");
    }
  } else {
    score += 5;
  }

  if (item.investmentUsd <= 0) {
    score += capital <= 100000 ? 18 : 12;
    reasons.push("No direct investment threshold detected.");
  } else if (capital >= item.investmentUsd) {
    score += 18;
    reasons.push("Capital level appears compatible.");
  } else if (capital * 1.25 >= item.investmentUsd) {
    score += 10;
    warnings.push("Capital may be close; advisor must verify fees and dependents.");
  } else {
    score -= 14;
    warnings.push("Capital may be below the indicative route threshold.");
  }

  if (item.timelineMonths <= input.timeline) {
    score += 14;
    reasons.push("Timeline fits the planning window.");
  } else if (item.timelineMonths <= input.timeline + 6) {
    score += 6;
    warnings.push("Timeline is close but may need flexibility.");
  } else {
    score -= 8;
    warnings.push("Timeline may be longer than requested.");
  }

  if (!needsFamily) {
    score += 4;
  } else if (item.family) {
    score += 10;
    reasons.push("Family inclusion is supported or commonly available.");
  } else {
    score -= 8;
    warnings.push("Family inclusion needs separate review.");
  }

  if (input.presence === "any") {
    score += 5;
  } else if (item.presence === input.presence) {
    score += 9;
    reasons.push(`${presenceLabel(item.presence)} fit.`);
  } else if (input.presence === "low" && item.presence === "moderate") {
    score += 4;
    warnings.push("Presence may be manageable but not minimal.");
  } else if (input.presence === "high") {
    score += 2;
  } else {
    score -= 6;
    warnings.push("Physical presence may not match the preference.");
  }

  const profileHits = profileKeywords[input.profile].filter((word) => keywords.includes(word));
  if (profileHits.length) {
    score += Math.min(12, profileHits.length * 4);
    reasons.push(`Profile signal matched: ${profileHits.slice(0, 2).join(", ")}.`);
  }

  const priorityHits = priorityKeywords[input.priority].filter((word) => keywords.includes(word));
  if (priorityHits.length) {
    score += Math.min(8, priorityHits.length * 3);
    reasons.push(`Priority signal matched: ${priorityHits.slice(0, 2).join(", ")}.`);
  }

  if (input.priority === "speed" && item.timelineMonths <= 6) score += 7;
  if (input.priority === "cost" && item.investmentUsd > 0 && item.investmentUsd <= capital * 0.7) score += 6;
  if (input.priority === "mobility" && item.track === "citizenship") score += 7;
  if (input.priority === "business" && (item.track === "corporate" || keywords.includes("business"))) score += 7;
  if (input.priority === "stability" && item.risk === "standard") score += 5;
  if (input.priority === "tax" && keywords.includes("tax")) score += 5;

  if (input.mode === "deep") {
    const completion = deepProfileCompletion(input);
    score += Math.round(completion / 25);
    reasons.push(`Deep profile ${completion}% complete.`);

    if (input.age > 0 && item.track === "skilled") {
      if (input.age >= 22 && input.age <= 44) {
        score += 10;
        reasons.push("Age range supports skilled points routes.");
      } else if (input.age >= 45 && input.age <= 49) {
        score += 3;
        warnings.push("Age may reduce skilled-route competitiveness.");
      } else {
        score -= 7;
        warnings.push("Age may be a constraint for points-based skilled routes.");
      }
    }

    if (item.track === "skilled") {
      if (["bachelor", "master", "phd"].includes(input.education)) {
        score += input.education === "phd" ? 9 : input.education === "master" ? 8 : 6;
        reasons.push("Education supports skilled eligibility.");
      } else if (input.education !== "unknown") {
        warnings.push("Education may need credential review.");
      }

      if (input.languageScore >= 8) {
        score += 9;
        reasons.push("Strong language score supports skilled ranking.");
      } else if (input.languageScore >= 6) {
        score += 5;
      } else if (input.languageScore > 0) {
        score -= 5;
        warnings.push("Language score may need improvement.");
      }
    }

    if (input.yearsExperience >= 5 && (item.track === "skilled" || item.track === "corporate")) {
      score += 8;
      reasons.push("Work experience supports this route.");
    } else if (input.yearsExperience >= 2 && item.track === "skilled") {
      score += 4;
    }

    if (input.jobOffer && (item.track === "skilled" || item.track === "corporate")) {
      score += 8;
      reasons.push("Job offer/employer support improves route fit.");
    }

    if (input.businessOwnership && (item.track === "corporate" || item.track === "residency")) {
      score += 8;
      reasons.push("Business ownership supports entrepreneur/corporate routes.");
    }

    if (input.netWorthUsd > 0 && item.investmentUsd > 0) {
      if (input.netWorthUsd >= item.investmentUsd * 2) {
        score += 6;
        reasons.push("Net-worth buffer supports investment review.");
      } else if (input.netWorthUsd < item.investmentUsd) {
        score -= 8;
        warnings.push("Net worth may be below indicative investment needs.");
      }
    }

    if (["salary", "business", "property", "inheritance"].includes(input.sourceOfFunds)) {
      score += item.investmentUsd > 0 ? 4 : 1;
      if (item.investmentUsd > 0) reasons.push("Source-of-funds path is identifiable.");
    } else if (input.sourceOfFunds === "gift" || input.sourceOfFunds === "crypto") {
      score -= 4;
      warnings.push("Source of funds may require enhanced explanation.");
    }

    const profileTokens = tokenise(
      [
        input.nationality,
        input.currentResidence,
        input.profileSummary,
        input.resumeFileName,
      ].join(" "),
    );
    const profileHits = profileTokens.filter((token) => keywords.includes(token) || normalize(item.title).includes(token));
    if (profileHits.length) {
      score += Math.min(8, profileHits.length * 2);
      reasons.push(`Profile evidence matched: ${profileHits.slice(0, 2).join(", ")}.`);
    }

    if (input.previousRefusal) {
      score -= 7;
      warnings.push("Previous refusal needs legal/advisor review.");
    }

    if (input.admissibilityConcern) {
      score -= 12;
      warnings.push("Admissibility concern requires mandatory review.");
    }
  }

  const queryHits = tokenise(input.query).filter((token) => keywords.includes(token) || normalize(item.title).includes(token));
  if (queryHits.length) {
    score += Math.min(10, queryHits.length * 3);
    reasons.push(`Search terms matched: ${queryHits.slice(0, 3).join(", ")}.`);
  }

  if (item.source === "site-content") {
    score += 4;
  } else {
    warnings.push("Advisor should confirm final route details.");
  }

  if (item.risk === "high") warnings.push("Enhanced due diligence likely required.");

  return {
    ...item,
    fitScore: clamp(Math.round(score), 28, 98),
    reasons: reasons.slice(0, 4),
    warnings: warnings.slice(0, 3),
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/70">{label}</span>
      {children}
    </label>
  );
}

const DARK_INPUT =
  "h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold";

function SelectField({
  value,
  onChange,
  children,
}: {
  value: string | number;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-1 focus:ring-gold [&>option]:bg-white [&>option]:text-ink"
    >
      {children}
    </select>
  );
}

type InputUpdater = <K extends keyof Inputs>(key: K, value: Inputs[K]) => void;

function DeepAssessmentModal({
  open,
  input,
  completion,
  update,
  onClose,
  onApply,
}: {
  open: boolean;
  input: Inputs;
  completion: number;
  update: InputUpdater;
  onClose: () => void;
  onApply: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-sand/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Deep assessment"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-gold/40 bg-sand text-ink shadow-2xl shadow-black/60"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden bg-white px-6 py-5 text-ink">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(212,175,55,0.18),transparent_30%),radial-gradient(circle_at_90%_0%,rgba(212,175,55,0.10),transparent_34%)]" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20">
                <BrainCircuit className="size-6" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">XIA deep assessment</p>
                <h2 className="font-sora text-2xl font-black tracking-normal text-ink">Profile, funds, CV and risk signals</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-ink ring-1 ring-gold/15 transition hover:bg-white/10 hover:text-gold"
              aria-label="Close deep assessment"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="relative mt-5 rounded-2xl border border-gold/45 bg-sand/50 p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-ink/70">
              <span>Profile depth</span>
              <span className="text-gold">{completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="grid gap-5 lg:grid-cols-3">
            <section className="rounded-3xl border border-gold/45 bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gold/10 text-gold">
                  <UserRound className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">Identity</p>
                  <p className="text-sm font-bold text-ink/70">Applicant and family context.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Age">
                  <input
                    type="number"
                    min={16}
                    max={80}
                    value={input.age}
                    onChange={(event) => update("age", Number(event.target.value))}
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
                <Field label="Family size">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={input.familyMembers}
                    onChange={(event) => update("familyMembers", Number(event.target.value))}
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
              </div>

              <div className="mt-3 space-y-3">
                <Field label="Nationality">
                  <input
                    value={input.nationality}
                    onChange={(event) => update("nationality", event.target.value)}
                    placeholder="Indian, UAE resident..."
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
                <Field label="Current residence">
                  <input
                    value={input.currentResidence}
                    onChange={(event) => update("currentResidence", event.target.value)}
                    placeholder="India, Dubai, Singapore..."
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-3xl border border-gold/45 bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gold/10 text-gold">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">Profile strength</p>
                  <p className="text-sm font-bold text-ink/70">Education, work and language signals.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Education">
                  <SelectField value={input.education} onChange={(value) => update("education", value as Inputs["education"])}>
                    {educationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="Experience">
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={input.yearsExperience}
                    onChange={(event) => update("yearsExperience", Number(event.target.value))}
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field label="Language">
                  <input
                    type="number"
                    min={0}
                    max={9}
                    step={0.5}
                    value={input.languageScore}
                    onChange={(event) => update("languageScore", Number(event.target.value))}
                    placeholder="IELTS/CLB"
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
                <Field label="Net worth USD">
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    value={input.netWorthUsd}
                    onChange={(event) => update("netWorthUsd", Number(event.target.value))}
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
              </div>

              <div className="mt-3">
                <Field label="Source of funds">
                  <SelectField value={input.sourceOfFunds} onChange={(value) => update("sourceOfFunds", value as Inputs["sourceOfFunds"])}>
                    {sourceOfFundsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
              </div>
            </section>

            <section className="rounded-3xl border border-gold/45 bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gold/10 text-gold">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">Evidence and risk</p>
                  <p className="text-sm font-bold text-ink/70">CV, refusals and due-diligence checks.</p>
                </div>
              </div>

              <div className="grid gap-2">
                {deepToggleOptions.map(({ key, label, icon: Icon, color }) => (
                  <label key={key} className="flex items-center gap-3 rounded-2xl border border-gold/45 bg-sand/50 p-3 text-sm font-bold text-ink/85">
                    <input
                      type="checkbox"
                      checked={input[key]}
                      onChange={(event) => update(key, event.target.checked)}
                      className="size-4 rounded border-gold/45 bg-white accent-gold focus:ring-gold"
                    />
                    <Icon className="size-4" style={{ color: String(color) }} />
                    {label}
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/70">Resume / CV</span>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-gold/40 bg-sand/50 p-3 text-sm font-bold text-ink/85 transition hover:border-gold hover:bg-gold/10">
                  <UploadCloud className="size-5 text-gold" />
                  <span className="min-w-0 flex-1 truncate">{input.resumeFileName || "Select CV file for scoring signal"}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="sr-only"
                    onChange={(event) => update("resumeFileName", event.target.files?.[0]?.name ?? "")}
                  />
                </label>
                <p className="mt-2 text-xs leading-5 text-ink/55">
                  Current version reads the filename and profile notes only. Full resume/OCR parsing should be added through a server-side document API.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-5">
            <Field label="Profile summary">
              <textarea
                value={input.profileSummary}
                onChange={(event) => update("profileSummary", event.target.value)}
                rows={5}
                placeholder="Paste CV highlights, business background, refusals, goals, target visa type, family constraints, or timeline pressure."
                className="w-full resize-none rounded-2xl border border-gold/45 bg-white px-4 py-4 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </Field>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gold/45 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-ink/70">
            XIA applies deterministic scoring now; advisor review remains mandatory before final route advice.
          </p>
          <button
            type="button"
            onClick={onApply}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-black text-midnight shadow-lg shadow-black/20 transition hover:bg-gold_bright"
          >
            Generate deep shortlist
            <ArrowRight className="size-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ProgrammeCard({ item, rank }: { item: ScoredItem; rank: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(rank * 0.03, 0.18) }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/45 bg-white p-5 transition hover:-translate-y-1 hover:border-gold/65"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-sand/50 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {compactTrack(item.track)}
            </span>
          </div>
          <h3 className="mt-3 font-sora text-xl font-black tracking-normal text-ink">{item.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-ink/55">
            <MapPin className="size-4 text-gold" />
            {item.country}
          </p>
        </div>

        <div className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-sand ring-1 ring-gold/30">
          <span className="text-xl font-black text-gold">{item.fitScore}</span>
          <span className="absolute -bottom-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-black text-midnight">FIT</span>
        </div>
      </div>

      <p className="mt-4 min-h-[4.5rem] text-sm leading-6 text-ink/55">{item.summary}</p>

      <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-2xl border border-gold/45 bg-sand/50 p-3">
          <Banknote className="mb-2 size-4 text-gold" />
          <p className="font-bold text-gold">{item.investmentLabel || moneyLabel(item.investmentUsd)}</p>
          <p className="text-xs text-ink/55">Indicative capital</p>
        </div>
        <div className="rounded-2xl border border-gold/45 bg-sand/50 p-3">
          <Timer className="mb-2 size-4 text-gold" />
          <p className="font-bold text-ink">{item.timelineLabel}</p>
          <p className="text-xs text-ink/55">Typical timeline</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {item.reasons.slice(0, 3).map((reason) => (
          <p key={reason} className="flex gap-2 text-sm text-ink/70">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" />
            <span>{reason}</span>
          </p>
        ))}
        {item.warnings.slice(0, 2).map((warning) => (
          <p key={warning} className="flex gap-2 text-sm text-ink/55">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold/70" />
            <span>{warning}</span>
          </p>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Link
          href={item.href}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-black text-midnight transition hover:bg-gold_bright"
        >
          Open route
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href={`${BOOKING_ROUTE}?plan=paid`}
          className="inline-flex items-center gap-2 rounded-xl border border-gold/45 px-4 py-2.5 text-sm font-black text-ink transition hover:border-gold/65 hover:bg-gold/10"
        >
          Advisor review
        </Link>
      </div>
    </motion.article>
  );
}

function publicAssessmentInput(input: Inputs) {
  const {
    contactName,
    contactEmail,
    contactPhone,
    contactConsent,
    ...assessmentInput
  } = input;

  void contactName;
  void contactEmail;
  void contactPhone;
  void contactConsent;

  return assessmentInput;
}

function trackedMatches(items: ScoredItem[]) {
  return items.slice(0, 5).map((item) => ({
    title: item.title,
    country: item.country,
    track: item.track,
    href: item.href,
    score: item.fitScore,
    reasons: item.reasons.slice(0, 3),
    warnings: item.warnings.slice(0, 2),
  }));
}

export default function ProgrammeExplorerClient({ data }: { data: ProgrammeExplorerData }) {
  const [input, setInput] = useState<Inputs>(startingInputs);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [deepModalOpen, setDeepModalOpen] = useState(false);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const lastTrackedPayload = useRef("");

  const scored = useMemo(
    () =>
      data.items
        .map((item) => scoreProgramme(item, input))
        .sort((a, b) => b.fitScore - a.fitScore || a.title.localeCompare(b.title)),
    [data.items, input],
  );

  const topItems = scored.slice(0, 9);
  const spotlight = topItems[0];
  const completion = deepProfileCompletion(input);
  const assessmentInput = useMemo(() => publicAssessmentInput(input), [input]);
  const topMatches = useMemo(() => trackedMatches(scored), [scored]);
  const canSubmitLead = Boolean(input.contactEmail.trim() || input.contactPhone.trim());

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    if (!deepModalOpen) return undefined;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [deepModalOpen]);

  const captureAssessment = async (event: "activity" | "lead") => {
    if (typeof window === "undefined") return null;
    const payload = {
      event,
      visitorId: getBrowserId(visitorKey, "vis"),
      sessionId: getBrowserId(sessionKey, "ses"),
      path: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
      input: assessmentInput,
      topMatches,
      completion,
      contact:
        event === "lead"
          ? {
              name: input.contactName,
              email: input.contactEmail,
              phone: input.contactPhone,
              consent: input.contactConsent,
            }
          : undefined,
    };

    const response = await fetch("/api/platform/programme-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: event === "activity",
    });

    if (!response.ok) throw new Error("Could not capture programme assessment");
    return response.json() as Promise<{ ok: boolean; eventId?: string; leadId?: string | null }>;
  };

  useEffect(() => {
    const snapshot = JSON.stringify({
      input: assessmentInput,
      topMatches,
      completion,
    });

    if (snapshot === lastTrackedPayload.current) return undefined;

    const timer = window.setTimeout(() => {
      lastTrackedPayload.current = snapshot;
      void captureAssessment("activity").catch(() => {
        lastTrackedPayload.current = "";
      });
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [assessmentInput, completion, topMatches]);

  const submitLead = async () => {
    if (!canSubmitLead) {
      setSaveState("error");
      return;
    }

    setSaveState("saving");
    try {
      const result = await captureAssessment("lead");
      setSaveState(result?.leadId ? "saved" : "error");
    } catch {
      setSaveState("error");
    }
  };

  const startShortlist = () => {
    setAssessmentStarted(true);
    setSaveState("idle");
  };

  const applyAssistantPreset = (preset: "investor" | "canada" | "deep") => {
    setSaveState("idle");
    setAssistantOpen(false);

    if (preset === "deep") {
      setInput((current) => ({
        ...current,
        mode: "deep",
        query: current.query || "Run a deeper assessment using profile, funds, CV, and risk signals.",
      }));
      setDeepModalOpen(true);
      return;
    }

    setInput((current) => {
      if (preset === "canada") {
        return {
          ...current,
          mode: "quick",
          track: "all",
          destination: "Canada",
          profile: "professional",
          priority: "stability",
          timeline: 12,
          family: true,
          query: "Compare Canada PR, start-up, skilled, and investor options.",
        };
      }

      return {
        ...current,
        mode: "quick",
        track: "residency",
        destination: "",
        profile: "investor",
        priority: "stability",
        budget: Math.max(current.budget, 500000),
        presence: "low",
        family: true,
        query: "Investor residency routes with family inclusion and low physical presence.",
      };
    });
    setAssessmentStarted(true);
  };

  return (
    <div className="min-h-screen bg-sand text-ink">
      {!assessmentStarted ? (
        <section className="px-4 py-10 pt-24 sm:px-6 lg:py-14 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-6xl rounded-[2rem] border border-gold/45 bg-white p-5 sm:p-7 lg:p-9"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-gold">
                  <Sparkles className="size-4" />
                  XIA route assistant
                </div>
                <h1 className="mt-4 font-sora text-3xl font-black tracking-normal text-ink sm:text-4xl">
                  Start with your route inputs.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
                  Choose a goal, destination, budget, and timeline. XIA will shortlist routes from XIPHIAS programme content and keep updating as you refine the answers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAssistantOpen((current) => !current)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/45 px-4 py-3 text-sm font-black text-ink transition hover:border-gold/65 hover:bg-white/[0.04]"
              >
                <BrainCircuit className="size-4 text-gold" />
                Need help?
              </button>
            </div>

            <div className="mt-7 grid gap-4 rounded-[1.5rem] border border-gold/45 bg-sand/50 p-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  value: "quick",
                  icon: Sparkles,
                  title: "Quick Explorer",
                  copy: "Minimal inputs for fast route discovery.",
                },
                {
                  value: "deep",
                  icon: BrainCircuit,
                  title: "Deep Assessment",
                  copy: "Adds profile, funds, CV signals, and risk checks.",
                },
              ].map((mode) => {
                const Icon = mode.icon;
                const active = input.mode === mode.value;
                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => {
                      update("mode", mode.value as Inputs["mode"]);
                      if (mode.value === "deep") setDeepModalOpen(true);
                    }}
                    className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-gold/40 bg-gold/10"
                        : "border-gold/45 bg-white text-ink/75 hover:border-gold/65 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${active ? "bg-gold/15 text-gold" : "bg-sand/50 text-gold"}`}>
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className={`block text-base font-black ${active ? "text-ink" : "text-ink"}`}>{mode.title}</span>
                      <span className={`mt-1 block text-sm leading-5 ${active ? "text-ink/70" : "text-ink/55"}`}>
                        {mode.copy}
                      </span>
                    </span>
                  </button>
                );
              })}
              <Link
                href="/route-intelligence"
                className="flex items-start gap-4 rounded-2xl border border-gold/45 bg-white p-4 text-left text-ink/75 transition hover:border-gold/65 hover:bg-white/[0.04]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sand/50 text-gold">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-base font-black text-ink">Route Intelligence</span>
                  <span className="mt-1 block text-sm leading-5 text-ink/55">
                    Full-page route-fit workspace.
                  </span>
                </span>
              </Link>
              <Link
                href="/high-skill-visa"
                className="flex items-start gap-4 rounded-2xl border border-gold/45 bg-white p-4 text-left text-ink/75 transition hover:border-gold/65 hover:bg-white/[0.04]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sand/50 text-gold">
                  <GraduationCap className="size-5" />
                </span>
                <span>
                  <span className="block text-base font-black text-ink">High-Skill Visa</span>
                  <span className="mt-1 block text-sm leading-5 text-ink/55">
                    Evidence-led visa evaluator.
                  </span>
                </span>
              </Link>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              <Field label="Pathway">
                <SelectField value={input.track} onChange={(value) => update("track", value as Inputs["track"])}>
                  {trackOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </Field>

              <Field label="Destination focus">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                  <input
                    value={input.destination}
                    onChange={(event) => update("destination", event.target.value)}
                    list="programme-explorer-countries"
                    placeholder="Canada, Portugal, UAE..."
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white pl-10 pr-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                  <datalist id="programme-explorer-countries">
                    {data.countries.map((country) => (
                      <option key={country} value={country} />
                    ))}
                  </datalist>
                </div>
              </Field>

              <Field label="Profile type">
                <SelectField value={input.profile} onChange={(value) => update("profile", value as Inputs["profile"])}>
                  {profileOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </Field>

              <Field label="Capital">
                <SelectField value={input.budget} onChange={(value) => update("budget", Number(value))}>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </Field>

              <Field label="Timeline">
                <SelectField value={input.timeline} onChange={(value) => update("timeline", Number(value))}>
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </Field>

              <Field label="Presence">
                <SelectField value={input.presence} onChange={(value) => update("presence", value as Inputs["presence"])}>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="any">Flexible</option>
                </SelectField>
              </Field>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
              <Field label="Natural search">
                <textarea
                  value={input.query}
                  onChange={(event) => update("query", event.target.value)}
                  rows={3}
                  placeholder="Example: low-presence family route with 300k budget"
                  className="w-full resize-none rounded-xl border border-gold/45 bg-white px-3 py-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </Field>
              <div className="grid content-end gap-3">
                <label className="flex items-center gap-3 rounded-2xl border border-gold/45 bg-white p-3 text-sm font-bold text-ink/85">
                  <input
                    type="checkbox"
                    checked={input.family}
                    onChange={(event) => update("family", event.target.checked)}
                    className="size-4 rounded border-gold/45 bg-white accent-gold focus:ring-gold"
                  />
                  Include dependents
                </label>
                <button
                  type="button"
                  onClick={startShortlist}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-black text-midnight shadow-lg shadow-black/20 transition hover:bg-gold_bright"
                >
                  Generate shortlist
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      ) : (
        <section className="px-4 py-8 sm:px-6 lg:py-10">
          <div className="mx-auto max-w-[1760px]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group sticky top-24 z-20 rounded-[1.5rem] border border-gold/45 bg-white/95 p-4 shadow-xl shadow-black/30 backdrop-blur"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { value: "quick", label: "Quick Explorer", icon: Sparkles },
                    { value: "deep", label: "Deep Assessment", icon: BrainCircuit },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const active = input.mode === mode.value;
                    return (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() => {
                          update("mode", mode.value as Inputs["mode"]);
                          if (mode.value === "deep") setDeepModalOpen(true);
                        }}
                        className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-black transition ${
                          active
                            ? "bg-gold text-midnight"
                            : "border border-gold/45 text-ink/90 hover:border-gold/65"
                        }`}
                      >
                        <Icon className="size-4" />
                        {mode.label}
                      </button>
                    );
                  })}
                  <Link
                    href="/route-intelligence"
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-gold/45 px-4 text-sm font-black text-ink/90 transition hover:border-gold/65"
                  >
                    <MapPin className="size-4 text-gold" />
                    Route Intelligence
                  </Link>
                  <Link
                    href="/high-skill-visa"
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-gold/45 px-4 text-sm font-black text-ink/90 transition hover:border-gold/65"
                  >
                    <GraduationCap className="size-4 text-gold" />
                    High-Skill Visa
                  </Link>
                  <button
                    type="button"
                    onClick={() => setAssistantOpen((current) => !current)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-gold/45 px-4 text-sm font-black text-ink/90 transition hover:border-gold/65"
                  >
                    <BrainCircuit className="size-4 text-gold" />
                    XIA help
                  </button>
                </div>

                <div className="min-w-0 flex-1 lg:max-w-2xl">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-ink/70">
                    <span>{spotlight?.title ?? "Route shortlist"}</span>
                    <span className="text-gold">{spotlight?.fitScore ?? 0}/100</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gold transition-all"
                      style={{ width: `${spotlight?.fitScore ?? 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid max-h-0 gap-4 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-5 group-hover:max-h-[620px] group-hover:opacity-100 lg:grid-cols-6">
                <Field label="Pathway">
                  <SelectField value={input.track} onChange={(value) => update("track", value as Inputs["track"])}>
                    {trackOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="Destination">
                  <input
                    value={input.destination}
                    onChange={(event) => update("destination", event.target.value)}
                    list="programme-explorer-countries"
                    placeholder="Country"
                    className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </Field>
                <Field label="Profile">
                  <SelectField value={input.profile} onChange={(value) => update("profile", value as Inputs["profile"])}>
                    {profileOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="Capital">
                  <SelectField value={input.budget} onChange={(value) => update("budget", Number(value))}>
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="Timeline">
                  <SelectField value={input.timeline} onChange={(value) => update("timeline", Number(value))}>
                    {timelineOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="Priority">
                  <SelectField value={input.priority} onChange={(value) => update("priority", value as Inputs["priority"])}>
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </Field>
              </div>
            </motion.div>

            <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
              <main className="min-w-0">
                <div className="mb-5 rounded-[1.5rem] border border-gold/45 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">XIA shortlist</p>
                  <h2 className="mt-1 font-sora text-2xl font-black tracking-normal text-ink">Recommended route direction</h2>
                  <p className="mt-2 max-w-4xl text-sm leading-6 text-ink/70">
                    {input.mode === "quick"
                      ? "Quick matches are scored from approved programme pages, route fit, timeline, family needs, and review risk."
                      : `Deep matches include profile completeness, age, education, experience, funds, language, CV signals, and risk checks. Profile depth: ${completion}%.`}
                  </p>
                </div>

                <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                  {topItems.map((item, index) => (
                    <ProgrammeCard key={item.id} item={item} rank={index} />
                  ))}
                </div>
              </main>

              <aside className="space-y-5">
                <div className="rounded-[1.5rem] border border-gold/45 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold">
                      <Send className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-ink">Send shortlist to XIPHIAS</p>
                      <p className="mt-1 text-xs leading-5 text-ink/70">
                        Saves this assessment, visitor trail, and top matches into X-Hub for admin review.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <input
                      value={input.contactName}
                      onChange={(event) => {
                        update("contactName", event.target.value);
                        setSaveState("idle");
                      }}
                      placeholder="Name"
                      className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    <input
                      value={input.contactEmail}
                      onChange={(event) => {
                        update("contactEmail", event.target.value);
                        setSaveState("idle");
                      }}
                      placeholder="Email"
                      type="email"
                      className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    <input
                      value={input.contactPhone}
                      onChange={(event) => {
                        update("contactPhone", event.target.value);
                        setSaveState("idle");
                      }}
                      placeholder="Phone / WhatsApp"
                      className="h-11 w-full rounded-xl border border-gold/45 bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    <label className="flex items-start gap-2 text-xs font-semibold leading-5 text-ink/70">
                      <input
                        type="checkbox"
                        checked={input.contactConsent}
                        onChange={(event) => update("contactConsent", event.target.checked)}
                        className="mt-1 size-4 rounded border-gold/45 bg-white accent-gold focus:ring-gold"
                      />
                      I agree that XIPHIAS may contact me about this assessment.
                    </label>
                    <button
                      type="button"
                      onClick={submitLead}
                      disabled={saveState === "saving" || saveState === "saved"}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 text-sm font-black text-midnight shadow-lg shadow-black/20 transition hover:bg-gold_bright disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {saveState === "saving" ? "Saving to X-Hub..." : saveState === "saved" ? "Saved for advisor review" : "Save assessment"}
                      <ArrowRight className="size-4" />
                    </button>
                    {saveState === "error" ? (
                      <p className="rounded-xl border border-gold/45 bg-gold/10 px-3 py-2 text-xs font-bold text-gold">
                        Add an email or phone number so the advisor can follow up.
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-gold/45 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-gold/15 text-gold">
                      <BrainCircuit className="size-5" />
                    </span>
                    <div>
                      <p className="font-black text-ink">XIA guide</p>
                      <p className="text-xs text-ink/55">Use this if you are stuck.</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-ink/70">
                    <p>Try a country in Destination, then change Capital or Timeline to see the cards reorder.</p>
                    <p>Use Deep Assessment when the case depends on CV, refusals, job offer, or source-of-funds risk.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDeepModalOpen(true)}
                    className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-gold/50 px-4 text-sm font-black text-gold transition hover:bg-gold/10"
                  >
                    Open deep assessment
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {assistantOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-24 right-5 z-[120] w-[min(360px,calc(100vw-2.5rem))] rounded-[1.5rem] border border-gold/45 bg-white p-4 shadow-2xl shadow-black/50"
        >
          <p className="text-sm font-black text-ink">XIA Assistant</p>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            I can guide the page flow here: start with destination, pick pathway, then use Deep Assessment for CV, funds, refusal, or risk-heavy cases.
          </p>
          <div className="mt-3 grid gap-2">
            {[
              { label: "Show investor routes", action: () => applyAssistantPreset("investor") },
              { label: "Compare Canada options", action: () => applyAssistantPreset("canada") },
              { label: "Use deep assessment", action: () => applyAssistantPreset("deep") },
            ].map((prompt) => (
              <button
                key={prompt.label}
                type="button"
                onClick={prompt.action}
                className="rounded-xl border border-gold/45 px-3 py-2 text-left text-xs font-bold text-ink/85 transition hover:border-gold/65 hover:bg-white/[0.04]"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </motion.div>
      ) : null}

      <button
        type="button"
        onPointerDown={(event) => {
          event.preventDefault();
          setAssistantOpen((current) => !current);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          setAssistantOpen((current) => !current);
        }}
        className="fixed bottom-6 right-5 z-[120] grid size-14 place-items-center rounded-full bg-gold text-midnight shadow-2xl shadow-black/40 transition hover:scale-105"
        aria-label={assistantOpen ? "Close XIA assistant" : "Open XIA assistant"}
      >
        <BrainCircuit className="size-6" />
      </button>

      <DeepAssessmentModal
        open={deepModalOpen}
        input={input}
        completion={completion}
        update={update}
        onClose={() => setDeepModalOpen(false)}
        onApply={() => {
          setDeepModalOpen(false);
          startShortlist();
        }}
      />
    </div>
  );
}
