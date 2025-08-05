import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/Subheading"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { CheckCircle } from "lucide-react"

export const Signin = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setEmail(e.target.value);
        }} placeholder="Email" label={"Email"} />
        <InputBox type="password" onChange={e => {
          setPassword(e.target.value);
        }} placeholder="Password" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            try {
              const response = await axios.post("http://localhost:3000/api/user/signin", {
                emailId,
                password
              });
              localStorage.setItem("token", response.data.token)
              toast.success("Login Successful", {
                icon: <CheckCircle className="text-green-500" />
              });
              navigate("/dashboard")
            } catch (e) {
              toast.error("Login unsuccessful")
            }
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}