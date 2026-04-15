import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Activity, ShieldAlert, Globe, Server, 
    AlertTriangle, ShieldCheck, Database, 
    RefreshCcw, Lock, Users, Trash2, Plus
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer
} from 'recharts';
import GlassBox from '../../components/ui/GlassBox';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const AdminDashboardView = ({ history, fetchHistory, activeTab }) => {
    const [stats, setStats] = useState({
        totalScans: 0,
        maliciousScans: 0,
        threatRate: 0,
        systemStatus: 'Optimal',
        activeUsers: 0,
        neuralLoad: 0,
        neuralLatency: 0
    });
    const [users, setUsers] = useState([]);
    const [whitelist, setWhitelist] = useState([]);
    const [globalHistory, setGlobalHistory] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAllAdminData();
        const interval = setInterval(fetchAllAdminData, 30000); 
        return () => clearInterval(interval);
    }, []);

    const fetchAllAdminData = async () => {
        const token = localStorage.getItem('token');
        try {
            const [statsRes, usersRes, whitelistRes, historyRes] = await Promise.all([
                fetch('http://localhost:3000/analysis/global-stats', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('http://localhost:3000/users', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('http://localhost:3000/whitelist', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('http://localhost:3000/analysis/all-history', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (usersRes.ok) setUsers(await usersRes.json());
            if (whitelistRes.ok) setWhitelist(await whitelistRes.json());
            if (historyRes.ok) setGlobalHistory(await historyRes.json());
        } catch (err) {
            console.error('Admin data fetch failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddWhitelist = async (e) => {
        e.preventDefault();
        if (!newDomain) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:3000/whitelist', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ domain: newDomain })
            });
            if (res.ok) {
                setNewDomain('');
                fetchAllAdminData();
            }
        } catch (err) {
            console.error('Failed to add whitelist:', err);
        }
    };

    const handleUpdateWhitelist = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/whitelist/${id}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ domain: editValue })
            });
            if (res.ok) {
                setEditingId(null);
                fetchAllAdminData();
            }
        } catch (err) {
            console.error('Failed to update whitelist:', err);
        }
    };

    const handleRemoveWhitelist = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/whitelist/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchAllAdminData();
        } catch (err) {
            console.error('Failed to delete whitelist:', err);
        }
    };

    const handleRemoveUser = async (id) => {
        if (!window.confirm('Terminate agent clearance?')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchAllAdminData();
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    };

    const handleRemoveLog = async (id) => {
        if (!window.confirm('Erase this intelligence record?')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/analysis/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchAllAdminData();
        } catch (err) {
            console.error('Failed to delete log:', err);
        }
    };

    // Derived scan data for charting
    const scanChartData = [
        { time: 'T-24h', total: stats.totalScans * 0.1, threats: stats.maliciousScans * 0.1 },
        { time: 'T-12h', total: stats.totalScans * 0.4, threats: stats.maliciousScans * 0.3 },
        { time: 'T-6h', total: stats.totalScans * 0.7, threats: stats.maliciousScans * 0.6 },
        { time: 'Now', total: stats.totalScans, threats: stats.maliciousScans },
    ];

    if (isLoading) return (
        <div className="h-[400px] flex flex-col items-center justify-center space-y-6">
            <RefreshCcw size={48} className="text-indigo-500 animate-spin" />
            <p className="text-xs font-black text-slate-600 uppercase tracking-[0.5em]">Synchronizing Intelligence Core...</p>
        </div>
    );

    return (
        <div className="space-y-12 pb-24">
            {/* GLOBAL KPI SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AdminStatCard label="Global Threat Rate" value={`${stats.threatRate}%`} trend="Realtime" icon={<ShieldAlert size={24} />} color="text-red-500" />
                <AdminStatCard label="Intelligence logs" value={stats.totalScans} trend="Saved" icon={<Database size={24} />} color="text-indigo-400" />
                <AdminStatCard label="Neural Load" value={`${stats.neuralLoad}%`} trend={stats.systemStatus} icon={<Server size={24} />} color="text-emerald-500" />
                <AdminStatCard label="Active Agents" value={stats.activeUsers} trend="Synced" icon={<Users size={24} />} color="text-sky-400" />
            </div>

            {(activeTab === 'global' || activeTab === 'stats') ? (
                /* EXTENDED ANALYTICS / GLOBAL LOGS VIEW */
                <GlassBox className="p-10 space-y-8 min-h-[500px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Intelligence Transmission Log</h3>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">Full System History | Latency: {stats.neuralLatency}ms</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={fetchAllAdminData} className="text-slate-500"><RefreshCcw size={14} className="mr-2" /> Refresh</Button>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">
                                    <th className="pb-4 pl-4">Timestamp</th>
                                    <th className="pb-4">Intelligence Source (URL/File)</th>
                                    <th className="pb-4 text-center">Threat Status</th>
                                    <th className="pb-4 text-center">Confidence</th>
                                    <th className="pb-4 text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {globalHistory.map((h, i) => (
                                    <tr key={i} className="bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                                        <td className="py-4 pl-4 rounded-l-2xl text-[10px] font-mono text-slate-400">
                                            {new Date(h.scanned_at).toLocaleString()}
                                        </td>
                                        <td className="py-4 text-xs font-black text-white max-w-[400px] truncate">
                                            {h.url}
                                        </td>
                                        <td className="py-4 text-center">
                                            <Badge variant={h.is_phishing ? 'danger' : 'success'}>
                                                {h.is_phishing ? 'MALICIOUS' : 'SECURE'}
                                            </Badge>
                                        </td>
                                        <td className="py-4 text-center font-mono text-xs text-indigo-400">
                                            {(h.confidence * 100).toFixed(1)}%
                                        </td>
                                        <td className="py-4 text-right pr-4 rounded-r-2xl">
                                            <button 
                                                onClick={() => handleRemoveLog(h.id)}
                                                className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassBox>
            ) : (
                /* CORE ADMIN OPS VIEW (DATABASE / SENTINEL ADMIN) */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* NEURAL TRAFFIC CHART */}
                    <GlassBox className="lg:col-span-2 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Intelligence Traffic</h3>
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">Neural Flow Monitor | Throughput: {stats.totalScans} P/S</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={fetchAllAdminData} className="text-slate-500"><RefreshCcw size={14} className="mr-2" /> Refresh</Button>
                        </div>
                        
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={scanChartData}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0A0A0B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                        itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                                    />
                                    <Area type="monotone" dataKey="total" stroke="#6366f1" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassBox>

                    {/* THREAT FEED */}
                    <GlassBox className="p-8 space-y-8 flex flex-col h-full">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <AlertTriangle size={20} className="text-orange-500" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Live Feed</h3>
                        </div>
                        
                        <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-2">
                            {globalHistory.slice(0, 10).map((h, i) => (
                                <ThreatAlert key={i} type={h.is_phishing ? 'CRITICAL' : 'SECURE'} msg={h.url} time={new Date(h.scanned_at).toLocaleTimeString()} />
                            ))}
                        </div>
                    </GlassBox>
                </div>
            )}

            {/* LOWER MANAGEMENT DECKS */}
            {(activeTab === 'db' || activeTab === 'admin') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassBox className="p-10 border-indigo-500/10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Global Whitelist</h3>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">Trusted Domain Registry</p>
                                </div>
                            </div>
                        </div>
                        
                        <form onSubmit={handleAddWhitelist} className="flex gap-4">
                            <input 
                                type="text" 
                                placeholder="Add trusted domain (e.g. google.com)"
                                value={newDomain}
                                onChange={(e) => setNewDomain(e.target.value)}
                                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs font-mono outline-none focus:border-indigo-500/50"
                            />
                            <Button type="submit" size="sm"><Plus size={16} /></Button>
                        </form>

                        <div className="max-h-[300px] overflow-y-auto space-y-2 no-scrollbar">
                            {whitelist.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-indigo-500/20 transition-all">
                                    {editingId === item.id ? (
                                        <input 
                                            autoFocus
                                            value={editValue} 
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => handleUpdateWhitelist(item.id)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateWhitelist(item.id)}
                                            className="bg-transparent text-[10px] font-mono text-white outline-none"
                                        />
                                    ) : (
                                        <span 
                                            className="text-[10px] font-mono text-slate-300 uppercase tracking-tight cursor-pointer"
                                            onClick={() => { setEditingId(item.id); setEditValue(item.domainName); }}
                                        >
                                            {item.domainName}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => handleRemoveWhitelist(item.id)} className="text-red-500/30 hover:text-red-500 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassBox>

                    {/* USER OVERSIGHT */}
                    <GlassBox className="p-10 space-y-8">
                        <div className="flex items-center gap-4 text-emerald-500">
                            <Users size={24} />
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Agent Oversight</h3>
                        </div>
                        
                        <div className="max-h-[400px] overflow-y-auto space-y-4 no-scrollbar">
                            {users.map((u) => (
                                <div key={u.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-indigo-400 font-black">
                                            {u.name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase">{u.name || 'Anonymous Agent'}</p>
                                            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{u.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={u.role === 'ADMIN' ? 'primary' : 'success'}>{u.role}</Badge>
                                        {u.role !== 'ADMIN' && (
                                            <button 
                                                onClick={() => handleRemoveUser(u.id)}
                                                className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassBox>
                </div>
            )}
        </div>
    );
};

const AdminStatCard = ({ label, value, trend, icon, color }) => (
    <GlassBox className="p-8 flex flex-col items-center text-center space-y-4 hover:border-indigo-500/30 transition-all duration-500 cursor-default">
        <div className={`p-4 rounded-2xl bg-white/[0.03] ${color} border border-white/5 mb-2`}>
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</p>
            <h4 className="text-3xl font-black text-white">{value}</h4>
            <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="success" className="text-[8px] py-0.5 px-2">{trend}</Badge>
            </div>
        </div>
    </GlassBox>
);

const ThreatAlert = ({ type, msg, time }) => (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4 hover:bg-white/[0.04] transition-colors group cursor-default">
        <div className={`w-1 rounded-full ${type === 'CRITICAL' ? 'bg-red-500' : 'bg-indigo-500'}`} />
        <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between mb-1">
                <span className={`text-[8px] font-black uppercase tracking-widest ${type === 'CRITICAL' ? 'text-red-500' : 'text-indigo-400'}`}>{type} LOG</span>
                <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">{time}</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate group-hover:text-slate-300 transition-colors uppercase tracking-tight">{msg}</p>
        </div>
    </div>
);

export default AdminDashboardView;
