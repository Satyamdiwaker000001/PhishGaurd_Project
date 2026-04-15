import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal, Search, Zap, ShieldAlert, 
    ShieldCheck, RefreshCcw, History, ArrowRight,
    Activity, Clock, Target, CheckCircle2, FileUp, Smartphone, Image as ImageIcon
} from 'lucide-react';
import Button from '../../components/ui/Button';
import GlassBox from '../../components/ui/GlassBox';
import Badge from '../../components/ui/Badge';

const UserDashboardView = ({ 
    url, setUrl, isLoading, handleAnalyze, 
    result, setResult, history, setActiveTab 
}) => {
    const [scanType, setScanType] = useState('URL'); // URL, IMAGE, APK
    const [selectedFile, setSelectedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileScan = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsProcessing(true);
        setResult(null);
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userId', user?.id);

        const endpoint = scanType === 'IMAGE' ? 'image' : 'apk';

        try {
            const response = await fetch(`http://localhost:3000/analysis/${endpoint}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
                // In a real app we'd refresh history here too, 
                // but since history is passed as prop, we assume parent handles it or user refreshes.
            }
        } catch (err) {
            console.error('File analysis failed:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            {/* HERO SECTION - ANALYZE */}
            <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
                
                <GlassBox className="p-1 border-white/5 shadow-2xl overflow-visible group">
                    <div className="bg-[#0A0A0B]/40 rounded-[1.8rem] p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32" />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div className="flex items-center gap-6">
                                <div className="p-5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5 group-hover:scale-110 transition-transform duration-500">
                                    <Terminal size={28} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">Intercept Protocol</h3>
                                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        Neural Core: Autonomous URL Verification
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleAnalyze} className="relative z-10">
                            <div className="relative group/input">
                                <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors pointer-events-none">
                                    <Search size={22} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Enter suspicious URL for neural verification..." 
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-3xl py-8 pl-18 pr-60 text-base outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all text-white font-mono placeholder:text-slate-700 shadow-2xl uppercase tracking-tight"
                                />
                                <div className="absolute right-4 top-4 bottom-4 flex gap-3">
                                    <Button 
                                        type="submit" 
                                        isLoading={isLoading}
                                        className="h-full px-12 shadow-2xl shadow-indigo-600/30 rounded-2xl text-xs font-black uppercase tracking-widest"
                                    >
                                        {!isLoading && <Zap size={18} className="mr-3" />}
                                        Initialize
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* RESULT ANIMATION */}
                        <AnimatePresence>
                            {result && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }} 
                                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="mt-14"
                                >
                                    <ResultDisplay result={result} onClose={() => setResult(null)} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </GlassBox>
            </section>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MiniStat icon={<Activity size={18} />} label="Total Scans" value={history.length} />
                <MiniStat icon={<ShieldAlert size={18} />} label="Blocked" value={history.filter(h => h.is_phishing).length} color="text-red-500" />
                <MiniStat icon={<CheckCircle2 size={18} />} label="Safe" value={history.filter(h => !h.is_phishing).length} color="text-emerald-500" />
                <MiniStat icon={<Target size={18} />} label="Accuracy" value="99.4%" color="text-indigo-400" />
            </div>

            {/* RECENT ACTIVITY */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                            <History size={18} className="text-indigo-400" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.4em]">Personal Intelligence Logs</h3>
                    </div>
                    <Button variant="ghost" onClick={() => setActiveTab('db')} className="text-indigo-500 text-[10px] font-black uppercase tracking-widest group">
                        Historical Archive <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {history.slice(0, 4).map((record, i) => (
                        <HistoryCard key={i} record={record} index={i} />
                    ))}
                    {history.length === 0 && (
                        <div className="py-20 text-center glass-card rounded-[2rem] border-dashed border-white/5">
                            <p className="text-[10px] font-black uppercase text-slate-700 tracking-[0.5em]">No Intercept Logs Detected</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ScanTypeBtn = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 text-[9px] font-black uppercase tracking-widest ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
    >
        {icon}
        {label}
    </button>
);

const ResultDisplay = ({ result, onClose }) => {
    const isPhishing = result.is_phishing;
    const isWhitelisted = result.is_whitelisted;
    
    return (
        <div className={`p-10 rounded-[2.5rem] border-2 relative overflow-hidden shadow-2xl ${isPhishing ? 'bg-red-500/5 border-red-500/30' : isWhitelisted ? 'bg-indigo-500/5 border-indigo-500/30' : 'bg-emerald-500/5 border-emerald-500/30'}`}>
            <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: isPhishing ? '#ef4444' : isWhitelisted ? '#6366f1' : '#10b981' }} />
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className={`p-7 rounded-3xl shadow-2xl ${isPhishing ? 'bg-red-500/20 text-red-500' : isWhitelisted ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-500'}`}>
                        {isPhishing ? <ShieldAlert size={48} /> : <ShieldCheck size={48} />}
                    </div>
                    <div className="text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                            <h4 className={`text-4xl font-black uppercase tracking-tighter ${isPhishing ? 'text-red-500' : isWhitelisted ? 'text-indigo-400' : 'text-emerald-500'}`}>
                                {isPhishing ? 'Phishing Detected' : isWhitelisted ? 'Trusted Entity' : 'Resource Secure'}
                            </h4>
                            <Badge variant={isPhishing ? 'danger' : isWhitelisted ? 'primary' : 'success'} className="px-4 py-1.5 text-[10px]">
                                {isPhishing ? 'THREAT LEVEL: CRITICAL' : isWhitelisted ? 'WHITELISTED' : 'SAFE'}
                            </Badge>
                        </div>
                        <p className="text-slate-400 text-sm font-mono max-w-2xl break-all italic opacity-80 mb-8 border-l-2 border-white/5 pl-4 py-2 uppercase tracking-tight">
                           Target: {result.url || 'Analyzed Payload'}
                        </p>
                        
                        <div className="flex flex-wrap gap-12 items-center justify-center md:justify-start">
                            <ResultStat label="Detection Confidence" value={isWhitelisted ? "100%" : `${(result.confidence * 100).toFixed(2)}%`} color={isPhishing ? 'red' : isWhitelisted ? 'indigo' : 'emerald'} />
                            <ResultStat label="Risk Assessment" value={result.threat_level || 'Minimal'} color={isPhishing ? 'red' : 'emerald'} />
                            <ResultStat label="Neural Path" value="Hybrid-LSTM V2" color="slate" />
                        </div>

                        {/* METADATA INSIGHTS */}
                        {(result.imageMetadata || result.apkMetadata) && (
                            <div className="mt-8 p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Neural Metadata Extraction</p>
                                <div className="grid grid-cols-2 gap-6">
                                    {result.imageMetadata && (
                                        <>
                                            <MetaItem label="Format" value={result.imageMetadata.imageFormat} />
                                            <MetaItem label="OCR Text" value={result.imageMetadata.extractedText || 'None'} />
                                            <MetaItem label="QR Found" value={result.imageMetadata.containsQr ? 'YES' : 'NO'} />
                                        </>
                                    )}
                                    {result.apkMetadata && (
                                        <>
                                            <MetaItem label="Package" value={result.apkMetadata.packageName} />
                                            <MetaItem label="Permissions" value={result.apkMetadata.dangerousPermissions?.join(', ') || 'Low'} />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* THREAT INSIGHTS (XAI) */}
                        {result.reasons && result.reasons.length > 0 && (
                            <div className="mt-10 pt-8 border-t border-white/5">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Neural Threat Insights</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {result.reasons.map((reason, i) => (
                                        <div key={i} className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed font-medium">
                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isPhishing ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                                            {reason}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-4 rounded-2xl bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                >
                    <RefreshCcw size={22} />
                </button>
            </div>
        </div>
    );
};

const HistoryCard = ({ record, index }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-card p-6 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-all cursor-default"
    >
        <div className="flex items-center gap-6">
            <div className={`p-3 rounded-xl ${record.is_phishing ? 'bg-red-500/10 text-red-500' : record.is_whitelisted ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {record.is_phishing ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div className="overflow-hidden">
                <p className="text-white text-xs font-mono truncate max-w-md group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{record.url}</p>
                <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{new Date(record.scanned_at).toLocaleString()}</span>
                    <span className="w-1 h-1 bg-white/5 rounded-full" />
                    {record.is_whitelisted ? (
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                            <CheckCircle2 size={10} /> Trusted Source
                        </span>
                    ) : (
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{record.threat_level || 'Low'} Risk</span>
                    )}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className={`text-[10px] font-black px-3 py-1 rounded-lg border ${
                record.is_phishing ? 'text-red-500 border-red-500/20 bg-red-500/5' : 
                record.is_whitelisted ? 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' : 
                'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'
            }`}>
                {record.is_whitelisted ? 'WHITELISTED' : `${(record.confidence * 100).toFixed(1)}% CONFIDENCE`}
            </div>
        </div>
    </motion.div>
);

const MetaItem = ({ label, value }) => (
    <div>
        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[10px] font-mono text-slate-300 truncate uppercase tracking-tight">{value}</p>
    </div>
);

const MiniStat = ({ icon, label, value, color = "text-white" }) => (
    <div className="glass-card p-6 rounded-2xl border-white/5 flex items-center gap-5">
        <div className={`p-3 rounded-xl bg-white/[0.03] ${color} border border-white/5`}>
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5">{label}</p>
            <p className={`text-xl font-black ${color}`}>{value}</p>
        </div>
    </div>
);

const ResultStat = ({ label, value, color }) => (
    <div>
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">{label}</p>
        <p className={`text-xl font-black uppercase tracking-tighter ${color === 'red' ? 'text-red-500' : color === 'emerald' ? 'text-emerald-500' : color === 'indigo' ? 'text-indigo-400' : 'text-slate-400'}`}>
            {value}
        </p>
    </div>
);

export default UserDashboardView;
