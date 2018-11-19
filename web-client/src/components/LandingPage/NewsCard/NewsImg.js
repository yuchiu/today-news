import React from "react";
import PropTypes from "prop-types";

const NewsImg = ({ thumbnailImg }) => (
  <div className="news-img">
    <img className="news-img__thumbnail" src={thumbnailImg} alt="news" />
  </div>
);

NewsImg.propTypes = {
  thumbnailImg: PropTypes.string
};
export default NewsImg;
