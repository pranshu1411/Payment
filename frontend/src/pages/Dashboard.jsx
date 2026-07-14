import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/User"
import { useEffect, useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error("Failed to fetch balance:", error.response?.data || error.message);
        });

        axios.get("http://localhost:3000/api/user/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error("Failed to fetch user:", error);
        });
    }, [location.state?.updated]);

    return(
        <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
            <Appbar />
            
            {/* Ambient background lights */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
                {user && (
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome back, {user.firstName}! 👋</h1>
                        <p className="text-slate-400">Here's an overview of your account today.</p>
                    </div>
                )}
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
}