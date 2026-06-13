import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import HeroThreeScene from './ThreeScene';

interface HeroSectionProps {
  profileImage?: string;
}

/**
 * HeroSection Component — Upgraded with:
 * - Typing / role-cycle animation
 * - Animated gradient shimmer on name
 * - Enhanced profile image with animated border
 * - Floating stat cards
 * - Animated availability badge
 */

const roles = [
  'Full-Stack Developer',
  'AI Integration Engineer',
  'Real-Time Systems Builder',
  '3D Web Experiences',
  'Open Source Contributor',
];

function TypingRole() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 60);
    } else if (!deleting && charIndex > current.length) {
      // Pause at full word
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-cyan-400">{displayed}</span>
      <motion.span
        className="inline-block w-0.5 h-5 bg-cyan-400 rounded-full"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profileImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* ── 3D Background Scene ── */}
      <Suspense fallback={null}>
        <HeroThreeScene />
      </Suspense>

      {/* ── Radial gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #0a0e27 100%)',
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500 rounded-full opacity-5 blur-3xl pointer-events-none" />

      {/* ── Scanline grid effect ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(35, 137, 199,0.4) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-10 container max-w-6xl mx-auto px-4 py-24 pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* Left: Text */}
          <motion.div className="space-y-6" variants={itemVariants}>

            {/* Available badge */}
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5"
                whileHover={{ scale: 1.04 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Available for hire
              </motion.span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1
                className="text-5xl md:text-7xl font-extrabold leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="block text-foreground">Safal</span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #2389C7 0%, #3ABAF2 50%, #2389C7 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3s linear infinite',
                  }}
                >
                  Kunwar
                </span>
              </h1>

              {/* Role typing */}
              <div className="mt-3 text-base md:text-lg font-mono min-h-[1.75rem]">
                <TypingRole />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
              variants={itemVariants}
            >
              I craft high-performance web applications — from AI-powered testing
              platforms and real-time GPS systems to agricultural intelligence
              tools, all with cutting-edge UX.
            </motion.p>

            {/* CTA Row */}
            <motion.div className="flex items-center gap-4 pt-2 flex-wrap" variants={itemVariants}>
              <motion.button
                id="hero-cta-explore"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative px-8 py-3.5 rounded-full font-bold text-base overflow-hidden group shadow-[0_0_20px_rgba(35, 137, 199,0.2)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#000000',
                  color: '#f8fafc',
                  border: '1px solid rgba(35, 137, 199,0.4)',
                }}
              >
                {/* Shine effect */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2389C7]" />
                  Explore My Work
                </span>
              </motion.button>

              <motion.a
                className="px-8 py-3.5 rounded-full border border-border text-foreground font-medium text-base hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div className="flex items-center gap-4 pt-1" variants={itemVariants}>
              {[
                { href: 'https://github.com/safalkunwar', Icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/safalkunwar', Icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:sawfallkunwar@gmail.com', Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-300"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-4 border-t border-border"
              variants={itemVariants}
            >
              {[
                { value: '4+', label: 'Years Exp.' },
                { value: '10+', label: 'Projects' },
                { value: '100%', label: 'Dedication' },
              ].map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.06 }}
                  className="cursor-default"
                >
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            className="relative flex justify-center items-center"
            variants={imageVariants}
          >
            {/* Glow halo */}
            <div className="absolute w-72 h-72 rounded-full bg-[#2389C7] opacity-10 blur-[80px]" />

            {/* Profile image */}
            <motion.div
              className="relative w-64 h-64 rounded-full overflow-hidden"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              style={{
                border: '1px solid rgba(35, 137, 199, 0.4)',
                boxShadow: '0 0 30px rgba(35, 137, 199, 0.15)',
              }}
            >
              <img
                src={profileImage}
                alt="Safal Kunwar — Full-Stack Developer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-sky-500/15" />
            </motion.div>

            {/* Floating badge — Building the future */}
            <motion.div
              className="absolute -bottom-1 -left-2 md:bottom-8 md:left-0 px-3 py-2 rounded-xl backdrop-blur-sm text-xs font-mono text-sky-400 shadow-lg"
              style={{
                background: 'rgba(58, 186, 242,0.08)',
                border: '1px solid rgba(58, 186, 242,0.25)',
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              🚀&nbsp;Building the future
            </motion.div>

            {/* Tech stack badge */}
            <motion.div
              className="absolute bottom-10 -right-4 px-3 py-1.5 rounded-xl backdrop-blur-sm text-xs font-mono text-cyan-400"
              style={{
                background: 'rgba(35, 137, 199,0.06)',
                border: '1px solid rgba(35, 137, 199,0.2)',
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              ⚡ Next.js · Three.js
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-muted-foreground font-mono tracking-widest">scroll</span>
        <ArrowDown className="w-4 h-4 text-cyan-400" />
      </motion.div>

      {/* CSS shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
