import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const ToggleButton = ({ text, cssClass, onClickFunc }) => (
  <button className={`toggle-button ${cssClass}`} onClick={onClickFunc}>
    {text}
  </button>
);

ToggleButton.propTypes = {
  text: PropTypes.string,
  cssClass: PropTypes.string,

  onClickFunc: PropTypes.func
};

export default ToggleButton;
