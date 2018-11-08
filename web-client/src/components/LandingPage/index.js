import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

import "./index.scss";
import { newsSelector } from "@/reducers/selectors";
import { NavBar } from "@/components/common";
import NewsBoard from "./NewsBoard";

class LandingPage extends React.Component {
  render() {
    const { history, isLoading } = this.props;

    return (
      <LoadingOverlay active={isLoading} spinner zIndex={10} text="Loading">
        <main className="landing-page">
          <NavBar history={history} />
          <NewsBoard />
        </main>
      </LoadingOverlay>
    );
  }
}

LandingPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isLoading: newsSelector.getNewsIsLoading(state)
});
export default connect(
  stateToProps,
  null
)(LandingPage);
