import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";
const PrivateRoute = () => {
  const auth = getAuth();
  let logged = auth.currentUser;
  return logged ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
