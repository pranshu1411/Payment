import { useState } from 'react';
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Appbar } from "../components/Appbar";
import { toast } from 'sonner';
import { CheckCircle, UserCircle } from 'lucide-react';

export const UserInfoUpdate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:3000/api/user/update/personal",
        {
          username,
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("User Information Updated", {
        icon: <CheckCircle className='text-emerald-500' />,
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/dashboard", { state: { updated: true } });
      }, 2000);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden flex flex-col">
      <Appbar />
      
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>

      <div className="flex flex-1 justify-center items-center relative z-10 px-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center w-full max-w-md">
          <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-500/30">
            <UserCircle className="w-8 h-8 text-indigo-400" />
          </div>
          <Heading label={"Personal Info"} />
          <SubHeading label={"Enter your new information"} />

          <form onSubmit={handleUpdate}>
            <div className="mt-6 text-left space-y-3">
              <InputBox
                autoFocus={true}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                label={"Username"}
              />
              <InputBox
                onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
                label={"First Name"}
              />
              <InputBox
                onChange={e => setLastName(e.target.value)}
                placeholder="Last name"
                label={"Last Name"}
              />
            </div>

            <div className="pt-8">
              <Button type="submit" label={"Save Changes"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
