import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { TestingPage, LandingPage, NotFoundPage } from "./allRoutes";
import { auth } from "../utils";
import "./index.scss";

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
      <PrivateRoute exact path="/testing" component={TestingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
