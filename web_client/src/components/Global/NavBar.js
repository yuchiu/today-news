import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <div>
    <Menu>
      <Menu.Item>
        <Link to="/">Latest News</Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link to="/testing">Testing</Link>
      </Menu.Item>
    </Menu>
  </div>
);

export default NavBar;
