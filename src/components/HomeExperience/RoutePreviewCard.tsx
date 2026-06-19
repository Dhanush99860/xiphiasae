"use client";

import Link from "next/link";
import type { GlobalDestination, TrackId } from "./globalRouteNetwork";
import { getTrackMeta, getDestinationRouteHref } from "./globalRouteNetwork";
import { getDestinationMenuData } from "./routeMenuLookup";

interface RoutePreviewCardProps {
  destination:   GlobalDestination | null;
  selectedTrack: TrackId;
  onClose?:      () => void;
}

export function RoutePreviewCard({
  destination,
  selectedTrack,
  onClose,
}: RoutePreviewCardProps) {
  const track   = getTrackMeta(selectedTrack);
  const visible = !!destination;

  const menuData = destination ? getDestinationMenuData(destination, selectedTrack) : null;

  const programs   = menuData?.programs
    ?? destination?.programs.map((p) => ({ label: p, href: "", description: "" }))
    ?? [];

  const countryHref = menuData?.countryHref
    ?? (destination ? getDestinationRouteHref(destination, selectedTrack) : "#");

  return (
    /*
     * Outer: positioning only.
     * Desktop: fixed right, vertically centred.
     * Mobile: full-width bottom sheet above the route selector.
     */
    <div className="pointer-events-none absolute right-8 top-1/2 z-30 w-[min(480px,calc(100vw-2rem))] -translate-y-1/2 max-sm:inset-x-4 max-sm:bottom-20 max-sm:top-auto max-sm:w-auto max-sm:translate-y-0">
      {/* Inner: fade + slide animation */}
      <div
        className="pointer-events-none transition-all duration-300 ease-out"
        style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(20px)",
        }}
      >
        {destination && (
          <div
            className="pointer-events-auto overflow-hidden rounded-2xl"
            style={{
              background:           "rgba(1, 8, 20, 0.93)",
              backdropFilter:       "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border:               "1px solid rgba(255,255,255,0.07)",
              boxShadow:            `0 0 0 1px ${track.color}14, 0 24px 64px rgba(0,0,0,0.72)`,
            }}
          >
            {/* Track accent bar */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, ${track.color}99 0%, ${track.color}22 55%, transparent 100%)`,
              }}
            />

            {/* Scrollable body — capped so it never bleeds off-screen */}
            <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
              <div className="p-6">
                {/* ── Header ── */}
                <div className="flex items-center justify-between">
                  <span className="text-[7.5px] font-bold uppercase tracking-[0.28em] text-white/22">
                    Route File
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-widest"
                      style={{ border: `1px solid ${track.color}44`, color: `${track.color}99` }}
                    >
                      {track.label}
                    </span>
                    {onClose && (
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-[13px] leading-none text-white/25 transition-colors hover:text-white/65"
                        aria-label="Close route file"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Country title + subtitle ── */}
                <div className="mt-4">
                  <h3 className="text-[20px] font-semibold leading-tight text-white">
                    {destination.country}
                  </h3>
                  <p className="mt-1 text-[12px] text-white/40">
                    {track.label} routes from Bengaluru HQ
                  </p>
                  <p className="mt-1.5 text-[11px] text-white/25">
                    Review the country overview or open a specific programme.
                  </p>
                </div>

                {/* ── Country overview CTA ── */}
                <Link
                  href={countryHref}
                  className="mt-4 flex w-full items-center justify-between rounded-xl px-4 py-3 transition-opacity hover:opacity-80"
                  style={{
                    background: `${track.color}12`,
                    border:     `1px solid ${track.color}2e`,
                  }}
                >
                  <span className="text-[12px] font-semibold" style={{ color: track.color }}>
                    Visit {destination.label} {track.label} Overview
                  </span>
                  <span className="text-[14px]" style={{ color: `${track.color}66` }}>→</span>
                </Link>

                {/* ── Programmes ── */}
                {programs.length > 0 && (
                  <div className="mt-5">
                    <p
                      className="mb-3 text-[9px] font-bold uppercase tracking-[0.20em]"
                      style={{ color: `${track.color}88` }}
                    >
                      {programs.length} programme{programs.length !== 1 ? "s" : ""} available
                    </p>
                    <div className="space-y-2">
                      {programs.map((prog, i) =>
                        prog.href ? (
                          <Link
                            key={prog.href}
                            href={prog.href}
                            className="group flex items-start justify-between rounded-xl px-4 py-3 transition-all hover:opacity-85"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border:     "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <div className="min-w-0 flex-1 pr-3">
                              <p className="text-[12.5px] font-semibold text-white/88">
                                {prog.label}
                              </p>
                              {prog.description && (
                                <p className="mt-0.5 text-[10.5px] leading-relaxed text-white/38">
                                  {prog.description}
                                </p>
                              )}
                            </div>
                            <span
                              className="mt-0.5 flex-shrink-0 text-[13px] transition-transform group-hover:translate-x-0.5"
                              style={{ color: `${track.color}66` }}
                            >
                              →
                            </span>
                          </Link>
                        ) : (
                          <div
                            key={`${prog.label}-${i}`}
                            className="rounded-xl px-4 py-3"
                            style={{
                              background: "rgba(255,255,255,0.02)",
                              border:     "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <p className="text-[12.5px] font-medium text-white/55">
                              {prog.label}
                            </p>
                            {prog.description && (
                              <p className="mt-0.5 text-[10.5px] leading-relaxed text-white/28">
                                {prog.description}
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* ── Footer CTAs ── */}
                <div
                  className="mt-5 flex items-center gap-4 border-t pt-4"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <Link
                    href="/eligibility"
                    className="rounded-full px-4 py-2 text-[11px] font-semibold transition-all hover:opacity-80"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border:     "1px solid rgba(255,255,255,0.12)",
                      color:      "rgba(255,255,255,0.70)",
                    }}
                  >
                    Check Eligibility
                  </Link>
                  <Link
                    href="/booking"
                    className="text-[10.5px] font-medium text-white/30 transition-colors hover:text-white/55"
                  >
                    Book Private Advisory
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
