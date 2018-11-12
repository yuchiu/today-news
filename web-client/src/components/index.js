import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { userAction } from "@/actions";
import LandingPage from "./LandingPage";
import NotFoundPage from "./NotFoundPage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

class Router extends React.Component {
  state = {
    hasError: false
  };

  componentDidMount() {
    // try to log in user automatically if auth info exist
    const { tryAutoSignIn } = this.props;
    tryAutoSignIn();
  }

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
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  tryAutoSignIn: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  tryAutoSignIn: () => {
    dispatch(userAction.tryAutoSignIn());
  }
});

export default connect(
  null,
  dispatchToProps
)(Router);
