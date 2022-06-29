import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import "./Login.css";
import { auth } from "../../Firebase-config";
import { AuthContext } from "../../shared/context/auth-context";

const Login = () => {
  const authContext = useContext(AuthContext);

  const submitLoginHandler = async (event) => {
    event.preventDefault();
    const userDetails = {
      email: event.target[0].value,
      password: event.target[1].value,
    };

    // setPersistence(auth, browserSessionPersistence).then(() => {
    signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
      .then((user) => {
        if (user) {
          authContext.login();
        }
      })
      .catch((err) => {
        console.log(err.code);
      });
    // });
  };

  return (
    <div className="main">
      <p className="sign" align="center">
        Sign in
      </p>
      <form className="form1" onSubmit={submitLoginHandler}>
        <input
          className="un"
          id="email"
          type="text"
          align="center"
          placeholder="Email"
          autoComplete="on"
        ></input>
        {/* <p className="formError">{login.formErrors.emailError}</p> */}
        <input
          className="pass"
          id="password"
          type="password"
          align="center"
          placeholder="Password"
          autoComplete="on"
        ></input>
        {/* <p className={classes.formError}>{login.formErrors.passwordError}</p> */}

        <div className="btnContainer">
          <button type="submit" className="submit">
            Sign In
          </button>
        </div>
        <Link to="forgot-password" replace>
          <span className="forgotPassword">
            <span className="forgot">Forgot Password?</span>
          </span>
        </Link>
        {/* {window.location.href === } */}
        <div className="register">
          <p>
            Not a member?<Link to="/register"> Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
