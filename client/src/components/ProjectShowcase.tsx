import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Mini 3D scenes — one per project
   ───────────────────────────────────────────── */

/** PTE — Neural network AI visualization */
function PTEScene() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
  });

  const nodes: [number, number, number][] = [
    [0, 0, 0],
    [-1, 0.8, 0.2],
    [1, 0.8, -0.2],
    [-1, -0.8, -0.2],
    [1, -0.8, 0.2],
    [0, 1.5, 0],
    [0, -1.5, 0],
    [-1.5, 0, 0.3],
    [1.5, 0, -0.3],
  ];

  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [2, 5], [3, 6], [4, 6],
    [1, 7], [3, 7], [2, 8], [4, 8],
    [5, 8], [6, 7],
  ];

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.12 : 0.07, 12, 12]} />
          <meshBasicMaterial color={i === 0 ? '#2389C7' : '#3ABAF2'} />
        </mesh>
      ))}
      {edges.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end = new THREE.Vector3(...nodes[b]);
        const mid = start.clone().lerp(end, 0.5);
        const len = start.distanceTo(end);
        const dir = end.clone().sub(start).normalize();
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return (
          <mesh key={i} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.005, 0.005, len, 4]} />
            <meshBasicMaterial color="#2389C7" transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

/** V-TRACK — Rotating globe with route lines */
function VTrackScene() {
  const globe = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globe.current) globe.current.rotation.y = t * 0.3;
    if (ring.current) {
      ring.current.rotation.x = t * 0.5;
      ring.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      {/* Wireframe globe */}
      <mesh ref={globe}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#2389C7" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Solid inner core */}
      <mesh>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color="#0a0e27" />
      </mesh>
      {/* Orbital ring */}
      <mesh ref={ring} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.4, 0.01, 8, 80]} />
        <meshBasicMaterial color="#3ABAF2" />
      </mesh>
      {/* Glowing dot (vehicle) */}
      <mesh position={[1.4, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#2389C7" />
      </mesh>
    </group>
  );
}

/** AgriSense — Growing helix DNA-like structure */
function AgriScene() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  const helixPoints = Array.from({ length: 40 }, (_, i) => {
    const t = (i / 40) * Math.PI * 4;
    return {
      a: [Math.cos(t) * 0.6, (i / 40) * 3 - 1.5, Math.sin(t) * 0.6] as [number, number, number],
      b: [Math.cos(t + Math.PI) * 0.6, (i / 40) * 3 - 1.5, Math.sin(t + Math.PI) * 0.6] as [number, number, number],
    };
  });

  return (
    <group ref={group}>
      {helixPoints.map(({ a, b }, i) => (
        <React.Fragment key={i}>
          <mesh position={a}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#22c55e' : '#2389C7'} />
          </mesh>
          <mesh position={b}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#2389C7' : '#3ABAF2'} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

/** Office Mgmt — Abstract interconnected cube grid */
function OfficeScene() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      group.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  const cubePositions: [number, number, number][] = [
    [0, 0, 0], [-1, 0, 0], [1, 0, 0],
    [0, 1, 0], [0, -1, 0],
    [-1, 1, 0], [1, 1, 0],
    [-1, -1, 0], [1, -1, 0],
  ];

  return (
    <group ref={group}>
      {cubePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshBasicMaterial
            color={i === 0 ? '#2389C7' : i % 2 === 0 ? '#3ABAF2' : '#1a1f3a'}
            wireframe={i !== 0}
            transparent
            opacity={i === 0 ? 1 : 0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────
   Showcase layout
   ───────────────────────────────────────────── */

interface ShowcaseProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  sceneType: 'pte' | 'vtrack' | 'agri' | 'office';
  flip?: boolean;
}

function MiniCanvas({ sceneType }: { sceneType: ShowcaseProps['sceneType'] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      {sceneType === 'pte' && <PTEScene />}
      {sceneType === 'vtrack' && <VTrackScene />}
      {sceneType === 'agri' && <AgriScene />}
      {sceneType === 'office' && <OfficeScene />}
    </Canvas>
  );
}

export const ProjectShowcaseItem: React.FC<ShowcaseProps> = ({
  id,
  title,
  subtitle,
  description,
  tags,
  sceneType,
  flip = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // All transforms extracted before JSX (hook rules compliance)
  const xText = useTransform(scrollYProgress, [0, 0.5], [flip ? 80 : -80, 0]);
  const xCanvas = useTransform(scrollYProgress, [0, 0.5], [flip ? -80 : 80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.97, 1]);

  const accentColor =
    sceneType === 'pte' ? 'border-cyan-400/35' :
    sceneType === 'vtrack' ? 'border-sky-500/35' :
    sceneType === 'agri' ? 'border-green-500/35' :
    'border-orange-500/35';

  const glowColor =
    sceneType === 'pte' ? 'rgba(35, 137, 199,0.12)' :
    sceneType === 'vtrack' ? 'rgba(58, 186, 242,0.12)' :
    sceneType === 'agri' ? 'rgba(34,197,94,0.12)' :
    'rgba(249,115,22,0.12)';

  return (
    <motion.div
      id={id}
      ref={ref}
      style={{ opacity, scale }}
      className="relative w-full py-16 md:py-24"
    >
      <div
        className={`max-w-6xl mx-auto px-4 flex flex-col ${
          flip ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center gap-12`}
      >
        {/* Text */}
        <motion.div style={{ x: xText }} className="flex-1 space-y-5">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            {subtitle}
          </span>
          <h3
            className="text-3xl md:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs text-cyan-400 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3D Canvas panel */}
        <motion.div
          style={{ x: xCanvas }}
          className={`flex-1 w-full h-72 md:h-80 rounded-2xl overflow-hidden border ${accentColor} bg-card relative`}
          whileHover={{ boxShadow: `0 0 40px ${glowColor}` }}
          transition={{ duration: 0.3 }}
        >
          {/* Dot-grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(35, 137, 199,0.15) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              opacity: 0.4,
            }}
          />
          {/* Corner accent dots */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-cyan-400/30" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400/20" />
          {/* Scene label */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-background/70 border border-border text-[10px] font-mono text-muted-foreground backdrop-blur-sm">
            LIVE · 3D
          </div>
          <MiniCanvas sceneType={sceneType} />
        </motion.div>
      </div>
    </motion.div>
  );
};

/**
 * ProjectShowcase — Scroll-triggered showcase for each major project,
 * featuring a unique 3D mini-scene side by side with project details.
 */
export const ProjectShowcase: React.FC = () => {
  const showcases: ShowcaseProps[] = [
    {
      id: 'showcase-pte',
      title: 'PTE — AI-Powered Testing',
      subtitle: 'Artificial Intelligence · NLP',
      description:
        'An advanced platform using independent AI models to simulate PTE-style exam tasks with realistic scoring algorithms, real-time speech recognition, and instant adaptive feedback.',
      tags: ['TypeScript', 'AI/ML', 'NLP', 'Real-time Scoring', 'React'],
      sceneType: 'pte',
      flip: false,
    },
    {
      id: 'showcase-vtrack',
      title: 'V-TRACK — Real-Time GPS',
      subtitle: 'Firebase · Geospatial Systems',
      description:
        'Enterprise-grade GPS tracking platform providing live vehicle movement updates, live notifications, geofencing alerts, and a real-time dashboard powered by Firebase streams.',
      tags: ['JavaScript', 'Firebase', 'GPS', 'WebSockets', 'Maps API'],
      sceneType: 'vtrack',
      flip: true,
    },
    {
      id: 'showcase-agri',
      title: 'AgriSense — Smart Farming',
      subtitle: 'IoT · Data Analytics',
      description:
        'A scalable agricultural management platform empowering farmers with data-driven insights, soil condition monitoring, crop health analytics, and institutional responsiveness.',
      tags: ['JavaScript', 'IoT', 'Data Analytics', 'Web Tech'],
      sceneType: 'agri',
      flip: false,
    },
    {
      id: 'showcase-office',
      title: 'Office Management System',
      subtitle: 'Full-Stack · Admin Systems',
      description:
        'A comprehensive internal office platform for managing student applications, class enrollments, staff activity tracking, and digital document workflows — all within a secure dark admin environment.',
      tags: ['JavaScript', 'Database', 'Admin Panel', 'CRUD'],
      sceneType: 'office',
      flip: true,
    },
  ];

  return (
    <section className="w-full bg-background border-t border-border overflow-hidden">
      {/* Section header */}
      <motion.div
        className="text-center pt-20 pb-4 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className="gradient-text">Deep Dives</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Each project visualized with interactive 3D scenes — scroll to explore.
        </p>
      </motion.div>

      {/* Divider line */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mt-8" />
      </div>

      {showcases.map((s) => (
        <ProjectShowcaseItem key={s.id} {...s} />
      ))}
    </section>
  );
};

export default ProjectShowcase;
