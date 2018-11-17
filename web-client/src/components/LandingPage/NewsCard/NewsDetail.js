import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class NewsCard extends React.Component {
  render() {
    const { news, showArticle, toggleShowArticle, handleClickLog } = this.props;
    return (
      <div className="news-detail">
        <div className="news-detail__top">
          <h4 className="news-detail__top__title">{news.title}</h4>
          <p className="news-detail__top__desc">{news.description}</p>
          {showArticle ? (
            <button onClick={toggleShowArticle}>Hide Article</button>
          ) : (
            <button onClick={toggleShowArticle}>Show Article</button>
          )}
        </div>
        <div className="news-detail__bottom">
          <div className="news-detail__bottom__meta">
            {news.reason != null && (
              <div className="news-detail__bottom__meta__reason">
                {news.reason}
              </div>
            )}
            {news.class != null && (
              <div className="news-detail__bottom__meta__class">
                {news.class}
              </div>
            )}
            {news.source != null && (
              <div className="news-detail__bottom__meta__source">
                {news.source}
              </div>
            )}
          </div>
          <div className="news-detail__bottom__reference">
            <a
              className="news-detail__bottom__reference__link"
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClickLog}
            >
              Link to article
            </a>
            {news.publishedAt.$date != null && (
              <div className="news-detail__bottom__reference__time">
                <Moment
                  format="HH:mm MMM d, YYYY"
                  date={news.publishedAt.$date}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

NewsCard.propTypes = {
  news: PropTypes.object
};
export default NewsCard;