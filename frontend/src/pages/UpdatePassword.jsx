import { useState } from 'react';
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Appbar } from "../components/Appbar";
import { toast } from 'sonner';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const UpdatePassword = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                "http://localhost:3000/api/user/update/password",
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            toast.success("Password Updated", {
                icon: <CheckCircle className='text-emerald-500' />,
                duration: 3000,
            });
            setTimeout(() => {
                navigate("/dashboard", { state: { updated: true } });
            }, 2000);
        } catch (e) {
            toast.error(e.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden flex flex-col">
            <Appbar />

            <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none"></div>

            <div className="flex flex-1 justify-center items-center relative z-10 px-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center w-full max-w-md">
                    <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-500/30">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <Heading label={"Security"} />
                    <SubHeading label={"Enter your new secure password"} />
                    
                    <form onSubmit={handleUpdate}>
                        <div className="mt-6 text-left">
                            <div>
                                <InputBox
                                    autoFocus={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New password"
                                    label={"Password"}
                                    isPassword={true}
                                />
                                <p className="text-xs text-slate-400 mt-1.5 pl-1 font-medium">Must be 8-20 characters long.</p>
                            </div>
                        </div>
                        <div className="pt-8">
                            <Button type="submit" label={"Change Password"} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}