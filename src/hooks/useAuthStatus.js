import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatues, setCheckingStatues] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      user && setLoggedIn(true);
      setCheckingStatues(false);
    });
  });
  return { loggedIn, checkingStatues };
};

export default useAuthStatus;
