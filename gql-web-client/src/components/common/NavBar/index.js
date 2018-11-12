import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { Link } from "react-router-dom";

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
    const { history } = this.props;
    console.log("handle logout");
    history.push("/");
  };

  render() {
    const { current } = this.state;
    return (
      <div className="navbar-container">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="landing">
            <Link to="/">Today&apos;s News</Link>
          </Menu.Item>
          <Menu.Item style={{ float: "right" }}>
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
          <Menu.Item style={{ float: "right" }}>
            <Link to="/signin">Sign In</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default NavBar;
