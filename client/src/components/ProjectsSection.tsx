import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'PTE — AI-Powered English Proficiency Testing',
    description:
      'Advanced platform using independent AI models to simulate PTE-style exam tasks with realistic scoring and instant feedback.',
    image:
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=300&fit=crop',
    technologies: ['TypeScript', 'AI/ML', 'Real-time Scoring', 'React'],
    githubUrl: 'https://github.com/safalkunwar/PTE',
  },
  {
    title: 'V-TRACK — Real-Time Vehicle Tracking',
    description:
      'Enterprise-grade GPS tracking platform providing real-time vehicle movement updates with Firebase integration and live notifications.',
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=500&h=300&fit=crop',
    technologies: ['JavaScript', 'Firebase', 'GPS', 'Real-time'],
    githubUrl: 'https://github.com/safalkunwar/V-TRACK',
  },
  {
    title: 'AgriSense — Agricultural Management',
    description:
      'Inclusive and scalable platform empowering farmers with institutional responsiveness and data-driven agricultural insights.',
    image:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=300&fit=crop',
    technologies: ['JavaScript', 'IoT', 'Data Analytics', 'Web Tech'],
    githubUrl: 'https://github.com/safalkunwar/Agrisense',
  },
  {
    title: 'Office Management System',
    description:
      'Comprehensive internal office platform for managing student applications, class enrollments, and staff activity tracking.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&h=300&fit=crop',
    technologies: ['JavaScript', 'Database', 'Admin Panel', 'CRUD'],
    githubUrl: 'https://github.com/safalkunwar/office',
  },
];

/**
 * ProjectsSection Component
 *
 * Displays a responsive 2-column grid of featured project cards.
 * Cards animate in with staggered viewport-triggered entrance.
 *
 * Design: Futuristic Dark Theme
 */
export const ProjectsSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-24 bg-background border-t border-border overflow-hidden"
    >
      {/* Background accent orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-500 rounded-full opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400 rounded-full opacity-5 blur-3xl pointer-events-none" />

      {/* Horizontal grid lines — subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(35, 137, 199,0.5) 1px, transparent 1px)',
          backgroundSize: '100% 80px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Title */}
        <motion.div className="text-center mb-16" variants={titleVariants}>
          <span className="text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
            Portfolio
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing my expertise in full-stack development, real-time systems,
            and AI-powered solutions
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
