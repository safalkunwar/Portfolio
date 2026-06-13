import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

/**
 * ProjectCard Component
 *
 * Displays an individual project with:
 * - Smooth staggered entrance animation
 * - Image zoom on hover
 * - Animated hover overlay with "View" eye icon
 * - Technology badges
 * - GitHub / Live demo links
 *
 * Design: Futuristic Dark Theme
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  index,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      className="group relative h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-cyan-400/40 transition-all duration-400"
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 40px rgba(35, 137, 199, 0.12), 0 20px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* ── Image ── */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cyan-400/10 to-sky-500/10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Dark gradient bottom-fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 rounded-2xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center backdrop-blur-sm"
          >
            <Eye className="w-6 h-6 text-cyan-400" />
          </motion.div>
        </div>

        {/* Tech count badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-xs font-mono text-muted-foreground">
          {technologies.length} techs
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3
          className="text-lg font-bold text-foreground group-hover:text-cyan-400 transition-colors duration-300 leading-snug"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-xs text-cyan-400 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── Links ── */}
        <div className="flex gap-3 pt-2 border-t border-border">
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </motion.a>
          )}
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </motion.a>
          )}
          {!liveUrl && githubUrl && (
            <span className="ml-auto text-xs text-muted-foreground font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open Source
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
