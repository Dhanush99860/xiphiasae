import { createElement, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLElement> & {
  /** Element to render as (default `div`). */
  as?: ElementType;
  /** Max content width. */
  size?: "md" | "lg" | "xl" | "2xl";
};

const SIZES = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
} as const;

/**
 * Horizontal layout wrapper — centres content, caps width, and applies the
 * standard responsive gutter. Use inside `Section`.
 */
export default function Container({ as: Tag = "div", size = "xl", className, ...rest }: Props) {
  return createElement(Tag, {
    className: cn("mx-auto w-full px-6 lg:px-10", SIZES[size], className),
    ...rest,
  });
}
