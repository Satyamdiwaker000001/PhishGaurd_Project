import { useState, useEffect } from 'react'
import { Database, Activity, Shield, Info, ArrowUpRight, Cpu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CyberShield from './components/CyberShield'
import './index.css'

const BACKEND_URL = 'http://localhost:3000/analysis/url';

function App() {
  const [phishingProb, setPhishingProb] = useState<number | null>(null);
  const [domain, setDomain] = useState('Sentinel initialized');
  const [loading, setLoading] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    analyzeCurrentTab();
  }, []);

  const analyzeCurrentTab = async () => {
    if (typeof chrome === 'undefined' || !chrome.tabs) {
      setTimeout(() => {
        setDomain('sandbox.phishguard.tech');
        setPhishingProb(12);
        setReasons(['Verified server identity', 'TLS handshake successful', 'Domain age > 5 years']);
        setLoading(false);
      }, 1200);
      return;
    }

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    
    if (!tab || !tab.url || tab.url.startsWith('chrome://')) {
      setDomain('Browser Core');
      setPhishingProb(0);
      setLoading(false);
      return;
    }

    try {
      const url = new URL(tab.url);
      setDomain(url.hostname);

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: tab.url })
      });

      if (response.ok) {
        const result = await response.json();
        const probability = result.is_phishing 
          ? Math.round(result.confidence * 100) 
          : Math.round((1 - result.confidence) * 100);
        
        setPhishingProb(probability);
        setIsWhitelisted(result.is_whitelisted || false);
        setReasons(result.reasons || []);
      }
    } catch (error) {
      console.error('[PhishGuard] Analysis Failed:', error);
      setPhishingProb(0);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = () => {
    if (loading) return 'analyzing';
    if (isWhitelisted) return 'secure';
    if (phishingProb === null) return 'analyzing';
    if (phishingProb > 60) return 'alert';
    if (phishingProb > 30) return 'warning';
    return 'secure';
  };

  const getStatusLabel = () => {
    if (loading) return 'SCANNINING PACKETS';
    if (isWhitelisted) return 'TRUSTED SOURCE';
    if (phishingProb === null) return 'READY';
    if (phishingProb > 60) return 'MALICIOUS DETECTED';
    if (phishingProb > 30) return 'SUSPICIOUS ACTIVITY';
    return 'SECURE LINK';
  };

  const openDashboard = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: 'http://localhost:5173' });
    } else {
      window.open('http://localhost:5173', '_blank');
    }
  };

  return (
    <div className="w-[380px] min-h-[560px] bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* PROFESSIONAL HEADER */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-slate-900/40 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Shield className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.2em] uppercase italic text-gradient">
              PhishGuard <span className="text-indigo-500">Sentinel</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className={`h-1.5 w-1.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">
                 AI Engine v4.2 Deployment
               </span>
            </div>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer border border-white/5">
           <Cpu className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto no-scrollbar">
        {/* STATUS CORE */}
        <section className="flex flex-col items-center">
           <div className="relative group perspective-1000">
             <div className="absolute inset-0 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />
             <div className="scale-105 filter drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <CyberShield status={getStatus()} />
             </div>
           </div>
           
           <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center space-y-1"
          >
            <h2 className={`text-2xl font-black italic uppercase tracking-tighter ${
                getStatus() === 'secure' ? 'text-emerald-500' : getStatus() === 'alert' ? 'text-rose-500' : 'text-amber-500'
            }`}>
              {getStatusLabel()}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{loading ? 'Lexical Analysis in progress' : 'Sentinel monitoring active'}</span>
            </div>
          </motion.div>
        </section>

        {/* METRICS & ANALYSIS */}
        <div className="grid gap-3">
          <div className="glass-panel rounded-2xl p-5 cyber-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Target Resolution</span>
              </div>
              <Activity className={`w-3.5 h-3.5 shrink-0 ${loading ? 'animate-spin' : ''} text-slate-600`} />
            </div>
            <div className="flex items-end justify-between gap-4">
              <span className="text-xs font-mono font-medium truncate text-slate-200 uppercase tracking-tight">
                {domain}
              </span>
              <div className="flex flex-col items-end">
                <span className={`text-2xl font-black tracking-tighter ${
                  getStatus() === 'secure' ? 'text-emerald-500' : getStatus() === 'alert' ? 'text-rose-500' : 'text-amber-500'
                }`}>
                  {loading ? '--' : isWhitelisted ? '0.0%' : `${phishingProb?.toFixed(1)}%`}
                </span>
                <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Risk Probe Index</span>
              </div>
            </div>
          </div>

          {/* FORENSIC ANALYSIS (XAI REASONS) */}
          <AnimatePresence>
            {!loading && reasons.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-2xl p-5 border-indigo-500/10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Forensic Intelligence</span>
                </div>
                <div className="space-y-3">
                  {reasons.map((reason, i) => (
                    <div key={i} className="flex gap-3 text-[11px] font-medium leading-[1.6] text-slate-400">
                      <div className="mt-1.5 w-1.5 h-[1.5px] bg-indigo-500/50 shrink-0" />
                      {reason}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACTIONS */}
        <div className="pb-4">
          <button 
            onClick={openDashboard}
            className="w-full py-4 glass-morphism rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all flex items-center justify-center gap-3 border-white/5 active:scale-[0.98] group"
          >
            Launch Command Center
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
