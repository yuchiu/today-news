import React from "react";
import PropTypes from "prop-types";

class NewsArticle extends React.Component {
  render() {
    const { article, toggleShowArticle } = this.props;
    return (
      <React.Fragment>
        <div>{article}</div>
        <button onClick={toggleShowArticle}>Hide Article</button>
      </React.Fragment>
    );
  }
}

NewsArticle.propTypes = {
  article: PropTypes.string.isRequired
};
export default NewsArticle;
