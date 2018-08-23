import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { authAction } from "../../../actions";
import "./index.scss";
import { auth } from "../../../utils";

class NavBar extends React.Component {
  componentDidUpdate() {
    const { isUserAuthenticated, history } = this.props;
    if (!isUserAuthenticated) {
      history.push("/");
    }
  }

  render() {
    const { fetchLogout, isUserAuthenticated, user } = this.props;
    return (
      <div className="nav-bar">
        {isUserAuthenticated && (
          <Menu>
            <Menu.Item>
              <Link to="/">Latest News</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Link to="/testing">Testing</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <li>{user.email}</li>
              <button onClick={() => fetchLogout()}>Log out</button>
            </Menu.Item>
          </Menu>
        )}
        {!isUserAuthenticated && (
          <Menu>
            <Menu.Item>
              <Link to="/">Latest News</Link>
            </Menu.Item>

            <Menu.Item position="right">
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  fetchLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isUserAuthenticated: state.authReducer.isUserAuthenticated,
  user: state.authReducer.user
});

const dispatchToProps = dispatch => ({
  fetchLogout: () => {
    dispatch(authAction.fetchLogout());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(NavBar);
