import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const SearchResultNews = ({ searchNewsResult }) => (
  <div className="search-result">
    {searchNewsResult.map((news, index) => (
      <div
        className="result-news-card"
        key={`${news.digest}-search-index-${index}`}
      >
        <div className="result-news-card__img">
          <img
            alt="img"
            className="result-news-card__img__thumbnail"
            src={news.urlToImage}
          />
        </div>
        <div className="result-news-card__detail">
          <div className="result-news-card__detail__top">
            <div className="result-news-card__detail__top__title">
              {news.title}
            </div>
            <div className="result-news-card__detail__top__description">
              {news.description}
            </div>
          </div>
          <div className="result-news-card__detail__bottom">
            <div className="result-news-card__detail__bottom__class">
              {news.class}
            </div>
            <div className="result-news-card__detail__bottom__source">
              {news.source}
            </div>
            <a
              className="result-news-card__detail__bottom__url"
              href={news.url}
            >
              Link to Article
            </a>
            <div className="result-news-card__detail__bottom__date">
              <Moment
                format="HH:mm MMM DD, YYYY"
                date={news.publishedAt.$date}
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

SearchResultNews.propTypes = {
  searchNewsResult: PropTypes.array.isRequired
};

export default SearchResultNews;
