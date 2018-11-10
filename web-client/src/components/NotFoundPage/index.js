import React from "react";
import PropTypes from "prop-types";

import { NavBar } from "@/components/common";

const NotFoundPage = ({
  match: {
    params: { unfoundLocation }
  }
}) => (
  <React.Fragment>
    <NavBar />
    <main className="not-found-page">
      <p>404! The page `{unfoundLocation}` is not found.</p>
    </main>
  </React.Fragment>
);

NotFoundPage.propTypes = {
  unfoundLocation: PropTypes.object.isRequired
};

export default NotFoundPage;
