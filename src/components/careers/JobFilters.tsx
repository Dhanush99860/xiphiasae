"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { depts: string[] };

export default function JobFilters({ depts }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [dept, setDept] = useState(sp.get("dept") ?? "all");
  const [remoteOnly, setRemoteOnly] = useState(sp.get("remote") === "1");

  const lastQsRef = useRef<string>(sp.toString());

  const deptOptions = useMemo(() => {
    const uniq = Array.from(new Set(depts.filter(Boolean)));
    return ["all", ...uniq.sort((a, b) => a.localeCompare(b))];
  }, [depts]);

  const apply = useCallback(
    (override?: Partial<{ q: string; dept: string; remoteOnly: boolean }>) => {
      const params = new URLSearchParams(sp.toString()); // preserve UTM etc
      const _q = override?.q ?? q;
      const _dept = override?.dept ?? dept;
      const _remote =
        typeof override?.remoteOnly === "boolean" ? override.remoteOnly : remoteOnly;

      if (_q) params.set("q", _q);
      else params.delete("q");

      if (_dept && _dept !== "all") params.set("dept", _dept);
      else params.delete("dept");

      if (_remote) params.set("remote", "1");
      else params.delete("remote");

      const qs = params.toString();
      // Only replace if something actually changed
      if (qs !== lastQsRef.current) {
        lastQsRef.current = qs;
        router.replace(qs ? `/careers?${qs}` : `/careers`, { scroll: false });
      }
    },
    [router, sp, q, dept, remoteOnly]
  );

  // Debounced URL updates while typing (smooth, no scroll)
  useEffect(() => {
    const t = setTimeout(() => apply({ q }), 350);
    return () => clearTimeout(t);
  }, [q, apply]);

  // Immediate updates for dropdown/checkbox (still no scroll)
  useEffect(() => {
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dept, remoteOnly]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    apply();
  }

  function clearAll() {
    setQ("");
    setDept("all");
    setRemoteOnly(false);
    lastQsRef.current = "";
    router.replace("/careers", { scroll: false });
  }

  const hasActive = q.trim() !== "" || dept !== "all" || remoteOnly;

  const GOLD = "#bfa15c";
  const fieldStyle = {
    border: "1px solid rgba(191,161,92,0.3)",
    background: "rgba(255,255,255,0.03)",
  } as const;

  return (
    <form
      role="search"
      aria-label="Filter jobs"
      onSubmit={onSubmit}
      className="flex w-full flex-wrap items-center gap-3 rounded-2xl p-4 text-white"
      style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
    >
      <label htmlFor="jobs-search" className="sr-only">Search jobs</label>
      <input
        id="jobs-search"
        type="search"
        inputMode="search"
        placeholder="Search by title, location..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="min-w-[220px] flex-1 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#bfa15c]"
        style={fieldStyle}
        aria-label="Search jobs by title or location"
      />

      <label htmlFor="jobs-dept" className="sr-only">Filter by department</label>
      <select
        id="jobs-dept"
        value={dept}
        onChange={(e) => setDept(e.target.value)}
        aria-label="Filter by department"
        className="rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#bfa15c]"
        style={fieldStyle}
      >
        {deptOptions.map((d) => (
          <option key={d} value={d} className="bg-[#0a1733] text-white">
            {d === "all" ? "All Departments" : d}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2 text-sm text-white/80">
        <input
          type="checkbox"
          checked={remoteOnly}
          onChange={(e) => setRemoteOnly(e.target.checked)}
          className="h-4 w-4 rounded accent-[#bfa15c]"
          aria-label="Remote only"
        />
        <span>Remote only</span>
      </label>

      <div className="ms-auto flex items-center gap-2">
        <button
          type="submit"
          className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
          style={{ background: GOLD, color: "#0a1733" }}
        >
          Apply
        </button>
        {hasActive && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
            style={{ border: `1px solid ${GOLD}55` }}
            aria-label="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
