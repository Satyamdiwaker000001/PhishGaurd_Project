import { useState, useEffect } from 'react';

function App() {
  const [isScanning, setIsScanning] = useState(true);
  const [riskData, setRiskData] = useState({ score: 0, status: '', reason: '' });

  // Mocking the AI API response for the current tab
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
      // Change score to > 75 to see the Danger UI
      setRiskData({ 
        score: 12, 
        status: 'SAFE', 
        reason: 'Domain age is > 5 years. No phishing patterns detected in URL syntax.' 
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isDanger = riskData.score > 75;

  return (
    <div className="flex flex-col h-full bg-[#0B1120] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* 1. Minimal Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="font-semibold text-sm tracking-wide text-white">PhishGuard <span className="text-slate-500 text-xs">v1.0</span></span>
        </div>
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {isScanning ? 'Analyzing' : 'Engine Active'}
          </span>
        </div>
      </header>

      {/* 2. Core Scanning Area (Current Tab) */}
      <main className="flex-1 px-4 py-5">
        <div className="text-xs text-slate-500 mb-2 font-mono truncate">
          Target: https://secure.bank.com/login
        </div>

        {isScanning ? (
          // Skeleton Loader for scanning state
          <div className="border border-slate-800 bg-[#0F172A]/50 rounded-lg p-4 animate-pulse">
            <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-800 rounded w-full"></div>
              <div className="h-3 bg-slate-800 rounded w-4/5"></div>
            </div>
          </div>
        ) : (
          // Result Card
          <div className={`border rounded-lg p-4 transition-all duration-300 ${isDanger ? 'border-red-500/30 bg-red-500/5' : 'border-green-500/30 bg-green-500/5'}`}>
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className={`text-3xl font-bold ${isDanger ? 'text-red-400' : 'text-green-400'}`}>
                  {riskData.score} <span className="text-sm font-normal text-slate-500">/100</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest font-semibold mt-1">
                  Risk Score
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${isDanger ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {riskData.status}
              </div>
            </div>
            
            {/* Threat Insight (XAI) */}
            <div className="mt-4 pt-3 border-t border-slate-700/50">
              <div className="text-[10px] uppercase text-slate-500 mb-1 font-semibold">AI Insight</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {riskData.reason}
              </p>
            </div>
          </div>
        )}

        {/* 3. Extracted Features (Clean list) */}
        {!isScanning && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-xs p-2 rounded bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">Lexical Analysis</span>
              <span className={isDanger ? 'text-red-400' : 'text-green-400'}>{isDanger ? 'Failed' : 'Passed'}</span>
            </div>
            <div className="flex justify-between items-center text-xs p-2 rounded bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">Domain Entropy</span>
              <span className="text-green-400">Normal</span>
            </div>
          </div>
        )}
      </main>

      {/* 4. Action Bar (For other multimodal labs) */}
      <footer className="p-4 grid grid-cols-2 gap-2 border-t border-slate-800 bg-[#0F172A]">
        <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-600">
          <svg className="w-4 h-4 text-slate-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[10px] font-medium text-slate-300">Scan Image</span>
        </button>
        <button className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-600">
          <svg className="w-4 h-4 text-slate-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className="text-[10px] font-medium text-slate-300">Scan SMS</span>
        </button>
      </footer>
    </div>
  );
}

export default App;