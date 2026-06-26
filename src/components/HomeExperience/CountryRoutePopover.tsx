"use client";

import type { GlobalDestination, TrackId } from "./globalRouteNetwork";
import { getTrackMeta, getDestinationRouteHref } from "./globalRouteNetwork";
import { getDestinationMenuData } from "./routeMenuLookup";

interface CountryRoutePopoverProps {
  destination:   GlobalDestination;
  selectedTrack: TrackId;
  onClose?:      () => void;
}

export function CountryRoutePopover({
  destination,
  selectedTrack,
  onClose,
}: CountryRoutePopoverProps) {
  const track    = getTrackMeta(selectedTrack);
  const menuData = getDestinationMenuData(destination, selectedTrack);

  const programs = menuData?.programs
    ?? destination.programs.map((p) => ({ label: p, href: "", description: "" }));

  const countryHref = menuData?.countryHref
    ?? getDestinationRouteHref(destination, selectedTrack);

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(
      `[RoutePopover] ${destination.code}/${selectedTrack} — source: ${menuData ? "menu" : "fallback"}, programmes: ${programs.length}`,
    );
  }

  return (
    <div
      style={{
        width:                "400px",
        maxWidth:             "calc(100vw - 2rem)",
        background:           "rgba(2, 7, 20, 0.97)",
        backdropFilter:       "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
        border:               "1px solid rgba(255,255,255,0.08)",
        borderRadius:         "20px",
        overflow:             "hidden",
        boxShadow:            `0 0 0 1px ${track.color}18, 0 24px 72px rgba(15,23,42,0.08), 0 0 140px ${track.color}06`,
        fontFamily:           "inherit",
        pointerEvents:        "auto",
      }}
    >
      {/* Top accent bar — brighter gradient */}
      <div style={{
        height:     "2px",
        background: `linear-gradient(90deg, ${track.color} 0%, ${track.color}55 45%, transparent 100%)`,
      }} />

      {/* Scrollable content */}
      <div style={{ maxHeight: "calc(100vh - 10rem)", overflowY: "auto" }}>

        {/* ── Header — tinted gradient area ── */}
        <div style={{
          padding:      "18px 20px 16px",
          background:   `linear-gradient(150deg, ${track.color}10 0%, ${track.color}04 50%, transparent 100%)`,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {/* Top row: label dot · Route File · track badge · close */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: track.color,
                boxShadow: `0 0 7px ${track.color}`,
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: "7px", fontWeight: 700, letterSpacing: "0.30em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
              }}>
                Route File
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", padding: "2px 10px", borderRadius: "100px",
                background: `${track.color}1a`, border: `1px solid ${track.color}55`,
                color: track.color,
              }}>
                {track.label}
              </span>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    width: "22px", height: "22px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "50%", cursor: "pointer",
                    fontSize: "10px", lineHeight: "1",
                    color: "rgba(255,255,255,0.38)", padding: "0",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.12)";
                    el.style.color = "rgba(255,255,255,0.80)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.color = "rgba(255,255,255,0.38)";
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Country name + ISO code badge */}
          <div style={{
            display: "flex", alignItems: "baseline", gap: "10px", marginTop: "14px",
          }}>
            <h3 style={{
              margin: 0, fontSize: "22px", fontWeight: 700, lineHeight: 1.1,
              color: "#ffffff", letterSpacing: "-0.02em",
            }}>
              {destination.country}
            </h3>
            <span style={{
              fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.10em",
              color: `${track.color}77`,
              padding: "2px 6px",
              border: `1px solid ${track.color}30`,
              borderRadius: "5px",
            }}>
              {destination.code}
            </span>
          </div>

          {/* Route indicator: BLR ——› UAE · Track */}
          <div style={{
            display: "flex", alignItems: "center", gap: "6px", marginTop: "9px",
          }}>
            <span style={{
              fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.10em",
              color: "rgba(255,255,255,0.30)",
            }}>
              BLR
            </span>
            {/* Dashed route line */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {[1, 0.65, 0.40].map((op, i) => (
                <div key={i} style={{
                  width: "5px", height: "1.5px", borderRadius: "2px",
                  background: track.color, opacity: op,
                }} />
              ))}
              <span style={{ fontSize: "11px", color: track.color, lineHeight: 1, marginLeft: "1px" }}>›</span>
            </div>
            <span style={{
              fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.10em",
              color: track.color,
            }}>
              {destination.code}
            </span>
            <span style={{
              fontSize: "7.5px", color: "rgba(255,255,255,0.18)", marginLeft: "2px",
            }}>
              · {track.label} Track
            </span>
          </div>
        </div>

        {/* ── Content area ── */}
        <div style={{ padding: "16px 20px 20px" }}>

          {/* Country overview CTA */}
          <a
            href={countryHref}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderRadius: "12px", textDecoration: "none",
              background: `linear-gradient(135deg, ${track.color}1a 0%, ${track.color}09 100%)`,
              border: `1px solid ${track.color}35`,
              cursor: "pointer", transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `linear-gradient(135deg, ${track.color}28 0%, ${track.color}14 100%)`;
              el.style.borderColor = `${track.color}58`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `linear-gradient(135deg, ${track.color}1a 0%, ${track.color}09 100%)`;
              el.style.borderColor = `${track.color}35`;
            }}
          >
            <div>
              <p style={{
                margin: 0, fontSize: "11.5px", fontWeight: 700,
                color: track.color, letterSpacing: "0.01em",
              }}>
                {destination.label} {track.label} Overview
              </p>
              <p style={{
                margin: "3px 0 0", fontSize: "9.5px",
                color: "rgba(255,255,255,0.28)", letterSpacing: "0.01em",
              }}>
                Routes, requirements & timelines
              </p>
            </div>
            <div style={{
              width: "28px", height: "28px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "50%", background: `${track.color}22`,
              fontSize: "13px", color: track.color,
            }}>
              →
            </div>
          </a>

          {/* ── Programme section ── */}
          {programs.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              {/* Section label with lines */}
              <div style={{
                display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px",
              }}>
                <div style={{ height: "1px", width: "12px", background: `${track.color}50` }} />
                <span style={{
                  fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: `${track.color}80`, whiteSpace: "nowrap",
                }}>
                  {programs.length} Programme{programs.length !== 1 ? "s" : ""}
                </span>
                <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.05)" }} />
              </div>

              {/* Programme rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {programs.map((prog, i) =>
                  prog.href ? (
                    <a
                      key={prog.href}
                      href={prog.href}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: "0",
                        borderRadius: "10px", textDecoration: "none",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderLeftWidth: "2.5px",
                        borderLeftColor: `${track.color}55`,
                        background: "rgba(255,255,255,0.025)",
                        transition: "all 0.15s", cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(255,255,255,0.05)";
                        el.style.borderColor = "rgba(255,255,255,0.12)";
                        el.style.borderLeftColor = track.color;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(255,255,255,0.025)";
                        el.style.borderColor = "rgba(255,255,255,0.07)";
                        el.style.borderLeftColor = `${track.color}55`;
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0, padding: "10px 14px" }}>
                        <p style={{
                          margin: 0, fontSize: "12.5px", fontWeight: 600,
                          color: "rgba(255,255,255,0.90)", letterSpacing: "-0.01em",
                        }}>
                          {prog.label}
                        </p>
                        {prog.description && (
                          <p style={{
                            margin: "3px 0 0", fontSize: "10px",
                            color: "rgba(255,255,255,0.34)", lineHeight: 1.45,
                          }}>
                            {prog.description}
                          </p>
                        )}
                      </div>
                      <div style={{
                        padding: "10px 14px 10px 0",
                        display: "flex", alignItems: "center",
                        fontSize: "14px", color: `${track.color}55`,
                        flexShrink: 0,
                      }}>
                        →
                      </div>
                    </a>
                  ) : (
                    <div
                      key={`${prog.label}-${i}`}
                      style={{
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderLeftWidth: "2.5px",
                        borderLeftColor: "rgba(255,255,255,0.10)",
                        background: "rgba(255,255,255,0.015)",
                        padding: "10px 14px",
                      }}
                    >
                      <p style={{
                        margin: 0, fontSize: "12.5px", fontWeight: 500,
                        color: "rgba(255,255,255,0.40)",
                      }}>
                        {prog.label}
                      </p>
                      {prog.description && (
                        <p style={{
                          margin: "3px 0 0", fontSize: "10px",
                          color: "rgba(255,255,255,0.20)", lineHeight: 1.45,
                        }}>
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
          <div style={{
            marginTop: "16px", paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", gap: "8px",
          }}>
            <a
              href="/eligibility"
              style={{
                flex: 1, textAlign: "center",
                padding: "9px 0", borderRadius: "9px",
                background: `${track.color}1c`,
                border: `1px solid ${track.color}48`,
                color: track.color,
                fontSize: "10.5px", fontWeight: 700,
                textDecoration: "none", transition: "all 0.15s",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${track.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${track.color}1c`;
              }}
            >
              Check Eligibility
            </a>
            <a
              href="/booking"
              style={{
                flex: 1, textAlign: "center",
                padding: "9px 0", borderRadius: "9px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.58)",
                fontSize: "10.5px", fontWeight: 600,
                textDecoration: "none", transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.09)";
                el.style.color = "rgba(255,255,255,0.85)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.05)";
                el.style.color = "rgba(255,255,255,0.58)";
              }}
            >
              Book Advisory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
