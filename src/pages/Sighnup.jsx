import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as RightArrow } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
// Authentication Stuff
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// Storing Data into the DB
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
// Notifcation

import { toast } from "react-toastify";
// ///////////////////////// -Start of the Component-/////////////////////////////////////////
const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  // ------------------------------- Typing Inputs ----------------------------------------------
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // ---------------------------------- Submit ---------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCrediential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCrediential.user;

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Store DB

      const clonedData = { ...formData };
      clonedData.timestamp = serverTimestamp();
      await setDoc(
        doc(db, "users", user.uid),
        {
          clonedData,
        },
        { merge: true }
      );
      toast.success(`Welcome ${user.displayName}`, {
        autoClose: 1500,
        hideProgressBar: true,
      });
      navigate("/profile");
    } catch (error) {
      toast.warning("something went wrong");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up</p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={handleChange}
            />

            <input
              type="text"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={handleChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "password" : "text"}
                className="passwordInput"
                placeholder="password"
                id="password"
                value={password}
                onChange={handleChange}
              />

              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            </div>

            <Link to="/forgot-password" className="forgetPasswordLink">
              Forgot Password ?
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <RightArrow fill="#FFF" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>

        {/* Google OAuth */}
        <Link to="/sign-in" className="registerLink">
          Sign in instead
        </Link>
      </div>
    </>
  );
};

export default Signup;
