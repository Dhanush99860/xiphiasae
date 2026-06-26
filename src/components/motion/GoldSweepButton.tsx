"use client";

import Link from "next/link";
import Magnetic from "./Magnetic";

/**
 * GoldSweepButton — the single canonical CTA language. Magnetic pull + arrow ride
 * + a gold rim that "inks in" from the leading edge like a passport-stamp edge
 * (NO full shine-wipe — that was the cliché). Ghost variant = underline-draw, no
 * fill. Carries data-cursor='link' so DawnCursor's dot scales; focus-visible ring
 * for a11y.
 */
export default function GoldSweepButton({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
  const styles =
    variant === "primary"
      ? "bg-gold px-7 py-3 text-ink hover:bg-gold_bright"
      : "px-1 py-1 text-current";
  const cls = `${base} ${styles} ${className}`;

  const inner = (
    <>
      <span className="relative">
        {children}
        {variant === "ghost" ? (
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
        ) : null}
      </span>
      {arrow ? (
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
        >
          →
        </span>
      ) : null}
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border border-gold/80 [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-500 ease-out group-hover:[clip-path:inset(0_0_0_0)]"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Magnetic strength={0.3}>
        <Link href={href} data-cursor="link" onClick={onClick} className={cls}>
          {inner}
        </Link>
      </Magnetic>
    );
  }
  return (
    <Magnetic strength={0.3}>
      <button type="button" data-cursor="link" onClick={onClick} className={cls}>
        {inner}
      </button>
    </Magnetic>
  );
}
