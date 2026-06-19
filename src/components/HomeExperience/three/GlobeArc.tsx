"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const EARTH_R      = 1.25;
const ARC_SEGMENTS = 64;

function buildArcPoints(
  origin: THREE.Vector3,
  dest: THREE.Vector3,
  arcHeight: number,
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const o = origin.clone().normalize();
  const d = dest.clone().normalize();
  for (let i = 0; i <= ARC_SEGMENTS; i++) {
    const t = i / ARC_SEGMENTS;
    const lerped = o.clone().lerp(d, t).normalize();
    const r = EARTH_R + 0.022 + Math.sin(t * Math.PI) * arcHeight;
    pts.push(lerped.multiplyScalar(r));
  }
  return pts;
}

export interface GlobeArcProps {
  originPos:  THREE.Vector3;
  destPos:    THREE.Vector3;
  color:      string;
  arcHeight?: number;
  speed?:     number;
  active?:    boolean;
  muted?:     boolean;
  reduce?:    boolean;
}

export function GlobeArc({
  originPos,
  destPos,
  color,
  arcHeight,
  speed  = 0.14,
  active = false,
  muted  = false,
  reduce = false,
}: GlobeArcProps) {
  const progress      = useRef(Math.random());
  const particleRef   = useRef<THREE.Mesh>(null);
  const particleMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const trail0Ref     = useRef<THREE.Mesh>(null);
  const trail1Ref     = useRef<THREE.Mesh>(null);
  const trail2Ref     = useRef<THREE.Mesh>(null);
  const trail0MatRef  = useRef<THREE.MeshBasicMaterial>(null);
  const trail1MatRef  = useRef<THREE.MeshBasicMaterial>(null);
  const trail2MatRef  = useRef<THREE.MeshBasicMaterial>(null);

  const arcPoints = useMemo(() => {
    const h = arcHeight ?? (() => {
      const angle = originPos.clone().normalize().angleTo(destPos.clone().normalize());
      return Math.max(0.055, Math.min(angle * 0.12, 0.20));
    })();
    return buildArcPoints(originPos, destPos, h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originPos.x, originPos.y, originPos.z, destPos.x, destPos.y, destPos.z, arcHeight]);

  // Target opacity for main particle — only active arcs get particles
  const targetPOp = useRef(0.0);
  targetPOp.current = (reduce || muted || !active) ? 0.0 : 1.0;

  const TRAIL_OFFSETS  = [0.028, 0.058, 0.090] as const;
  const TRAIL_PEAK_OPS = [0.62,  0.38,  0.18]  as const;

  function sampleArc(p: number): THREE.Vector3 {
    const raw = p * (arcPoints.length - 1);
    const idx  = Math.floor(raw);
    const frac = raw - idx;
    const a = arcPoints[Math.min(idx,     arcPoints.length - 1)];
    const b = arcPoints[Math.min(idx + 1, arcPoints.length - 1)];
    return new THREE.Vector3().lerpVectors(a, b, frac);
  }

  useFrame((_, delta) => {
    // Main particle opacity
    if (particleMatRef.current) {
      particleMatRef.current.opacity = THREE.MathUtils.lerp(
        particleMatRef.current.opacity, targetPOp.current, delta * 7,
      );
    }
    // Trail opacities
    if (trail0MatRef.current) trail0MatRef.current.opacity = THREE.MathUtils.lerp(trail0MatRef.current.opacity, targetPOp.current * TRAIL_PEAK_OPS[0], delta * 5);
    if (trail1MatRef.current) trail1MatRef.current.opacity = THREE.MathUtils.lerp(trail1MatRef.current.opacity, targetPOp.current * TRAIL_PEAK_OPS[1], delta * 5);
    if (trail2MatRef.current) trail2MatRef.current.opacity = THREE.MathUtils.lerp(trail2MatRef.current.opacity, targetPOp.current * TRAIL_PEAK_OPS[2], delta * 5);

    if (!reduce && active && particleRef.current) {
      progress.current = (progress.current + delta * speed) % 1;

      // Main particle
      particleRef.current.position.copy(sampleArc(progress.current));

      // Trail particles — behind main particle along the arc
      const t0 = (progress.current - TRAIL_OFFSETS[0] + 1) % 1;
      const t1 = (progress.current - TRAIL_OFFSETS[1] + 1) % 1;
      const t2 = (progress.current - TRAIL_OFFSETS[2] + 1) % 1;
      trail0Ref.current?.position.copy(sampleArc(t0));
      trail1Ref.current?.position.copy(sampleArc(t1));
      trail2Ref.current?.position.copy(sampleArc(t2));
    }
  });

  // Line visual values
  const glowOp = active ? 0.20 : muted ? 0.006 : 0.06;
  const glowW  = active ? 4.2  : muted ? 1.2   : 2.0;
  const coreOp = active ? 0.88 : muted ? 0.018 : 0.22;
  const coreW  = active ? 1.35 : muted ? 0.30  : 0.65;

  return (
    <group>
      {/* Glow halo */}
      <Line points={arcPoints} color={color} transparent opacity={glowOp} lineWidth={glowW} />
      {/* Core route line */}
      <Line points={arcPoints} color={color} transparent opacity={coreOp} lineWidth={coreW} />

      {/* Trail particle 2 — dimmest, farthest back */}
      <mesh ref={trail2Ref} position={arcPoints[0]}>
        <sphereGeometry args={[0.004, 5, 5]} />
        <meshBasicMaterial ref={trail2MatRef} color={color} transparent opacity={0} />
      </mesh>
      {/* Trail particle 1 */}
      <mesh ref={trail1Ref} position={arcPoints[0]}>
        <sphereGeometry args={[0.005, 5, 5]} />
        <meshBasicMaterial ref={trail1MatRef} color={color} transparent opacity={0} />
      </mesh>
      {/* Trail particle 0 — closest to main */}
      <mesh ref={trail0Ref} position={arcPoints[0]}>
        <sphereGeometry args={[0.007, 6, 6]} />
        <meshBasicMaterial ref={trail0MatRef} color={color} transparent opacity={0} />
      </mesh>
      {/* Main particle */}
      <mesh ref={particleRef} position={arcPoints[0]}>
        <sphereGeometry args={[0.011, 7, 7]} />
        <meshBasicMaterial ref={particleMatRef} color="#ffffff" transparent opacity={0} />
      </mesh>
    </group>
  );
}
