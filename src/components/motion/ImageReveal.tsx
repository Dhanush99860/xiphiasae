"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Tailwind aspect ratio, e.g. "aspect-[16/10]" or "aspect-[4/5]". */
  ratio?: string;
  position?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * ImageReveal — a still that wipes up (clip-path) and settles from a slight zoom
 * as it scrolls into view, with a hairline gold edge that trails the wipe.
 * Cinematic, cheap, reduced-motion safe. The default cover treatment for media.
 */
export default function ImageReveal({
  src,
  alt,
  className,
  sizes = "(min-width:1024px) 50vw, 100vw",
  priority,
  ratio = "aspect-[16/10]",
  position = "center",
}: Props) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden rounded-2xl ${ratio} ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 100% 0)", scale: 1.14 }}
        whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)", scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.15, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
      {/* gold edge sweep */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ top: "0%", opacity: 0 }}
          whileInView={{ top: "100%", opacity: [0, 1, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.15, ease: EASE }}
        />
      )}
    </div>
  );
}
