import * as React from "react";

/** Accent palette — Midnight Embassy. Every legacy color key collapses to the
 *  single gold accent on pearl, so callers can keep passing "blue"/"sky"/etc. */
type ColorKey = "blue" | "green" | "violet" | "amber" | "sky" | "pink";

const goldAccent = {
  dot: "bg-gold",
  chip: "border border-gold/45 bg-sand/50 text-ink/70",
  ring: "ring-0",
  bgSoft: "bg-sand/50 border border-gold/45",
  icon: "text-gold",
};

const colorMap: Record<ColorKey, typeof goldAccent> = {
  blue: goldAccent,
  green: goldAccent,
  violet: goldAccent,
  amber: goldAccent,
  sky: goldAccent,
  pink: goldAccent,
};

export function Eyebrow({
  label,
  color = "blue",
}: {
  label: string;
  color?: ColorKey;
}) {
  const c = colorMap[color];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${c.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {label}
    </span>
  );
}

export default function SectionHeader({
  eyebrow,
  title,
  color = "blue",
  className = "",
}: {
  eyebrow: string;
  title: string;
  color?: ColorKey;
  className?: string;
}) {
  return (
    <header className={`flex flex-col gap-2 ${className}`}>
      <Eyebrow label={eyebrow} color={color} />
      <h2 className="font-sora text-lg sm:text-xl font-semibold leading-tight text-ink">
        {title}
      </h2>
    </header>
  );
}

/** Small helper for sidebar icons to keep a consistent look */
export function AccentIcon({
  color = "blue",
  children,
}: {
  color?: ColorKey;
  children: React.ReactNode;
}) {
  const c = colorMap[color];
  return (
    <span
      className={`grid h-9 w-9 place-items-center rounded-full ${c.bgSoft} ${c.icon}`}
    >
      {children}
    </span>
  );
}
