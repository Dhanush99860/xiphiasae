"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PassportRecord } from "@/data/passport-index";
import { centroidForCode } from "@/data/country-centroids";
import { LazyGlobe } from "@/components/globe";
import type { GlobeArc, GlobeMarker } from "@/components/globe";

type Props = {
  records: PassportRecord[];
  highlightedCodes?: string[];
};

/** Choropleth colour by visa-free score (mirrors the legacy world map). */
function scoreColor(score?: number) {
  if (!score) return "#3a4258";
  if (score >= 185) return "#d4af37";
  if (score >= 170) return "#b89530";
  if (score >= 100) return "#8a7a4e";
  return "#5c5a52";
}

export default function PassportGlobe({ records, highlightedCodes }: Props) {
  const effective = highlightedCodes ?? records.map((r) => r.code);
  const listRecords = useMemo(
    () => records.filter((r) => effective.includes(r.code)),
    [records, effective],
  );

  const recordByCode = useMemo(() => new Map(records.map((r) => [r.code, r])), [records]);
  const [selectedCode, setSelectedCode] = useState(listRecords[0]?.code ?? records[0]?.code ?? "SG");
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const selected = recordByCode.get(selectedCode) ?? listRecords[0] ?? records[0];

  // Markers placed by ISO-2 centroid, coloured by score.
  const markers = useMemo<GlobeMarker[]>(() => {
    return listRecords
      .map((r) => {
        const centroid = centroidForCode(r.code);
        if (!centroid) return null;
        return {
          code: r.code,
          lat: centroid.lat,
          lng: centroid.lng,
          label: `${r.country} · ${r.score}`,
          weight: Math.max(0.25, r.score / 192),
          color: scoreColor(r.score),
        } satisfies GlobeMarker;
      })
      .filter(Boolean) as GlobeMarker[];
  }, [listRecords]);

  // Arcs: from the selected passport to the four most powerful passports.
  const arcs = useMemo<GlobeArc[]>(() => {
    const origin = selected ? centroidForCode(selected.code) : undefined;
    if (!origin) return [];
    return [...records]
      .sort((a, b) => a.rankValue - b.rankValue)
      .filter((r) => r.code !== selected?.code)
      .slice(0, 4)
      .map((r) => centroidForCode(r.code))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => ({
        from: [origin.lat, origin.lng] as [number, number],
        to: [c.lat, c.lng] as [number, number],
        color: "#d4af37",
      }));
  }, [records, selected]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/45 bg-white text-ink shadow-xl">
      <div className="grid lg:grid-cols-[360px_1fr]">
        {/* ── Left: ranked list ── */}
        <aside className="flex h-full max-h-[64vh] flex-col overflow-hidden border-b border-gold/45 bg-white lg:max-h-[82vh] lg:border-b-0 lg:border-r">
          <div className="flex-none border-b border-gold/45 px-4 pb-3 pt-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">Global Ranking</p>
            <h2 className="mt-0.5 text-base font-black text-ink">Passport Snapshot</h2>
          </div>

          <div className="grid flex-none grid-cols-[1fr_60px_52px] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-ink/40">
            <span>Passport</span>
            <span>Rank</span>
            <span className="text-right">Score</span>
          </div>

          <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
            {listRecords.map((record) => {
              const active = selected?.code === record.code;
              return (
                <button
                  key={record.code}
                  type="button"
                  onClick={() => setSelectedCode(record.code)}
                  onMouseEnter={() => setHoveredCode(record.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  className={[
                    "grid w-full grid-cols-[1fr_60px_52px] items-center gap-2 border-b border-gold/45 px-4 py-3 text-left transition-all duration-150",
                    active
                      ? "border-l-2 border-l-gold bg-gold/10"
                      : "border-l-2 border-l-transparent hover:bg-white/[0.03]",
                  ].join(" ")}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={[
                        "flex size-7 shrink-0 items-center justify-center rounded-full text-[9.5px] font-black ring-1 transition-all",
                        active ? "bg-gold text-midnight ring-gold/60" : "bg-sand/60 text-gold ring-gold/25",
                      ].join(" ")}
                    >
                      {record.code}
                    </span>
                    <span className={["truncate text-[13px] font-semibold", active ? "text-ink" : "text-ink/70"].join(" ")}>
                      {record.country}
                    </span>
                  </span>
                  <span className={["text-[12px] font-black", active ? "text-ink" : "text-ink/55"].join(" ")}>
                    {record.rank}
                  </span>
                  <span
                    className={["text-right text-[13px] font-black tabular-nums", active ? "text-gold" : "text-ink/60"].join(" ")}
                  >
                    {record.score}
                  </span>
                </button>
              );
            })}
          </div>

          {selected ? (
            <div className="flex-none border-t border-gold/45 p-4">
              <Link
                href={`/passport-index/passport/${selected.code.toLowerCase()}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-[13px] font-black text-midnight transition hover:bg-gold_bright"
              >
                Open {selected.country} profile
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </aside>

        {/* ── Right: interactive globe (drag to spin, no zoom) ── */}
        <div className="relative min-h-[60vh] bg-sand lg:min-h-[82vh]">
          <LazyGlobe
            className="absolute inset-0"
            theme="dark"
            markers={markers}
            arcs={arcs}
            selectedCode={selectedCode}
            hoveredCode={hoveredCode}
            onSelect={setSelectedCode}
            onHover={setHoveredCode}
            enableZoom={false}
            cameraZ={4.9}
            ariaLabel="Interactive globe of passport mobility scores"
          />

          {/* Title badge */}
          <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-gold/45 bg-white/90 px-3.5 py-2.5 shadow-lg backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">World Access Globe</p>
            <p className="mt-0.5 text-[12px] font-semibold text-ink/70">Spin · select a passport</p>
          </div>

          {/* Legend */}
          <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-1.5 rounded-lg border border-gold/45 bg-white/90 px-3 py-2.5 text-[10.5px] font-semibold text-ink/70 shadow-lg backdrop-blur-sm">
            {[
              { c: "#d4af37", t: "Elite (185+)" },
              { c: "#b89530", t: "High (170+)" },
              { c: "#8a7a4e", t: "Strategic (100+)" },
              { c: "#5c5a52", t: "Restricted (<100)" },
            ].map((row) => (
              <span key={row.t} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: row.c }} />
                {row.t}
              </span>
            ))}
          </div>

          {/* Selected detail card */}
          {selected ? (
            <div className="absolute bottom-4 right-4 w-[min(300px,calc(100%-2rem))] rounded-xl border border-gold/45 bg-white/95 p-4 shadow-2xl backdrop-blur-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold">Selected</p>
                  <h3 className="mt-0.5 text-base font-black text-ink">{selected.country}</h3>
                </div>
                <span className="shrink-0 rounded-full bg-gold px-2.5 py-1 text-[11px] font-black text-midnight">
                  {selected.score}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-gold/45 bg-sand/50 p-2.5">
                  <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-ink/45">Rank</span>
                  <span className="mt-0.5 block text-sm font-black text-ink">{selected.rank}</span>
                </div>
                <div className="rounded-lg border border-gold/45 bg-sand/50 p-2.5">
                  <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-ink/45">Band</span>
                  <span className="mt-0.5 block text-sm font-black text-ink">{selected.band}</span>
                </div>
              </div>
              {selected.xiphiasLens ? (
                <p className="mt-3 text-[11.5px] leading-relaxed text-ink/60">{selected.xiphiasLens}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
