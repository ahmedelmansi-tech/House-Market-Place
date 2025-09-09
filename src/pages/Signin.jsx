import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as RightArrow } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

//------------------  Sign In ----------------------------------------

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Signin = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  //---------------- Submit --------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const currnetUser = userCredential.user;

      if (currnetUser) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcom Back!</p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
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

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <RightArrow fill="#FFF" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>

        {/* Google OAuth */}
        <Link to="/sign-up" className="registerLink">
          Sign Up instead{" "}
        </Link>
      </div>
    </>
  );
};

export default Signin;
