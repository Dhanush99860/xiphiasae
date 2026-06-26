"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { Container, Eyebrow } from "@/components/ui";
import {
  LatticeOverlay,
  SplitText,
  DrawLine,
  SandReveal,
  Counter,
  KenBurns,
} from "@/components/motion";
import { HOME_MARKERS } from "./data";

// ── Cropped equirectangular projection ──────────────────────────────────────
// Window is zoomed to the inhabited band so the destinations spread across the
// FULL panel (top→bottom, edge→edge) instead of bunching in a thin strip.
const W = 1000;
const H = 760;
const LNG_MIN = -135;
const LNG_MAX = 155;
const LAT_MAX = 72;
const LAT_MIN = -48;

function project(lat: number, lng: number) {
  return {
    x: ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W,
    y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
  };
}

// Quadratic bezier with a lifted control point → graceful great-circle-style arc.
function arcPath(from: [number, number], to: [number, number]): string {
  const a = project(from[0], from[1]);
  const b = project(to[0], to[1]);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(160, dist * 0.34);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${mx.toFixed(1)} ${(my - lift).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

// ── UAE is the hub. Everything radiates from the Emirates. ───────────────────
const UAE_ORIGIN: [number, number] = [25.2048, 55.2708];
const ORIGIN = project(UAE_ORIGIN[0], UAE_ORIGIN[1]);

// Destinations = every marker except the UAE origin.
const DESTINATIONS = HOME_MARKERS.filter((m) => m.code !== "AE");

// Gold "priority corridors"; the rest are standard routes.
const PRIORITY = new Set(["IN", "GB", "CA", "PT"]);

// Always-on labels so the map reads before any hover.
const ALWAYS_ON = new Set(["CA", "GB", "AU", "SG", "IN"]);

// Each destination dot/label links to that country's page. Only verified-live
// routes are mapped; everything else falls back to the programme explorer so a
// click never lands on a 404/500.
const COUNTRY_HREF: Record<string, string> = {
  AE: "/residency/uae",
  PT: "/residency/portugal",
  GD: "/citizenship/grenada",
  AU: "/skilled/australia",
  GR: "/residency/greece",
  MT: "/residency/malta",
  TR: "/citizenship/turkey",
};
const hrefFor = (code: string) => COUNTRY_HREF[code] ?? "/programme-explorer";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GlobalRouteCommand() {
  const [focusCode, setFocusCode] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const router = useRouter();

  const points = useMemo(
    () => DESTINATIONS.map((m) => ({ ...m, ...project(m.lat, m.lng) })),
    []
  );
  const arcs = useMemo(
    () =>
      DESTINATIONS.map((m) => ({
        code: m.code,
        gold: PRIORITY.has(m.code),
        d: arcPath(UAE_ORIGIN, [m.lat, m.lng]),
      })),
    []
  );

  return (
    <section className="relative w-full overflow-hidden bg-midnight py-24 text-pearl lg:py-28">
      {/* ── Full-bleed cinematic Dubai cityscape behind everything ── */}
      <div aria-hidden className="absolute inset-0">
        <KenBurns
          src="/images/blogs/dubai.webp"
          alt=""
          className="h-full w-full"
          sizes="100vw"
          duration={28}
          position="center 35%"
        />
        {/* Layered scrims for legibility + drama */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/85 to-midnight" />
        <div className="absolute inset-0 bg-midnight/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_38%,rgba(212,175,55,0.12)_0%,transparent_60%)]" />
      </div>

      <LatticeOverlay opacity={0.05} />

      {/* Gold scroll-guide divider drawing in at the top of the band */}
      <DrawLine
        d="M0 1 L1000 1"
        viewBox="0 0 1000 2"
        preserveAspectRatio="none"
        strokeWidth={2}
        duration={1.8}
        className="pointer-events-none absolute inset-x-0 top-0 h-px w-full"
      />

      <Container size="2xl" className="relative z-10">
        {/* Header */}
        <SandReveal className="mb-12 flex flex-col items-start gap-5 text-start">
          <Eyebrow tone="gold" arabic="شبكة عالمية">
            Global Route Network
          </Eyebrow>
          <h2 className="max-w-3xl font-sora text-[clamp(1.9rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-pearl">
            <SplitText text="One desk in Dubai." />{" "}
            <span className="block text-gold">
              <SplitText text="Every route on earth." delay={0.25} />
            </span>
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-pearl/65">
            Every route mapped from the Emirates to the world&apos;s most
            sought-after jurisdictions — anchored in our Dubai advisory desk.
          </p>
        </SandReveal>

        {/* Map + side panel */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
          {/* ── SVG world panel (fills the full cell) ── */}
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-gold/35 bg-ink/40 ring-1 ring-inset ring-gold/[0.06] backdrop-blur-sm">
            <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-gold/40 bg-midnight/60 px-3 py-1.5 backdrop-blur-sm">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pearl/70">
                Origin · UAE
              </p>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="World map of immigration destinations served from the UAE"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="grc-glow" cx="62%" cy="40%" r="80%">
                  <stop offset="0%" stopColor="#0c1322" stopOpacity="1" />
                  <stop offset="100%" stopColor="#050810" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="grc-arc-gold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#e1b923" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="grc-arc-blue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Midnight ground */}
              <rect x="0" y="0" width={W} height={H} fill="url(#grc-glow)" fillOpacity="0.72" />

              {/* Graticule — curved meridians + latitude lines for a global feel */}
              <g aria-hidden="true" stroke="#d4af37" strokeOpacity="0.16" fill="none">
                {Array.from({ length: 13 }).map((_, i) => {
                  const x = (i / 12) * W;
                  const bow = (x - W / 2) * 0.08;
                  return (
                    <path
                      key={`mer${i}`}
                      d={`M ${x} 0 Q ${x + bow} ${H / 2} ${x} ${H}`}
                      strokeWidth="0.5"
                    />
                  );
                })}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={`lat${i}`}
                    x1="0"
                    y1={(i / 7) * H}
                    x2={W}
                    y2={(i / 7) * H}
                    strokeWidth="0.5"
                  />
                ))}
              </g>

              {/* Faint world dot-matrix so no area reads as dead space */}
              <g aria-hidden="true" fill="#d4af37" fillOpacity="0.22">
                {Array.from({ length: 26 }).map((_, r) =>
                  Array.from({ length: 40 }).map((_, c) => (
                    <circle key={`d${r}-${c}`} cx={(c / 39) * W} cy={(r / 25) * H} r="1.1" />
                  ))
                )}
              </g>

              {/* Route arcs — draw on via pathLength, staggered */}
              <g fill="none" strokeLinecap="round">
                {arcs.map((arc, i) => (
                  <motion.path
                    key={`arc-${arc.code}`}
                    d={arc.d}
                    stroke={arc.gold ? "url(#grc-arc-gold)" : "url(#grc-arc-blue)"}
                    strokeWidth={arc.gold ? 2.6 : 1.9}
                    strokeOpacity={1}
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.4, ease: EASE, delay: 0.2 + i * 0.1 }}
                  />
                ))}
              </g>

              {/* Travelling pulses along each arc */}
              {!reduce && (
                <g aria-hidden="true">
                  {arcs.map((arc, i) => (
                    <circle key={`pulse-${arc.code}`} r="3" fill={arc.gold ? "#e1b923" : "#93c5fd"}>
                      <animateMotion
                        dur="4.5s"
                        begin={`${1.4 + i * 0.3}s`}
                        repeatCount="indefinite"
                        path={arc.d}
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.1;0.85;1"
                        dur="4.5s"
                        begin={`${1.4 + i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              )}

              {/* Origin marker (UAE) — gold anchor */}
              <g>
                {!reduce && (
                  <motion.circle
                    cx={ORIGIN.x}
                    cy={ORIGIN.y}
                    r="7"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="1.2"
                    initial={{ scale: 0.6, opacity: 0.7 }}
                    animate={{ scale: [0.6, 3], opacity: [0.7, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                    style={{ transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px` }}
                  />
                )}
                <circle cx={ORIGIN.x} cy={ORIGIN.y} r="5" fill="#e1b923" />
                <circle cx={ORIGIN.x} cy={ORIGIN.y} r="5" fill="none" stroke="#f5ede0" strokeWidth="1.2" />
                <text
                  x={ORIGIN.x - 10}
                  y={ORIGIN.y + 4}
                  textAnchor="end"
                  className="font-sora"
                  fontSize="12"
                  fontWeight="700"
                  fill="#e1b923"
                  style={{ pointerEvents: "none" }}
                >
                  UAE
                </text>
              </g>

              {/* Destination markers — pulsing dots + labels */}
              {points.map((p, i) => {
                const active = focusCode === p.code;
                const showLabel = ALWAYS_ON.has(p.code) || active;
                const dot = p.code === "AE" || p.code === "IN" ? "#e1b923" : "#93c5fd";
                const labelRight = p.x < W - 150;
                return (
                  <g
                    key={p.code}
                    className="cursor-pointer"
                    role="link"
                    tabIndex={0}
                    aria-label={`View ${p.label} programmes`}
                    onMouseEnter={() => setFocusCode(p.code)}
                    onMouseLeave={() => setFocusCode(null)}
                    onClick={() => router.push(hrefFor(p.code))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(hrefFor(p.code));
                      }
                    }}
                  >
                    <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
                    {!reduce && (
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        fill="none"
                        stroke={dot}
                        strokeWidth="1"
                        initial={{ scale: 0.5, opacity: 0.6 }}
                        animate={{ scale: [0.5, 2.4], opacity: [0.6, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.18 }}
                        style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={active ? 5.5 : 4}
                      fill={dot}
                      stroke="#050810"
                      strokeWidth="1.4"
                    />
                    {showLabel && (
                      <text
                        x={labelRight ? p.x + 9 : p.x - 9}
                        y={p.y + 3.5}
                        textAnchor={labelRight ? "start" : "end"}
                        className="font-sora"
                        fontSize="12.5"
                        fontWeight="700"
                        fill={active ? "#f5e6b0" : "#e6dcc8"}
                        style={{ pointerEvents: "none", paintOrder: "stroke" }}
                        stroke="#050810"
                        strokeWidth="2.4"
                        strokeOpacity="0.7"
                      >
                        {p.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── Side panel: destinations + counts ── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-gold/35 bg-ink/40 p-5 backdrop-blur-sm">
              <div className="flex items-baseline justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Active Routes
                </p>
                <Counter
                  to={arcs.length}
                  className="font-sora text-2xl font-bold text-gold"
                />
              </div>
              <p className="mt-1 text-[12px] text-pearl/60">
                {DESTINATIONS.length} live destinations across six continents
              </p>
            </div>

            <ul className="flex flex-col gap-1.5">
              {points.map((p, i) => {
                const active = focusCode === p.code;
                return (
                  <motion.li
                    key={p.code}
                    initial={reduce ? false : { opacity: 0, x: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setFocusCode(p.code)}
                      onMouseLeave={() => setFocusCode(null)}
                      onFocus={() => setFocusCode(p.code)}
                      onBlur={() => setFocusCode(null)}
                      onClick={() => router.push(hrefFor(p.code))}
                      aria-label={`View ${p.label} programmes`}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-start transition-colors ${
                        active
                          ? "border-gold/60 bg-gold/[0.12]"
                          : "border-gold/25 bg-ink/30 hover:border-gold/55 hover:bg-ink/55"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                          style={{
                            background:
                              p.code === "AE" || p.code === "IN"
                                ? "#e1b923"
                                : "#93c5fd",
                          }}
                        />
                        <span className="text-[13.5px] font-semibold text-pearl">{p.label}</span>
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-pearl/50">
                        {p.code}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gold/25 pt-4">
              <span className="flex items-center gap-2 text-[11px] font-medium text-pearl/60">
                <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-gold" />
                Priority corridor
              </span>
              <span className="flex items-center gap-2 text-[11px] font-medium text-pearl/60">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "#93c5fd" }}
                />
                Standard route
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom gold hairline closes the band */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />
    </section>
  );
}
