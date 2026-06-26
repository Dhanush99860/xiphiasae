"use client";

/**
 * PassportSeal — the single OWNED repeated motif. A quiet gold "entry seal" (ring
 * + curved textPath naming the country) that fades/scales in ON DWELL at the
 * centre of a hovered destination card (an on-card element, NOT a second cursor).
 * Pure CSS group-hover with a delay so it reads as a dwell, not a flicker. The
 * same glyph doubles as a small section-threshold mark elsewhere.
 */
export default function PassportSeal({
  id,
  label,
  className = "",
}: {
  id: string;
  label: string;
  className?: string;
}) {
  const pathId = `seal-${id}`;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 z-20 h-28 w-28 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 transition-all duration-500 delay-150 group-hover:scale-100 group-hover:opacity-100 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_18s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]">
        <defs>
          <path id={pathId} d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(212,175,55,0.85)" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(212,175,55,0.45)" strokeWidth="0.5" />
        <text className="fill-gold" style={{ fontSize: 6.4, letterSpacing: 1.6, fontWeight: 600 }}>
          <textPath href={`#${pathId}`} startOffset="0%">
            {`${label.toUpperCase()} · ENTRY · XIPHIAS · `}
          </textPath>
        </text>
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold tracking-[0.15em] text-gold">
        XIA
      </span>
    </div>
  );
}
