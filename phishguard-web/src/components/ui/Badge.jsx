import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, variant = 'neutral', className, ...props }) => {
  const variants = {
    neutral: 'bg-white/5 border-white/10 text-slate-500 shadow-sm',
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    danger: 'bg-red-500/10 border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]',
    primary: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
  };

  return (
    <span
      className={twMerge(
        'px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all duration-300 backdrop-blur-md',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
