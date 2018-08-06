import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./index.scss";
import { auth } from "../../../utils";

const NavBar = () => (
  <div className="nav-bar">
    {auth.isUserAuthenticated() && (
      <Menu>
        <Menu.Item>
          <Link to="/">Latest News</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/testing">Testing</Link>
        </Menu.Item>

        <Menu.Item position="right">
          <li>{auth.getEmail()}</li>
          <Link to="/">Log out</Link>
        </Menu.Item>
      </Menu>
    )}
    {!auth.isUserAuthenticated() && (
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

export default NavBar;
