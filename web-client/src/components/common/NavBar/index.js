import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userAction } from "@/actions";
import { userSelector } from "@/reducers/selectors";

class NavBar extends React.Component {
  state = {
    current: ""
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
    const { isUserLoggedIn, currentUsername } = this.props;
    return (
      <div className="navbar-container">
        {isUserLoggedIn &&
          currentUsername && (
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Link to="/">
                  <Icon type="home" />
                  Today&apos;s News
                </Link>
              </Menu.Item>
              <Menu.SubMenu
                style={{ float: "right" }}
                title={
                  <span>
                    <Icon type="user" />
                    {currentUsername}
                  </span>
                }
              >
                <Menu.Item key="singout">
                  <p onClick={this.handleLogout}>Sign Out</p>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          )}
        {!isUserLoggedIn && (
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="landing">
              <Link to="/">
                <Icon type="home" />
                Today&apos;s News
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }}>
              <Link to="/signup">
                <Icon type="user-add" />
                signup
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }}>
              <Link to="/singin">
                <Icon type="singin" />
                singin
              </Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
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
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
