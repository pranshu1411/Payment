import { useState } from 'react';
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Appbar } from "../components/Appbar";
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

export const UserInfoUpdate = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex flex-col">
            <Appbar />

            <div className="flex flex-1 justify-center items-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Update Your Information"} />
                    <SubHeading label={"Enter your information to update"} />

                    <InputBox
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        label={"Username"}
                    />
                    <InputBox
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="Firstname"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Lastname"
                        label={"Last Name"}
                    />

                    <div className="pt-4">
                        <Button
                            onClick={async () => {
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
                                        icon: <CheckCircle className='text-green-500'/>,
                                        duration: 3000,
                                    });
                                    setTimeout(() => {
                                        navigate("/dashboard", { state: { updated: true } });
                                    }, 2000);
                                } catch (error) {
                                    toast.error("Update failed");
                                }
                            }}
                            label={"Update"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
