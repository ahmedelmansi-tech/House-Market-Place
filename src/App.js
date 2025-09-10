import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Sighnup";
import Nav from "./components/Nav";

// Notifaction
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Nav />
      </BrowserRouter>
      <ToastContainer />
      {/* Will be The Navbar  */}
    </>
  );
}

export default App;
