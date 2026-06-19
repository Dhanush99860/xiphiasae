"use client";

import { LazyGlobe } from "@/components/globe";
import type { GlobeArc, GlobeMarker } from "@/components/globe";

export type LivingGlobeVariant = "aerial" | "hero" | "command";

type Props = {
  markers: GlobeMarker[];
  arcs?: GlobeArc[];
  variant?: LivingGlobeVariant;
  focusCode?: string | null;
  className?: string;
};

const VARIANT_CONFIG: Record<
  LivingGlobeVariant,
  { cameraZ: number; interactive: boolean; autoRotate: boolean }
> = {
  aerial:  { cameraZ: 2.7,  interactive: false, autoRotate: true },
  hero:    { cameraZ: 3.8,  interactive: false, autoRotate: true },
  command: { cameraZ: 3.2,  interactive: true,  autoRotate: true },
};

export default function LivingGlobe({
  markers,
  arcs = [],
  variant = "aerial",
  focusCode = null,
  className,
}: Props) {
  const cfg = VARIANT_CONFIG[variant];

  return (
    <LazyGlobe
      theme="dark"
      markers={markers}
      arcs={arcs}
      focusCode={focusCode}
      selectedCode={focusCode}
      interactive={cfg.interactive}
      autoRotate={cfg.autoRotate}
      enableZoom={variant === "command"}
      cameraZ={cfg.cameraZ}
      className={className}
      ariaLabel="XIPHIAS global mobility route map"
    />
  );
}
