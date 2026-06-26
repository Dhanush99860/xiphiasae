"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export type ProgramItem = {
  service: "Residency" | "Citizenship" | "Corporate" | "Skilled";
  country: string;
  countryHref: string;
  countryCode?: string;
  program: string;
  href: string;
  brochureUrl?: string | null;
};

type Props = {
  items: ProgramItem[];
  residencyEligibilityHref: string;
  corporateEligibilityHref: string;
  eligibilityHref: string;
};

function normalize(s: string) {
  return s.toLowerCase().normalize("NFKD");
}

export default function GuideCatalog({
  items,
  residencyEligibilityHref,
  corporateEligibilityHref,
  eligibilityHref,
}: Props) {
  const [q, setQ] = useState("");
  const [serviceFilter, setServiceFilter] =
    useState<ProgramItem["service"] | "All">("All");
  const [countryFilter, setCountryFilter] = useState<string>("All");
  const [hasBrochureOnly, setHasBrochureOnly] = useState(false);

  const services = useMemo(
    () => Array.from(new Set(items.map((i) => i.service))),
    [items]
  );

  const countries = useMemo(() => {
    const pool =
      serviceFilter === "All" ? items : items.filter((i) => i.service === serviceFilter);
    return ["All", ...Array.from(new Set(pool.map((i) => i.country))).sort()];
  }, [items, serviceFilter]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    return items.filter((i) => {
      if (serviceFilter !== "All" && i.service !== serviceFilter) return false;
      if (countryFilter !== "All" && i.country !== countryFilter) return false;
      if (hasBrochureOnly && !i.brochureUrl) return false;
      if (!nq) return true;
      return normalize(`${i.service} ${i.country} ${i.program}`).includes(nq);
    });
  }, [items, q, serviceFilter, countryFilter, hasBrochureOnly]);

  const activeEligibilityHref =
    serviceFilter === "Residency"
      ? residencyEligibilityHref
      : serviceFilter === "Corporate"
      ? corporateEligibilityHref
      : eligibilityHref;

  function downloadCsv() {
    const header = ["Service", "Country", "Program", "Program URL", "Brochure URL"];
    const rows = filtered.map((i) => [
      i.service,
      i.country,
      i.program,
      i.href,
      i.brochureUrl ?? "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "programs.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function trackBrochure(eventName: string, item: ProgramItem) {
    try {
      const w = window as any;
      if (w.dataLayer) {
        w.dataLayer.push({
          event: eventName,
          service: item.service,
          country: item.country,
          program: item.program,
          program_url: item.href,
          brochure_url: item.brochureUrl,
        });
      }
    } catch {}
  }

  /* ----- Auto show top scrollbar only when needed ----- */
  const topScrollRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const syncing = useRef(false);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [contentWidth, setContentWidth] = useState(980);

  useEffect(() => {
    const measure = () => {
      const scrollWidth = tableRef.current?.scrollWidth ?? 980;
      const clientWidth = wrapRef.current?.clientWidth ?? 0;
      setContentWidth(scrollWidth);
      setNeedsScroll(scrollWidth > clientWidth + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (tableRef.current) ro.observe(tableRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const scrollWidth = tableRef.current?.scrollWidth ?? 980;
    const clientWidth = wrapRef.current?.clientWidth ?? 0;
    setContentWidth(scrollWidth);
    setNeedsScroll(scrollWidth > clientWidth + 1);
  }, [filtered.length, q, serviceFilter, countryFilter, hasBrochureOnly]);

  const onTopScroll = () => {
    if (!topScrollRef.current || !wrapRef.current) return;
    if (syncing.current) return;
    syncing.current = true;
    wrapRef.current.scrollLeft = topScrollRef.current.scrollLeft;
    requestAnimationFrame(() => (syncing.current = false));
  };
  const onTableScroll = () => {
    if (!topScrollRef.current || !wrapRef.current) return;
    if (syncing.current) return;
    syncing.current = true;
    topScrollRef.current.scrollLeft = wrapRef.current.scrollLeft;
    requestAnimationFrame(() => (syncing.current = false));
  };

  return (
    <div className="mt-0">
      {/* Controls — single row, scroll if overflow */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1">
        <input
          id="q"
          type="search"
          placeholder="Search programs, countries, services"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="min-w-[220px] rounded-lg border border-gold/45 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
        />

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value as any)}
          className="min-w-[140px] rounded-lg border border-gold/45 bg-white px-2.5 py-2 text-sm text-ink focus:outline-none focus:border-gold"
        >
          <option value="All">All Services</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="min-w-[140px] rounded-lg border border-gold/45 bg-white px-2.5 py-2 text-sm text-ink focus:outline-none focus:border-gold"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Top scrollbar — only when needed */}
      {needsScroll && (
        <div
          ref={topScrollRef}
          onScroll={onTopScroll}
          className="mt-2 h-3 overflow-x-auto overflow-y-hidden rounded-md border border-gold/45"
          aria-hidden="true"
        >
          <div style={{ width: contentWidth, height: 1 }} />
        </div>
      )}

      {/* Table — one line per row, chips always visible, sticky Actions on right */}
      <div
        ref={wrapRef}
        onScroll={onTableScroll}
        className="mt-2 overflow-auto rounded-2xl ring-1 ring-gold/10"
      >
        <table
          ref={tableRef}
          className="table-auto w-full text-[13px] leading-tight"
          style={{ minWidth: 0 }}
        >
          <colgroup>
            <col style={{ width: "14ch" }} />
            <col style={{ width: "18ch" }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: "1%", minWidth: 230 }} />
          </colgroup>

          <thead className="sticky top-0 z-20 bg-white">
            <tr>
              <th className="px-2.5 py-2 text-left font-semibold text-ink/40">Service</th>
              <th className="px-2.5 py-2 text-left font-semibold text-ink/40">Country</th>
              <th className="px-2.5 py-2 text-left font-semibold text-ink/40">Program</th>
              <th className="sticky right-0 z-20 bg-white px-2.5 py-2 text-left font-semibold text-ink/40">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gold/10 bg-white">
            {filtered.map((i) => (
              <tr key={i.href} className="align-top">
                <td className="whitespace-nowrap px-2.5 py-1.5 text-ink/70">
                  {i.service}
                </td>

                <td className="whitespace-nowrap px-2.5 py-1.5">
                  <Link href={i.countryHref} className="text-ink/70 transition-colors hover:text-gold">
                    {i.country}
                  </Link>
                </td>

                <td className="px-2.5 py-1.5">
                  <div className="truncate" title={i.program}>
                    <Link href={i.href} className="font-medium text-ink transition-colors hover:text-gold">
                      {i.program}
                    </Link>
                  </div>
                </td>

                {/* Sticky right — chip buttons, always visible, one row */}
                <td className="sticky right-0 z-10 bg-white px-2.5 py-1.5">
                  <div className="flex flex-nowrap items-center gap-1.5">
                    <Link
                      href={i.href}
                      className="rounded-md bg-gold px-2.5 py-1.5 text-xs font-medium text-[#0a1733] transition-colors hover:bg-gold/90"
                      aria-label="View Program"
                    >
                      Explore Program
                    </Link>

                    {i.brochureUrl ? (
                      <a
                        href={i.brochureUrl}
                        download
                        onClick={() => trackBrochure("brochure_download", i)}
                        className="rounded-md border border-gold/45 bg-pearl px-2.5 py-1.5 text-xs font-medium text-gold_deep transition-colors hover:border-gold/60"
                        aria-label="Download Brochure"
                      >
                        Brochure
                      </a>
                    ) : (
                      <span
                        className="rounded-md border border-gold/45 bg-pearl px-2.5 py-1.5 text-xs text-ink/40"
                        aria-hidden="true"
                      >
                        No brochure
                      </span>
                    )}

                    <Link
                      href={eligibilityHref}
                      className="rounded-md border border-gold/45 bg-pearl px-2.5 py-1.5 text-xs font-medium text-ink/70 transition-colors hover:border-gold/65 hover:text-gold_deep"
                      aria-label="Check Eligibility"
                    >
                      Eligibility
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-3 text-sm text-ink/55">No programs match your filters.</p>
      )}
    </div>
  );
}
