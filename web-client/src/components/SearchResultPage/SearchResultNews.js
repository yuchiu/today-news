import React from "react";

class SearchResultNews extends React.Component {
  render() {
    const { searchNewsResult } = this.props;
    return (
      <div className="search-result">
        {searchNewsResult.map((news, index) => (
          <div
            className="result-news-card"
            key={`${news.digest}-search-index-${index}`}
          >
            <div className="result-news-card__img">{news.urlToImage}</div>
            <div className="result-news-card__title">{news.title}</div>
            <div className="result-news-card__class">{news.class}</div>
            <div className="result-news-card__source">{news.source}</div>
            <div className="result-news-card__description">
              {news.description}
            </div>
            <div className="result-news-card__url">{news.url}</div>
            <div className="result-news-card__date">{news.publishedAt}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResultNews;
