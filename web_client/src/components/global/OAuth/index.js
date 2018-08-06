import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authActions } from "../../../actions";

const handleOAuth = (fetchOAuth, oauthType) => {
  fetchOAuth(oauthType);
};

const Oauth = ({ fetchOAuth }) => (
  <div>
    Oauth:
    <button onClick={handleOAuth(fetchOAuth, "google")}>Google+</button>
  </div>
);

Oauth.propTypes = {
  fetchOAuth: PropTypes.func.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  fetchOAuth: oauthType => {
    dispatch(authActions.fetchOAuth(oauthType));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(Oauth);
