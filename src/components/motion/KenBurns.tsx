"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Seconds for one drift cycle. */
  duration?: number;
  /** object-position, e.g. "center 40%". */
  position?: string;
};

/**
 * KenBurns — a slow scale + drift over a still image (the cheap, video-free way
 * to make a hero feel alive). Pure transform, so it's mobile-cheap. Honors
 * reduced-motion (renders static). Wrap in an overflow-hidden, sized container.
 */
export default function KenBurns({
  src,
  alt,
  className,
  priority,
  sizes = "100vw",
  duration = 22,
  position = "center",
}: Props) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ scale: 1.08 }}
        animate={reduce ? { scale: 1.08 } : { scale: [1.08, 1.18], x: [0, -14], y: [0, -10] }}
        transition={{ duration, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </div>
  );
}
