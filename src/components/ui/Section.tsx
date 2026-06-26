import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "./Container";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Surface tone. `dark` = midnight ground (gold accent), `sand` = warm light. */
  tone?: "default" | "dark" | "sand";
  /** Vertical rhythm. */
  spacing?: "sm" | "md" | "lg";
  /** Wrap children in a `Container` (default true). Set false for full-bleed. */
  contained?: boolean;
  containerSize?: "md" | "lg" | "xl" | "2xl";
  children: ReactNode;
};

const TONES = {
  default: "bg-white text-light_text dark:bg-darkmode dark:text-dark_text",
  dark: "bg-sand text-ink",
  sand: "bg-sand text-ink",
} as const;

const SPACING = {
  sm: "py-12 lg:py-16",
  md: "py-20 lg:py-28",
  lg: "py-28 lg:py-40",
} as const;

/**
 * Vertical section wrapper — owns background tone + vertical rhythm so pages
 * compose from consistent bands. The `bg-*` class beats the global `section`
 * element rule on specificity, so `dark`/`sand` tones win cleanly.
 */
export default function Section({
  as: Tag = "section",
  tone = "default",
  spacing = "md",
  contained = true,
  containerSize = "xl",
  className,
  children,
  ...rest
}: Props) {
  const body = contained ? <Container size={containerSize}>{children}</Container> : children;
  return createElement(
    Tag,
    { className: cn("relative w-full", TONES[tone], SPACING[spacing], className), ...rest },
    body
  );
}
