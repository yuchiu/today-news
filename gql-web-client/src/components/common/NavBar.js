import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Redux Boilerplate</Link>
        </Menu.Item>

        <Menu.Item position="right">
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default NavBar;
