import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/Subheading"
import { useState } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner";
import { CheckCircle, Lock, ArrowLeft } from "lucide-react"

export const Signin = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/signin", {
        emailId,
        password
      });
      localStorage.setItem("token", response.data.token)
      toast.success("Login Successful", {
        icon: <CheckCircle className="text-emerald-500" />
      });
      navigate("/dashboard")
    } catch (e) {
      toast.error(e.response?.data?.message || "Login unsuccessful")
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Back to Home Link */}
      <Link to="/" className="absolute top-8 left-8 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors cursor-pointer group z-20">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm">Back to Home</span>
      </Link>

      {/* Ambient background lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
          <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-500/30">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>
          <Heading label={"Welcome Back"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          
          <form onSubmit={handleSignin}>
            <div className="space-y-4 mt-6 text-left">
              <InputBox autoFocus={true} onChange={e => setEmail(e.target.value)} placeholder="Email" label={"Email"} />
              <InputBox isPassword={true} onChange={e => setPassword(e.target.value)} placeholder="Password" label={"Password"} />
            </div>

            <div className="pt-8">
              <Button type="submit" label={"Sign In"} />
            </div>
          </form>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}