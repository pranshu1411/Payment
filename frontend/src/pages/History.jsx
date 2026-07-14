import { Appbar } from "../components/Appbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, ArrowDownLeft, Clock, Activity, Zap } from "lucide-react";

export const History = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/account/history", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setTransactions(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Failed to fetch history:", error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30">
            <Appbar />
            
            {/* Background ambient light effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
                <div className="flex items-center space-x-4 mb-12">
                    <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <Activity className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Transaction History
                        </h1>
                        <p className="text-slate-400 mt-1 font-medium text-lg">Track your recent financial activity</p>
                    </div>
                </div>
                
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64 space-y-4">
                        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-indigo-500"></div>
                        <p className="text-slate-400 animate-pulse font-medium">Syncing data...</p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-16 text-center shadow-2xl border border-white/10 transition-all hover:bg-white/10">
                        <div className="bg-indigo-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-500/20">
                            <Clock className="w-12 h-12 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No activity found</h3>
                        <p className="text-slate-400 max-w-sm mx-auto text-lg">Your transaction timeline is empty. Make a transfer to see it appear here instantly.</p>
                    </div>
                ) : (
                    <div className="space-y-4 relative">
                        {transactions.map((txn, idx) => (
                            <div 
                                key={txn.id} 
                                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between shadow-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
                            >
                                {/* Subtle hover glow inside the card */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-full group-hover:translate-x-full"></div>

                                <div className="flex items-center space-x-5 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border ${
                                        txn.type === 'sent' 
                                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                    } transition-all duration-300`}>
                                        {txn.type === 'sent' ? <ArrowUpRight className="w-7 h-7" /> : <ArrowDownLeft className="w-7 h-7" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                {txn.type === 'sent' ? 'Sent to' : 'Received from'}
                                            </p>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                                txn.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                                txn.status === 'failed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                                {txn.status}
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-white tracking-wide">
                                            {txn.counterparty?.firstName} {txn.counterparty?.lastName}
                                        </p>
                                        <p className="text-sm text-slate-400 mt-1 font-medium flex items-center">
                                            <Zap className="w-3 h-3 mr-1.5 opacity-50" />
                                            {new Date(txn.date).toLocaleDateString(undefined, { 
                                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className={`text-2xl font-black tracking-tight relative z-10 ${
                                    txn.type === 'sent' ? 'text-white' : 'text-emerald-400'
                                }`}>
                                    {txn.type === 'sent' ? '-' : '+'}₹{txn.amount.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};