import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authAction } from "../../actions";
import { NavBar } from "../global";
import RegisterForm from "./RegisterForm";

class RegisterPage extends React.Component {
  state = {
    errors: {},
    credentials: {
      email: "",
      password: "",
      confirmPassword: ""
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

    if (credentials.password !== credentials.confirmPassword) {
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
      credentials,
      credentials: { password, confirmPassword }
    } = this.state;

    if (password === confirmPassword) {
      this.props.fetchRegister(credentials);
      this.setState({
        credentials: {
          email: "",
          password: "",
          confirmPassword: ""
        }
      });
    }
  };

  render() {
    const { errors, credentials } = this.state;
    const { history } = this.props;
    return (
      <React.Fragment>
        <NavBar history={history} />
        <RegisterForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          errors={errors}
          credentials={credentials}
        />
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  fetchRegister: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated
});

const dispatchToProps = dispatch => ({
  fetchRegister: credential => {
    dispatch(authAction.fetchRegister(credential));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(RegisterPage);
