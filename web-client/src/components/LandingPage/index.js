import React from "react";
import PropTypes from "prop-types";

import "./index.scss";
import { NavBar, Logo } from "@/components/common";
import NewsPanel from "./NewsPanel";

const LandingPage = ({ history }) => (
  <div>
    <NavBar history={history} />
    <Logo />
    <NewsPanel />
  </div>
);

LandingPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default LandingPage;
