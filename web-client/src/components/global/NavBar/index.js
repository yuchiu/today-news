import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userAction } from "@/actions";

class NavBar extends React.Component {
  state = {
    current: ""
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  handleLogout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    history.push("/");
  };

  render() {
    const { isUserAuthenticated, username } = this.props;
    return (
      <div className="navbar-container">
        {isUserAuthenticated &&
          username && (
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
              <Menu.Item key="testing">
                <Link to="/testing">
                  <Icon type="appstore" />
                  testing
                </Link>
              </Menu.Item>
              <Menu.SubMenu
                style={{ float: "right" }}
                title={
                  <span>
                    <Icon type="user" />
                    {username}
                  </span>
                }
              >
                <Menu.ItemGroup title="User's Setting">
                  <Menu.Item key="my-profile">
                    <Link to="/">My Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="edit-profile">
                    <Link to="/">Edit Profile</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="______________">
                  <Menu.Item key="logout">
                    <p onClick={this.handleLogout}>Log Out</p>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu>
          )}
        {!isUserAuthenticated && (
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
              <Link to="/register">
                <Icon type="user-add" />
                register
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }}>
              <Link to="/login">
                <Icon type="login" />
                login
              </Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  username: PropTypes.string
};

const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  username: state.userReducer.user.username
});

const dispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(userAction.logoutUser());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
