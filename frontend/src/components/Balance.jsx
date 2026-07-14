import { Wallet } from "lucide-react";

export const Balance = ({ value }) => {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg flex items-center space-x-6 hover:bg-white/10 transition-all duration-300">
            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 shadow-inner">
                <Wallet className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
                <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
                    Your Balance
                </div>
                <div className="font-extrabold text-5xl text-white tracking-tight">
                    ₹{value?.toLocaleString()}
                </div>
            </div>
        </div>
    );
}