import React, { Fragment } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import { auth } from "../../Firebase-config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./Login.css";

const ForgotPassword = () => {
  function submitResetPasswordHandler(event) {
    event.preventDefault();

    const email = event.target[0].value;
    let firebaseError = "";

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert("Password reset email sent!");
        // history.push("/login");
      })
      .catch((error) => {
        firebaseError = error.code;
        // const errorMessage = error.message;
        // dispatch(
        //   validateForm({
        //     firebaseError,
        //     email: email,
        //   })
        // );
      });
  }

  return (
    <Fragment>
      <div className="main">
        <form className="form1" onSubmit={submitResetPasswordHandler}>
          <input
            className="un"
            id="forgot"
            type="text"
            align="center"
            placeholder="Email"
            autoComplete="on"
          ></input>
          {/* <p className="formError">{forgotPassword.formErrors.emailError}</p> */}

          <div className="btnContainer">
            <button type="submit" className="submit">
              Reset Password
            </button>
          </div>
        </form>
        <br></br>

        <div className="btnContainer">
          <Link to="/" replace>
            <button className="submit">Cancel</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
