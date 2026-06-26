"use client";

import { createElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/** Tags this headline may render as (avoids `keyof JSX.IntrinsicElements`,
 *  which resolves to the global custom-element augmentation under React 19). */
type SplitTag = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4";

type Props = {
  text: string;
  className?: string;
  /** Seconds before the first word animates. */
  delay?: number;
  once?: boolean;
  /** Element to render as. Defaults to "span". */
  as?: SplitTag;
};

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Word-by-word "rise in" headline animation (React Bits style), built on
 * framer-motion. Falls back to plain text under reduced motion. Keeps the full
 * string available to screen readers via aria-label.
 */
export default function SplitText({ text, className, delay = 0, once = true, as = "span" }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const MotionTag = motion[as] as typeof motion.span;

  if (reduce) return createElement(as, { className }, text);

  return (
    <MotionTag
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.6 }}
      variants={container}
      custom={delay}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span style={{ display: "inline-block" }} variants={word}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
