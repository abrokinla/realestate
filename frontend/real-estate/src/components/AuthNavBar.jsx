import React from "react";
import NavBar from "./NavBar";
import NavBarLoggedIn from "./NavBarLoggedIn";

const AuthNavBar = ({ loggedIn }) => {
  return <div>{loggedIn ? <NavBarLoggedIn /> : <NavBar />}</div>;
};

export default AuthNavBar;
