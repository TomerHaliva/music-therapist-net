import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/auth-context";

import { auth } from "../../../Firebase-config";

import "./NavLinks.css";

const NavLinks = (props) => {
  const authContext = useContext(AuthContext);

  const logoutHandler = async (e) => {
    e.preventDefault();
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        authContext.logout();
        // history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li>
        <Link onClick={logoutHandler} to="/">
          LOGOUT
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
