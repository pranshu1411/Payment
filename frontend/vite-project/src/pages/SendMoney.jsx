import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';
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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-slate-300">
      <Appbar />
      <div className="flex flex-1 justify-center items-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Send Money"}/>
          <SubHeading label={"Enter the amount to pay"}/>

          <InputBox
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount"
            label={`To @${username}`}
          />
          <div className="pt-4">
            <Button
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
              label={"Initiate Transfer"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};