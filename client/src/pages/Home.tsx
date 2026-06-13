import React, { Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import SkillsSection from '@/components/SkillsSection';
import JourneySection from '@/components/JourneySection';
import FooterSection from '@/components/FooterSection';
import BackToTop from '@/components/BackToTop';

/**
 * Home Page — Safal Kunwar's Developer Portfolio
 *
 * Sections (in order):
 * 1. Navbar           — sticky, transparent → glassmorphism
 * 2. HeroSection      — 3D R3F background, animated intro
 * 3. AboutSection     — bio + experience timeline
 * 4. ProjectsSection  — 2×2 project card grid
 * 5. ProjectShowcase  — per-project scroll-animated 3D deep-dives
 * 6. SkillsSection    — categorized skill badges
 * 7. JourneySection   — career path/milestones
 * 8. FooterSection    — contact + social links
 * 9. BackToTop        — floating scroll-to-top button
 *
 * Design: Futuristic Dark Theme
 */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #2389C7, #3ABAF2)',
        }}
      />

      {/* ── Sticky Navigation ── */}
      <Navbar />

      {/* ── Page Content ── */}
      <main>
        {/* 1. Hero — 3D particle scene + animated intro */}
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>

        {/* 2. About — bio, timeline, stats */}
        <AboutSection />

        {/* 3. Skills & Technologies */}
        <SkillsSection />

        {/* 4. Journey — career milestones */}
        <JourneySection />

        {/* 5. Projects — featured card grid */}
        <ProjectsSection />

        {/* 6. Deep-dive showcase — scroll-triggered 3D scenes per project */}
        <Suspense
          fallback={
            <div className="w-full py-32 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400" />
            </div>
          }
        >
          <ProjectShowcase />
        </Suspense>


        {/* 6. Contact & Footer */}
        <FooterSection />
      </main>

      {/* ── Floating Back-to-Top ── */}
      <BackToTop />
    </div>
  );
}
