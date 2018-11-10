import React from "react";
import PropTypes from "prop-types";

class Content extends React.PureComponent {
  render() {
    const { unfoundLocation } = this.props;
    return <p>404! The page `{unfoundLocation}` is not found.</p>;
  }
}

Content.propTypes = {
  unfoundLocation: PropTypes.string.isRequired
};
export default Content;
