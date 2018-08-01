import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <Menu>
    <Menu.Item>
      <Link to="/">Latest News</Link>
    </Menu.Item>

    <Menu.Item position="right">
      <Link to="/about">About</Link>
    </Menu.Item>
  </Menu>
);

export default NavBar;
