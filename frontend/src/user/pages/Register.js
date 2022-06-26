import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Register = () => {
  const history = useHistory();

  const submitRegisterHandler = async (event) => {
    event.preventDefault();

    const userRegisterDetails = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      email: event.target[2].value,
      password: event.target[3].value,
    };

    await axios
      .post("http://localhost:5000/api/users/register", userRegisterDetails)
      .then((user) => {
        if (user) {
          history.replace("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  return (
    <div className="main">
      <p className="sign" align="center">
        Sign Up
      </p>
      <form className="form1" onSubmit={submitRegisterHandler}>
        <input
          className="pass"
          type="text"
          align="center"
          placeholder="First Name"
        ></input>
        {/* <p className="formError">{register.formErrors.firstNameError}</p> */}

        <input
          className="pass"
          type="text"
          align="center"
          placeholder="Last Name"
        ></input>
        {/* <p className={classes.formError}>{register.formErrors.lastNameError}</p> */}

        <input
          className="un"
          type="text"
          align="center"
          placeholder="Email"
        ></input>
        {/* <p className={classes.formError}>{register.formErrors.emailError}</p> */}

        <input
          className="pass"
          type="password"
          align="center"
          placeholder="Password"
        ></input>
        {/* <p className={classes.formError}>{register.formErrors.passwordError}</p> */}

        <div className="btnContainer">
          <button type="submit" className="submit">
            Sign Up
          </button>
        </div>
        <br></br>
        <div className="btnContainer">
          <Link to="/">
            <button className="submit">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
