import React from "react";
import PropTypes from "prop-types";

import { ToggleButton } from "@/components/common";

class NewsArticle extends React.Component {
  render() {
    const { article, toggleShowArticle } = this.props;
    return (
      <div className="news-article">
        <div className="news-article__text">{article}</div>
        <ToggleButton
          className={`news-article__button`}
          text="Hide Read More"
          onClickFunc={toggleShowArticle}
        />
      </div>
    );
  }
}

NewsArticle.propTypes = {
  article: PropTypes.string.isRequired
};
export default NewsArticle;
