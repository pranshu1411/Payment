import { InputBox } from "../components/InputBox"
import { useState } from "react"
import { Button } from "../components/Button"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/Subheading"

export const Settings = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Update Your Information"} />
        <SubHeading label={"Enter your infromation to update"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="Username" label={"Username"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="Password" label={"Password"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="Firstname" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Lastname" label={"Last Name"} />
        <div className="pt-4">
          <Button onClick={async () => {
            try{
                await axios.put("http://localhost:3000/api/user/update", {
                    username,
                    password,
                    firstName,
                    lastName    
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                alert("Information updated successfully!");
                navigate("/dashboard")
            }
            catch(error) {
                alert(err.response?.data?.message || "Update failed");
            }
          }} label={"Update"} />
        </div>
      </div>
    </div>
  </div>
}