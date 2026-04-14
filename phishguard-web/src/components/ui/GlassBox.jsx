import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const GlassBox = ({ children, className, animate = true, delay = 0, ...props }) => {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      initial={animate ? { opacity: 0, y: 30 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { duration: 1, delay, ease: [0.16, 1, 0.3, 1] } : undefined}
      className={twMerge(
        'glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group/glass',
        className
      )}
      {...props}
    >
      {/* SHINE EFFECT */}
      <div className="absolute top-0 left-0 right-0 h-[100%] w-[200%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-[100%] group-hover/glass:translate-x-[100%] transition-transform duration-[2000ms] pointer-events-none" />
      
      {/* TOP BORDER LIGHT */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none opacity-50" />
      
      {/* GLOW ENHANCEMENT */}
      <div className="absolute -inset-[1px] bg-gradient-to-tr from-white/5 to-transparent rounded-[2.5rem] pointer-events-none -z-10" />

      {children}
    </Component>
  );
};

export default GlassBox;
