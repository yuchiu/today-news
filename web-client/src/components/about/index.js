import React from "react";
import { NavBar, Logo } from "../global";

const About = () => (
  <div>
    <NavBar />
    <Logo />
    <div id="about">
      About This Boilerplate
      <br />
      <a
        id="about"
        target="blank"
        href="https://github.com/yuchiu/Redux-Boilerplate"
      >
        Github repository
      </a>
    </div>
  </div>
);

export default About;
