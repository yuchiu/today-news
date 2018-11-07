import React from "react";
import PropTypes from "prop-types";

class NewsCard extends React.Component {
  handleClickLog = newsDigestId => {
    const { fetchClickLog } = this.props;
    fetchClickLog(newsDigestId);
  };

  render() {
    const { news } = this.props;
    return (
      <div className="">
        <div className="">
          <img src={news.urlToImage} alt="news" />
        </div>
        <div className="">
          <h4>{news.title}</h4>
          <div className="">
            <p>{news.description}</p>
            <div>
              {news.source != null && <div className="">{news.source}</div>}
              {news.reason != null && <div className="">{news.reason}</div>}
              {news.time != null && <div className="">{news.time}</div>}
            </div>
          </div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.handleClickLog.bind(this, news.digest)}
          >
            Link to article
          </a>
        </div>
      </div>
    );
  }
}

NewsCard.propTypes = {
  news: PropTypes.object
};
export default NewsCard;
