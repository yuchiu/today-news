import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class NewsCard extends React.Component {
  handleClickLog = newsDigestId => {
    const { fetchClickLog } = this.props;
    fetchClickLog(newsDigestId);
  };

  render() {
    const { news } = this.props;
    return (
      <div className="news-card">
        <div className="news-img">
          <img
            className="news-img__thumbnail"
            src={news.urlToImage}
            alt="news"
          />
        </div>
        <div className="news-detail">
          <div className="news-detail__top">
            <h4 className="news-detail__top__title">{news.title}</h4>
            <p className="news-detail__top__desc">{news.description}</p>
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
              {news.publishedAt.$date != null && (
                <div className="news-detail__bottom__meta__time">
                  <Moment
                    format="HH:mm MMM d, YYYY"
                    date={news.publishedAt.$date}
                  />
                </div>
              )}
            </div>
            <a
              className="news-detail__bottom__link"
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.handleClickLog.bind(this, news.digest)}
            >
              Link to article
            </a>
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
