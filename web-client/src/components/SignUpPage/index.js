import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

import "./index.scss";
import validateForm from "@/util/validateForm";
import { userAction } from "@/actions";
import { userSelector, errorSelector } from "@/selectors";
import SignUpForm from "./SignUpForm";

class SignUpPage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    });
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/singin");
  };

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;
    this.setState({
      credentials
    });
    if (credentials.password !== credentials.confirmPassword) {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword =
        "Password and Confirm Password don't match.";
      this.setState({ clientErrors });
    } else {
      const { clientErrors } = this.state;
      clientErrors.confirmPassword = "";
      this.setState({ clientErrors });
    }
  };

  handleRegister = e => {
    e.preventDefault();

    const {
      credentials,
      credentials: { username, email, password, confirmPassword }
    } = this.state;

    if (password === confirmPassword) {
      const clientErrors = validateForm.signup(credentials);
      this.setState({ clientErrors });

      if (Object.keys(clientErrors).length === 0) {
        const { fetchSignUpUser } = this.props;
        fetchSignUpUser({ username, email, password });
      }
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { isUserLoggedIn, error, isLoading } = this.props;
    return (
      <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
        {isUserLoggedIn && <Redirect to="/" />}
        <main className="signup-page">
          <SignUpForm
            handleRegister={this.handleRegister}
            onChange={this.handleChange}
            redirectToLogin={this.redirectToLogin}
            clientErrors={clientErrors}
            credentials={credentials}
            error={error}
          />
        </main>
      </LoadingOverlay>
    );
  }
}

SignUpPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,

  fetchSignUpUser: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isUserLoggedIn: userSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state),
  isLoading: userSelector.getUserIsLoading(state)
});

const dispatchToProps = dispatch => ({
  fetchSignUpUser: credential => {
    dispatch(userAction.fetchSignUpUser(credential));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(SignUpPage);
