import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Sighnup";
import Nav from "./components/Nav";

// Notifaction
import { ToastContainer } from "react-toastify";

//Private Route to check if is logged
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<PrivateRoute />}>
            <Route path="/offers" element={<Offers />} />
          </Route>
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Nav />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
