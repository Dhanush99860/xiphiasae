// Shared motion primitives for the redesign. All are client components that
// honour `prefers-reduced-motion` (in addition to the global CSS rule in
// globals.css) and work in both light and dark themes.

// Scroll system
export { default as SmoothScroll } from "./SmoothScroll";
export { default as ScrollProgress } from "./ScrollProgress";
export { default as HorizontalScroll } from "./HorizontalScroll";

// Scroll-in / layout motion
export { default as Reveal } from "./Reveal";
export { Stagger, StaggerItem } from "./Stagger";
export { default as Parallax } from "./Parallax";
export { default as Marquee } from "./Marquee";

// Decor / ambient (UAE refresh)
export { default as AuroraBackground } from "./AuroraBackground";
export { default as DrawLine } from "./DrawLine";
export { default as LatticeOverlay } from "./LatticeOverlay";

// Desert Sand polish
export { default as SandReveal } from "./SandReveal";
export { default as ScrollGuideLine } from "./ScrollGuideLine";
export { default as GoldenBurj } from "./GoldenBurj";
export { default as KenBurns } from "./KenBurns";
export { default as ParallaxLayer } from "./ParallaxLayer";
export { default as ParallaxBackdrop } from "./ParallaxBackdrop";
export { default as ImageReveal } from "./ImageReveal";
export { default as CollectionRail } from "./CollectionRail";

// Living Horizon
export { default as HorizonCanvas } from "./HorizonCanvas";
export { default as IrisReveal } from "./IrisReveal";
export { default as SlideReveal } from "./SlideReveal";

// Living Horizon — interaction system
export { default as DawnCursor } from "./DawnCursor";
export { default as LightWindow } from "./LightWindow";
export { default as GoldSweepButton } from "./GoldSweepButton";
export { default as DawnMeter } from "./DawnMeter";
export { default as PinnedVerbSwap } from "./PinnedVerbSwap";
export { default as VelocityMarquee } from "./VelocityMarquee";
export { default as ScrubReveal3D } from "./ScrubReveal3D";
export { default as OdometerTally } from "./OdometerTally";
export { default as PassportSeal } from "./PassportSeal";

// Text effects
export { default as SplitText } from "./SplitText";
export { default as TextReveal } from "./TextReveal";
export { default as CharReveal } from "./CharReveal";
export { default as TextType } from "./TextType";
export { default as ShinyText } from "./ShinyText";
export { default as GradientText } from "./GradientText";
export { default as HighlightText } from "./HighlightText";
export { default as Counter } from "./Counter";

// Interaction
export { default as Magnetic } from "./Magnetic";
export { default as TiltCard } from "./TiltCard";
