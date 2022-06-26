import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./user/pages/Login";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Languages from "./languages/pages/Languages";
import ForgotPassword from "./user/pages/ForgotPassword";
import Register from "./user/pages/Register";
import Genres from "./genres/pages/Genres";
import ViewScreen from "./view/pages/ViewScreen";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);


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
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
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
