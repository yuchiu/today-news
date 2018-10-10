import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "@/actions";

class AutoAuth extends React.Component {
  componentDidMount() {
    const { tryAutoSignIn } = this.props;
    tryAutoSignIn();
  }

  render() {
    return null;
  }
}

AutoAuth.propTypes = {
  tryAutoSignIn: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  tryAutoSignIn: () => {
    dispatch(userAction.tryAutoSignIn());
  }
});

export default connect(
  null,
  dispatchToProps
)(AutoAuth);
