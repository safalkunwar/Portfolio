import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Zap } from 'lucide-react';

const timeline = [
  {
    year: '2024 – Present',
    role: 'Full-Stack Developer',
    place: 'Freelance & Open Source',
    icon: Briefcase,
    color: 'text-cyan-400',
    border: 'border-cyan-400/40',
    bg: 'bg-cyan-400/10',
    description:
      'Building AI-powered web applications, real-time tracking systems, and enterprise platforms for clients worldwide.',
  },
  {
    year: '2023',
    role: 'AI Integration Lead',
    place: 'PTE Practice Platform',
    icon: Zap,
    color: 'text-sky-400',
    border: 'border-sky-500/40',
    bg: 'bg-sky-500/10',
    description:
      'Architected and shipped an independent AI scoring system for English proficiency testing with real-time speech recognition.',
  },
  {
    year: '2022',
    role: 'Backend Engineer',
    place: 'V-TRACK GPS System',
    icon: Award,
    color: 'text-green-400',
    border: 'border-green-500/40',
    bg: 'bg-green-500/10',
    description:
      'Designed Firebase real-time data pipelines for live vehicle tracking, geofencing, and driver management dashboards.',
  },
  {
    year: '2020 – 2024',
    role: 'BSc Computer Science',
    place: 'University — Nepal',
    icon: GraduationCap,
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    description:
      'Graduated with distinction, focusing on distributed systems, machine learning, and modern web architectures.',
  },
];

/**
 * AboutSection — Personal bio + experience timeline.
 * Uses scroll-linked parallax for the accent blob.
 */
const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full py-24 bg-background border-t border-border overflow-hidden"
    >
      {/* Parallax accent blob */}
      <motion.div
        style={{ y: blobY }}
        className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-cyan-400/10 to-sky-500/5 blur-3xl" />
      </motion.div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(35, 137, 199,0.8) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Grid: bio left, timeline right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Bio */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
                About Me
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Turning ideas into{' '}
                <span className="gradient-text">digital reality</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-4">
                I'm a full-stack developer based in Nepal with a passion for
                building high-performance, visually stunning applications. I
                specialize in real-time systems, AI integration, and creating
                experiences that users love.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                When I'm not coding, you'll find me exploring emerging tech
                trends, contributing to open source, or experimenting with
                creative 3D visualizations and interactive web experiences.
              </p>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Projects Shipped', value: '10+' },
                { label: 'Technologies Used', value: '30+' },
                { label: 'GitHub Commits', value: '500+' },
                { label: 'Happy Clients', value: '8+' },
              ].map(({ label, value }) => (
                <motion.div
                  key={label}
                  className="p-4 rounded-xl bg-card border border-border hover:border-cyan-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-2xl font-bold text-cyan-400">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* CV Download */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400/40 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>📄</span>
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div className="relative" variants={itemVariants}>
            {/* Vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/40 via-sky-500/30 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="relative flex gap-5"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {/* Icon dot */}
                    <div className={`relative z-10 mt-1 w-10 h-10 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.year}
                        </span>
                      </div>
                      <h4
                        className={`text-base font-semibold ${item.color} mb-0.5`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {item.role}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.place}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
