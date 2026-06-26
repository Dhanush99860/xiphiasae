import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Surface treatment. `dark` = ink panel w/ gold edge, `glass` = blurred. */
  tone?: "light" | "dark" | "glass";
  /** Padding scale. */
  pad?: "sm" | "md" | "lg" | "none";
  children: ReactNode;
};

// Desert Sand (light): white/ivory cards that lift off the sand ground with a
// soft shadow + faint gold edge. `glass` is a frosted ivory (not see-through).
const TONES = {
  light: "bg-white border border-gold/40 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.18)]",
  dark: "bg-white border border-gold/45 text-ink shadow-[0_10px_30px_-16px_rgba(15,23,42,0.16)]",
  glass: "bg-white/75 border border-gold/45 text-ink backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)]",
} as const;

const PADS = { none: "", sm: "p-4", md: "p-6", lg: "p-8 lg:p-10" } as const;

/**
 * Surface card primitive. Pair with `<TiltCard>` for the hover-tilt effect.
 */
export default function Card({ as: Tag = "div", tone = "light", pad = "md", className, children, ...rest }: Props) {
  return createElement(
    Tag,
    { className: cn("rounded-2xl", TONES[tone], PADS[pad], className), ...rest },
    children
  );
}
