import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import UserDashboardView from './dashboard/UserDashboardView';
import AdminDashboardView from './dashboard/AdminDashboardView';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('hub');
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            fetchHistory();
        } else {
            window.location.href = '/login';
        }
        
        // Simulate system boot-up for aesthetics
        const timer = setTimeout(() => setIsInitialLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/analysis/history', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (err) {
            console.error('Failed to fetch history:', err);
        }
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!url) return;

        setIsLoading(true);
        setResult(null);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/analysis/url', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ url })
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
                fetchHistory(); // Refresh history
            }
        } catch (err) {
            console.error('Analysis failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    if (isInitialLoading) {
        return (
            <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center space-y-8">
                <div className="h-16 w-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-[0_0_30px_rgba(99,102,241,0.2)]" />
                <div className="space-y-2 text-center">
                    <h2 className="text-white font-black tracking-[0.5em] uppercase text-xs italic">Authenticating Sentinel</h2>
                    <p className="text-indigo-400 text-[8px] font-bold uppercase tracking-widest animate-pulse">Initializing Neural Link...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans flex overflow-hidden selection:bg-indigo-500/30">
            {/* DYNAMIC SIDEBAR */}
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                user={user} 
                onLogout={handleLogout} 
            />

            {/* MAIN PORTAL AREA */}
            <main className="flex-1 overflow-y-auto no-scrollbar relative p-6 md:p-16">
                {/* AMBIENT BACKGROUND EFFECTS */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[200px]" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px]" />
                    <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* DYNAMIC HEADER */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                        <motion.div 
                            key={activeTab}
                            initial={{ opacity: 0, x: -30 }} 
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <Badge variant="success" className="px-3 py-1 font-black shadow-lg shadow-emerald-500/10">Neural Core Synced</Badge>
                                <span className="h-2 w-2 bg-slate-800 rounded-full" />
                                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
                                    Clearance: <span className="text-indigo-500">{user?.role}</span>
                                </p>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none text-gradient">
                                {activeTab === 'hub' ? 'Mission Control' : 
                                 activeTab === 'db' ? 'Threat Intel' :
                                 activeTab === 'stats' ? 'Analytics' :
                                 activeTab === 'global' ? 'Global Feed' : 
                                 activeTab === 'admin' ? 'Sentinel Admin' : 'Protocols'}
                            </h1>
                        </motion.div>

                        <div className="flex gap-4">
                            <HeaderStat label="Neural Latency" value="14ms" trend="LOW" />
                            <HeaderStat label="System Flux" value="Optimal" trend="SYNC" />
                        </div>
                    </header>

                    {/* VIEW SWITCHER */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: -10 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                        >
                            {activeTab === 'hub' && (
                                <UserDashboardView 
                                    url={url} setUrl={setUrl} 
                                    isLoading={isLoading} 
                                    handleAnalyze={handleAnalyze} 
                                    result={result} setResult={setResult}
                                    history={history}
                                    setActiveTab={setActiveTab}
                                />
                            )}
                            {(activeTab === 'db' || activeTab === 'stats' || activeTab === 'global' || activeTab === 'admin') && user?.role === 'ADMIN' && (
                                <AdminDashboardView 
                                    history={history} 
                                    fetchHistory={fetchHistory}
                                    activeTab={activeTab}
                                />
                            )}
                            {activeTab === 'db' && user?.role === 'USER' && (
                                <div className="py-20 text-center glass-card rounded-3xl">
                                   <p className="text-indigo-500 text-xs font-black uppercase tracking-[0.5em]">Historical logs shared above</p>
                                </div>
                            )}
                            {/* FALLBACKS FOR EMPTY TABS OR ACCESS DENIED */}
                            {(activeTab === 'admin' || activeTab === 'global') && user?.role !== 'ADMIN' && (
                                <div className="h-[400px] flex flex-col items-center justify-center glass-card rounded-[3rem] p-12 border-red-500/20">
                                    <div className="bg-red-500/10 p-6 rounded-3xl text-red-500 mb-6">
                                        <ShieldAlert size={48} />
                                    </div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Access Denied</h2>
                                    <p className="text-slate-600 text-xs font-black uppercase tracking-widest">Unauthorized Access to Sentinel Terminal</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

const HeaderStat = ({ label, value, trend }) => (
    <div className="glass-card border-white/5 p-6 min-w-[140px] hover:border-indigo-500/20 transition-all">
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1.5">{label}</p>
        <div className="flex items-baseline justify-between gap-4">
            <span className="text-xl font-black text-white tracking-widest">{value}</span>
            <span className="text-[8px] font-black text-indigo-500 tracking-widest">{trend}</span>
        </div>
    </div>
);

export default Dashboard;
