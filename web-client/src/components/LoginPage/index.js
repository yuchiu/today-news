import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authAction } from "../../actions";
import { NavBar } from "../global";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  state = {
    errors: {},
    credentials: {
      email: "",
      password: ""
    }
  };

  componentDidUpdate() {
    const { isUserAuthenticated, history } = this.props;
    if (isUserAuthenticated) {
      history.push("/");
    }
  }

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;

    this.setState({
      credentials
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { credentials } = this.state;

    this.props.fetchLogin(credentials);
    this.setState({
      credentials: {
        email: "",
        password: ""
      }
    });
  };

  render() {
    const { errors, credentials } = this.state;
    const { history } = this.props;
    return (
      <React.Fragment>
        <NavBar history={history} />
        <LoginForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          errors={errors}
          credentials={credentials}
        />
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  fetchLogin: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated
});

const dispatchToProps = dispatch => ({
  fetchLogin: credential => {
    dispatch(authAction.fetchLogin(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);
