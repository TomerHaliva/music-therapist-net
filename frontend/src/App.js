import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { auth } from "../src/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./user/pages/Login";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Languages from "./languages/pages/Languages";
import ForgotPassword from "./user/pages/ForgotPassword";
import Register from "./user/pages/Register";
import Genres from "./genres/pages/Genres";
import ViewScreen from "./view/pages/ViewScreen";
import { AuthContext } from "./shared/context/auth-context";
import Loading from "./shared/components/UIElements/Loading";
import axios from "axios";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    auth.currentUser && getUserDetails();
  }, [auth.currentUser]);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      login();
    } else {
      logout();
    }
  });

  const getUserDetails = async () => {
    const userCardentials = auth.currentUser;
    if (userCardentials)
      await axios
        .get(`http://localhost:5000/api/users/${userCardentials.uid}`)
        .then((res) => {
          setCurrentUser(res.data.user);
        });
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <Languages />
        </Route>
        <Route path="/home/:language" exact>
          <Genres />
        </Route>
        <Route path="/home/:language/:genre" exact>
          <ViewScreen />
        </Route>
        <Redirect to="/home" />
        <Loading show={true} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {/* <Redirect to="/" /> */}
        {/* <Loading show={true} /> */}
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        {isLoggedIn && <MainNavigation />}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
