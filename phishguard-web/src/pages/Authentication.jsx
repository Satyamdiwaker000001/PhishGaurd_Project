import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, User, Eye, EyeOff, LogIn, UserPlus, ShieldPlus, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import GlassBox from '../components/ui/GlassBox';

const Authentication = ({ isLoginMode }) => {
    const [isLogin, setIsLogin] = useState(isLoginMode);
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setIsLogin(isLoginMode);
        setIsForgotMode(false);
        setError('');
    }, [isLoginMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        let endpoint = isLogin ? '/auth/login' : '/auth/register';
        if (isForgotMode) endpoint = '/auth/forgot-password';

        const payload = isForgotMode 
            ? { email }
            : isLogin 
                ? { email, password } 
                : { email, password, name };

        try {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            if (isForgotMode) {
                setError('Recovery pulse dispatched. Check terminal logs.');
                setIsForgotMode(false);
                setIsLogin(true);
            } else if (isLogin) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/dashboard';
            } else {
                setIsLogin(true);
                setError('Account initialized. Please authorize access.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen w-full text-slate-300 font-sans flex items-center justify-center px-6 relative overflow-hidden">
            {/* BACKGROUND EFFECTS */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/5 blur-[120px]" />
                <div className="absolute inset-0 grid-pattern opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <GlassBox className="p-10 backdrop-blur-3xl border-white/5 border-t-white/10" animate={true}>
                    <div className="text-center mb-12">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-indigo-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.15)]"
                        >
                            {isForgotMode ? <Lock size={32} className="text-indigo-400" /> : isLogin ? <Shield size={32} className="text-indigo-400" /> : <ShieldPlus size={32} className="text-indigo-400" />}
                        </motion.div>
                        
                        <AnimatePresence mode="wait">
                            <motion.h2 
                                key={isForgotMode ? 'forgot' : isLogin ? 'login' : 'signup'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-3xl font-black text-white tracking-tighter uppercase mb-2"
                            >
                                {isForgotMode ? 'Recover Access' : isLogin ? 'Access Portal' : 'Register Node'}
                            </motion.h2>
                        </AnimatePresence>
                        
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                           <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" /> Authentication Service v2.4
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-8"
                            >
                                <Badge variant={error.includes('initialized') || error.includes('dispatched') ? 'success' : 'danger'} className="w-full justify-center py-3 px-4 flex items-center gap-2">
                                   <div className={`w-1 h-1 ${error.includes('initialized') || error.includes('dispatched') ? 'bg-emerald-400' : 'bg-red-400'} rounded-full animate-ping`} /> {error}
                                </Badge>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="popLayout">
                            {!isLogin && !isForgotMode && (
                                <motion.div
                                    key="name-field"
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    className="overflow-hidden"
                                >
                                    <Input 
                                        label="Agent Name"
                                        icon={User}
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Input 
                            label="Identity Endpoint"
                            icon={Mail}
                            type="email"
                            placeholder="agent@phishguard.protocol"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {!isForgotMode && (
                            <div className="relative">
                                <Input 
                                    label="Security Cipher"
                                    icon={Lock}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[38px] text-slate-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                                
                                {isLogin && (
                                    <div className="flex justify-end mt-2">
                                        <button 
                                            type="button"
                                            onClick={() => { setIsForgotMode(true); setError(''); }}
                                            className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-400 transition-colors"
                                        >
                                            Forgot Cipher?
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            isLoading={isLoading} 
                            className="w-full mt-10 shadow-[0_10px_40px_rgba(79,70,229,0.2)]"
                        >
                            {isForgotMode ? <RefreshCw size={16} className="mr-2" /> : isLogin ? <LogIn size={16} className="mr-2" /> : <UserPlus size={16} className="mr-2" />}
                            {isForgotMode ? 'Dispatch Recovery' : isLogin ? 'Validate Credentials' : 'Initialize Protocol'}
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                            {isForgotMode ? "Remembered your cipher?" : isLogin ? "Unregistered Identity?" : "Cipher already established?"}
                            <button 
                                onClick={() => { 
                                    if (isForgotMode) {
                                        setIsForgotMode(false);
                                    } else {
                                        setIsLogin(!isLogin);
                                    }
                                    setError(''); 
                                }}
                                className="ml-3 text-white hover:text-indigo-400 font-black transition-colors"
                            >
                                {isForgotMode ? 'Sign In Now' : isLogin ? 'Request Access' : 'Sign In Now'}
                            </button>
                        </p>
                    </div>
                </GlassBox>

                {/* FOOTER TEXT */}
                <p className="mt-12 text-center text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] leading-loose">
                    Unauthorized access to this terminal is strictly <br /> monitored and reported to global authorities.
                </p>
            </div>
        </div>
    );
};

export default Authentication;