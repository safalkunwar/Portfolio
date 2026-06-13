import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Award, BookOpen, Briefcase, HardHat, Lightbulb } from 'lucide-react';

/**
 * JourneySection — Full life & career showcase with:
 * 1. Credential cards (teaching, civil engineering, UGC training, Manus cert)
 * 2. Photo gallery with lightbox — real user photos
 * 3. Certificate display with glow effect
 *
 * Design: Premium glassmorphism + parallax
 */

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const credentials = [
  {
    icon: BookOpen,
    title: 'PTE English Teaching',
    subtitle: '2+ Years Teaching Experience',
    date: '2022 – Present',
    description: 'Taught PTE (Pearson Test of English) to hundreds of students. Certified by IDP IELTS Train the Trainer Workshop under expert Andrew Steele. Helped students achieve their dream scores.',
    color: '#2389C7',
    glow: 'rgba(35, 137, 199,0.25)',
    badge: 'Educator',
    badgeBg: 'rgba(35, 137, 199,0.1)',
  },
  {
    icon: HardHat,
    title: 'Sub-Engineering — Civil',
    subtitle: 'Diploma in Civil Engineering',
    date: 'Completed',
    description: 'Completed a Sub-Engineering degree in Civil Engineering, building strong foundations in structural analysis, construction management, and technical drawing — complementing my tech career.',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.25)',
    badge: 'Engineering',
    badgeBg: 'rgba(249,115,22,0.1)',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurship Training',
    subtitle: '6-Month UGC Program',
    date: '2023',
    description: 'Completed a 6-month intensive Entrepreneurship Training Program provided by UGC (University Grants Commission). Gained skills in business ideation, market validation, and startup pitch — demonstrated at Gandaki University.',
    color: '#3ABAF2',
    glow: 'rgba(58, 186, 242,0.25)',
    badge: 'Entrepreneur',
    badgeBg: 'rgba(58, 186, 242,0.1)',
  },
  {
    icon: Award,
    title: 'Manus Advanced Certificate',
    subtitle: 'AI Workflow Mastery',
    date: 'May 3, 2026',
    description: 'Earned the Manus Advanced Certificate — the highest certification from Manus Academy — for mastering AI-powered workflow design, automation, and business execution strategies.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
    badge: 'AI Certified',
    badgeBg: 'rgba(16,185,129,0.1)',
    certLink: 'https://academy.manus.im/certificate/manus-advanced-certificate-f7479f52-930e-4192-8798-7079f3a2604d',
    certImage: 'https://campus.buildclub.ai/api/certificate/f7479f52-930e-4192-8798-7079f3a2604d',
  },
];

// User's real photos
const photos = [
  {
    src: '/photos/presentation.jpg',
    fallback: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    caption: 'Presenting at Gandaki University — UGC Entrepreneurship Program',
    tag: 'Entrepreneur',
    tagColor: '#3ABAF2',
  },
  {
    src: '/photos/teaching.jpg',
    fallback: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
    caption: 'Speaking & Teaching Engagement',
    tag: 'Speaker',
    tagColor: '#2389C7',
  },
  {
    src: '/photos/ielts.jpg',
    fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
    caption: 'Receiving IDP IELTS Train the Trainer Certificate from Andrew Steele',
    tag: 'Certified Educator',
    tagColor: '#ef4444',
  },
  {
    src: '/photos/hackathon.jpg',
    fallback: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    caption: 'Receiving Award at कृषि हयाकथन (Agricultural Hackathon) — Pokhara Research Centre',
    tag: 'Award Winner',
    tagColor: '#10b981',
  },
];

// ──────────────────────────────────────────────
// COMPONENTS
// ──────────────────────────────────────────────

// Credential card
function CredentialCard({
  cred,
  index,
}: {
  cred: (typeof credentials)[0];
  index: number;
}) {
  const Icon = cred.icon;
  const [showCert, setShowCert] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.02, y: -3 }}
        className="relative p-6 rounded-2xl overflow-hidden group cursor-default"
        style={{
          background: 'rgba(26,31,58,0.7)',
          border: `1px solid ${cred.color}20`,
          backdropFilter: 'blur(12px)',
          boxShadow: `0 4px 30px rgba(0,0,0,0.3)`,
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${cred.glow}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        }}
      >
        {/* BG gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${cred.color}08, transparent 70%)` }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${cred.color}60, transparent)` }}
        />

        <div className="flex items-start gap-4 mb-4 relative z-10">
          {/* Icon */}
          <div
            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: cred.badgeBg, border: `1px solid ${cred.color}30` }}
          >
            <Icon className="w-6 h-6" style={{ color: cred.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <h3
                className="text-base font-bold"
                style={{ color: cred.color, fontFamily: "'Outfit', sans-serif" }}
              >
                {cred.title}
              </h3>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: cred.badgeBg, color: cred.color, border: `1px solid ${cred.color}30` }}
              >
                {cred.badge}
              </span>
            </div>
            <p className="text-xs font-medium text-muted-foreground">{cred.subtitle}</p>
            <p className="text-xs font-mono text-muted-foreground/60 mt-0.5">{cred.date}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed relative z-10 mb-4">
          {cred.description}
        </p>

        {/* View Certificate button */}
        {cred.certLink && (
          <div className="flex gap-3 relative z-10">
            <motion.button
              onClick={() => setShowCert(true)}
              className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `${cred.color}10`,
                border: `1px solid ${cred.color}30`,
                color: cred.color,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award className="w-3.5 h-3.5" />
              View Certificate
            </motion.button>
            <motion.a
              href={cred.certLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink className="w-3 h-3" />
              Verify
            </motion.a>
          </div>
        )}
      </motion.div>

      {/* Certificate lightbox */}
      <AnimatePresence>
        {showCert && cred.certImage && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCert(false)}
            />
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative max-w-4xl w-full pointer-events-auto"
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="absolute -top-10 right-0 p-2 text-white/70 hover:text-white cursor-pointer"
                  onClick={() => setShowCert(false)}
                  whileHover={{ scale: 1.1 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <div
                  className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl"
                  style={{
                    boxShadow: `0 0 80px ${cred.color}40, 0 40px 80px rgba(0,0,0,0.8)`,
                    border: `2px solid ${cred.color}40`,
                  }}
                >
                  <img
                    src={cred.certImage}
                    alt="Manus Advanced Certificate — Safal Kunwar"
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </div>
                <p className="text-center text-sm text-white/60 mt-4 font-mono">
                  Manus Advanced Certificate · Completed May 3, 2026 · SAFAL KUNWAR
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Photo gallery with lightbox
function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleError = (i: number) => setImgErrors((prev) => ({ ...prev, [i]: true }));

  const getSrc = (photo: (typeof photos)[0], i: number) =>
    imgErrors[i] ? photo.fallback : photo.src;

  const next = () => setSelected((s) => (s !== null ? (s + 1) % photos.length : null));
  const prev = () => setSelected((s) => (s !== null ? (s - 1 + photos.length) % photos.length : null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected]);

  return (
    <>
      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className={`relative rounded-xl overflow-hidden cursor-pointer group ${
              i === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
            style={{
              aspectRatio: i === 0 ? '1/1' : '4/3',
              border: `1px solid rgba(255,255,255,0.06)`,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelected(i)}
          >
            <img
              src={getSrc(photo, i)}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => handleError(i)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Tag */}
            <div
              className="absolute top-3 left-3 text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                background: `${photo.tagColor}20`,
                border: `1px solid ${photo.tagColor}40`,
                color: photo.tagColor,
                backdropFilter: 'blur(8px)',
              }}
            >
              {photo.tag}
            </div>

            {/* Caption on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-white/90 font-medium leading-tight">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close */}
              <motion.button
                className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all z-[110] pointer-events-auto cursor-pointer"
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.1 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Prev */}
              <motion.button
                className="absolute left-4 md:left-8 p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all z-[110] pointer-events-auto cursor-pointer"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                whileHover={{ scale: 1.1 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Next */}
              <motion.button
                className="absolute right-4 md:right-8 p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all z-[110] pointer-events-auto cursor-pointer"
                onClick={(e) => { e.stopPropagation(); next(); }}
                whileHover={{ scale: 1.1 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  className="max-w-3xl w-full pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="rounded-2xl overflow-hidden mb-4"
                    style={{
                      boxShadow: `0 0 60px ${photos[selected].tagColor}20, 0 20px 60px rgba(0,0,0,0.8)`,
                      border: `1px solid ${photos[selected].tagColor}30`,
                    }}
                  >
                    <img
                      src={getSrc(photos[selected], selected)}
                      alt={photos[selected].caption}
                      className="w-full object-contain max-h-[70vh]"
                      onError={() => handleError(selected)}
                    />
                  </div>
                  <div className="text-center">
                    <span
                      className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-2"
                      style={{
                        background: `${photos[selected].tagColor}15`,
                        color: photos[selected].tagColor,
                        border: `1px solid ${photos[selected].tagColor}30`,
                      }}
                    >
                      {photos[selected].tag}
                    </span>
                    <p className="text-sm text-white/80 mt-1">{photos[selected].caption}</p>
                    <p className="text-xs text-white/40 mt-1 font-mono">
                      {selected + 1} / {photos.length}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ──────────────────────────────────────────────
// MAIN SECTION
// ──────────────────────────────────────────────

const JourneySection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="journey"
      ref={ref}
      className="relative w-full py-24 bg-background border-t border-border overflow-hidden"
    >
      {/* Background blobs */}
      <motion.div
        style={{ y: blobY }}
        className="absolute -right-20 top-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-emerald-500/20 to-cyan-400/10 blur-3xl" />
      </motion.div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      {/* Grid dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(35, 137, 199,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase">
            ◈ Beyond Code ◈
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From civil engineering to AI — a multidisciplinary journey spanning teaching,
            entrepreneurship, and cutting-edge technology
          </p>
        </motion.div>

        {/* ─── Credential Cards Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {credentials.map((cred, i) => (
            <CredentialCard key={i} cred={cred} index={i} />
          ))}
        </div>

        {/* ─── Photo Gallery ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-sky-400 tracking-[0.3em] uppercase">
              ◈ In Action ◈
            </span>
            <h3
              className="text-3xl md:text-4xl font-bold mt-3 mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="gradient-text">Moments That Shaped Me</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Click any photo to explore · use arrow keys to navigate
            </p>
          </div>
          <PhotoGallery />
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
