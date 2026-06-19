"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { GlobalDestination } from "../globalRouteNetwork";

const HQ_GOLD       = "#e1b923";
const HQ_DOT_R      = 0.015;
const DEST_DOT_BASE = 0.009;

// ── Compact sonar ring for HQ ─────────────────────────────────────────────────
function HQSonarRing({ phaseOffset }: { phaseOffset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: HQ_GOLD, transparent: true, opacity: 0,
      side: THREE.DoubleSide, depthWrite: false,
    }),
    [],
  );
  const phase = useRef(phaseOffset);
  useEffect(() => () => { mat.dispose(); }, [mat]);

  useFrame((_, delta) => {
    phase.current = (phase.current + delta * 0.38) % 1;
    const p = phase.current;
    if (meshRef.current) meshRef.current.scale.setScalar(1 + p * 2.4);
    mat.opacity = (1 - p) * 0.35;
  });

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[HQ_DOT_R * 1.5, HQ_DOT_R * 1.78, 36]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ── Bengaluru HQ ──────────────────────────────────────────────────────────────
interface HQMarkerProps { position: THREE.Vector3 }

export function HQMarker({ position }: HQMarkerProps) {
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize());
    return q;
  }, [position]);

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <sphereGeometry args={[HQ_DOT_R, 10, 10]} />
        <meshBasicMaterial color={HQ_GOLD} />
      </mesh>
      <HQSonarRing phaseOffset={0.0} />
      <HQSonarRing phaseOffset={0.5} />
      <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
        <div style={{
          transform:     "translateY(-230%)",
          fontSize:      "7px",
          fontWeight:    700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         HQ_GOLD,
          whiteSpace:    "nowrap",
          textShadow:    "0 1px 8px rgba(0,0,0,0.99)",
        }}>
          Bengaluru HQ
        </div>
      </Html>
    </group>
  );
}

// ── Premium beacon reticle: 2 thin rings + 4 crosshair ticks ──────────────────
interface BeaconReticleProps { color: string; baseSize: number }

function BeaconReticle({ color, baseSize }: BeaconReticleProps) {
  const innerMat = useMemo(
    () => new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false,
    }),
    [color],
  );
  const outerMat = useMemo(
    () => new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false,
    }),
    [color],
  );
  const tickMat = useMemo(
    () => new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.42, side: THREE.DoubleSide, depthWrite: false,
    }),
    [color],
  );
  const t = useRef(0);
  useEffect(() => () => { innerMat.dispose(); outerMat.dispose(); tickMat.dispose(); }, [innerMat, outerMat, tickMat]);

  useFrame((_, delta) => {
    t.current += delta * 1.8;
    innerMat.opacity = 0.44 + Math.sin(t.current) * 0.12;
    outerMat.opacity = 0.18 + Math.sin(t.current + 1.5) * 0.06;
    tickMat.opacity  = 0.36 + Math.sin(t.current + 0.8) * 0.08;
  });

  // Crosshair tick sizes
  const tickLen = baseSize * 1.5;
  const tickW   = baseSize * 0.15;
  const tickOff = baseSize * 4.1; // outside the outer ring

  return (
    <>
      {/* Inner thin ring */}
      <mesh>
        <ringGeometry args={[baseSize * 2.15, baseSize * 2.32, 40]} />
        <primitive object={innerMat} attach="material" />
      </mesh>
      {/* Outer thin ring */}
      <mesh>
        <ringGeometry args={[baseSize * 3.30, baseSize * 3.46, 40]} />
        <primitive object={outerMat} attach="material" />
      </mesh>
      {/* 4 crosshair tick marks — N/S/E/W outside outer ring */}
      <mesh position={[0, tickOff + tickLen / 2, 0]}>
        <planeGeometry args={[tickW, tickLen]} />
        <primitive object={tickMat} attach="material" />
      </mesh>
      <mesh position={[0, -(tickOff + tickLen / 2), 0]}>
        <planeGeometry args={[tickW, tickLen]} />
        <primitive object={tickMat} attach="material" />
      </mesh>
      <mesh position={[tickOff + tickLen / 2, 0, 0]}>
        <planeGeometry args={[tickLen, tickW]} />
        <primitive object={tickMat} attach="material" />
      </mesh>
      <mesh position={[-(tickOff + tickLen / 2), 0, 0]}>
        <planeGeometry args={[tickLen, tickW]} />
        <primitive object={tickMat} attach="material" />
      </mesh>
    </>
  );
}

// ── Destination marker ────────────────────────────────────────────────────────
interface DestMarkerProps {
  destination: GlobalDestination;
  position:    THREE.Vector3;
  color:       string;
  active?:     boolean;
  muted?:      boolean;
  priority?:   boolean;
  onHover?:    () => void;
  onLeave?:    () => void;
  onClick?:    () => void;
}

export function DestMarker({
  destination,
  position,
  color,
  active   = false,
  muted    = false,
  priority = false,
  onHover,
  onLeave,
  onClick,
}: DestMarkerProps) {
  const meshRef     = useRef<THREE.Mesh>(null);
  const baseRingRef = useRef<THREE.Mesh>(null);

  const baseSize = priority ? DEST_DOT_BASE * 1.22 : DEST_DOT_BASE;

  const dotMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.70 }),
    [color],
  );
  const baseRingMat = useMemo(
    () => new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false,
    }),
    [color],
  );
  useEffect(() => () => { dotMat.dispose(); baseRingMat.dispose(); }, [dotMat, baseRingMat]);

  const targetScale  = useRef(1.0);
  const targetDotOp  = useRef(0.70);
  const targetRingOp = useRef(0.16);

  // Active scale max 1.20 — subtle size change only, no big blob
  targetScale.current  = active ? 1.20 : muted ? 0.55 : priority ? 1.15 : 1.0;
  targetDotOp.current  = active ? 1.0  : muted ? 0.10 : priority ? 0.82 : 0.55;
  targetRingOp.current = active ? 0.0  : muted ? 0.04 : priority ? 0.20 : 0.14;

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize());
    return q;
  }, [position]);

  useFrame((_, delta) => {
    const k = Math.min(delta * 10, 1);
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale.current, k),
      );
      dotMat.opacity = THREE.MathUtils.lerp(dotMat.opacity, targetDotOp.current, k);
    }
    if (baseRingRef.current) {
      baseRingMat.opacity = THREE.MathUtils.lerp(baseRingMat.opacity, targetRingOp.current, k);
    }
  });

  return (
    <group position={position} quaternion={quaternion}>
      {/* Interactive dot */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; onHover?.(); }}
        onPointerOut={(e)  => { e.stopPropagation(); document.body.style.cursor = "default";  onLeave?.(); }}
        onClick={(e)       => { e.stopPropagation(); onClick?.(); }}
      >
        <sphereGeometry args={[baseSize, 8, 8]} />
        <primitive object={dotMat} attach="material" />
      </mesh>

      {/* Base ring — low opacity, fades to 0 when active (beacon reticle takes over) */}
      <mesh ref={baseRingRef}>
        <ringGeometry args={[baseSize * 1.75, baseSize * 1.90, 32]} />
        <primitive object={baseRingMat} attach="material" />
      </mesh>

      {/* Premium beacon reticle — only when active */}
      {active && <BeaconReticle color={color} baseSize={baseSize} />}

      {/* Tiny destination label — only when active; full card comes from anchored popover */}
      {active && (
        <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
          <div style={{
            transform:     "translateY(-280%)",
            background:    "rgba(2, 10, 26, 0.86)",
            border:        `1px solid ${color}40`,
            borderRadius:  "3px",
            padding:       "2px 8px",
            fontSize:      "7.5px",
            fontWeight:    700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color,
            whiteSpace:    "nowrap",
          }}>
            {destination.label}
          </div>
        </Html>
      )}
    </group>
  );
}
