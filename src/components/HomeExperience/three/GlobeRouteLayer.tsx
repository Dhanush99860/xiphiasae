"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import {
  EARTH_R,
  GLOBAL_ROUTE_ORIGIN,
  getTrackDestinations,
  getPriorityDestinations,
  getTrackColor,
  type TrackId,
  type GlobalDestination,
} from "../globalRouteNetwork";
import { HQMarker, DestMarker } from "./GlobeMarker";
import { GlobeArc } from "./GlobeArc";
import { CountryRoutePopover } from "../CountryRoutePopover";

const MARKER_R = EARTH_R + 0.022;

function latLngToVector3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

export interface GlobeRouteLayerProps {
  selectedTrack:        TrackId;
  showAllRoutes?:       boolean;
  activeDestinationId?: string | null;
  onDestinationHover?:  (dest: GlobalDestination | null) => void;
  onDestinationClick?:  (dest: GlobalDestination) => void;
  onCloseCard?:         () => void;
  reduce?:              boolean;
}

export function GlobeRouteLayer({
  selectedTrack,
  showAllRoutes       = false,
  activeDestinationId = null,
  onDestinationHover,
  onDestinationClick,
  onCloseCard,
  reduce = false,
}: GlobeRouteLayerProps) {
  const color = getTrackColor(selectedTrack);

  const allDests = useMemo(
    () => getTrackDestinations(selectedTrack),
    [selectedTrack],
  );
  const priorityDests = useMemo(
    () => getPriorityDestinations(selectedTrack),
    [selectedTrack],
  );

  const visibleDests = showAllRoutes ? allDests : priorityDests;

  const originPos = useMemo(
    () => latLngToVector3(GLOBAL_ROUTE_ORIGIN.lat, GLOBAL_ROUTE_ORIGIN.lng, MARKER_R),
    [],
  );

  const destsWithPos = useMemo(
    () => visibleDests.map((d) => ({ ...d, pos: latLngToVector3(d.lat, d.lng, MARKER_R) })),
    [visibleDests],
  );

  const hasActiveRoute = activeDestinationId !== null;

  return (
    <group>
      <HQMarker position={originPos} />

      {destsWithPos.map((d) => {
        const isActive = d.id === activeDestinationId;
        const isMuted  = hasActiveRoute && !isActive;
        return (
          <DestMarker
            key={d.id}
            destination={d}
            position={d.pos}
            color={color}
            active={isActive}
            muted={isMuted}
            priority={!!d.priority}
            onHover={() => onDestinationHover?.(d)}
            onLeave={() => onDestinationHover?.(null)}
            onClick={() => onDestinationClick?.(d)}
          />
        );
      })}

      {destsWithPos.map((d) => {
        const isActive = d.id === activeDestinationId;
        const isMuted  = hasActiveRoute && !isActive;
        return (
          <GlobeArc
            key={d.id}
            originPos={originPos}
            destPos={d.pos}
            color={color}
            active={isActive}
            muted={isMuted}
            reduce={reduce}
          />
        );
      })}

      {/* Anchored country route popover — positioned next to active marker in 3D space */}
      {destsWithPos.map((d) => {
        if (d.id !== activeDestinationId) return null;
        return (
          <Html
            key={`popover-${d.id}`}
            position={[d.pos.x, d.pos.y, d.pos.z]}
            center={false}
            zIndexRange={[30, 0]}
            style={{ userSelect: "none" }}
          >
            <div style={{ transform: "translate(18px, -50%)", pointerEvents: "auto" }}>
              <CountryRoutePopover
                destination={d}
                selectedTrack={selectedTrack}
                onClose={onCloseCard}
              />
            </div>
          </Html>
        );
      })}
    </group>
  );
}
