import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as RightArrow } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up</p>
        </header>

        <main>
          <form>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={handleChange}
            />

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
