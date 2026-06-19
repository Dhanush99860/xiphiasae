"use client";

/**
 * CinematicMobilityScene
 * ─────────────────────
 * Full-screen cinematic hero visual — no flat maps, no dashboards.
 *
 * Layers (bottom → top):
 *  0  Background atmosphere — deep navy + blue/gold radial glows + grid
 *  1  Dramatic light beams — embassy/airport spotlight feel
 *  2  Glass command table — CSS perspective ellipse, drone/top-down angle
 *  3  Holographic route SVG — live on the table surface
 *  4  Premium passport + visa stack — immigration signal
 *  5  Floating route labels — minimal, above perspective layer
 *  6  Edge vignette — cinematic darkening
 */

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ── Route data ────────────────────────────────────────────────────────────────
// SVG viewBox: 0 0 1400 560 — India at (780, 300) is the origin.
// All destinations are positioned geographically relative to India.
const OX = 780;
const OY = 300;

const ROUTES = [
  { code: "AE", x: 718,  y: 268, lift: 65,  gold: true,  delay: 0.35 },
  { code: "TR", x: 558,  y: 202, lift: 80,  gold: false, delay: 0.55 },
  { code: "GR", x: 488,  y: 215, lift: 82,  gold: false, delay: 0.75 },
  { code: "GB", x: 355,  y: 155, lift: 102, gold: false, delay: 0.95 },
  { code: "PT", x: 315,  y: 178, lift: 100, gold: false, delay: 1.15 },
  { code: "CA", x: 118,  y: 115, lift: 122, gold: false, delay: 1.35 },
  { code: "US", x: 192,  y: 208, lift: 112, gold: false, delay: 1.55 },
  { code: "GD", x: 228,  y: 308, lift: 100, gold: false, delay: 1.75 },
  { code: "SG", x: 970,  y: 330, lift: 72,  gold: false, delay: 1.95 },
  { code: "AU", x: 1095, y: 425, lift: 90,  gold: false, delay: 2.15 },
] as const;

function arc(tx: number, ty: number, lift: number): string {
  const mx = (OX + tx) / 2;
  const my = (OY + ty) / 2 - lift;
  return `M ${OX} ${OY} Q ${mx} ${my} ${tx} ${ty}`;
}

// ── Grid lines on the table surface ──────────────────────────────────────────
const Y_LINES = [70, 140, 210, 280, 350, 420, 490];
const X_LINES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300];

// ── Premium route labels (normal-layer, not in perspective) ───────────────────
const FLOAT_LABELS = [
  { code: "AE", label: "Golden Visa",  top: "42%", left: "48%",  delay: 2.8, gold: true  },
  { code: "CA", label: "PR Route",     top: "20%", left: "10%",  delay: 3.1, gold: false },
  { code: "AU", label: "Skilled Visa", top: "62%", left: "73%",  delay: 3.4, gold: false },
  { code: "GB", label: "Expansion",    top: "22%", left: "25%",  delay: 3.7, gold: false },
] as const;

export default function CinematicMobilityScene() {
  const reduce = useReducedMotion();

  // ── Immersive header treatment (homepage only) ──────────────────────────────
  useEffect(() => {
    document.documentElement.dataset.heroImmersive = "true";
    return () => {
      delete document.documentElement.dataset.heroImmersive;
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">

      {/* ── CSS keyframes (client-only, no SSR mismatch) ─────────────────── */}
      <style>{`
        @keyframes _indiaCore  { 0%,100%{opacity:.9;r:7} 50%{opacity:.65;r:8.5} }
        @keyframes _arcBreathe { 0%,100%{stroke-opacity:.52} 50%{stroke-opacity:.88} }
        @keyframes _sweep      {
          0%   { opacity:0;  transform:translateX(-110%) }
          8%   { opacity:.9 }
          92%  { opacity:.9 }
          100% { opacity:0;  transform:translateX(110%)  }
        }
        @keyframes _passFloat  { 0%,100%{transform:translateY(0)  rotate(-6deg)} 50%{transform:translateY(-11px) rotate(-6deg)} }
        @keyframes _passFloat2 { 0%,100%{transform:translateY(0)  rotate( 3deg)} 50%{transform:translateY(-8px)  rotate( 3deg)} }
        @keyframes _glowBrth   { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes _nodePulse  { 0%,100%{opacity:.55} 50%{opacity:.92} }
        ${reduce ? "" : `
          .xc-arc      { animation: _arcBreathe 4.2s ease-in-out infinite }
          .xc-india    { animation: _indiaCore  2.6s ease-in-out infinite }
          .xc-sweep    { animation: _sweep      9s   ease-in-out infinite 3.5s }
          .xc-pass-a   { animation: _passFloat  5.2s ease-in-out infinite }
          .xc-pass-b   { animation: _passFloat2 6.8s ease-in-out infinite .9s }
          .xc-glow     { animation: _glowBrth   4.5s ease-in-out infinite }
          .xc-node     { animation: _nodePulse  3.8s ease-in-out infinite }
        `}
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 0 — Background atmosphere                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-[#020713]">
        {/* Primary blue glow — illuminates the table zone */}
        <div
          className="xc-glow absolute"
          style={{
            top: "5%", right: "-10%",
            width: "80%", height: "90%",
            background:
              "radial-gradient(ellipse at 58% 52%, rgba(14,62,185,0.30) 0%, rgba(8,32,110,0.16) 42%, transparent 70%)",
          }}
        />
        {/* Secondary depth glow */}
        <div
          className="absolute"
          style={{
            top: "25%", left: "5%",
            width: "55%", height: "60%",
            background:
              "radial-gradient(ellipse at 42% 50%, rgba(5,22,75,0.38) 0%, transparent 68%)",
          }}
        />
        {/* Gold haze near India table point */}
        <div
          className="xc-glow absolute"
          style={{
            top: "30%", left: "50%",
            width: "32%", height: "38%",
            background:
              "radial-gradient(ellipse at 45% 55%, rgba(225,185,35,0.07) 0%, transparent 65%)",
            animationDelay: "1.2s",
          }}
        />
        {/* Very subtle command grid */}
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,1) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 1 — Dramatic light beams (embassy spotlight atmosphere)      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { angle: 174, op: 0.030 },
          { angle: 179, op: 0.038 },
          { angle: 184, op: 0.024 },
          { angle: 169, op: 0.016 },
          { angle: 191, op: 0.016 },
        ].map((ray, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${ray.angle}deg, transparent 18%, rgba(28,90,205,${ray.op}) 50%, transparent 82%)`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 2 — Glass command table (CSS perspective + drone angle)      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{ perspective: "1050px", perspectiveOrigin: "50% 6%" }}
      >
        {/* Table surface — elliptical glass, rotated toward horizon */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "50%",
            transform: "translateX(-50%) rotateX(60deg)",
            transformOrigin: "50% 100%",
            width: "min(162vw, 2150px)",
            height: "72vh",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse 72% 72% at 50% 50%, rgba(5,16,70,0.97) 0%, rgba(3,10,46,0.93) 38%, rgba(2,7,32,0.80) 66%, transparent 100%)",
            border: "1px solid rgba(96,165,250,0.18)",
            boxShadow: [
              "0 0 55px 10px rgba(14,62,185,0.58)",
              "0 0 150px 38px rgba(14,62,185,0.28)",
              "0 0 340px 90px rgba(14,62,185,0.11)",
              "inset 0 0 110px rgba(8,42,148,0.48)",
            ].join(","),
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          {/* Table light sweep — slow glint across surface */}
          <div
            className="xc-sweep absolute inset-y-0 w-[28%] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.055) 50%, transparent 100%)",
              willChange: "transform, opacity",
            }}
          />

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* LAYER 3 — Holographic route SVG on table surface           */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <svg
            viewBox="0 0 1400 560"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <defs>
              {/* Arc glow filter */}
              <filter id="xc-arc-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* India glow filter */}
              <filter id="xc-india-glow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Node glow filter */}
              <filter id="xc-node-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Table surface radial fade mask */}
              <radialGradient id="xc-fade" cx="50%" cy="50%" r="50%">
                <stop offset="30%" stopColor="white" stopOpacity="1" />
                <stop offset="75%" stopColor="white" stopOpacity="0.65" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="xc-table-fade">
                <ellipse cx="700" cy="280" rx="700" ry="280" fill="url(#xc-fade)" />
              </mask>
            </defs>

            <g mask="url(#xc-table-fade)">
              {/* Grid lines — very subtle holographic grid */}
              <g stroke="rgba(96,165,250,0.060)" strokeWidth="0.55" fill="none">
                {Y_LINES.map((y) => <line key={y} x1="0" y1={y} x2="1400" y2={y} />)}
                {X_LINES.map((x) => <line key={x} x1={x} y1="0" x2={x} y2="560" />)}
              </g>

              {/* Equator-style ring around India — command table center marker */}
              <ellipse
                cx={OX} cy={OY}
                rx="320" ry="120"
                fill="none"
                stroke="rgba(96,165,250,0.038)"
                strokeWidth="0.7"
                strokeDasharray="4 8"
              />

              {/* Route arcs — animate path draw-in */}
              {ROUTES.map((dest) => (
                <motion.path
                  key={dest.code}
                  className="xc-arc"
                  d={arc(dest.x, dest.y, dest.lift)}
                  fill="none"
                  stroke={dest.gold ? "rgba(225,185,35,0.70)" : "rgba(96,165,250,0.52)"}
                  strokeWidth={dest.gold ? 1.4 : 1.0}
                  strokeLinecap="round"
                  filter="url(#xc-arc-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: {
                      duration: reduce ? 0 : 1.6,
                      delay: reduce ? 0 : dest.delay,
                      ease: "easeOut",
                    },
                    opacity: { duration: 0.3, delay: reduce ? 0 : dest.delay },
                  }}
                />
              ))}

              {/* Destination nodes */}
              {ROUTES.map((dest) => (
                <motion.g
                  key={`nd-${dest.code}`}
                  filter="url(#xc-node-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: dest.delay + 1.4 }}
                >
                  {/* Pulse ring */}
                  {!reduce && (
                    <circle
                      cx={dest.x} cy={dest.y} r="6"
                      fill="none"
                      stroke={dest.gold ? "rgba(225,185,35,0.35)" : "rgba(96,165,250,0.35)"}
                      strokeWidth="0.7"
                    >
                      <animate
                        attributeName="r"
                        values="5;16;5"
                        dur={`${3.2 + dest.delay * 0.15}s`}
                        begin={`${dest.delay}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.55;0;0.55"
                        dur={`${3.2 + dest.delay * 0.15}s`}
                        begin={`${dest.delay}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  {/* Core dot */}
                  <circle
                    cx={dest.x} cy={dest.y} r="3"
                    className="xc-node"
                    fill={dest.gold ? "#e1b923" : "#60a5fa"}
                  />
                  {/* Micro label */}
                  <text
                    x={dest.x + 5.5} y={dest.y + 3.5}
                    fill="rgba(255,255,255,0.38)"
                    fontSize="6.8"
                    fontFamily="monospace"
                    letterSpacing="0.9"
                  >
                    {dest.code}
                  </text>
                </motion.g>
              ))}

              {/* India origin — gold pulsing beacon */}
              <g filter="url(#xc-india-glow)">
                {/* Concentric pulse rings */}
                {!reduce && [1, 2, 3].map((ring) => (
                  <circle key={ring} cx={OX} cy={OY} r="8" fill="none" stroke="rgba(225,185,35,0.52)" strokeWidth="0.8">
                    <animate
                      attributeName="r"
                      values={`8;${8 + ring * 12};8`}
                      dur="2.9s"
                      begin={`${ring * 0.88}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.65;0;0.65"
                      dur="2.9s"
                      begin={`${ring * 0.88}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
                {/* Core */}
                <circle cx={OX} cy={OY} r="7" className="xc-india" fill="#e1b923" />
                <circle cx={OX} cy={OY} r="3.2" fill="#fff8dc" opacity="0.92" />
                {/* Label pill */}
                <rect x={OX - 22} y={OY - 24} width="44" height="15" rx="3.5"
                  fill="rgba(2,7,30,0.88)" stroke="rgba(225,185,35,0.52)" strokeWidth="0.7" />
                <text
                  x={OX} y={OY - 13}
                  textAnchor="middle"
                  fill="rgba(225,185,35,0.88)"
                  fontSize="7.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="1.5"
                >
                  INDIA
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Table underside glow — floor reflection */}
        <div
          className="xc-glow absolute"
          style={{
            bottom: 0, left: "50%",
            transform: "translateX(-50%)",
            width: "min(72vw, 860px)", height: "10px",
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(14,62,185,0.65) 0%, transparent 75%)",
            filter: "blur(14px)",
            animationDelay: "0.5s",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 4 — Premium passport + visa document stack                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: "17%",
          right: "6.5%",
          zIndex: 22,
          width: 112,
          height: 158,
        }}
      >
        {/* Back passport — rotated clockwise */}
        <div
          className="xc-pass-b absolute"
          style={{
            bottom: 0, right: 10,
            width: 92, height: 132,
            borderRadius: 7,
            background: "linear-gradient(152deg, #071832 0%, #0a2248 100%)",
            border: "0.5px solid rgba(225,185,35,0.16)",
            boxShadow: "0 14px 44px rgba(0,0,0,0.72), 0 0 0 0.5px rgba(255,255,255,0.03)",
            transform: "rotate(12deg)",
          }}
        >
          <div style={{ padding: "12px 10px", opacity: 0.32 }}>
            <div style={{ fontSize: 5.5, color: "#e1b923", fontFamily: "monospace", letterSpacing: 2, marginBottom: 8 }}>PASSPORT</div>
            <div style={{ width: 22, height: 22, border: "0.5px solid rgba(225,185,35,0.35)", borderRadius: "50%", marginBottom: 6 }} />
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: 0.9, background: `rgba(255,255,255,${0.07 - i * 0.015})`, marginBottom: 5 }} />
            ))}
          </div>
        </div>

        {/* Visa permit slip */}
        <div
          className="absolute"
          style={{
            bottom: 16, right: 24,
            width: 112, height: 72,
            borderRadius: 5,
            background: "linear-gradient(135deg, rgba(8,22,62,0.96) 0%, rgba(4,13,44,0.98) 100%)",
            border: "0.5px solid rgba(96,165,250,0.18)",
            boxShadow: "0 5px 18px rgba(0,0,0,0.55)",
            transform: "rotate(-4deg)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: 5.2, color: "rgba(96,165,250,0.55)", fontFamily: "monospace", letterSpacing: 1.5, marginBottom: 5 }}>
              VISA / ENTRY PERMIT
            </div>
            <div style={{ fontSize: 6.8, color: "rgba(255,255,255,0.58)", fontFamily: "monospace", marginBottom: 4 }}>
              XIPHIAS MOBILITY
            </div>
            <div style={{ height: 0.7, background: "rgba(96,165,250,0.12)", marginBottom: 4 }} />
            <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
              {["AE", "CA", "PT", "AU"].map((c) => (
                <div
                  key={c}
                  style={{
                    fontSize: 5, color: "rgba(255,255,255,0.28)",
                    fontFamily: "monospace",
                    background: "rgba(255,255,255,0.05)",
                    padding: "1px 3px", borderRadius: 2,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
          {/* MRZ lines */}
          <div style={{ position: "absolute", bottom: 5, left: 6, right: 6, overflow: "hidden" }}>
            <div style={{ fontSize: 4.8, color: "rgba(255,255,255,0.10)", fontFamily: "monospace", letterSpacing: -0.5, lineHeight: 1.4 }}>
              XIPHIASIMMIGRATION&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
              <br />
              IND&lt;7890123&lt;0&lt;IND&lt;2506150M
            </div>
          </div>
        </div>

        {/* Front passport — main visible one */}
        <div
          className="xc-pass-a absolute"
          style={{
            bottom: 20, right: 0,
            width: 92, height: 132,
            borderRadius: 7,
            background: "linear-gradient(152deg, #071d3e 0%, #0d2a5c 48%, #071d3e 100%)",
            border: "0.5px solid rgba(225,185,35,0.26)",
            boxShadow: [
              "0 18px 52px rgba(0,0,0,0.78)",
              "0 0 0 0.5px rgba(255,255,255,0.055)",
              "inset 0 1px 0 rgba(255,255,255,0.07)",
            ].join(","),
            transform: "rotate(-6deg)",
          }}
        >
          <div style={{ padding: "15px 12px" }}>
            <div style={{ fontSize: 5.2, color: "rgba(225,185,35,0.52)", fontFamily: "monospace", letterSpacing: 2, marginBottom: 12 }}>
              REPUBLIC OF INDIA
            </div>
            {/* Emblem circle */}
            <div
              style={{
                width: 34, height: 34, borderRadius: "50%",
                border: "0.8px solid rgba(225,185,35,0.32)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 11px",
                background: "radial-gradient(circle, rgba(225,185,35,0.055) 0%, transparent 70%)",
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: "0.5px solid rgba(225,185,35,0.22)" }} />
            </div>
            <div style={{ fontSize: 6.2, color: "rgba(255,255,255,0.20)", fontFamily: "monospace", letterSpacing: 1.5, textAlign: "center", marginBottom: 14 }}>
              PASSPORT
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 0.85, background: `rgba(255,255,255,${0.065 - i * 0.012})`, marginBottom: 5 }} />
            ))}
          </div>
          {/* Stamp circle */}
          <div
            style={{
              position: "absolute", bottom: 13, right: 10,
              width: 30, height: 30, borderRadius: "50%",
              border: "0.7px solid rgba(225,185,35,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 4.2, color: "rgba(225,185,35,0.32)", fontFamily: "monospace", textAlign: "center", letterSpacing: 0.5, lineHeight: 1.4 }}>
              XIPHIAS
              <br />✦
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 5 — Floating premium route labels (normal-space, no tilt)   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ position: "absolute", inset: 0, zIndex: 21, pointerEvents: "none" }}>
        {FLOAT_LABELS.map((tag) => (
          <motion.div
            key={tag.code}
            className="absolute"
            style={{ top: tag.top, left: tag.left }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: tag.delay }}
          >
            <div
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "5px 11px",
                background: "rgba(2,8,28,0.84)",
                border: `0.5px solid ${tag.gold ? "rgba(225,185,35,0.26)" : "rgba(96,165,250,0.13)"}`,
                borderRadius: 6,
                backdropFilter: "blur(14px)",
                minWidth: 98,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: 2,
                  color: tag.gold ? "rgba(225,185,35,0.72)" : "rgba(96,165,250,0.58)",
                }}
              >
                {tag.code}
              </span>
              <span style={{ width: 1, height: 11, background: "rgba(255,255,255,0.09)", flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.32)", whiteSpace: "nowrap" }}>
                {tag.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* LAYER 6 — Edge vignette (cinematic darkening)                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 92% 88% at 52% 48%, transparent 28%, rgba(2,7,19,0.42) 58%, rgba(2,7,19,0.90) 100%)",
        }}
      />
    </div>
  );
}
