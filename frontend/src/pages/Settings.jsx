import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Appbar } from "../components/Appbar";
import { Settings as SettingsIcon, AlertTriangle } from "lucide-react";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const Settings = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmDeleteAccount = async () => {
    try {
      await axios.delete("http://localhost:3000/api/user/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      localStorage.removeItem("token");
      toast.success("Account deleted permanently");
      navigate("/");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete account");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden flex flex-col">
      <Appbar />
      
      {/* Ambient background lights */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>

      <div className="flex flex-1 justify-center items-center relative z-10 px-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center w-full max-w-md">
          <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-500/30">
            <SettingsIcon className="w-8 h-8 text-indigo-400" />
          </div>
          <Heading label={"Settings"} />
          <SubHeading label={"What would you like to update today?"} />
          <div className="pt-8 flex flex-col gap-4">
            <Button label={"Update Personal Info"} onClick={() => navigate("/update/personal")} />
            <Button label={"Update Password"} onClick={() => navigate("/update/password")} />
            
            <div className="mt-4 pt-6 border-t border-white/10">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 cursor-pointer text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/30 font-medium rounded-xl text-sm px-5 py-3 shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.23)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl backdrop-blur-xl transform transition-all">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 mx-auto mb-6 shadow-inner">
                <AlertTriangle className="w-8 h-8 text-rose-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white text-center mb-3">Delete Account</DialogTitle>
            <p className="text-slate-400 text-center mb-8 leading-relaxed">
              Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone. All your data will be permanently removed.
            </p>
            <div className="flex space-x-4">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl py-3 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                >
                    Cancel
                </button>
                <button 
                    onClick={confirmDeleteAccount}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium rounded-xl py-3 shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] transition-all hover:shadow-[0_6px_20px_rgba(225,29,72,0.23)] focus:outline-none focus:ring-2 focus:ring-rose-500/50 cursor-pointer"
                >
                    Yes, Delete
                </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
