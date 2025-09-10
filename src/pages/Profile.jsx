import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
const Profile = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
    console.log(auth.currentUser);
  }, []);

  return user ? `Welcome ${user.displayName}` : "You are Not Logged";
};

export default Profile;
