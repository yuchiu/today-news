import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./index.scss";
import { userAction, searchAction } from "@/actions";
import { userSelector } from "@/selectors";
import SearchInput from "./SearchInput";

class NavBar extends React.Component {
  redirectToLanding = () => {
    const { history } = this.props;
    history.push("/");
  };

  redirectToSignIn = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  redirectToSignUp = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  handleLogout = () => {
    const { signOutUser, history } = this.props;
    signOutUser();
    history.push("/");
  };

  render() {
    const {
      isUserLoggedIn,
      history,
      clearSearchNewsResult,
      currentUsername
    } = this.props;
    return (
      <Menu className="navbar-wrapper">
        <Menu.Item className="borderless" onClick={this.redirectToLanding}>
          <i className="fab fa-neos fa-lg brand-logo" />
          <span className="brand-title">Today&apos;s News</span>
        </Menu.Item>
        <Menu.Item className="borderless " position="left">
          <SearchInput clearSearchNewsResult={clearSearchNewsResult} />
        </Menu.Item>

        {isUserLoggedIn && (
          <Menu.Item
            position="right"
            className="borderless "
            id="menu-item-user-profile"
          >
            <Dropdown
              item
              className="borderless user-profile"
              icon="user outline"
              text={`Hi, ${currentUsername} `}
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handleLogout}>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
        {!isUserLoggedIn && (
          <React.Fragment>
            <Menu.Item
              style={{ float: "right" }}
              className="borderless"
              onClick={this.redirectToSignIn}
            >
              Sign In
            </Menu.Item>
            <Menu.Item
              style={{ float: "right" }}
              className="borderless"
              onClick={this.redirectToSignUp}
            >
              Sign Up
            </Menu.Item>
          </React.Fragment>
        )}
      </Menu>
    );
  }
}

NavBar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  signOutUser: PropTypes.func.isRequired,
  currentUsername: PropTypes.string
};

const stateToProps = state => ({
  isUserLoggedIn: userSelector.getIsUserLoggedIn(state),
  currentUsername: userSelector.getCurrentUsername(state)
});

const dispatchToProps = dispatch => ({
  signOutUser: () => {
    dispatch(userAction.signOutUser());
  },
  clearSearchNewsResult: () => {
    dispatch(searchAction.clearSearchNewsResult);
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
