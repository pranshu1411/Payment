import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Settings } from "./pages/Settings";
import { UserInfoUpdate } from "./pages/UserInfoUpdate";
import { UpdatePassword } from "./pages/UpdatePassword";
import { History } from "./pages/History";
import { Toaster } from "sonner";

function App() {
  return (
    <>
       <BrowserRouter>
       <Toaster richColors position="top-right" />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/update/personal" element={<UserInfoUpdate />} />
          <Route path="/update/password" element={<UpdatePassword />} />
          <Route path="/history" element={<History />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App