import React from 'react';
import { motion } from 'framer-motion';
import { 
    Shield, LayoutDashboard, Database, BarChart3, 
    Globe, Settings, LogOut, User, Lock 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
    const isAdmin = user?.role === 'ADMIN';

    const menuItems = [
        { id: 'hub', label: 'Security Hub', icon: <LayoutDashboard size={20} />, roles: ['USER', 'ADMIN'] },
        { id: 'db', label: 'Threat Database', icon: <Database size={20} />, roles: ['USER', 'ADMIN'] },
        { id: 'stats', label: 'Neural Analytics', icon: <BarChart3 size={20} />, roles: ['USER', 'ADMIN'] },
        { id: 'global', label: 'Global Feed', icon: <Globe size={20} />, roles: ['ADMIN'] },
        { id: 'admin', label: 'Sentinel Terminal', icon: <Lock size={20} />, roles: ['ADMIN'] },
        { id: 'settings', label: 'Protocols', icon: <Settings size={20} />, roles: ['USER', 'ADMIN'] },
    ];

    const filteredItems = menuItems.filter(item => item.roles.includes(user?.role));

    return (
        <aside className="w-20 md:w-72 glass-sidebar flex flex-col transition-all duration-500 relative z-50">
            <div className="p-8 mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 border-2 border-indigo-500 rounded-lg rotate-45 flex items-center justify-center bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Shield size={20} className="text-indigo-400 -rotate-45" />
                    </div>
                    <span className="hidden md:block text-white font-black tracking-tighter text-2xl uppercase italic">
                        PHISH<span className="text-indigo-500">GUARD</span>
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {filteredItems.map((item) => (
                    <SidebarItem 
                        key={item.id}
                        icon={item.icon} 
                        label={item.label} 
                        active={activeTab === item.id} 
                        onClick={() => setActiveTab(item.id)} 
                    />
                ))}
            </nav>

            <div className="p-6 border-t border-white/5 space-y-6 bg-white/[0.01]">
                <div className="flex items-center gap-4 px-2">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black shadow-lg">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="hidden md:block overflow-hidden">
                        <p className="text-white text-xs font-black truncate">{user?.name || 'Agent'}</p>
                        <p className="text-slate-600 text-[9px] uppercase tracking-[0.2em] font-bold mt-0.5">
                            {isAdmin ? 'L3 Cyber Sentinel' : 'L1 Security Analyst'}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 group"
                >
                    <LogOut size={16} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Terminate session</span>
                </button>
            </div>
        </aside>
    );
};

const SidebarItem = ({ icon, label, active = false, onClick }) => (
    <div 
        onClick={onClick}
        className={`flex items-center gap-5 px-5 py-4 rounded-2xl cursor-pointer group transition-all duration-300 relative ${active ? 'text-white' : 'text-slate-600 hover:text-slate-300'}`}
    >
        {active && (
            <motion.div 
                layoutId="sidebar-active"
                className="absolute inset-0 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]" 
            />
        )}
        <div className={`relative z-10 transition-transform duration-300 ${active ? 'scale-110 text-indigo-400' : 'group-hover:scale-105'}`}>
            {icon}
        </div>
        <span className="hidden md:block relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
        {active && (
            <motion.div 
                layoutId="sidebar-dot"
                className="absolute right-4 w-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,1)]" 
            />
        )}
    </div>
);

export default Sidebar;
