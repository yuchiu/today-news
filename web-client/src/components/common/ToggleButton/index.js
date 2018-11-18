import React from "react";

import "./index.scss";

const ToggleButton = ({ text, cssClass, onClickFunc }) => (
  <button className={`toggle-button ${cssClass}`} onClick={onClickFunc}>
    {text}
  </button>
);

export default ToggleButton;
