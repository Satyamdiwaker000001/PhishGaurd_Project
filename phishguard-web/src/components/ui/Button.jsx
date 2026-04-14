import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, variant = 'primary', size = 'md', isLoading = false, ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.5)] border border-indigo-500/50',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md',
    outline: 'bg-transparent text-white border border-white/20 hover:border-indigo-500/50 hover:text-indigo-400',
    ghost: 'bg-transparent text-slate-500 hover:text-white',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white shadow-[0_4px_15px_rgba(239,68,68,0.1)]',
    white: 'bg-white text-black hover:bg-slate-200 shadow-xl'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-7 py-3.5 text-xs',
    lg: 'px-12 py-5 text-sm',
    xl: 'px-14 py-6 text-base'
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(
        'rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
};

export default Button;
