import React from 'react';
import { Link } from 'react-router-dom';
import {
    Flame, ArrowRight, UserPlus, LogIn, ShieldCheck, Zap, Cpu, Terminal,
    Chrome, Globe, ShieldAlert, Activity, Lock, Apple, PlayCircle,
    CheckCircle2, AlertTriangle, Shield, BarChart3, Fingerprint, Layers
} from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden no-scrollbar">

            {/* 1. ANIMATED BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-indigo-600/10 blur-[130px] animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            {/* 2. NAVIGATION BAR */}
            <nav className="relative z-50 w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-6 md:px-12 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="h-8 w-8 border-2 border-indigo-500 rounded-sm rotate-45 flex items-center justify-center transition-transform group-hover:rotate-180 duration-700">
                        <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <span className="text-white font-black tracking-tighter text-2xl uppercase italic">
                        PHISH<span className="text-indigo-500">GUARD</span>
                    </span>
                </div>

                <div className="flex gap-4 md:gap-8 items-center">
                    <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        <a href="#features" className="hover:text-white transition-colors">Technology</a>
                        <a href="#stats" className="hover:text-white transition-colors">Live Stats</a>
                        <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
                    <Link to="/login" className="text-white text-[11px] font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors flex items-center gap-2">
                        <LogIn size={14} /> Sign In
                    </Link>
                    <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/40 flex items-center gap-2">
                        <UserPlus size={14} /> Get Started
                    </Link>
                </div>
            </nav>

            <main className="relative z-10">
                {/* 3. HERO SECTION */}
                <section className="max-w-6xl mx-auto pt-24 pb-20 px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase mb-8 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                        <Activity size={12} className="animate-pulse" /> Global Threat Intelligence Active
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[1.05] mb-8">
                        Stop Next-Gen Phishing. <br />
                        <span className="bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text text-transparent italic px-2">Fight Back, In Real-Time.</span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
                        PhishGuard is the world's first active-defense extension. We don't just block links; we use
                        <span className="text-white font-medium"> Neural DOM Analysis</span> to identify clones and
                        <span className="text-indigo-400 font-medium"> poison attacker databases</span> instantly.
                    </p>

                    <div className="flex flex-col items-center gap-12">
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/signup" className="bg-white text-black px-12 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-2 group">
                                Initialize Shield <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="border border-white/10 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                Technical Whitepaper
                            </button>
                        </div>

                        {/* STORE DOWNLOADS */}
                        <div className="flex flex-wrap justify-center gap-6 py-4 px-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <Chrome size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">Chrome Store</span>
                            </div>
                            <div className="h-4 w-[1px] bg-white/10 self-center"></div>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <Apple size={20} className="text-slate-300 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">App Store</span>
                            </div>
                            <div className="h-4 w-[1px] bg-white/10 self-center"></div>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <PlayCircle size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">Google Play</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. TRUST SECTION / STATS */}
                <section id="stats" className="py-20 border-y border-white/5 bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Threats Poisoned", value: "1.2M+", icon: <ShieldAlert className="text-red-500" /> },
                            { label: "Zero-Day Catch", value: "99.9%", icon: <Zap className="text-amber-500" /> },
                            { label: "Scanning Latency", value: "<15ms", icon: <Activity className="text-indigo-500" /> },
                            { label: "Active Users", value: "50k+", icon: <Globe className="text-emerald-500" /> }
                        ].map((stat, i) => (
                            <div key={i} className="text-center space-y-2">
                                <div className="flex justify-center mb-2 opacity-50">{stat.icon}</div>
                                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. THE PROBLEM SECTION */}
                <section className="py-32 px-6">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                                Why Traditional <br /><span className="text-indigo-500">Filters Fail.</span>
                            </h2>
                            <p className="text-slate-400 font-light leading-relaxed italic border-l-4 border-indigo-600 pl-6">
                                Standard blacklists only block known threats. Modern attackers use ephemeral domains and delayed DOM mutations
                                that appear 100% safe to Google Safe Browsing and standard antiviruses.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {[
                                    "Delayed Script Injection Detection",
                                    "UI/UX Consistency Check (Cloning Detection)",
                                    "Automated Credential Poisoning",
                                    "Local AI Inference (Privacy First)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-wide">
                                        <CheckCircle2 size={16} className="text-indigo-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full"></div>
                            <div className="relative bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 font-mono text-[10px] md:text-xs shadow-2xl">
                                <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                                </div>
                                <p className="text-indigo-400"># phishguard_engine_v2.0</p>
                                <p className="text-slate-500 mt-2">Checking: https://amaz0n-security-update.com</p>
                                <p className="text-slate-500">[SCAN] Calculating DOM Entropy...</p>
                                <p className="text-amber-500 font-bold">[WARN] 94% UI Similarity to Amazon.com</p>
                                <p className="text-red-500 font-bold">[ALERT] Malicious Artifact Detected.</p>
                                <p className="text-indigo-400 mt-2">[ACTION] Poisoning Attacker DB with 1,000 fakes...</p>
                                <p className="text-emerald-500 mt-1">[DONE] Threat Neutralized.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CORE FEATURES SECTION */}
                <section id="features" className="py-32 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Enterprise Grade Security</h2>
                        <p className="text-slate-500 text-sm font-light">Advanced heuristic engines designed for the modern web.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Neural DOM Analysis",
                                desc: "Our engine looks at the underlying code structure, not just the URL. If the code looks like a bank but the domain doesn't match, we kill it.",
                                icon: <Cpu className="text-indigo-500" />,
                                tag: "Neural"
                            },
                            {
                                title: "Credential Poisoning",
                                desc: "The ultimate counter-attack. We flood the attacker's server with millions of AI-generated fake usernames and passwords.",
                                icon: <Flame className="text-red-500" />,
                                tag: "Active"
                            },
                            {
                                title: "Zero-Day Sandboxing",
                                desc: "Every suspicious form is tested in a secure, local sandbox to see what happens when data is submitted.",
                                icon: <Terminal className="text-emerald-500" />,
                                tag: "Sandbox"
                            },
                            {
                                title: "Artifact Fingerprinting",
                                desc: "We track the specific 'fingerprints' of phishing kits across the web to stop them before they even load.",
                                icon: <Fingerprint className="text-amber-500" />,
                                tag: "Trace"
                            },
                            {
                                title: "Multi-Layered Shield",
                                desc: "Combines Heuristics, ML Inference, and Reputation scores for a bulletproof defense.",
                                icon: <Layers className="text-blue-500" />,
                                tag: "Architecture"
                            },
                            {
                                title: "SOC L1 Integration",
                                desc: "Export detailed attack logs directly to your SIEM or dashboard for further investigation.",
                                icon: <BarChart3 className="text-purple-500" />,
                                tag: "Enterprise"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 hover:bg-white/[0.04] transition-all duration-500">
                                <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 group-hover:bg-indigo-500/10 transition-colors duration-500">{feature.icon}</div>
                                <h4 className="text-white font-bold mb-4 uppercase tracking-tighter flex items-center justify-between">
                                    {feature.title}
                                    <span className="text-[8px] border border-white/10 px-2 py-0.5 rounded-full text-slate-500 group-hover:text-indigo-400 transition-colors">{feature.tag}</span>
                                </h4>
                                <p className="text-slate-500 text-xs leading-relaxed font-light">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. METHODOLOGY (STEPS) */}
                <section id="methodology" className="py-32 border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-500/10 hidden md:block"></div>
                            {[
                                { step: "01", title: "Deployment", desc: "One-click installation on Chrome, Edge, or Firefox.", icon: <Chrome size={20} /> },
                                { step: "02", title: "Real-time Analysis", desc: "Our engine scans every page interaction locally with zero lag.", icon: <Zap size={20} /> },
                                { step: "03", title: "Counter Strike", desc: "Malicious infrastructure is poisoned and reported to global DBs.", icon: <ShieldCheck size={20} /> }
                            ].map((item, i) => (
                                <div key={i} className="relative bg-[#050505] p-6 text-center space-y-4 group">
                                    <div className="w-16 h-16 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto font-black text-lg shadow-[0_0_30px_rgba(79,70,229,0.3)] group-hover:rotate-12 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-xs pt-4">{item.title}</h4>
                                    <p className="text-slate-500 text-xs font-light leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. CTA SECTION */}
                <section className="py-40 px-6">
                    <div className="max-w-5xl mx-auto p-16 md:p-24 rounded-[3rem] bg-indigo-600 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/30 group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4338ca_0%,transparent_60%)] opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight uppercase">
                                Take control of your <br /> digital perimeter.
                            </h2>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/signup" className="bg-white text-black px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl">
                                    Get Started (Always Free)
                                </Link>
                                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white/20 transition-all">
                                    Book Enterprise Demo
                                </button>
                            </div>
                            <p className="mt-8 text-indigo-200 text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">Join 50,000+ secured users globally</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* 9. FOOTER */}
            <footer className="border-t border-white/5 pt-20 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 border-2 border-indigo-500 rounded-sm rotate-45 flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></div>
                                </div>
                                <span className="text-white font-black tracking-tighter text-lg uppercase italic">PHISHGUARD</span>
                            </div>
                            <p className="text-slate-500 text-xs font-light max-w-xs leading-relaxed">
                                Neutralizing next-generation phishing threats with proprietary neural DOM analysis and credential poisoning technology.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Resources</h5>
                            <ul className="text-[10px] font-bold text-slate-500 space-y-2 uppercase tracking-widest">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Technical Specs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Research Paper</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Security</h5>
                            <ul className="text-[10px] font-bold text-slate-500 space-y-2 uppercase tracking-widest">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Engine</a></li>
                                <li><a href="#" className="text-red-900 hover:text-red-500 transition-colors">Report Vulnerability</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700">
                        <p>© 2026 PhishGuard Project. All Rights Reserved.</p>
                        <p>Designed with precision by <span className="text-slate-500">Cybersecurity Enthusiasts</span></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;