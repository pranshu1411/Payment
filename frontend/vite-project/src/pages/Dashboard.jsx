import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/User"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
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
    }, [location.state?.updated]);
    return(
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
}