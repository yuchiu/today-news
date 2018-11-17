import React from "react";
import PropTypes from "prop-types";

class NewsImg extends React.Component {
  render() {
    const { thumbnailImg } = this.props;
    return (
      <div className="news-img">
        <img className="news-img__thumbnail" src={thumbnailImg} alt="news" />
      </div>
    );
  }
}

NewsImg.propTypes = {
  thumbnailImg: PropTypes.string.isRequired
};
export default NewsImg;
