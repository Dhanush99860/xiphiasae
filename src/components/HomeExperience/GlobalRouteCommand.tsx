"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import LivingGlobeFallback from "./three/LivingGlobeFallback";
import { HOME_MARKERS, type JourneyId, JOURNEY_PATHS } from "./data";
import { heroArcs } from "./three/FlightArcs";

const LivingGlobe = dynamic(() => import("./three/LivingGlobe"), {
  ssr: false,
  loading: () => (
    <LivingGlobeFallback markers={HOME_MARKERS} className="absolute inset-0" />
  ),
});

// Destination summary table
const ROUTE_TABLE = [
  { dest: "UAE", route: "Golden Visa", track: "Residency", time: "2–3 months", code: "AE" },
  { dest: "Canada", route: "Express Entry", track: "Skilled", time: "12–18 months", code: "CA" },
  { dest: "Portugal", route: "Golden Visa", track: "Residency", time: "6–8 months", code: "PT" },
  { dest: "Greece", route: "Golden Visa", track: "Residency", time: "3–6 months", code: "GR" },
  { dest: "Australia", route: "Skilled Points", track: "Skilled", time: "12–24 months", code: "AU" },
  { dest: "Grenada", route: "CBI Fund", track: "Citizenship", time: "4–6 months", code: "GD" },
  { dest: "Turkey", route: "CBI Real Estate", track: "Citizenship", time: "3–6 months", code: "TR" },
  { dest: "UK", route: "Innovator Founder", track: "Skilled", time: "3–6 months", code: "GB" },
];

const TRACK_COLORS: Record<string, string> = {
  Residency: "#3b82f6",
  Skilled: "#10b981",
  Citizenship: "#e1b923",
  Corporate: "#a78bfa",
};

export default function GlobalRouteCommand() {
  const [focusCode, setFocusCode] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#04091a] py-24"
      aria-label="Global route command center"
    >
      {/* Divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Command grid background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 sm:px-10 xl:px-16">

        {/* Header */}
        <div className="mb-12 flex flex-col items-start">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            Route Command
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-black leading-tight tracking-tight text-white">
            50+ destinations.
            <br />
            <span className="text-secondary">One</span> trusted advisor.
          </h2>
        </div>

        {/* Globe + route table */}
        <div className="grid gap-8 lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,480px]">

          {/* Globe */}
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/8 bg-[#05080f] lg:min-h-[520px]">
            {reduce ? (
              <LivingGlobeFallback markers={HOME_MARKERS} className="absolute inset-0" />
            ) : (
              <LivingGlobe
                markers={HOME_MARKERS}
                arcs={heroArcs}
                variant="command"
                focusCode={focusCode}
                className="absolute inset-0"
              />
            )}

            {/* Corner label */}
            <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-[#040b1a]/80 px-3 py-1.5 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                Origin: India
              </p>
            </div>
          </div>

          {/* Route table */}
          <div className="flex flex-col gap-2">
            {ROUTE_TABLE.map((row, i) => (
              <motion.button
                key={row.code}
                initial={reduce ? {} : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseEnter={() => setFocusCode(row.code)}
                onMouseLeave={() => setFocusCode(null)}
                onFocus={() => setFocusCode(row.code)}
                onBlur={() => setFocusCode(null)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                  focusCode === row.code
                    ? "border-white/20 bg-white/8"
                    : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
                }`}
                aria-label={`${row.dest} — ${row.route}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: TRACK_COLORS[row.track] ?? "#fff" }}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] font-semibold text-white/85">{row.dest}</span>
                  <span className="text-[12px] text-white/40">{row.route}</span>
                </div>
                <span
                  className="text-[11px] font-medium"
                  style={{ color: TRACK_COLORS[row.track] ?? "#fff" }}
                >
                  {row.time}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom track legend */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {(Object.entries(TRACK_COLORS) as Array<[JourneyId, string]>).map(([track, color]) => (
            <span key={track} className="flex items-center gap-2 text-[12px] text-white/40">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: color }}
                aria-hidden="true"
              />
              {track}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
