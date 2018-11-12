import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

import "./index.scss";
import validateForm from "@/util/validateForm";
import { userAction } from "@/actions";
import { NavBar } from "@/components/common";
import { userSelector, errorSelector } from "@/selectors";
import SignInForm from "./SignInForm";

class SignInPage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      password: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        username: "",
        password: ""
      }
    });
  }

  redirectToRegister = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;

    this.setState({
      credentials
    });
  };

  handleLogin = e => {
    e.preventDefault();

    const { credentials } = this.state;

    const clientErrors = validateForm.singin(credentials);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const { fetchSignInUser } = this.props;
      fetchSignInUser(credentials);
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { isUserLoggedIn, error, isLoading } = this.props;
    return (
      <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
        {isUserLoggedIn && <Redirect to="/" />}
        <main className="signin-page">
          <NavBar />
          <SignInForm
            handleLogin={this.handleLogin}
            onChange={this.handleChange}
            redirectToRegister={this.redirectToRegister}
            clientErrors={clientErrors}
            credentials={credentials}
            error={error}
          />
        </main>
      </LoadingOverlay>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  fetchSignInUser: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isUserLoggedIn: userSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state),
  isLoading: userSelector.getUserIsLoading(state)
});

const dispatchToProps = dispatch => ({
  fetchSignInUser: credential => {
    dispatch(userAction.fetchSignInUser(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(SignInPage);
