import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import GlassBox from '../components/ui/GlassBox';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Invalid recovery link. Access denied.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Ciphers do not match. Synchronization failed.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Reset failed');
            }

            setIsSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen w-full flex items-center justify-center px-6 relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/5 blur-[120px]" />
                <div className="absolute inset-0 grid-pattern opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <GlassBox className="p-10 backdrop-blur-3xl border-white/5" animate={true}>
                    <div className="text-center mb-10">
                        <div className="bg-indigo-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
                            {isSuccess ? <CheckCircle2 size={32} className="text-emerald-400" /> : <Key size={32} className="text-indigo-400" />}
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                            {isSuccess ? 'Cipher Synced' : 'Reset Cipher'}
                        </h2>
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">
                            Neural Recovery Protocol Active
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                                <Badge variant="danger" className="w-full justify-center py-3">
                                    <AlertCircle size={14} className="mr-2" /> {error}
                                </Badge>
                            </motion.div>
                        )}
                        {isSuccess && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                                <Badge variant="success" className="w-full justify-center py-3">
                                    Cipher successfully updated. Redirecting...
                                </Badge>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isSuccess && token && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Input 
                                    label="New Security Cipher"
                                    icon={Lock}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[38px] text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <Input 
                                label="Confirm Cipher"
                                icon={Lock}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <Button type="submit" isLoading={isLoading} className="w-full mt-8">
                                Re-sync Identity
                            </Button>
                        </form>
                    )}
                </GlassBox>
            </div>
        </div>
    );
};

export default ResetPassword;
