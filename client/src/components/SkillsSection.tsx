import React, { Suspense, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Skills3DScene from './Skills3DScene';
import TechIconGrid from './TechIconGrid';

/**
 * SkillsSection — Redesigned with:
 * 1. Full 3D animated skill orbs canvas (left/top)
 * 2. Animated circular progress rings for each category (right/bottom)
 * 3. Horizontal skill tag ticker
 * 4. Premium glassmorphism cards
 */

const skillCategories = [
  {
    category: 'Frontend',
    emoji: '🎨',
    percent: 92,
    color: '#2389C7',
    gradientFrom: 'from-cyan-400',
    gradientTo: 'to-blue-500',
    shadowColor: 'rgba(35, 137, 199,0.35)',
    borderGlow: 'hover:shadow-[0_0_30px_rgba(35, 137, 199,0.2)]',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    percent: 85,
    color: '#3ABAF2',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-pink-500',
    shadowColor: 'rgba(58, 186, 242,0.35)',
    borderGlow: 'hover:shadow-[0_0_30px_rgba(58, 186, 242,0.2)]',
    skills: ['Node.js', 'Express', 'Firebase', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    category: 'AI & ML',
    emoji: '🤖',
    percent: 78,
    color: '#10b981',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-green-500',
    shadowColor: 'rgba(16,185,129,0.35)',
    borderGlow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    skills: ['Machine Learning', 'NLP', 'Data Analysis', 'Python', 'TensorFlow', 'OpenAI'],
  },
  {
    category: 'DevOps',
    emoji: '🛠️',
    percent: 80,
    color: '#f97316',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-red-500',
    shadowColor: 'rgba(249,115,22,0.35)',
    borderGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    skills: ['Git', 'Docker', 'AWS', 'GitHub Actions', 'Webpack', 'Vite'],
  },
];

const allTechTags = [
  'React', 'Next.js', 'TypeScript', 'Three.js', 'Node.js', 'Firebase', 'MongoDB',
  'PostgreSQL', 'Python', 'TensorFlow', 'OpenAI', 'Docker', 'AWS', 'GraphQL',
  'Redis', 'Kubernetes', 'Linux', 'Jest', 'Prisma', 'tRPC', 'Socket.io',
  'Framer Motion', 'Tailwind CSS', 'Express', 'REST APIs', 'NLP', 'Git',
];

// SVG circular progress ring
function ProgressRing({
  percent,
  color,
  size = 80,
  stroke = 6,
}: {
  percent: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const isInView = useInView(ref as unknown as React.RefObject<Element>, { once: true });
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (isInView ? percent / 100 : 0) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={stroke}
      />
      {/* Progress */}
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: isInView ? 'stroke-dashoffset 1.5s cubic-bezier(0.23,1,0.32,1)' : 'none',
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      />
    </svg>
  );
}

// Single skill category card with glassmorphism + progress ring
function SkillCard({
  category,
  delay,
}: {
  category: (typeof skillCategories)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.025, y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative p-6 rounded-2xl border border-white/[0.07] bg-[rgba(26,31,58,0.7)] backdrop-blur-xl
        transition-all duration-500 ${category.borderGlow} group overflow-hidden cursor-default`}
      style={{
        boxShadow: hovered ? `0 0 40px ${category.shadowColor}40` : '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${category.color}12 0%, transparent 70%)`,
        }}
      />

      {/* Top row: emoji + category + ring */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${category.color}18`, border: `1px solid ${category.color}30` }}
          >
            {category.emoji}
          </div>
          <div>
            <h3
              className={`text-lg font-bold bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} bg-clip-text text-transparent`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {category.category}
            </h3>
            <p className="text-xs text-muted-foreground font-mono">{category.percent}% proficiency</p>
          </div>
        </div>

        {/* Progress ring */}
        <div className="relative flex items-center justify-center">
          <ProgressRing percent={category.percent} color={category.color} size={70} stroke={5} />
          <span
            className="absolute text-sm font-bold"
            style={{ color: category.color, fontFamily: "'Space Mono', monospace" }}
          >
            {category.percent}
          </span>
        </div>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill, j) => (
          <motion.span
            key={j}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + j * 0.06, duration: 0.35 }}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-lg text-xs font-mono transition-all duration-300 cursor-default"
            style={{
              background: `${category.color}12`,
              border: `1px solid ${category.color}30`,
              color: category.color,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// Infinite horizontal ticker of tech tags
function TechTicker() {
  const duplicated = [...allTechTags, ...allTechTags];
  return (
    <div className="relative overflow-hidden py-3">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: [0, -50 * allTechTags.length] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {duplicated.map((tag, i) => (
          <span
            key={i}
            className="px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap border border-white/[0.08] text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 bg-background border-t border-border overflow-hidden"
    >
      {/* Background animated blobs */}
      <motion.div
        style={{ y: blobY }}
        className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-cyan-400/30 to-sky-500/10 blur-3xl" />
      </motion.div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(35, 137, 199,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(35, 137, 199,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* ─── Section Header ─── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase">
            ◈ Expertise ◈
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies — built and battle-tested in production
          </p>
        </motion.div>

        {/* ─── Main Grid: 3D Scene + Skill Cards ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">

          {/* Left — 3D Scene */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* 3D Canvas wrapper */}
            <div
              className="relative rounded-3xl overflow-hidden border border-white/[0.07]"
              style={{
                height: '520px',
                background: 'radial-gradient(ellipse at center, rgba(35, 137, 199,0.06) 0%, rgba(10,14,39,0.95) 70%)',
                boxShadow: '0 0 60px rgba(35, 137, 199,0.08), inset 0 0 60px rgba(0,0,0,0.3)',
              }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-cyan-400/50 border-t-cyan-400 animate-spin" />
                  </div>
                }
              >
                <Skills3DScene />
              </Suspense>

              {/* Overlay label */}
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="text-xs font-mono text-cyan-400/50 tracking-widest">
                  ↺ interactive 3D · drag to rotate
                </span>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-sm" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/40 rounded-br-sm" />
            </div>

            {/* Floating info badge */}
            <motion.div
              className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl border border-cyan-400/30 backdrop-blur-sm text-xs font-mono text-cyan-400"
              style={{ background: 'rgba(35, 137, 199,0.08)' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              12 Technologies
            </motion.div>
          </motion.div>

          {/* Right — Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, i) => (
              <SkillCard key={i} category={cat} delay={i * 0.12} />
            ))}
          </div>
        </div>

        {/* ─── Ticker bar ─── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase text-center mb-4">
            Also familiar with
          </p>
          <TechTicker />
        </motion.div>

        {/* ─── Tech Icon Grid (Interactive) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TechIconGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
