import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import NavBarLoggedIn from "./NavBarLoggedIn";
import { checkToken } from "../components/forms/LoginForm";

const AuthNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkToken()) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
    </div>
  );
};

export default AuthNavBar;
