"use client";

/**
 * FloatingVisaCards — aerial route tags positioned near WorldCommandMap destinations.
 * Decorative only — entire group is aria-hidden.
 */

import { motion, useReducedMotion } from "framer-motion";

type AerialTag = {
  code: string;
  label: string;
  top: string;
  left: string;
  delay: number;
  yRange: number;
};

// Positions tuned for WorldCommandMap viewBox (1440×900) rendered full-screen
// WorldCommandMap is perspective-tilted so visual positions shift slightly upward
const AERIAL_TAGS: AerialTag[] = [
  { code: "AE", label: "Golden Visa",  top: "44%", left: "54%",  delay: 1.6,  yRange: -7  },
  { code: "CA", label: "PR Route",     top: "24%", left: "18%",  delay: 1.9,  yRange:  8  },
  { code: "PT", label: "Residency",    top: "38%", left: "40%",  delay: 2.2,  yRange: -6  },
  { code: "AU", label: "Skilled",      top: "68%", left: "74%",  delay: 2.5,  yRange:  9  },
  { code: "UK", label: "Expansion",    top: "29%", left: "45%",  delay: 2.8,  yRange: -5  },
];

export default function FloatingVisaCards() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {AERIAL_TAGS.map((tag) => (
        <motion.div
          key={tag.code}
          className="absolute"
          style={{ top: tag.top, left: tag.left }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: reduce ? 0 : [0, tag.yRange],
          }}
          transition={{
            opacity: { duration: 0.5, delay: tag.delay },
            y: reduce
              ? { duration: 0 }
              : {
                  duration: 3.4 + tag.delay * 0.25,
                  delay: tag.delay + 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
          }}
        >
          <div
            className="flex items-center gap-2 rounded-lg border bg-[#040c1e]/80 px-2.5 py-1.5 backdrop-blur-md"
            style={{ borderColor: "rgba(96,165,250,0.12)", minWidth: "96px" }}
          >
            <span className="font-mono text-[11px] font-bold tracking-widest text-secondary/65">
              {tag.code}
            </span>
            <span aria-hidden="true" className="h-3 w-px flex-shrink-0 bg-white/14" />
            <span className="whitespace-nowrap text-[10px] font-medium text-white/38">
              {tag.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
