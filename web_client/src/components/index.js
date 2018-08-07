import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./index.scss";
import { Auth } from "../utils";
import LandingPage from "./LandingPage";
import TestingPage from "./TestingPage";
import NotFoundPage from "./NotFoundPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

// eslint-disable-next-line
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <AuthenticatedRoute exact path="/testing" component={TestingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
