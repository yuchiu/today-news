import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authActions } from "../../actions";
import { OAuth, NavBar } from "../global";
import RegisterForm from "./RegisterForm";

class RegisterPage extends React.Component {
  state = {
    errors: {},
    user: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  };

  handleChange = e => {
    const { user } = this.state;
    const field = e.target.name;
    user[field] = e.target.value;

    this.setState({
      user
    });

    if (user.password !== user.confirmPassword) {
      const { errors } = this.state;
      errors.password = "Password and Confirm Password don't match.";
      this.setState({ errors });
    } else {
      const { errors } = this.state;
      errors.password = "";
      this.setState({ errors });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      user: { email, password, confirmPassword }
    } = this.state;

    console.log("email:", email);
    console.log("password:", password);
    console.log("confirm_password:", confirmPassword);

    if (password === confirmPassword) {
      this.props.fetchRegister({ email, password });
      this.setState({
        user: {
          email: "",
          password: "",
          confirmPassword: ""
        }
      });
    }
  };

  render() {
    const { errors, user } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <RegisterForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          errors={errors}
          user={user}
        />
        <OAuth />
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  fetchRegister: PropTypes.func.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  fetchRegister: credential => {
    dispatch(authActions.fetchText(credential));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(RegisterPage);
