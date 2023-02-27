import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import NavBarLoggedIn from "./NavBarLoggedIn";

const AuthNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem("idToken")) {
        const idToken = localStorage.getItem("idToken");
        try {
          const response = await fetch("http://localhost:5000/verify-token", {
            method: "POST",
            headers: {
              Authorization: idToken,
            },
          });
          if (!response.ok) {
            throw new Error("Token verification failed");
          }
          setIsLoggedIn(true);
        } catch (error) {
          console.error(error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  return (
    <div>
      {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
    </div>
  );
};

export default AuthNavBar;
