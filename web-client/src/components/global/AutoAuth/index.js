import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "@/actions";

class AutoAuth extends React.Component {
  componentDidMount() {
    const { autoAuth } = this.props;
    autoAuth();
  }

  render() {
    return null;
  }
}

AutoAuth.propTypes = {
  autoAuth: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  autoAuth: () => {
    dispatch(userAction.autoAuth());
  }
});

export default connect(
  null,
  dispatchToProps
)(AutoAuth);
