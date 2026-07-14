import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle, Send } from 'lucide-react';
import { Appbar } from '../components/Appbar';
import { Button } from '../components/Button';
import { InputBox } from '../components/InputBox';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/Subheading';

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const username = searchParams.get("username");
  const [amount, setAmount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleTransfer = async (e) => {
    if(e) e.preventDefault();
    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/account/transfer", {
        to: id,
        amount: numAmount,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      toast.success(`₹${numAmount} sent to ${name}`, {
        icon: <CheckCircle className="text-emerald-500" />,
        duration: 3000,
      });

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/dashboard", { state: { updated: true } });
      }, 2500);

    } catch (error) {
      console.error("Transfer failed:", error.response?.data || error.message);
      toast.error("Transfer failed. Please try again.");
    }
  };

  useEffect(() => {
      const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
              navigate("/dashboard");
          }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      <Appbar />
      
      {/* Ambient background lights */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>

      <div className="flex flex-1 justify-center items-center relative z-10 px-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center w-full max-w-md min-h-[400px] flex flex-col justify-center">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle className="w-12 h-12 text-emerald-400 animate-bounce" />
                </div>
                <Heading label="Transfer Complete!" />
                <div className="flex items-center space-x-3 text-slate-300 mt-4 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-emerald-500"></div>
                    <span className="font-medium text-lg">Redirecting to dashboard...</span>
                </div>
            </div>
          ) : (
            <>
              <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-500/30">
                <Send className="w-8 h-8 text-emerald-400" />
              </div>
              <Heading label={"Send Money"}/>
              <SubHeading label={`You are initiating a transfer to ${name}`}/>

              <form onSubmit={handleTransfer} className="mt-2">
                <div className="mt-6 text-left">
                  <InputBox
                      autoFocus={true}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="0.00"
                      label={`Amount to send to @${username}`}
                      type="number"
                  />
                </div>
                <div className="pt-8">
                  <Button type="submit" label={"Initiate Transfer"} />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};