import React from "react";
import PropTypes from "prop-types";

import { ToggleButton } from "@/components/common";

const NewsArticle = ({ article, toggleShowArticle }) => (
  <div className="news-article">
    <div className="news-article__text">{article}</div>
    <ToggleButton
      className={`news-article__button`}
      text="Hide Read More"
      onClickFunc={toggleShowArticle}
    />
  </div>
);
NewsArticle.propTypes = {
  article: PropTypes.string.isRequired,

  toggleShowArticle: PropTypes.func.isRequired
};
export default NewsArticle;
