import React from "react";
import { Logo, NavBar } from "../common";

class TestPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="testpage">
          <Logo size="256" />
          Landing
        </main>
      </React.Fragment>
    );
  }
}

export default TestPage;
