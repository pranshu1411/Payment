import { useState } from 'react';
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";

export const UpdatePassword = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Update Your Password"} />
                <SubHeading label={"Enter new Password"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} placeholder="Password" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        try {
                            await axios.put("http://localhost:3000/api/user/update/password", {
                                password
                            }, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            });
                            alert("Password updated successfully!");
                            navigate("/dashboard")
                        }
                        catch (error) {
                            alert(err.response?.data?.message || "Update failed");
                        }
                    }} label={"Update Password"} />
                </div>
            </div>
        </div>
    </div>
}