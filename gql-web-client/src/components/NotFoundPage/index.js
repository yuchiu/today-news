import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "../common";
import Content from "./Content";

class NotFoundPage extends React.Component {
  render() {
    const {
      match: {
        params: { unfoundLocation }
      }
    } = this.props;
    return (
      <React.Fragment>
        <main className="notfoundpage">
          <NavBar />
          <Content unfoundLocation={unfoundLocation} />
        </main>
      </React.Fragment>
    );
  }
}

NotFoundPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default NotFoundPage;
