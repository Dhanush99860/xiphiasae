"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Owner preview: 5 KINETIC menu-trigger marks — thin lines that extend out into an
 * open shape (not a closed shape), and REARRANGE on hover (rotate / morph). Each is
 * shown as it sits top-right of the header (icon + "MENU"); hover to see it animate.
 */
const GOLD = "#bfa15c";
const OFFWHITE = "#eef3fb";
const NAVY = "#0a1733";

const T = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };
const gStyle = { transformBox: "fill-box" as const, transformOrigin: "center" };

/* ① Open triangle (lines overshoot the corners) → spins on hover */
function IconTriangle({ on, c }: { on: boolean; c: string }) {
  return (
    <svg width="26" height="24" viewBox="0 0 28 24" fill="none" aria-hidden>
      <motion.g animate={{ rotate: on ? 120 : 0 }} transition={T} style={gStyle}>
        <line x1="3" y1="21" x2="15" y2="2" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="13" y1="2" x2="25" y2="21" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="1" y1="21" x2="27" y2="21" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="2.4" r="1.5" fill={GOLD} />
      </motion.g>
    </svg>
  );
}

/* ② Three extending bars → fold into a chevron on hover */
function IconBars({ on, c }: { on: boolean; c: string }) {
  return (
    <svg width="26" height="24" viewBox="0 0 28 24" fill="none" aria-hidden>
      <motion.line stroke={c} strokeWidth="1.4" strokeLinecap="round" transition={T}
        animate={{ x1: on ? 7 : 2, y1: on ? 5 : 7, x2: on ? 20 : 26, y2: on ? 12 : 7 }} />
      <motion.line stroke={c} strokeWidth="1.4" strokeLinecap="round" transition={T}
        animate={{ x1: on ? 7 : 4, y1: 12, x2: on ? 11 : 22, y2: 12, opacity: on ? 0.25 : 1 }} />
      <motion.line stroke={c} strokeWidth="1.4" strokeLinecap="round" transition={T}
        animate={{ x1: on ? 7 : 2, y1: on ? 19 : 17, x2: on ? 20 : 26, y2: on ? 12 : 17 }} />
      <motion.circle r="1.5" fill={GOLD} transition={T} animate={{ cx: on ? 20 : 26, cy: on ? 12 : 7 }} />
    </svg>
  );
}

/* ③ Open diamond (corners overshoot) → rotates + opens on hover */
function IconDiamond({ on, c }: { on: boolean; c: string }) {
  return (
    <svg width="26" height="24" viewBox="0 0 28 24" fill="none" aria-hidden>
      <motion.g animate={{ rotate: on ? 90 : 0, scale: on ? 1.1 : 1 }} transition={T} style={gStyle}>
        <line x1="12" y1="1" x2="27" y2="13" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="27" y1="11" x2="12" y2="23" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="16" y1="23" x2="1" y2="11" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="1" y1="13" x2="16" y2="1" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="12" r="1.4" fill={GOLD} />
      </motion.g>
    </svg>
  );
}

/* ④ Asterisk of extending lines → quarter-turns on hover */
function IconAsterisk({ on, c }: { on: boolean; c: string }) {
  return (
    <svg width="26" height="24" viewBox="0 0 28 24" fill="none" aria-hidden>
      <motion.g animate={{ rotate: on ? 90 : 0 }} transition={T} style={gStyle}>
        <line x1="2" y1="12" x2="26" y2="12" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="6" y1="3" x2="22" y2="21" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="22" y1="3" x2="6" y2="21" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="12" r="1.5" fill={GOLD} />
      </motion.g>
    </svg>
  );
}

/* ⑤ Asymmetric extending lines that swap length/position on hover */
function IconSwap({ on, c }: { on: boolean; c: string }) {
  return (
    <svg width="26" height="24" viewBox="0 0 28 24" fill="none" aria-hidden>
      <motion.line stroke={c} strokeWidth="1.4" strokeLinecap="round" transition={T}
        animate={{ x1: on ? 12 : 2, x2: on ? 26 : 20, y1: 7, y2: 7 }} />
      <motion.line stroke={c} strokeWidth="1.4" strokeLinecap="round" transition={T}
        animate={{ x1: on ? 2 : 12, x2: on ? 24 : 24, y1: 12, y2: 12 }} />
      <motion.line stroke={c} strokeWidth="1.4" strokeLinecap="round" transition={T}
        animate={{ x1: on ? 8 : 2, x2: on ? 26 : 16, y1: 17, y2: 17 }} />
      <motion.circle r="1.5" fill={GOLD} transition={T} animate={{ cx: on ? 26 : 20, cy: on ? 7 : 7 }} />
    </svg>
  );
}

const OPTIONS = [
  { key: "tri", label: "① Triangle", note: "Open line triangle (corners overshoot) — spins on hover", Icon: IconTriangle },
  { key: "bars", label: "② Bars → Chevron", note: "Three extending bars that fold into an arrow on hover", Icon: IconBars },
  { key: "dia", label: "③ Diamond", note: "Open line rhombus — rotates and opens on hover", Icon: IconDiamond },
  { key: "ast", label: "④ Asterisk", note: "Crossing extending lines — quarter-turns on hover", Icon: IconAsterisk },
  { key: "swap", label: "⑤ Shift", note: "Asymmetric lines + gold dot that rearrange on hover", Icon: IconSwap },
] as const;

export default function MenuIconSamples({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <main className="min-h-screen px-6 py-20 sm:px-12 lg:px-20" style={{ background: NAVY, color: OFFWHITE }}>
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>
          Menu icon — pick one
        </p>
        <h1 className={`${serifClass} mt-4 text-[clamp(2rem,4vw,3rem)] font-medium`}>
          Open marks that rearrange on hover.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
          Thin lines extended into an open shape — and they animate/rearrange when you hover the trigger. Hover each
          one to see the motion. Tell me ①–⑤ (and any tweak) and I’ll wire it into the real menu site-wide.
        </p>

        <div className="mt-12 flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {OPTIONS.map(({ key, label, note, Icon }) => {
            const isOn = hover === key;
            const c = isOn ? GOLD : OFFWHITE;
            return (
              <div key={key} className="flex items-center justify-between gap-6 py-7">
                <div>
                  <p className="text-[15px] font-semibold" style={{ color: isOn ? GOLD : OFFWHITE }}>{label}</p>
                  <p className="mt-1 text-[13px] text-white/50">{note}</p>
                </div>

                <button
                  type="button"
                  onMouseEnter={() => setHover(key)}
                  onMouseLeave={() => setHover((h) => (h === key ? null : h))}
                  onFocus={() => setHover(key)}
                  onBlur={() => setHover((h) => (h === key ? null : h))}
                  className="flex shrink-0 items-center gap-3 rounded-lg border px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors"
                  style={{ borderColor: isOn ? `${GOLD}88` : "rgba(255,255,255,0.14)", color: c }}
                  aria-label={`Menu — ${label} icon`}
                >
                  <span>Menu</span>
                  <Icon on={isOn && !reduce} c={c} />
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-[12px] text-white/40">
          (Previews only — the chosen mark, with its hover animation, gets wired into the real LuxeHeader trigger.)
        </p>
      </div>
    </main>
  );
}
