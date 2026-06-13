import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

/**
 * TechIconGrid — Clickable technology icon grid.
 * Clicking a tech icon opens a sleek modal showing which projects use that technology.
 * Uses real devicon SVG URLs for authentic brand icons.
 */

interface Project {
  name: string;
  description: string;
  github: string;
  role: string;
}

interface TechItem {
  name: string;
  icon: string; // devicon CDN URL or SVG string
  color: string;
  category: string;
  projects: Project[];
}

const projectsData: Record<string, Project[]> = {
  react: [
    { name: 'PTE — AI Testing Platform', description: 'Interactive exam UI with real-time feedback', github: 'https://github.com/safalkunwar/PTE', role: 'Core Frontend Framework' },
    { name: 'Office Management System', description: 'Student & staff management dashboard', github: 'https://github.com/safalkunwar/office', role: 'UI Architecture' },
    { name: 'AgriSense Platform', description: 'Agricultural data visualization', github: 'https://github.com/safalkunwar/Agrisense', role: 'Frontend Layer' },
  ],
  nextjs: [
    { name: 'Portfolio Website', description: 'This very portfolio you are viewing!', github: 'https://github.com/safalkunwar', role: 'Full-Stack Framework' },
  ],
  typescript: [
    { name: 'PTE — AI Testing Platform', description: 'Type-safe AI integration and state management', github: 'https://github.com/safalkunwar/PTE', role: 'Type Safety & DX' },
    { name: 'V-TRACK GPS System', description: 'Real-time tracking type definitions', github: 'https://github.com/safalkunwar/V-TRACK', role: 'API Typings' },
  ],
  firebase: [
    { name: 'V-TRACK GPS System', description: 'Real-time Firestore for live vehicle tracking', github: 'https://github.com/safalkunwar/V-TRACK', role: 'Real-time Database & Auth' },
    { name: 'Office Management System', description: 'Authentication & cloud storage', github: 'https://github.com/safalkunwar/office', role: 'Backend Services' },
  ],
  nodejs: [
    { name: 'PTE — AI Testing Platform', description: 'API server for AI scoring endpoints', github: 'https://github.com/safalkunwar/PTE', role: 'Backend Runtime' },
    { name: 'V-TRACK GPS System', description: 'WebSocket server for GPS streaming', github: 'https://github.com/safalkunwar/V-TRACK', role: 'Server Runtime' },
  ],
  python: [
    { name: 'PTE — AI Testing Platform', description: 'NLP models for speech analysis & scoring', github: 'https://github.com/safalkunwar/PTE', role: 'AI/ML Engine' },
    { name: 'AgriSense Platform', description: 'Data analysis & crop prediction models', github: 'https://github.com/safalkunwar/Agrisense', role: 'Data Science' },
  ],
  openai: [
    { name: 'PTE — AI Testing Platform', description: 'GPT integration for essay scoring & feedback', github: 'https://github.com/safalkunwar/PTE', role: 'AI Scoring Engine' },
    { name: 'AgriSense Platform', description: 'AI-powered crop recommendations', github: 'https://github.com/safalkunwar/Agrisense', role: 'Agricultural Intelligence' },
  ],
  mongodb: [
    { name: 'AgriSense Platform', description: 'NoSQL database for farmer & crop data', github: 'https://github.com/safalkunwar/Agrisense', role: 'Primary Database' },
    { name: 'Office Management System', description: 'Student records & enrollment data', github: 'https://github.com/safalkunwar/office', role: 'Data Storage' },
  ],
  docker: [
    { name: 'V-TRACK GPS System', description: 'Containerized microservices deployment', github: 'https://github.com/safalkunwar/V-TRACK', role: 'Containerization' },
    { name: 'PTE — AI Testing Platform', description: 'Isolated AI model containers', github: 'https://github.com/safalkunwar/PTE', role: 'DevOps' },
  ],
  threejs: [
    { name: 'Portfolio Website', description: '3D hero scene with particle fields & rings', github: 'https://github.com/safalkunwar', role: '3D Visualization' },
  ],
  tensorflow: [
    { name: 'PTE — AI Testing Platform', description: 'Speech recognition & pronunciation scoring', github: 'https://github.com/safalkunwar/PTE', role: 'ML Framework' },
    { name: 'AgriSense Platform', description: 'Plant disease detection model', github: 'https://github.com/safalkunwar/Agrisense', role: 'Computer Vision' },
  ],
  aws: [
    { name: 'V-TRACK GPS System', description: 'Cloud infrastructure & S3 storage', github: 'https://github.com/safalkunwar/V-TRACK', role: 'Cloud Platform' },
    { name: 'PTE — AI Testing Platform', description: 'Scalable AI model hosting', github: 'https://github.com/safalkunwar/PTE', role: 'Cloud Infrastructure' },
  ],
};

// Tech icon definitions using devicon CDN
const techIcons: TechItem[] = [
  {
    name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61dafb', category: 'Frontend',
    projects: projectsData.react,
  },
  {
    name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#ffffff', category: 'Frontend',
    projects: projectsData.nextjs,
  },
  {
    name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178c6', category: 'Frontend',
    projects: projectsData.typescript,
  },
  {
    name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    color: '#2389C7', category: 'Frontend',
    projects: projectsData.threejs,
  },
  {
    name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#68a063', category: 'Backend',
    projects: projectsData.nodejs,
  },
  {
    name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    color: '#ffca28', category: 'Backend',
    projects: projectsData.firebase,
  },
  {
    name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: '#4db33d', category: 'Backend',
    projects: projectsData.mongodb,
  },
  {
    name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#4584b6', category: 'AI & ML',
    projects: projectsData.python,
  },
  {
    name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    color: '#FF6F00', category: 'AI & ML',
    projects: projectsData.tensorflow,
  },
  {
    name: 'OpenAI', icon: '', // SVG inline
    color: '#74aa9c', category: 'AI & ML',
    projects: projectsData.openai,
  },
  {
    name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ed', category: 'DevOps',
    projects: projectsData.docker,
  },
  {
    name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    color: '#FF9900', category: 'DevOps',
    projects: projectsData.aws,
  },
];

// Inline SVG for OpenAI (not in devicon)
function OpenAIIcon({ size = 36, color = '#74aa9c' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  );
}

// Project modal
function ProjectModal({
  tech,
  onClose,
}: {
  tech: TechItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {tech && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden"
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: 'rgba(15,20,50,0.97)',
                border: `1px solid ${tech.color}30`,
                boxShadow: `0 0 60px ${tech.color}20, 0 20px 60px rgba(0,0,0,0.6)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header gradient bar */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${tech.color}, transparent)` }}
              />

              {/* Modal header */}
              <div className="p-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${tech.color}15`, border: `1px solid ${tech.color}30` }}
                  >
                    {tech.name === 'OpenAI' ? (
                      <OpenAIIcon size={28} color={tech.color} />
                    ) : (
                      <img src={tech.icon} alt={tech.name} className="w-7 h-7 object-contain" />
                    )}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: tech.color, fontFamily: "'Outfit', sans-serif" }}
                    >
                      {tech.name}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">{tech.category}</span>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Project list */}
              <div className="px-6 pb-6 space-y-3">
                <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
                  Used in {tech.projects.length} project{tech.projects.length > 1 ? 's' : ''}
                </p>

                {tech.projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-4 rounded-xl group cursor-pointer transition-all duration-300"
                    style={{
                      background: `${tech.color}06`,
                      border: `1px solid ${tech.color}15`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${tech.color}12`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${tech.color}06`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}15`;
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {project.name}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-md"
                          style={{ background: `${tech.color}15`, color: tech.color }}
                        >
                          Role: {project.role}
                        </span>
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Single tech icon card
function TechIconCard({ tech, onClick }: { tech: TechItem; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center gap-2 p-4 rounded-2xl group transition-all duration-300 cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${tech.color}20`;
        (e.currentTarget as HTMLElement).style.background = `${tech.color}08`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      {/* Project count badge */}
      <div
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
        style={{ background: tech.color, color: '#0a0e27' }}
      >
        {tech.projects.length}
      </div>

      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center">
        {tech.name === 'OpenAI' ? (
          <OpenAIIcon size={36} color={tech.color} />
        ) : (
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-9 h-9 object-contain"
            style={{
              filter: tech.name === 'Next.js' ? 'invert(1)' : 'none',
            }}
          />
        )}
      </div>

      {/* Name */}
      <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
        {tech.name}
      </span>

      {/* "Click" hint */}
      <span
        className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity tracking-wider"
        style={{ color: tech.color }}
      >
        see projects
      </span>
    </motion.button>
  );
}

// Main export
const TechIconGrid: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  return (
    <>
      <div>
        <p className="text-xs font-mono text-muted-foreground tracking-[0.25em] uppercase text-center mb-6">
          ◈ Click any tech to see where it's used ◈
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {techIcons.map((tech, i) => (
            <TechIconCard
              key={i}
              tech={tech}
              onClick={() => setSelectedTech(tech)}
            />
          ))}
        </div>
      </div>

      {/* Modal portal */}
      <ProjectModal tech={selectedTech} onClose={() => setSelectedTech(null)} />
    </>
  );
};

export default TechIconGrid;
