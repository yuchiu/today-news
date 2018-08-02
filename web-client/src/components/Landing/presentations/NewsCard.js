import React from "react";
import PropTypes from "prop-types";

const NewsCard = ({ news }) => (
  <a
    className="list-group-item news-card"
    href={news.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="row">
      <div className="col s4 fill">
        <img src={news.urlToImage} alt="news" />
      </div>
      <div className="col s8">
        <div className="news-intro-col">
          <div className="news-intro-panel">
            <h4>{news.title}</h4>
            <div className="news-description">
              <p>{news.description}</p>
              <div>
                {news.source != null && (
                  <div className="chip light-blue news-chip">{news.source}</div>
                )}
                {news.reason != null && (
                  <div className="chip light-green news-chip">
                    {news.reason}
                  </div>
                )}
                {news.time != null && (
                  <div className="chip amber news-chip">{news.time}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
);

NewsCard.propTypes = {
  news: PropTypes.object
};
export default NewsCard;
