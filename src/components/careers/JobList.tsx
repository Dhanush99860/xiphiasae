"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { formatDateUSShort } from "@/lib/format";

export type Job = {
  id: string;
  title: string;
  slug: string;
  dept?: string;
  location: string;
  employmentType?: string;
  postedAt?: string;
  summary?: string;
  remote?: boolean;
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  return formatDateUSShort(iso); // ✅ deterministic US date, UTC
}

/** normalize string: lowercase, strip diacritics & punctuation */
function norm(s = "") {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** tiny levenshtein for typos (fast enough for small lists) */
function lev(a: string, b: string) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev + 1, dp[j] + 1, dp[j - 1] + 1);
      prev = tmp;
    }
  }
  return dp[n];
}

/** synonyms & common variants (extend as needed) */
const SYN = new Map<string, string>([
  ["bangalore", "bengaluru"],
  ["bengalore", "bengaluru"], // common misspelling
  ["blr", "bengaluru"],
  ["uae", "united arab emirates"],
  ["dubai", "united arab emirates"],
  ["ua", "united arab emirates"],
]);

function expandQueryTokens(q: string): string[] {
  const tokens = norm(q).split(" ").filter(Boolean);
  const out = new Set<string>();
  tokens.forEach((t) => {
    out.add(t);
    const syn = SYN.get(t);
    if (syn) {
      syn.split(" ").forEach((x) => out.add(x));
      out.add(syn);
    }
  });
  return Array.from(out);
}

function textBank(job: Job) {
  const fields = [
    job.title,
    job.summary ?? "",
    job.location,
    job.dept ?? "",
  ]
    .map(norm)
    .join(" ");
  return fields.split(" ").filter(Boolean);
}

function matchesJob(job: Job, q: string, dept: string, remoteOnly: boolean) {
  // department & remote checks
  if (!(dept === "all" || job.dept === dept)) return false;
  const isRemote = job.remote || /remote/i.test(job.location);
  if (remoteOnly && !isRemote) return false;

  // query check (forgiving)
  const nq = norm(q);
  if (!nq) return true;

  const tokens = expandQueryTokens(nq);
  const bankTokens = textBank(job);

  // direct includes on concatenated string (fast path)
  const allText = bankTokens.join(" ");
  const direct = tokens.every((t) => allText.includes(t));
  if (direct) return true;

  // fuzzy: if any token is within edit distance <= 2 of any bank token
  return tokens.every((t) => {
    for (const b of bankTokens) {
      if (b.includes(t)) return true;
      if (Math.abs(b.length - t.length) <= 2 && lev(t, b) <= 2) return true;
    }
    return false;
  });
}

const GOLD = "#bfa15c";

export default function JobList({ jobs, serifClass }: { jobs: Job[]; serifClass?: string }) {
  const sp = useSearchParams();
  const q = sp.get("q") || "";
  const dept = sp.get("dept") || "all";
  const remoteOnly = sp.get("remote") === "1";

  const filtered = useMemo(
    () => jobs.filter((j) => matchesJob(j, q, dept, remoteOnly)),
    [jobs, q, dept, remoteOnly]
  );

  if (filtered.length === 0) {
    return (
      <div
        className="mt-6 rounded-2xl p-6 text-white"
        style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
      >
        <h3 className={`${serifClass ?? ""} text-[1.2rem] font-medium`}>No roles found</h3>
        <p className="mt-1 text-sm text-white/55">
          Try different keywords (e.g., <strong className="text-white/80">Bengaluru</strong>, <strong className="text-white/80">Remote</strong>, <strong className="text-white/80">Sales</strong>) or{" "}
          <a href="/careers#apply" className="font-semibold underline decoration-2 underline-offset-2" style={{ color: GOLD }}>
            send your resume
          </a>.
        </p>
      </div>
    );
  }

  return (
    <ul role="list" className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((job) => (
        <li key={job.id} className="h-full">
          <article
            className="group flex h-full flex-col overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfa15c] motion-reduce:transform-none"
            style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
          >
            {job.dept && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                {job.dept}
              </span>
            )}
            <h3 className={`${serifClass ?? ""} mt-2 text-[1.3rem] font-medium leading-snug text-white`}>{job.title}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.1em] text-white/45">
              {job.location}
              {job.employmentType ? ` · ${job.employmentType}` : ""}
              {job.postedAt ? ` · ${fmtDate(job.postedAt)}` : ""}
            </p>

            {job.summary && <p className="mt-3 line-clamp-2 text-sm text-white/55">{job.summary}</p>}

            <div className="mt-auto flex items-center gap-4 pt-6">
              <Link
                href={`/careers/${job.slug}`}
                prefetch={false}
                className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                style={{ background: GOLD, color: "#0a1733" }}
                aria-label={`View details for ${job.title}`}
              >
                View &amp; Apply
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
              </Link>
              <a
                href="/careers#apply"
                className="text-sm font-semibold text-white/65 underline decoration-2 underline-offset-2 transition hover:text-white"
                style={{ textDecorationColor: `${GOLD}66` }}
              >
                Quick apply
              </a>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}