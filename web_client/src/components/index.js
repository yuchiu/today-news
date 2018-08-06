import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { auth } from "../utils";
import "./index.scss";
import {
  TestingPage,
  LandingPage,
  NotFoundPage,
  RegisterPage,
  LoginPage
} from "./allRoutes";

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isUserAuthenticated() ? (
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
      <PrivateRoute exact path="/testing" component={TestingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
