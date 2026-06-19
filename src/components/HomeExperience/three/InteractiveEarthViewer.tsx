"use client";

/**
 * InteractiveEarthViewer — V1 (Globe-first)
 * ──────────────────────────────────────────
 * Camera math:
 *  sphere radius = 1.25, camera z = 4.5, FOV = 42°
 *  → angular diameter = 2 × arcsin(1.25/4.5) ≈ 32.7°
 *  → screen coverage = 32.7/42 ≈ 78%  ✓ full globe visible with breathing room
 *
 * Textures (public/textures/earth/):
 *  earth-day.jpg       NASA Blue Marble 2048×1024
 *  earth-bump.jpg      Normal/bump map 2048×1024
 *  earth-specular.jpg  Ocean specular mask 2048×1024
 */

import { Suspense, useRef, useMemo, Component, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars, useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const EARTH_R = 1.25;

// Fresnel rim glow — blue atmosphere scattering at limb
const ATMO_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal     = normalize(normalMatrix * normal);
    vec4 mvPos  = modelViewMatrix * vec4(position, 1.0);
    vViewPos    = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`;

const ATMO_FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vec3  viewDir = normalize(vViewPos);
    float rim     = 1.0 - abs(dot(viewDir, vNormal));
    float glow    = pow(rim, 2.8) * 0.80;
    gl_FragColor  = vec4(0.18, 0.46, 1.0, glow);
  }
`;

// Catches texture 404 errors gracefully
interface EBProps { fallback: ReactNode; children: ReactNode }
interface EBState { hasError: boolean }
class TextureErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// Blue procedural sphere — shown while textures load or if textures fail
function EarthFallback() {
  const ref = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={ref} rotation={[0.06, 1.38, 0]}>
      <sphereGeometry args={[EARTH_R, 48, 48]} />
      <meshPhongMaterial
        color={new THREE.Color(0x0d3d80)}
        emissive={new THREE.Color(0x061e44)}
        emissiveIntensity={0.4}
        specular={new THREE.Color(0x1a3366)}
        shininess={20}
      />
    </mesh>
  );
}

// Textured Earth — suspends while textures load
function EarthWithTextures() {
  const { map, bumpMap, specularMap } = useTexture({
    map:         "/textures/earth/earth-day.jpg",
    bumpMap:     "/textures/earth/earth-bump.jpg",
    specularMap: "/textures/earth/earth-specular.jpg",
  });

  const atmoMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader:   ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        transparent:    true,
        blending:       THREE.AdditiveBlending,
        depthWrite:     false,
        side:           THREE.FrontSide,
      }),
    []
  );

  return (
    // India at ~79°E → rotation.y ≈ 1.38 rad faces camera
    <group rotation={[0.06, 1.38, 0]}>

      {/* Earth surface — textured, bump-mapped, specular ocean */}
      <mesh>
        <sphereGeometry args={[EARTH_R, 72, 72]} />
        <meshPhongMaterial
          map={map}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color(0x2d4a7a)}
          shininess={22}
        />
      </mesh>

      {/* Single Fresnel atmosphere — one thin rim glow only */}
      <mesh scale={[1.048, 1.048, 1.048]}>
        <sphereGeometry args={[EARTH_R, 48, 48]} />
        <primitive object={atmoMaterial} attach="material" />
      </mesh>

    </group>
  );
}

// Keeps camera pointed at Earth center after mount
function CameraSetup() {
  const { camera } = useThree();
  useMemo(() => {
    camera.lookAt(0, 0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function EarthScene({ reduce }: { reduce: boolean }) {
  return (
    <>
      <CameraSetup />

      <Stars
        radius={300}
        depth={80}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={reduce ? 0 : 0.15}
      />

      {/* Lighting: strong sun + hemisphere fill + subtle blue earthshine */}
      <ambientLight intensity={0.35} color="#ccd8f0" />
      <hemisphereLight
        args={["#6688ff", "#334455", 0.28]}
      />
      <directionalLight
        position={[-5, 3, 4]}
        intensity={1.45}
        color="#fff3e8"
      />
      <pointLight
        position={[4, -2, -3.5]}
        intensity={0.12}
        color="#1022cc"
      />

      <OrbitControls
        makeDefault
        enableRotate
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.45}
        zoomSpeed={0.65}
        minDistance={2.6}
        maxDistance={7.0}
        autoRotate={!reduce}
        autoRotateSpeed={0.12}
        target={[0, 0, 0]}
      />

      <TextureErrorBoundary fallback={<EarthFallback />}>
        <Suspense fallback={<EarthFallback />}>
          <EarthWithTextures />
        </Suspense>
      </TextureErrorBoundary>
    </>
  );
}

export default function InteractiveEarthViewer({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={className}>
      <Canvas
        camera={{
          position: [0, 0.15, 4.5],
          fov:      42,
          near:     0.1,
          far:      600,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias:       true,
          alpha:           true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <EarthScene reduce={reduce} />
      </Canvas>
    </div>
  );
}
