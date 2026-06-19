"use client";

/**
 * EmbassyHero — V3 (Phase 2B: Route Focus)
 * ─────────────────────────────────────────
 * • Priority routes shown by default; "View all" reveals secondary routes.
 * • Hover/click a destination → premium Route Preview Card appears.
 * • Active route highlighted; others fade.
 * • Canvas pointer events handled inside R3F; overlay buttons use z-20+.
 */

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  GLOBAL_ROUTE_TRACKS,
  getTrackDestinations,
  getPriorityDestinations,
  type TrackId,
  type GlobalDestination,
} from "./globalRouteNetwork";

const RealisticEarthGlobe = dynamic(
  () => import("./three/RealisticEarthGlobe"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" style={{ background: "#010814" }} />,
  }
);

export default function EmbassyHero() {
  const [selectedTrack,       setSelectedTrack]       = useState<TrackId>("residency");
  const [showAllRoutes,       setShowAllRoutes]       = useState(false);
  const [activeDestination,   setActiveDestination]   = useState<GlobalDestination | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<GlobalDestination | null>(null);

  // Clear selected destination when track changes
  useEffect(() => {
    setSelectedDestination(null);
    setActiveDestination(null);
  }, [selectedTrack]);

  // Dark-glass header on homepage only
  useEffect(() => {
    document.documentElement.dataset.heroImmersive = "true";
    return () => { delete document.documentElement.dataset.heroImmersive; };
  }, []);

  const handleHover = useCallback((dest: GlobalDestination | null) => {
    // If user has pinned a destination, hover only updates the active (highlight) state
    setActiveDestination(dest);
  }, []);

  const handleClick = useCallback((dest: GlobalDestination) => {
    setSelectedDestination((prev) => (prev?.id === dest.id ? null : dest));
    setActiveDestination(dest);
  }, []);

  const handleCardClose = useCallback(() => {
    setSelectedDestination(null);
    setActiveDestination(null);
  }, []);

  // Card shows the pinned destination; falling back to hover
  const displayedDestination = selectedDestination ?? activeDestination;

  // Active destination for globe highlight = pinned OR hovered
  const activeId = displayedDestination?.id ?? null;

  const currentTrackDests = getPriorityDestinations(selectedTrack);
  const allDests          = getTrackDestinations(selectedTrack);
  const shownCount        = showAllRoutes ? allDests.length : currentTrackDests.length;
  const totalCount        = allDests.length;

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      style={{ background: "#010814" }}
      aria-label="XIPHIAS interactive Earth globe"
    >
      {/* Globe + space scene */}
      <div className="absolute inset-0 pointer-events-auto">
        <RealisticEarthGlobe
          className="h-full w-full"
          selectedTrack={selectedTrack}
          showAllRoutes={showAllRoutes}
          activeDestinationId={activeId}
          onDestinationHover={handleHover}
          onDestinationClick={handleClick}
          onCloseCard={handleCardClose}
        />
      </div>

      {/* Track selector + route mode toggle — centered bottom */}
      <div className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 pointer-events-none">
        {/* Track pill */}
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border p-1"
          style={{
            background:           "rgba(1, 8, 20, 0.60)",
            backdropFilter:       "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderColor:          "rgba(255,255,255,0.10)",
          }}
        >
          {GLOBAL_ROUTE_TRACKS.map((track) => {
            const active = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrack(track.id)}
                className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 select-none"
                style={{
                  backgroundColor: active ? `${track.color}22` : "transparent",
                  border: `1px solid ${active ? `${track.color}88` : "transparent"}`,
                  color:  active ? track.color : "rgba(255,255,255,0.40)",
                }}
              >
                {track.label}
              </button>
            );
          })}
        </div>

        {/* Sub-row: label + toggle */}
        <div className="pointer-events-auto mt-2 flex items-center justify-center gap-3">
          <p className="text-[8.5px] font-medium uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.22)" }}>
            {showAllRoutes ? "All destinations" : "Priority routes from Bengaluru HQ"}
          </p>
          <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
          <button
            type="button"
            onClick={() => setShowAllRoutes((v) => !v)}
            className="text-[8.5px] font-medium uppercase tracking-[0.22em] transition-colors"
            style={{ color: showAllRoutes ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.30)" }}
          >
            {showAllRoutes ? "Priority only" : `View all ${totalCount}`}
          </button>
        </div>

        {/* Count hint */}
        <p className="mt-1 text-center text-[8px] uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.14)" }}>
          {shownCount} of {totalCount} shown
        </p>
      </div>

      {/* Bottom-left label */}
      <div className="pointer-events-none absolute bottom-8 left-8 z-20 select-none">
        <p className="text-[8px] font-bold uppercase tracking-[0.30em] text-white/28">
          XIPHIAS Global Mobility Command
        </p>
        <p className="mt-0.5 text-[9px] text-white/16">
          Drag to rotate · Scroll to zoom
        </p>
      </div>
    </section>
  );
}
