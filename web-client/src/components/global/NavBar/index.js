import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authAction } from "../../../actions";
import "./index.scss";
import { auth } from "../../../utils";

class NavBar extends React.Component {
  handleClick = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    history.push("/");
  };

  render() {
    const { isUserAuthenticated, username } = this.props;
    return (
      <div className="nav-bar">
        {isUserAuthenticated &&
          username && (
            <div className="nav-bar">
              <Link to="/">Latest News</Link>
              <span>Hi! {username}</span>
              <Link to="/testing">Testing</Link>
              <Link to="/testing">
                <li>testing</li>
              </Link>
              <Button type="primary" onClick={this.handleClick}>
                Log Out
              </Button>
            </div>
          )}
        {!isUserAuthenticated && (
          <div className="nav-bar">
            <Link to="/">Latest News</Link>
            <Link to="/login">
              <li>login</li>
            </Link>
            <Link to="/register">
              <li>register</li>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  username: PropTypes.string,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated,
  username: state.authReducer.user.username
});

const dispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(authAction.logoutUser());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
