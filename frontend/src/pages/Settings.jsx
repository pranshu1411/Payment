import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Appbar } from "../components/Appbar";
import { Settings as SettingsIcon } from "lucide-react";

export const Settings = () => {
  const navigate = useNavigate();

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
          </div>
        </div>
      </div>
    </div>
  );
};
