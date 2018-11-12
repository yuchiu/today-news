import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import "./index.scss";
import validateForm from "@/util/validateForm";
import { NavBar } from "@/components/common";
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
    console.log("handle login");
    // const { credentials } = this.state;

    // const clientErrors = validateForm.singin(credentials);
    // this.setState({ clientErrors });
    // if (Object.keys(clientErrors).length === 0) {
    //   const { fetchSignInUser } = this.props;
    //   fetchSignInUser(credentials);
    // }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const error = "";
    return (
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
export default SignInPage;
