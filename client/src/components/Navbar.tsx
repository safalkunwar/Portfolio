import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Navbar Component
 *
 * Sticky top navigation with:
 * - Glassmorphism frosted background on scroll
 * - Active section highlight
 * - Mobile hamburger menu
 * - Smooth scroll to sections
 *
 * Design: Futuristic Dark Theme
 */
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: scrolled
          ? 'rgba(10, 14, 39, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(35, 137, 199, 0.1)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollTo('#hero')}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-lg font-bold gradient-text"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            SK
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                  isActive
                    ? 'text-cyan-400'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-cyan-400/10 border border-cyan-400/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo('#contact')}
        >
          Hire Me
        </motion.button>

        {/* Mobile menu toggle */}
        <motion.button
          className="md:hidden p-2 text-muted-foreground hover:text-cyan-400 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-border"
            style={{ background: 'rgba(10, 14, 39, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 text-sm font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
