"use client";

/**
 * LivingGlobeFallback — static SVG globe shown when WebGL or reduced-motion
 * is unavailable. Extends the shared GlobeFallback with branded styling.
 */

import { GlobeFallback } from "@/components/globe";
import type { GlobeMarker } from "@/components/globe";

type Props = {
  markers?: GlobeMarker[];
  className?: string;
};

export default function LivingGlobeFallback({ markers = [], className }: Props) {
  return (
    <div className={className}>
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Soft ambient glow behind the SVG globe */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-64 w-64 rounded-full bg-[#1c57b4]/20 blur-[80px]" />
        </div>
        <GlobeFallback
          markers={markers}
          theme="dark"
          className="relative z-10 h-full w-full"
        />
      </div>
    </div>
  );
}
