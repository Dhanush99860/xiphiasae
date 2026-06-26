import { useId } from "react";

type Props = {
  className?: string;
  /** 0–1 pattern opacity. */
  opacity?: number;
  /** Stroke color (gold by default). */
  color?: string;
  /** Tile size in px. */
  size?: number;
};

/**
 * Faint Islamic 8-point-star geometric lattice as a tiling SVG overlay.
 * Decorative, static, server-renderable (no client JS). Use behind sections
 * for Emirati texture — keep opacity low (≈0.04–0.1).
 */
export default function LatticeOverlay({
  className,
  opacity = 0.06,
  color = "#d4af37",
  size = 88,
}: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id={`lat-${id}`} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          {/* 8-point star (two overlaid squares) + connecting lattice */}
          <g fill="none" stroke={color} strokeWidth="1">
            <rect x={size * 0.25} y={size * 0.25} width={size * 0.5} height={size * 0.5} />
            <rect
              x={size * 0.25}
              y={size * 0.25}
              width={size * 0.5}
              height={size * 0.5}
              transform={`rotate(45 ${size / 2} ${size / 2})`}
            />
            <circle cx={size / 2} cy={size / 2} r={size * 0.04} fill={color} stroke="none" />
            <line x1="0" y1={size / 2} x2={size} y2={size / 2} strokeWidth="0.5" />
            <line x1={size / 2} y1="0" x2={size / 2} y2={size} strokeWidth="0.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#lat-${id})`} />
    </svg>
  );
}
