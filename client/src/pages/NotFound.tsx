import { motion } from 'framer-motion';
import { Home, Frown } from 'lucide-react';
import { useLocation } from 'wouter';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-400/10 to-sky-500/5 blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(35, 137, 199,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <motion.div
        className="relative z-10 text-center px-4 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* 404 glitch number */}
        <motion.div
          className="text-[9rem] font-extrabold leading-none gradient-text select-none"
          style={{ fontFamily: "'Outfit', sans-serif" }}
          animate={{ opacity: [1, 0.85, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.div>

        <motion.div
          className="flex justify-center mb-6 -mt-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
            <Frown className="w-8 h-8 text-cyan-400" />
          </div>
        </motion.div>

        <h1
          className="text-3xl font-bold text-foreground mb-3"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Looks like this page drifted into deep space. Let's get you back to the portfolio.
        </p>

        <motion.button
          id="not-found-go-home"
          onClick={() => setLocation('/')}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-white font-semibold glow-primary hover:glow-primary-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Home className="w-4 h-4" />
          Back to Portfolio
        </motion.button>
      </motion.div>
    </div>
  );
}
