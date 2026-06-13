import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ParticleField — generates a floating 3D neural-network-style particle cloud.
 * Rotates slowly to feel alive, with a subtle drift.
 */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  // Generate random sphere of particles
  const particleCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2389C7"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

/**
 * FloatingRings — concentric 3D torus rings that rotate independently.
 * Creates a futuristic orbital effect.
 */
function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.3;
      ring1.current.rotation.y += delta * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.2;
      ring2.current.rotation.z += delta * 0.15;
    }
    if (ring3.current) {
      ring3.current.rotation.x -= delta * 0.12;
      ring3.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group>
      {/* Outer ring — cyan */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.8, 0.004, 16, 100]} />
        <meshBasicMaterial color="#2389C7" transparent opacity={0.4} />
      </mesh>

      {/* Mid ring — purple */}
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[1.4, 0.003, 16, 100]} />
        <meshBasicMaterial color="#3ABAF2" transparent opacity={0.5} />
      </mesh>

      {/* Inner ring — cyan dim */}
      <mesh ref={ring3} rotation={[Math.PI / 2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.0, 0.003, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/**
 * NeuralNodes — small glowing spheres floating in space, connected by thin lines,
 * mimicking a neural-network visualization.
 */
function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions: [number, number, number][] = useMemo(
    () =>
      Array.from({ length: 12 }, () => [
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 1.5,
      ] as [number, number, number]),
    []
  );

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#2389C7' : '#3ABAF2'} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * HeroThreeScene — Full 3D canvas scene for the Hero section background.
 * Contains: particle field, floating rings, neural nodes.
 */
const HeroThreeScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
      <FloatingRings />
      <NeuralNodes />
    </Canvas>
  );
};

export default HeroThreeScene;
