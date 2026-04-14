import React from 'react';
import { motion } from 'framer-motion';
import { 
    Activity, ShieldAlert, Globe, Server, 
    AlertTriangle, ShieldCheck, Database, 
    ChevronRight, RefreshCcw, Lock
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import GlassBox from '../../components/ui/GlassBox';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// Mock data for visualizations
const scanData = [
    { time: '00:00', total: 120, threats: 12 },
    { time: '04:00', total: 80, threats: 5 },
    { time: '08:00', total: 450, threats: 45 },
    { time: '12:00', total: 600, threats: 82 },
    { time: '16:00', total: 520, threats: 38 },
    { time: '20:00', total: 300, threats: 15 },
    { time: '23:59', total: 150, threats: 8 },
];

const AdminDashboardView = ({ history, fetchHistory }) => {
    const totalScans = history.length;
    const maliciousScans = history.filter(h => h.is_phishing).length;
    const threatRate = totalScans > 0 ? ((maliciousScans / totalScans) * 100).toFixed(1) : 0;

    return (
        <div className="space-y-10 pb-20">
            {/* GLOBAL KPI SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AdminStatCard label="Global Threat Rate" value={`${threatRate}%`} trend="+2.4%" icon={<ShieldAlert size={24} />} color="text-red-500" />
                <AdminStatCard label="Total Intelligence logs" value={totalScans} trend="Live" icon={<Database size={24} />} color="text-indigo-400" />
                <AdminStatCard label="Neural Load" value="4.2%" trend="Optimal" icon={<Server size={24} />} color="text-emerald-500" />
                <AdminStatCard label="Active Sentinels" value="12" trend="Synced" icon={<Globe size={24} />} color="text-sky-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* NEURAL TRAFFIC CHART */}
                <GlassBox className="lg:col-span-2 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">System Traffic Analytics</h3>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">24 Hour Activity Monitor</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-slate-500"><RefreshCcw size={14} className="mr-2" /> Refresh</Button>
                    </div>
                    
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={scanData}>
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
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Live Threat Feed</h3>
                    </div>
                    
                    <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-2">
                        <ThreatAlert type="CRITICAL" msg="Neural pattern mismatch: Regional Node 4" time="2m ago" />
                        <ThreatAlert type="HIGH" msg="Zero-day redirect exploit detected" time="15m ago" />
                        <ThreatAlert type="INFO" msg="Neural Load Balancer v4.2 deployed" time="1h ago" />
                        <ThreatAlert type="WARNING" msg="Increased activity: Financial targets" time="2h ago" />
                        <ThreatAlert type="HIGH" msg="Credential harvester blocked: Global" time="4h ago" />
                    </div>
                    
                    <Button variant="secondary" className="w-full text-[10px] font-black uppercase tracking-widest">
                        Dispatch Response Teams
                    </Button>
                </GlassBox>
            </div>

            {/* ADMIN ACTIONS & WHITELIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ... existing sentinel controls ... */}
                <GlassBox className="p-10 border-indigo-500/10 space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                            <Lock size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sentinel Controls</h3>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">High-Privilege Terminal</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <ActionButton label="Manage Whitelist" count="152 Domains" />
                        <ActionButton label="ML Model Config" count="Active: CNN-Lexical" />
                        <ActionButton label="User Oversight" count="1,248 Agents" />
                        <ActionButton label="System Logs" count="4.2GB Storage" />
                    </div>
                </GlassBox>

                <GlassBox className="p-10 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-emerald-500">
                           <ShieldCheck size={24} />
                           <h3 className="text-xl font-black text-white uppercase tracking-tight">Security Reliability</h3>
                        </div>
                        <Badge variant="success">99.9% Up</Badge>
                    </div>
                    <div className="space-y-6">
                        <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 flex">
                            <div className="h-full bg-red-500/60" style={{ width: `${threatRate}%` }} />
                            <div className="h-full bg-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.5)]" style={{ width: `${100-threatRate}%` }} />
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Detected Threats</p>
                                <p className="text-xl font-black text-red-500">{threatRate}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Clean Traffic</p>
                                <p className="text-xl font-black text-indigo-400">{(100-threatRate).toFixed(1)}%</p>
                            </div>
                        </div>
                    </div>
                </GlassBox>
            </div>

            {/* GLOBAL INTELLIGENCE LOGS - NEW SECTION */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <Database size={18} className="text-indigo-400" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.4em]">Global Intelligence Logs</h3>
                    </div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Displaying last {history.length} operations</p>
                </div>

                <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset URL</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Neural Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Confidence</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">XAI Insights</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {history.slice(0, 10).map((record, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-mono text-slate-300 truncate max-w-md group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{record.url}</p>
                                        <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mt-1">{new Date(record.scanned_at).toLocaleString()}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <Badge variant={record.is_phishing ? 'danger' : record.is_whitelisted ? 'primary' : 'success'} className="px-3 py-1 font-black shadow-lg">
                                            {record.is_phishing ? 'BLOCKED' : record.is_whitelisted ? 'WHITELISTED' : 'SECURE'}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`text-xs font-black ${record.is_phishing ? 'text-red-500' : 'text-indigo-400'}`}>
                                            {(record.confidence * 100).toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 min-w-[300px]">
                                        <div className="flex flex-wrap gap-2">
                                            {record.reasons && record.reasons.length > 0 ? (
                                                record.reasons.slice(0, 2).map((reason, j) => (
                                                    <span key={j} className="text-[8px] font-black bg-white/5 text-slate-500 border border-white/5 px-2 py-1 rounded-md uppercase tracking-tight">
                                                        {reason}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest italic font-medium">No detected anomalies</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
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
                <Badge variant={trend.includes('+') ? 'danger' : 'success'} className="text-[8px] py-0.5 px-2">{trend}</Badge>
            </div>
        </div>
    </GlassBox>
);

const ThreatAlert = ({ type, msg, time }) => (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4 hover:bg-white/[0.04] transition-colors group cursor-default">
        <div className={`w-1 rounded-full ${type === 'CRITICAL' ? 'bg-red-500' : type === 'HIGH' ? 'bg-orange-500' : 'bg-indigo-500'}`} />
        <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
                <span className={`text-[8px] font-black uppercase tracking-widest ${type === 'CRITICAL' ? 'text-red-500' : type === 'HIGH' ? 'text-orange-500' : 'text-indigo-400'}`}>{type} ALERT</span>
                <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">{time}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight group-hover:text-slate-300 transition-colors">{msg}</p>
        </div>
    </div>
);

const ActionButton = ({ label, count }) => (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-indigo-500/5 hover:border-indigo-500/20 transition-all cursor-pointer group">
        <p className="text-[10px] font-black text-white uppercase tracking-tight group-hover:text-indigo-400 mb-1">{label}</p>
        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{count}</p>
    </div>
);

export default AdminDashboardView;
