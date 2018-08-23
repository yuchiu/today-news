import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { validateForm } from "../../utils";
import { authAction } from "../../actions";
import { NavBar, InlineError } from "../global";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      email: "",
      password: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        email: "",
        password: ""
      }
    });
  }

  redirectToRegister = () => {
    const { history } = this.props;
    history.push("/register");
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

    const clientErrors = validateForm.login(credentials);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const { loginUser } = this.props;
      loginUser(credentials);
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { isUserAuthenticated, message } = this.props;
    return (
      <React.Fragment>
        {isUserAuthenticated && <Redirect to="/" />}
        <NavBar />
        <LoginForm
          handleLogin={this.handleLogin}
          onChange={this.handleChange}
          redirectToRegister={this.redirectToRegister}
          clientErrors={clientErrors}
          credentials={credentials}
        />
        <br />
        {message && <InlineError text={message} />}
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  message: PropTypes.string
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated,
  message: state.authReducer.message
});

const dispatchToProps = dispatch => ({
  loginUser: credential => {
    dispatch(authAction.loginUser(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);
