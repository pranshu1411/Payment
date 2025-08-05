import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';
import { Appbar } from '../components/Appbar';

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  return <div className="flex flex-col h-screen bg-slate-300">
    <Appbar />
    <div className="flex flex-1 justify-center item-center mt-12 md:mt-20">
      <div
        className="h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-3xl font-bold text-center">Send Money</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-semibold">{name}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="amount"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
              />
            </div>
            <button
              onClick={async () => {
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
                    icon: <CheckCircle className="text-green-500" />,
                    duration: 3000,
                  });

                  setTimeout(() => {
                    navigate("/dashboard", { state: { updated: true } });
                  }, 2000);

                } catch (error) {
                  console.error("Transfer failed:", error.response?.data || error.message);
                  toast.error("Transfer failed. Please try again.");
                }
              }}
              className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
            >
              Initiate Transfer
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
}