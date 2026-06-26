import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type Props = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    /** Render as a link when set. */
    href?: string;
  };

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-white dark:focus-visible:ring-offset-sand disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  // Gold pill with a growing underglow — the premium primary action.
  primary:
    "bg-gold text-midnight hover:shadow-[0_10px_40px_-8px_rgba(212,175,55,0.65)] hover:-translate-y-0.5",
  // Outline that warms to gold on hover; theme-aware.
  secondary:
    "border border-ink/15 bg-transparent text-ink hover:border-gold dark:border-gold/40 dark:bg-white/[0.03] dark:text-ink dark:hover:border-gold/60",
  ghost: "bg-transparent text-ink hover:bg-white/5 dark:text-ink dark:hover:bg-white/5",
  link: "rounded-none px-0 py-0 text-gold underline-offset-4 hover:underline",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-7 py-3.5 text-[14px]",
  lg: "px-9 py-4 text-[15px]",
};

/**
 * Brand button / link. Renders an `<a>` when `href` is set, else a `<button>`.
 * `link` variant ignores size padding. Wrap in `<Magnetic>` for the hero feel.
 */
export default function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...rest
}: Props) {
  const classes = cn(BASE, VARIANTS[variant], variant !== "link" && SIZES[size], className);

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
