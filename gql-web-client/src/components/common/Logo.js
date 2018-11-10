import React from "react";
import PropTypes from "prop-types";

import ycLogo32 from "@/assets/images/logos/yc-logo-black-32.png";
import ycLogo64 from "@/assets/images/logos/yc-logo-black-64.png";
import ycLogo128 from "@/assets/images/logos/yc-logo-black-128.png";
import ycLogo256 from "@/assets/images/logos/yc-logo-black-256.png";
import ycLogo512 from "@/assets/images/logos/yc-logo-black-512.png";

class Logo extends React.PureComponent {
  checkSize = size => {
    switch (size) {
      case "32":
        return <img src={ycLogo32} className="logo" alt="logo" />;

      case "64":
        return <img src={ycLogo64} className="logo" alt="logo" />;

      case "128":
        return <img src={ycLogo128} className="logo" alt="logo" />;

      case "256":
        return <img src={ycLogo256} className="logo" alt="logo" />;

      case "512":
        return <img src={ycLogo512} className="logo" alt="logo" />;
      default:
        return <img src={ycLogo32} className="logo" alt="logo" />;
    }
  };

  render() {
    const { size } = this.props;
    return (
      <React.Fragment>
        {/* return logo accordingly */}
        {this.checkSize(size)}
      </React.Fragment>
    );
  }
}
Logo.propTypes = {
  size: PropTypes.string
};

export default Logo;
