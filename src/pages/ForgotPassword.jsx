import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as RightArrow } from "../assets/svg/keyboardArrowRightIcon.svg";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  //---------------------------Functions--------------------------

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Check Your Mail !", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.log(auth);
    } catch (error) {
      toast.error("Somthing Went Wrong");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forget Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <Link className="forgotPasswordLink" to={"/sign-in"}>
            Sign in
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>

            <button className="signInButton">
              <RightArrow width={35} height={35} fill="#ffffff" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
