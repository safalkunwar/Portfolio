import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink, MapPin, Calendar } from 'lucide-react';

/**
 * FooterSection Component
 *
 * Contact & social section with:
 * - Availability status indicator
 * - Location info
 * - Social links
 * - CTA email button
 * - Copyright row
 *
 * Design: Futuristic Dark Theme
 */
export const FooterSection: React.FC = () => {
  const socialLinks = [
    {
      Icon: Github,
      label: 'GitHub',
      url: 'https://github.com/safalkunwar',
      color: 'hover:text-sky-400 hover:border-sky-500/50',
    },
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/safalkunwar',
      color: 'hover:text-cyan-400 hover:border-cyan-400/50',
    },
    {
      Icon: Mail,
      label: 'Email',
      url: 'mailto:sawfallkunwar@gmail.com',
      color: 'hover:text-pink-400 hover:border-pink-500/50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section
      id="contact"
      className="relative w-full pt-24 pb-10 bg-background border-t border-border overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(35, 137, 199,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Status badge */}
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for new projects
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div className="text-center space-y-5 mb-12" variants={itemVariants}>
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="gradient-text">Let's Work Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I'm always open to new projects, collaborations, and exciting
            opportunities. Let's build something amazing.
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Nepal
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              GMT+5:45
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="flex justify-center mb-12" variants={itemVariants}>
          <motion.a
            href="mailto:sawfallkunwar@gmail.com"
            id="contact-cta-email"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-white font-semibold text-lg glow-primary hover:glow-primary-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex justify-center gap-4 mb-16" variants={containerVariants}>
          {socialLinks.map(({ Icon, label, url, color }) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-muted-foreground transition-all duration-300 text-sm ${color}`}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <Icon className="w-4 h-4" />
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom row */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} Safal Kunwar. All rights reserved.</p>
          <p className="font-mono">
            Built with React · Three.js · Framer Motion
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FooterSection;
