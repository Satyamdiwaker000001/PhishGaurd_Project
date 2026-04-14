import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Globe, Activity, 
  LogIn, UserPlus, Flame, Cpu, Terminal, Layers, 
  Fingerprint, BarChart3, Chrome, Apple, PlayCircle,
  AlertTriangle, ShieldAlert
} from 'lucide-react';
import Button from '../components/ui/Button';
import GlassBox from '../components/ui/GlassBox';
import Badge from '../components/ui/Badge';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 overflow-x-hidden no-scrollbar">
      {/* 1. ANIMATED BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Living Grid */}
        <div className="absolute inset-0 grid-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        {/* Glow Spheres */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[130px]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[130px]" 
        />
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto flex justify-between items-center py-8 px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="h-8 w-8 border-2 border-indigo-500 rounded-sm rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[225deg] duration-700">
            <div className="h-2 w-2 bg-indigo-500 rounded-full" />
          </div>
          <span className="text-white font-black tracking-tighter text-2xl uppercase italic">
            PHISH<span className="text-indigo-500">GUARD</span>
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4 md:gap-8 items-center"
        >
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <a href="#features" className="hover:text-white transition-colors">Technology</a>
            <a href="#stats" className="hover:text-white transition-colors">Forensics</a>
            <a href="#methodology" className="hover:text-white transition-colors">Network</a>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <Link to="/login">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
              <LogIn size={14} /> Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm" className="hidden sm:flex items-center gap-2">
              <UserPlus size={14} /> Initialize
            </Button>
          </Link>
        </motion.div>
      </nav>

      <main className="relative z-10">
        {/* 3. HERO SECTION */}
        <section className="max-w-6xl mx-auto pt-24 pb-32 px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <Badge variant="danger" className="p-2 px-6 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                <Activity size={12} className="inline mr-2 animate-pulse" /> Global Neural Shield Active
              </Badge>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black tracking-tight text-white leading-[0.95] mb-10 selection:bg-indigo-600">
              STRIKE BACK <br />
              <span className="text-indigo-500 italic">AT PHISHING.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-16 px-4">
              PhishGuard isn't just a filter. It's an <span className="text-white font-bold">active-defense engine</span> that uses Neural DOM analysis to identify clones and <span className="text-indigo-400 italic font-medium">poison attacker databases</span> the second they target you.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-xl">
              <Link to="/signup" className="flex-1">
                <Button size="xl" className="w-full">
                  Deploy Shield <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Button variant="secondary" size="xl" className="flex-1">
                View Methodology
              </Button>
            </motion.div>

            {/* DOWNLOAD STACK */}
            <motion.div variants={itemVariants} className="mt-20 flex flex-wrap justify-center gap-8 py-5 px-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 cursor-pointer group">
                <Chrome size={20} className="text-indigo-400" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">Web Store</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer group">
                <Apple size={20} className="text-slate-400" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">App Store</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer group">
                <PlayCircle size={20} className="text-emerald-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">Play Store</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 4. KEY METRICS */}
        <section id="stats" className="py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Threats Poisoned", value: "2.4M+", icon: <ShieldAlert className="text-red-500" /> },
              { label: "Neural Accuracy", value: "99.98%", icon: <Zap className="text-amber-500" /> },
              { label: "Response Time", value: "<12ms", icon: <Activity className="text-indigo-500" /> },
              { label: "Active Nodes", value: "112k", icon: <Globe className="text-emerald-500" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500">{stat.icon}</div>
                <h3 className="text-5xl font-black text-white tracking-tighter mb-2">{stat.value}</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. TECH SHOWCASE */}
        <section id="features" className="py-40 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl text-left">
              <Badge variant="primary" className="mb-6">Advanced Heuristics</Badge>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                Active Forensics <br /><span className="text-indigo-500">Neutralizing</span> Threats.
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                Standard blocklists are reactive and easily bypassed. PhishGuard is proactive, using cross-referenced telemetry to identify threats before they are even reported.
              </p>
            </div>
            <div className="hidden lg:block border border-white/10 p-4 rounded-2xl bg-white/[0.02]">
               <div className="flex gap-4">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Status</p>
                    <p className="text-xs font-bold text-emerald-500 mt-2 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Engine Online</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                  title: "Neural DOM Scanner",
                  desc: "Analyzes underlying code structures, identifying visual clones of banks or tech giants even on zero-day domains.",
                  icon: <Cpu className="text-indigo-500" />,
                  tag: "NEURAL"
              },
              {
                  title: "Credential Poisoning",
                  desc: "Automatically floods attacker databases with AI-generated decoy data, rendering their harvest useless.",
                  icon: <Flame className="text-red-500" />,
                  tag: "STRIKE"
              },
              {
                  title: "Sandbox Execution",
                  desc: "Suspicious scripts are executed in an isolated local environment for behavioral verification.",
                  icon: <Terminal className="text-emerald-500" />,
                  tag: "SECURE"
              },
              {
                  title: "Biometric Auth Check",
                  desc: "Ensures site interactions match expected behavioral patterns, flagging automated replay attacks.",
                  icon: <Fingerprint className="text-amber-500" />,
                  tag: "HUMAN"
              },
              {
                  title: "Layered Defense",
                  desc: "Synergizes SSL verification, domain age, and heuristic patterns for a bulletproof security score.",
                  icon: <Layers className="text-blue-500" />,
                  tag: "SYSTEM"
              },
              {
                  title: "Enterprise SIEM",
                  desc: "Integrate attack telemetry directly into your organization's security operation center logs.",
                  icon: <BarChart3 className="text-purple-500" />,
                  tag: "DATA"
              }
            ].map((feature, i) => (
              <GlassBox 
                key={i} 
                delay={i * 0.1}
                className="p-10 group hover:border-indigo-500/50 transition-colors duration-500"
              >
                <div className="mb-8 p-5 w-fit rounded-2xl bg-white/5 group-hover:bg-indigo-500/10 transition-colors duration-500">
                  {feature.icon}
                </div>
                <Badge variant="neutral" className="mb-4 absolute top-6 right-6 group-hover:text-indigo-400 transition-colors">
                  {feature.tag}
                </Badge>
                <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">
                  {feature.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  {feature.desc}
                </p>
              </GlassBox>
            ))}
          </div>
        </section>

        {/* 6. CALL TO ACTION */}
        <section className="py-40 px-6">
          <GlassBox className="max-w-5xl mx-auto p-20 md:p-32 text-center bg-indigo-600 border-none shadow-[0_0_100px_rgba(79,70,229,0.2)] overflow-visible">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400/20 blur-[100px] rounded-full" />

            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-none relative z-10">
              SECURE YOUR <br /> DIGITAL PERIMETER.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link to="/signup" className="flex-1 sm:max-w-xs">
                <Button variant="primary" size="xl" className="w-full bg-white text-black shadow-2xl">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="flex-1 sm:max-w-xs border-white/40 text-white">
                Enterprise Demo
              </Button>
            </div>
            <p className="mt-12 text-indigo-200 text-[10px] font-black uppercase tracking-[0.5em] opacity-80">
              Join 112,000+ secured analysts globally
            </p>
          </GlassBox>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-white/5 py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 border-2 border-indigo-500 rounded-sm rotate-45 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
                </div>
                <span className="text-white font-black tracking-tighter text-xl uppercase italic">PHISHGUARD</span>
              </div>
              <p className="text-slate-500 text-sm font-light max-w-sm leading-relaxed">
                Neutralizing next-gen phishing threats with proprietary neural DOM analysis and active credential poisoning technology. Build for a secure web.
              </p>
            </div>
            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-white uppercase tracking-widest text-indigo-500">Intelligence</h5>
              <ul className="text-[10px] font-bold text-slate-500 space-y-3 uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Forensics API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Neural Methodology</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Threat Intel</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-white uppercase tracking-widest text-indigo-500">Legal</h5>
              <ul className="text-[10px] font-bold text-slate-500 space-y-3 uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Term of Shield</a></li>
                <li><a href="#" className="text-red-900 hover:text-red-500 transition-colors">CVE Report</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-16 text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
            <p>© 2026 PhishGuard Protocol. Secure Access Guaranteed.</p>
            <p>ENGINE VERSION 2.4.0_REV7</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;