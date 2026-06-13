import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Skills3DScene — Interactive 3D floating skill spheres for the Skills section.
 * Features:
 * - Floating glowing orbs with skill names via Drei Float
 * - Orbiting particle rings around a distortion core
 * - OrbitControls for mouse-drag interaction
 * - Responsive to pointer hover
 */

// Individual floating skill orb
function SkillOrb({
  position,
  color,
  label,
  size = 0.28,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Main orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          distort={0.22}
          speed={2.5}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Soft glow ring */}
      <mesh>
        <sphereGeometry args={[size + 0.06, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>

      {/* Label below */}
      <Text
        position={[0, -(size + 0.2), 0]}
        fontSize={0.12}
        color="#c8d5f5"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.4}
        textAlign="center"
        outlineWidth={0.008}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}

// Orbiting ring of points
function OrbitRing({
  radius,
  color,
  speed,
  tilt = 0,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [radius]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.03}
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Pulsing core sphere
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.045;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.32, 64, 64]} />
      <MeshDistortMaterial
        color="#2389C7"
        emissive="#2389C7"
        emissiveIntensity={0.6}
        distort={0.55}
        speed={3}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

// Ambient floating particle cloud
function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial color="#2389C7" size={0.012} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Skill data
const skillOrbs: { label: string; color: string; position: [number, number, number] }[] = [
  { label: 'React', color: '#61dafb', position: [-2.1, 1.5, 0] },
  { label: 'Next.js', color: '#aaaaaa', position: [-0.7, 1.9, 0.4] },
  { label: 'TypeScript', color: '#3178c6', position: [0.8, 1.6, -0.3] },
  { label: 'Three.js', color: '#2389C7', position: [2.1, 1.45, 0.2] },
  { label: 'Node.js', color: '#68a063', position: [-2.4, 0.1, 0.3] },
  { label: 'Firebase', color: '#ffca28', position: [-1.0, 0.3, -0.5] },
  { label: 'MongoDB', color: '#4db33d', position: [1.1, 0.25, 0.4] },
  { label: 'Python', color: '#4584b6', position: [2.4, 0.1, -0.2] },
  { label: 'Docker', color: '#2496ed', position: [-1.9, -1.55, 0.1] },
  { label: 'AWS', color: '#FF9900', position: [-0.65, -1.85, -0.25] },
  { label: 'TensorFlow', color: '#FF6F00', position: [0.7, -1.7, 0.45] },
  { label: 'OpenAI', color: '#74aa9c', position: [2.0, -1.5, 0] },
];

const Skills3DScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 3]} intensity={2.5} color="#2389C7" />
      <pointLight position={[3, 2, -2]} intensity={1.8} color="#3ABAF2" />
      <pointLight position={[-3, -2, 2]} intensity={1.2} color="#06b6d4" />
      <pointLight position={[0, -3, 1]} intensity={0.8} color="#10b981" />

      {/* Mouse-drag rotation control */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        dampingFactor={0.05}
        enableDamping
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />

      <ParticleCloud />
      <CoreSphere />
      <OrbitRing radius={1.1} color="#2389C7" speed={0.3} tilt={0.1} />
      <OrbitRing radius={1.6} color="#3ABAF2" speed={-0.2} tilt={0.5} />

      {/* Floating skill orbs */}
      {skillOrbs.map((orb, i) => (
        <Float
          key={i}
          speed={0.7 + (i % 4) * 0.2}
          rotationIntensity={0.15}
          floatIntensity={0.25}
          floatingRange={[-0.06, 0.06]}
        >
          <SkillOrb {...orb} size={0.26 + (i % 3) * 0.02} />
        </Float>
      ))}
    </Canvas>
  );
};

export default Skills3DScene;
