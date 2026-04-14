import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, icon: Icon, className, error, ...props }) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {Icon && (
          <div className="absolute left-4 text-slate-600 group-focus-within:text-indigo-500 transition-colors">
            <Icon size={16} />
          </div>
        )}
        <input
          className={twMerge(
            'w-full bg-white/5 border border-white/10 rounded-xl py-4 pr-4 text-xs outline-none transition-all text-white placeholder:text-slate-700 font-mono',
            Icon ? 'pl-12' : 'pl-4',
            error ? 'border-red-500/50 focus:border-red-500' : 'focus:border-indigo-500/50',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 ml-1 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
