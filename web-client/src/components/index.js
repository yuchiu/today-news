import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "@/utils/axiosInterceptors";
import "./index.scss";
import { AuthRoute, AutoAuth } from "./global";
import LandingPage from "./LandingPage";
import TestingPage from "./TestingPage";
import NotFoundPage from "./NotFoundPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

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
        <React.Fragment>
          {/* try to log in user automatically if auth info exist */}
          <AutoAuth />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <AuthRoute exact path="/testing" component={TestingPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default Router;
