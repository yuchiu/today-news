import React from "react";
import { NavBar, Logo } from "@/components/common";

class AboutPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Logo size="256" />
        <main className="aboutpage">
          About This Redux Boilerplate
          <br />
          <br />
          <a
            className="about"
            target="blank"
            href="https://github.com/yuchiu/Redux-Boilerplate"
          >
            Github repository
          </a>
        </main>
      </React.Fragment>
    );
  }
}

export default AboutPage;
