import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authActions } from "../../actions";
import { auth } from "../../utils";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  state = {
    errors: {},
    user: {
      email: "",
      password: ""
    }
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

  handleChange = e => {
    const { user } = this.state;
    const field = e.target.name;
    user[field] = e.target.value;

    this.setState({
      user
    });
  };

  render() {
    const { errors, user } = this.state;
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        errors={errors}
        user={user}
      />
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  fetchLogin: PropTypes.func.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  fetchLogin: credential => {
    dispatch(authActions.fetchText(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);
