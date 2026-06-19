"use client";

/**
 * WorldCommandMap — SVG world map with animated route arcs from India.
 * Replaces the invisible Three.js globe in the hero. Purely decorative.
 */

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ── Destination nodes ────────────────────────────────────────────────────────
const ORIGIN = { x: 900, y: 485, label: "IND", name: "India" };

const DESTINATIONS = [
  { x: 800,  y: 455, code: "AE", label: "UAE",       delay: 0.3 },
  { x: 680,  y: 330, code: "GB", label: "UK",        delay: 0.5 },
  { x: 625,  y: 405, code: "PT", label: "Portugal",  delay: 0.7 },
  { x: 300,  y: 245, code: "CA", label: "Canada",    delay: 0.9 },
  { x: 340,  y: 390, code: "US", label: "USA",       delay: 1.1 },
  { x: 470,  y: 510, code: "GD", label: "Grenada",   delay: 1.3 },
  { x: 735,  y: 410, code: "TR", label: "Turkey",    delay: 1.5 },
  { x: 1010, y: 575, code: "SG", label: "Singapore", delay: 1.7 },
  { x: 1110, y: 700, code: "AU", label: "Australia", delay: 1.9 },
] as const;

// ── Build arc path (quadratic bezier, lifts above midpoint) ─────────────────
function arc(ox: number, oy: number, tx: number, ty: number, lift = 120) {
  const mx = (ox + tx) / 2;
  const my = (oy + ty) / 2 - lift;
  return `M ${ox} ${oy} Q ${mx} ${my} ${tx} ${ty}`;
}

// ── Continent outlines (simplified polygons) ─────────────────────────────────
const CONTINENTS = {
  northAmerica: "95,230 158,172 228,152 312,152 385,172 452,198 498,244 514,295 500,362 464,422 398,456 318,462 238,440 174,400 128,350 98,288",
  southAmerica: "348,490 398,468 452,478 490,520 510,580 498,648 462,700 420,730 374,720 338,678 322,620 318,558 332,510",
  europe:       "620,180 660,158 710,150 758,155 798,172 820,200 808,232 780,250 748,258 710,265 672,258 640,240 618,215",
  africa:       "630,290 680,270 730,268 778,280 810,312 828,360 820,420 800,482 768,530 728,558 682,558 640,532 610,490 598,440 600,382 608,330",
  asia:         "820,148 880,132 950,128 1040,138 1120,155 1175,185 1200,228 1190,272 1162,308 1120,335 1068,348 1010,350 950,340 895,318 852,285 828,248 818,208",
  australia:    "1020,640 1080,622 1148,628 1195,658 1218,705 1212,752 1180,785 1135,798 1082,790 1040,762 1018,720 1015,678",
  greenland:    "290,100 330,88 378,85 415,95 428,120 418,148 390,162 355,165 320,155 298,135",
};

// ── Grid lines ───────────────────────────────────────────────────────────────
const LAT_LINES  = [150, 250, 350, 450, 550, 650, 750];
const LON_LINES  = [150, 300, 450, 600, 750, 900, 1050, 1200, 1350];

export default function WorldCommandMap({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: "perspective(1100px) rotateX(18deg) scale(1.12)",
        transformOrigin: "50% 38%",
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Continent fill gradient */}
          <linearGradient id="contFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#1a3a6e" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0e2248" stopOpacity="0.30" />
          </linearGradient>

          {/* Arc glow filter */}
          <filter id="arcGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Node glow filter */}
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Origin glow */}
          <filter id="originGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Edge fade mask */}
          <radialGradient id="edgeMask" cx="50%" cy="48%" r="52%">
            <stop offset="38%" stopColor="white" stopOpacity="1" />
            <stop offset="82%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="svgMask">
            <rect width="1440" height="900" fill="url(#edgeMask)" />
          </mask>

          {/* Clip for edge crop */}
          <clipPath id="edgeClip">
            <rect width="1440" height="900" />
          </clipPath>
        </defs>

        {/* Everything behind edge mask */}
        <g mask="url(#svgMask)">

          {/* ── 1. LAT/LON GRID ──────────────────────────────────────────── */}
          <g stroke="rgba(96,165,250,0.07)" strokeWidth="0.5" fill="none">
            {LAT_LINES.map((y) => (
              <line key={`lat-${y}`} x1="0" y1={y} x2="1440" y2={y} />
            ))}
            {LON_LINES.map((x) => (
              <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="900" />
            ))}
          </g>

          {/* ── 2. CONTINENT SILHOUETTES ─────────────────────────────────── */}
          <g fill="url(#contFill)" stroke="rgba(96,165,250,0.22)" strokeWidth="0.8">
            {Object.entries(CONTINENTS).map(([name, pts]) => (
              <polygon key={name} points={pts} />
            ))}
          </g>

          {/* ── 3. ROUTE ARCS ────────────────────────────────────────────── */}
          {DESTINATIONS.map((dest) => {
            const d = arc(ORIGIN.x, ORIGIN.y, dest.x, dest.y, 130);
            return (
              <motion.path
                key={dest.code}
                d={d}
                fill="none"
                stroke="rgba(96,165,250,0.42)"
                strokeWidth="1.2"
                strokeLinecap="round"
                filter="url(#arcGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: {
                    duration: reduce ? 0 : 1.4,
                    delay: reduce ? 0 : dest.delay,
                    ease: "easeOut",
                  },
                  opacity: {
                    duration: 0.3,
                    delay: reduce ? 0 : dest.delay,
                  },
                }}
              />
            );
          })}

          {/* ── 4. ARC HIGHLIGHTS — subtle bright dash on each route ─────── */}
          {!reduce && DESTINATIONS.map((dest) => {
            const d = arc(ORIGIN.x, ORIGIN.y, dest.x, dest.y, 130);
            return (
              <motion.path
                key={`hi-${dest.code}`}
                d={d}
                fill="none"
                stroke="rgba(225,185,35,0.22)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="6 120"
                filter="url(#arcGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 2.4,
                  delay: dest.delay + 1.4,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* ── 5. DESTINATION NODES ─────────────────────────────────────── */}
          {DESTINATIONS.map((dest) => (
            <g key={`node-${dest.code}`} filter="url(#nodeGlow)">
              {/* Outer pulse ring 1 */}
              <circle cx={dest.x} cy={dest.y} r="10" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="0.8">
                {!reduce && (
                  <animate
                    attributeName="r"
                    values="6;14;6"
                    dur={`${3 + dest.delay * 0.3}s`}
                    begin={`${dest.delay}s`}
                    repeatCount="indefinite"
                  />
                )}
                {!reduce && (
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur={`${3 + dest.delay * 0.3}s`}
                    begin={`${dest.delay}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              {/* Core dot */}
              <motion.circle
                cx={dest.x}
                cy={dest.y}
                r="3.5"
                fill="#60a5fa"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 0.4, delay: dest.delay + 1.2 }}
              />
              {/* Label tag */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: dest.delay + 1.4 }}
              >
                <rect
                  x={dest.x + 7}
                  y={dest.y - 10}
                  width={dest.label.length * 6 + 14}
                  height={18}
                  rx="4"
                  fill="rgba(4,12,30,0.82)"
                  stroke="rgba(96,165,250,0.18)"
                  strokeWidth="0.7"
                />
                <text
                  x={dest.x + 14}
                  y={dest.y + 3}
                  fill="rgba(255,255,255,0.55)"
                  fontSize="8"
                  fontFamily="monospace"
                  letterSpacing="1"
                >
                  {dest.label}
                </text>
              </motion.g>
            </g>
          ))}

          {/* ── 6. INDIA ORIGIN ──────────────────────────────────────────── */}
          <g filter="url(#originGlow)">
            {/* Animated rings */}
            {[1, 2, 3].map((ring) => (
              <circle
                key={ring}
                cx={ORIGIN.x}
                cy={ORIGIN.y}
                r="8"
                fill="none"
                stroke="rgba(225,185,35,0.5)"
                strokeWidth="1"
              >
                {!reduce && (
                  <>
                    <animate
                      attributeName="r"
                      values={`8;${8 + ring * 8};8`}
                      dur="2.4s"
                      begin={`${ring * 0.7}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur="2.4s"
                      begin={`${ring * 0.7}s`}
                      repeatCount="indefinite"
                    />
                  </>
                )}
              </circle>
            ))}
            {/* Gold core */}
            <circle cx={ORIGIN.x} cy={ORIGIN.y} r="5" fill="#e1b923" opacity="0.95" />
            <circle cx={ORIGIN.x} cy={ORIGIN.y} r="2.5" fill="#fff8dc" opacity="0.9" />

            {/* IND label */}
            <rect
              x={ORIGIN.x - 22}
              y={ORIGIN.y - 28}
              width={44}
              height={18}
              rx="4"
              fill="rgba(4,12,30,0.88)"
              stroke="rgba(225,185,35,0.45)"
              strokeWidth="0.8"
            />
            <text
              x={ORIGIN.x}
              y={ORIGIN.y - 15}
              textAnchor="middle"
              fill="rgba(225,185,35,0.85)"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="1.5"
            >
              INDIA
            </text>
          </g>

        </g>{/* end mask group */}
      </svg>

      {/* Edge vignette overlay (CSS — faster than SVG gradient) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 75% at 50% 45%, transparent 35%, rgba(3,8,22,0.55) 68%, rgba(3,8,22,0.95) 100%)",
        }}
      />
    </div>
  );
}
