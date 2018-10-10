import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "@/components/common";
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
        <NavBar />
        <main className="not-found-page">
          <Content unfoundLocation={unfoundLocation} />
        </main>
      </React.Fragment>
    );
  }
}

NotFoundPage.propTypes = {
  unfoundLocation: PropTypes.object.isRequired
};

export default NotFoundPage;
