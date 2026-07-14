import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { Appbar } from "../components/Appbar";

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex flex-col">
      <Appbar />
      <div className="flex flex-1 justify-center items-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"What do you want to update?"} />
          <SubHeading label={"Click on the button to change the specifics."} />
          <div className="pt-4 flex flex-col gap-2">
            <Button label={"Update Personal Info"} onClick={() => navigate("/update/personal")} />
            <Button label={"Update Password"} onClick={() => navigate("/update/password")} />
          </div>
        </div>
      </div>
    </div>
  );
};
