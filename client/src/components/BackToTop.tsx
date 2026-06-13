import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * BackToTop — Floating button that appears when scrolled > 400px.
 * Smooth-scrolls back to the top on click.
 */
const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          id="back-to-top"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl bg-card border border-cyan-400/40 text-cyan-400 flex items-center justify-center shadow-lg hover:bg-cyan-400/10 hover:border-cyan-400/70 transition-all duration-300"
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(35, 137, 199,0.3)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
