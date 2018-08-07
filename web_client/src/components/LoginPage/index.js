import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authActions } from "../../actions";
import { NavBar } from "../global";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  state = {
    errors: {},
    user: {
      email: "",
      password: ""
    }
  };

  handleChange = e => {
    const { user } = this.state;
    const field = e.target.name;
    user[field] = e.target.value;

    this.setState({
      user
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      user: { email, password }
    } = this.state;

    this.props.fetchLogin({ email, password });
    this.setState({
      user: {
        email: "",
        password: ""
      }
    });
  };

  render() {
    const { errors, user } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <LoginForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          errors={errors}
          user={user}
        />
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  fetchLogin: PropTypes.func.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  fetchLogin: credential => {
    dispatch(authActions.fetchLogin(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);
