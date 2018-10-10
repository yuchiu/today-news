import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthRoute from "./AuthRoute";
import AutoAuth from "./AutoAuth";
import LandingPage from "./LandingPage";
import NotFoundPage from "./NotFoundPage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

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
            <Route exact path="/singin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default Router;
