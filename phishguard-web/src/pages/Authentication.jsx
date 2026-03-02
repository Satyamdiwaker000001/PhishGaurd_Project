import React, { useState, useEffect } from 'react'; // FIXED: Added missing imports
import { Shield, Lock, Mail, User, ArrowRight, Eye, EyeOff, Loader2, LogIn, UserPlus } from 'lucide-react';

const Authentication = ({ isLoginMode }) => {
    // FIXED: isLogin is now used in the UI to toggle headings/buttons
    const [isLogin, setIsLogin] = useState(isLoginMode);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // FIXED: useEffect is now defined via import
    useEffect(() => {
        setIsLogin(isLoginMode);
    }, [isLoginMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="bg-[#050505] min-h-screen w-full text-slate-300 font-sans no-scrollbar relative flex items-center justify-center px-6">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,transparent_50%)] pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-700">
                <div className="p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <div className="bg-[#0A0A0B]/90 rounded-[1.4rem] p-8 md:p-10">
                        <div className="text-center mb-10">
                            {/* FIXED: Using isLogin variable here */}
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Shield'}
                            </h2>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                {isLogin ? 'Authorization Required' : 'Initialize Identity'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="relative flex items-center">
                                    <User className="absolute left-4 text-slate-600" size={16} />
                                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs outline-none focus:border-indigo-500/50 transition-all text-white" />
                                </div>
                            )}

                            <div className="relative flex items-center">
                                <Mail className="absolute left-4 text-slate-600" size={16} />
                                <input type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs outline-none focus:border-indigo-500/50 transition-all text-white font-mono" />
                            </div>

                            <div className="relative flex items-center">
                                <Lock className="absolute left-4 text-slate-600" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-xs outline-none focus:border-indigo-500/50 transition-all text-white font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-slate-600 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={16} />
                                ) : (
                                    <>
                                        {isLogin ? <LogIn size={14} /> : <UserPlus size={14} />}
                                        {isLogin ? 'Authorize Access' : 'Initialize Account'}
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center mt-8 text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                            {isLogin ? "New to PhishGuard?" : "Already verified?"}
                            <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-white hover:text-indigo-400">
                                {isLogin ? 'Create Account' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication; // FIXED: Fast Refresh works with default export