import { motion } from 'framer-motion';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface CyberShieldProps {
  status: 'secure' | 'warning' | 'alert' | 'analyzing';
}

export default function CyberShield({ status }: CyberShieldProps) {
  const getColors = () => {
    switch (status) {
      case 'secure': return { primary: 'text-emerald-500', glow: 'bg-emerald-500/20' };
      case 'warning': return { primary: 'text-amber-500', glow: 'bg-amber-500/20' };
      case 'alert': return { primary: 'text-rose-500', glow: 'bg-rose-500/20' };
      default: return { primary: 'text-sky-500', glow: 'bg-sky-500/20' };
    }
  };

  const colors = getColors();

  return (
    <div className="relative flex items-center justify-center">
      {/* Background Rings */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className={`absolute w-32 h-32 rounded-full border border-white/5 ${colors.glow}`}
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-40 h-40 rounded-full border border-white/5"
      />

      {/* Main Shield Container */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 p-6 rounded-full bg-slate-900 border border-white/10 shadow-2xl"
      >
        {status === 'secure' && <ShieldCheck className={`w-12 h-12 ${colors.primary}`} />}
        {status === 'alert' && <ShieldAlert className={`w-12 h-12 ${colors.primary}`} />}
        {status === 'warning' && <ShieldAlert className={`w-12 h-12 ${colors.primary}`} />}
        {status === 'analyzing' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Shield className={`w-12 h-12 ${colors.primary} opacity-50`} />
          </motion.div>
        )}
      </motion.div>

      {/* Scan Lines for Analyzing state */}
      {status === 'analyzing' && (
        <motion.div 
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute w-24 h-[1px] bg-sky-500/50 blur-[2px] z-20"
        />
      )}
    </div>
  );
}
