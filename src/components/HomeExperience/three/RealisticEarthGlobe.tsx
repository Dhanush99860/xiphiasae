"use client";

import { Suspense, useEffect, Component, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars, useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { type TrackId, type GlobalDestination } from "../globalRouteNetwork";
import { GlobeRouteLayer } from "./GlobeRouteLayer";

const EARTH_R = 1.25;

function RendererSetup() {
  const { gl } = useThree();
  useEffect(() => { gl.toneMappingExposure = 1.4; }, [gl]);
  return null;
}

interface EBProps { fallback: ReactNode; children: ReactNode }
interface EBState { hasError: boolean }
class TextureErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function EarthFallback() {
  return (
    <mesh rotation={[0.05, 1.38, 0]}>
      <sphereGeometry args={[EARTH_R, 48, 48]} />
      <meshStandardMaterial color="#2a68cc" roughness={0.85} metalness={0} />
    </mesh>
  );
}

interface EarthProps {
  selectedTrack: TrackId;
  showAllRoutes: boolean;
  activeDestinationId: string | null;
  onDestinationHover: (dest: GlobalDestination | null) => void;
  onDestinationClick: (dest: GlobalDestination) => void;
  onCloseCard?: () => void;
  reduce: boolean;
}

function EarthWithTextures({
  selectedTrack, showAllRoutes, activeDestinationId,
  onDestinationHover, onDestinationClick, onCloseCard, reduce,
}: EarthProps) {
  const { map, bumpMap } = useTexture({
    map:     "/textures/earth/earth-day.jpg",
    bumpMap: "/textures/earth/earth-bump.jpg",
  });
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 16;

  return (
    // Both Earth mesh and route layer share this group — markers rotate with Earth
    <group rotation={[0.05, 1.38, 0]}>
      <mesh>
        <sphereGeometry args={[EARTH_R, 96, 96]} />
        <meshStandardMaterial
          color="#ffffff"
          map={map}
          bumpMap={bumpMap}
          bumpScale={0.004}
          roughness={0.92}
          metalness={0}
        />
      </mesh>
      <GlobeRouteLayer
        selectedTrack={selectedTrack}
        showAllRoutes={showAllRoutes}
        activeDestinationId={activeDestinationId}
        onDestinationHover={onDestinationHover}
        onDestinationClick={onDestinationClick}
        onCloseCard={onCloseCard}
        reduce={reduce}
      />
    </group>
  );
}

interface SceneProps extends EarthProps { /* same */ }

function GlobeScene({
  selectedTrack, showAllRoutes, activeDestinationId,
  onDestinationHover, onDestinationClick, onCloseCard, reduce,
}: SceneProps) {
  return (
    <>
      <RendererSetup />
      <color attach="background" args={["#010814"]} />

      <Stars radius={300} depth={80}  count={10000} factor={5} saturation={0} fade={false} speed={0} />
      <Stars radius={180} depth={40}  count={2500}  factor={9} saturation={0} fade={false} speed={0} />

      <mesh scale={[450, 450, 450]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#0d1a40" side={THREE.BackSide} transparent opacity={0.55} />
      </mesh>
      <mesh position={[-200, 80, -350]} scale={[180, 120, 180]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#1a0832" transparent opacity={0.20} depthWrite={false} />
      </mesh>

      <ambientLight intensity={1.55} color="#ffffff" />
      <directionalLight position={[0, 1.0, 8.0]} intensity={0.65} color="#fff5ee" />

      <OrbitControls
        makeDefault
        enableRotate enableZoom enablePan={false}
        enableDamping dampingFactor={0.06}
        rotateSpeed={0.45} zoomSpeed={0.65}
        minDistance={2.2} maxDistance={8.0}
        autoRotate={false} target={[0, 0.12, 0]}
      />

      <TextureErrorBoundary fallback={<EarthFallback />}>
        <Suspense fallback={<EarthFallback />}>
          <EarthWithTextures
            selectedTrack={selectedTrack}
            showAllRoutes={showAllRoutes}
            activeDestinationId={activeDestinationId}
            onDestinationHover={onDestinationHover}
            onDestinationClick={onDestinationClick}
            onCloseCard={onCloseCard}
            reduce={reduce}
          />
        </Suspense>
      </TextureErrorBoundary>
    </>
  );
}

export interface RealisticEarthGlobeProps {
  className?: string;
  selectedTrack?: TrackId;
  showAllRoutes?: boolean;
  activeDestinationId?: string | null;
  onDestinationHover?: (dest: GlobalDestination | null) => void;
  onDestinationClick?: (dest: GlobalDestination) => void;
  onCloseCard?: () => void;
}

export default function RealisticEarthGlobe({
  className           = "",
  selectedTrack       = "residency",
  showAllRoutes       = false,
  activeDestinationId = null,
  onDestinationHover  = () => {},
  onDestinationClick  = () => {},
  onCloseCard,
}: RealisticEarthGlobeProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.25, 4.6], fov: 42, near: 0.1, far: 800 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#010814" }}
      >
        <GlobeScene
          selectedTrack={selectedTrack}
          showAllRoutes={showAllRoutes}
          activeDestinationId={activeDestinationId}
          onDestinationHover={onDestinationHover}
          onDestinationClick={onDestinationClick}
          onCloseCard={onCloseCard}
          reduce={reduce}
        />
      </Canvas>
    </div>
  );
}
