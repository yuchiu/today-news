import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./index.css";
import { auth } from "../utils";
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
      auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);
class Router extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    return hasError ? (
      <h2>Error occured while rendering this page</h2>
    ) : (
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
  }
}

export default Router;
