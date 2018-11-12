import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import "./index.scss";
import validateForm from "@/util/validateForm";
import { NavBar } from "@/components/common";
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
    console.log("handle register");
    // const {
    //   credentials,
    //   credentials: { username, email, password, confirmPassword }
    // } = this.state;

    // if (password === confirmPassword) {
    //   const clientErrors = validateForm.signup(credentials);
    //   this.setState({ clientErrors });

    //   if (Object.keys(clientErrors).length === 0) {
    //     const { fetchSignUpUser } = this.props;
    //     fetchSignUpUser({ username, email, password });
    //   }
    // }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const error = "";

    return (
      <main className="signup-page">
        <NavBar />
        <SignUpForm
          handleRegister={this.handleRegister}
          onChange={this.handleChange}
          redirectToLogin={this.redirectToLogin}
          clientErrors={clientErrors}
          credentials={credentials}
          error={error}
        />
      </main>
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

export default SignUpPage;
