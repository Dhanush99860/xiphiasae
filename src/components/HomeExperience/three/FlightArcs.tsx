/**
 * FlightArcs — arc data utilities for the homepage globe sections.
 * Provides pre-built arc sets for different display contexts.
 */

import type { GlobeArc } from "@/components/globe";
import { HOME_ARCS, INDIA_ORIGIN } from "../data";

/** All arcs from India to every listed destination. */
export const heroArcs: GlobeArc[] = HOME_ARCS;

/** Reduced arc set for mobile / lower-end devices. */
export const lightArcs: GlobeArc[] = HOME_ARCS.slice(0, 5);

/** Arcs highlighting the gold-tier routes (UAE + Singapore). */
export const goldArcs: GlobeArc[] = [
  { from: INDIA_ORIGIN, to: [25.2048, 55.2708], color: "#e1b923" },
  { from: INDIA_ORIGIN, to: [1.3521, 103.8198], color: "#e1b923" },
];

export default heroArcs;
