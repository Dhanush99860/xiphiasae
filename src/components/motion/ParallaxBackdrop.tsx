"use client";

import KenBurns from "./KenBurns";
import ParallaxLayer from "./ParallaxLayer";

type Tone = "night" | "dawn" | "day";

const SCRIM: Record<Tone, string> = {
  night:
    "linear-gradient(180deg, rgba(7,10,18,0.86) 0%, rgba(11,15,23,0.5) 45%, rgba(7,10,18,0.82) 100%)",
  dawn:
    "linear-gradient(180deg, rgba(20,35,59,0.8) 0%, rgba(91,59,39,0.42) 50%, rgba(18,20,30,0.72) 100%)",
  day:
    "linear-gradient(180deg, rgba(245,240,230,0.86) 0%, rgba(236,220,194,0.55) 50%, rgba(245,240,230,0.9) 100%)",
};

/**
 * ParallaxBackdrop — an atmospheric, scrimmed parallax image for a SECTION
 * background, so text/no-image sections feel inhabited (something is there)
 * instead of sitting on blank canvas — while still reading as part of the
 * night→day Living Horizon (the scrim tints it to the section's tone). Sits at
 * z-0 behind content (z-10); pointer-events-none. Reuses KenBurns + ParallaxLayer
 * so it drifts on scroll. Place inside a `relative isolate` section.
 */
export default function ParallaxBackdrop({
  src,
  tone = "night",
  speed = 90,
  position = "center",
  priority = false,
  className = "",
  children,
}: {
  src: string;
  tone?: Tone;
  speed?: number;
  position?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      <ParallaxLayer speed={speed} className="absolute -inset-y-[18%] inset-x-0">
        <KenBurns
          src={src}
          alt=""
          className="h-full w-full"
          sizes="100vw"
          position={position}
          priority={priority}
          duration={44}
        />
      </ParallaxLayer>
      <div className="absolute inset-0" style={{ background: SCRIM[tone] }} />
      {children}
    </div>
  );
}
