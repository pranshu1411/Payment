import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/Subheading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner';
import { CheckCircle, UserPlus } from 'lucide-react';

export const Signup = () => {
  const [emailId, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/signup", {
        emailId,
        username,
        password,
        firstName,
        lastName
      });
      localStorage.setItem("token", response.data.token)
      toast.success("Account created successfully", {
        icon: <CheckCircle className='text-emerald-500' />,
        duration: 2000,
      });
      navigate("/dashboard");
    } catch {
      toast.error("Signup unsuccessful")
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center relative overflow-hidden font-sans selection:bg-indigo-500/30 py-12">
      {/* Ambient background lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none fixed"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none fixed"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
          <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-indigo-500/30">
            <UserPlus className="w-8 h-8 text-indigo-400" />
          </div>
          <Heading label={"Create Account"} />
          <SubHeading label={"Enter your information to get started"} />
          
          <form onSubmit={handleSignup}>
            <div className="space-y-3 mt-4 text-left">
              <InputBox autoFocus={true} onChange={e => setEmail(e.target.value)} placeholder="youremail@company.com" label={"Email"} />
              <InputBox onChange={e => setUsername(e.target.value)} placeholder="Username" label={"Username"} />
              <InputBox type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" label={"Password"} />
              
              <div className="grid grid-cols-2 gap-4">
                  <InputBox onChange={e => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
                  <InputBox onChange={e => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
              </div>
            </div>

            <div className="pt-8">
              <Button type="submit" label={"Create Account"} />
            </div>
          </form>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}