import { AlertTriangle, Home, ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WarningPage() {
  const params = new URLSearchParams(window.location.search);
  const maliciousUrl = params.get('url') || 'Unknown';
  const confidence = Math.round(Number(params.get('confidence') || 0) * 100);
  const reasons = (params.get('reasons') || '').split('|').filter(r => r.length > 0);

  const handleBypass = () => {
    if (confirm('Are you absolutely sure? PhishGuard highly recommends staying away from this site.')) {
      window.location.href = maliciousUrl;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full glass-morphism rounded-3xl p-8 md:p-12 relative z-10 border-rose-500/30 ring-1 ring-rose-500/20 shadow-[0_0_50px_-12px_rgba(244,63,94,0.3)]"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mb-8 relative">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl"
            />
            <ShieldAlert className="w-12 h-12 text-rose-500 relative z-10" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            DECEPTIVE SITE <span className="text-rose-500">AHEAD</span>
          </h1>
          
          <p className="text-slate-400 text-lg mb-8 max-w-md">
            PhishGuard Shield has detected that this website is trying to steal your identity, passwords, or financial information.
          </p>

          <div className="w-full bg-slate-900/80 rounded-2xl p-6 mb-10 border border-slate-800 text-left">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Flagged URL</span>
                <code className="text-rose-400 text-sm break-all font-mono leading-relaxed">{maliciousUrl}</code>
              </div>
              <div className="text-right ml-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">AI Confidence</span>
                <span className="text-rose-500 font-black text-2xl">{confidence}%</span>
              </div>
            </div>

            {reasons.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Threat Insights</span>
                <ul className="space-y-2">
                  {reasons.map((reason, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-400 leading-normal">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-rose-500 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-center gap-2 text-[10px] text-slate-600 border-t border-slate-800 mt-4 pt-4 font-bold uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3 text-rose-500/50" />
              <span>Phishing Engine: CNN Lexical Analysis matching malicious patterns.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => window.history.back()}
              className="flex-1 px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
              Get Me Out of Here
            </button>
            <button 
              onClick={handleBypass}
              className="px-8 py-4 bg-slate-900 text-slate-400 font-bold rounded-2xl hover:bg-slate-800 transition-all border border-slate-800"
            >
              Proceed Anyway
            </button>
          </div>
          
          <button 
             onClick={() => window.location.href = 'http://localhost:5173'}
             className="mt-8 text-xs text-slate-500 hover:text-sky-400 transition-colors flex items-center gap-1.5"
          >
            <Home className="w-3 h-3" />
            Return to PhishGuard Command Center
          </button>
        </div>
      </motion.div>
    </div>
  );
}
