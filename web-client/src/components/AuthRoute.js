import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { userSelector } from "@/selectors";

class AuthRoute extends React.Component {
  render() {
    const { isUserLoggedIn, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isUserLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/singin" }} />
          )
        }
      />
    );
  }
}

AuthRoute.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired
};

const stateToProps = state => ({
  isUserLoggedIn: userSelector.getIsUserLoggedIn(state)
});

export default connect(
  stateToProps,
  null
)(AuthRoute);
