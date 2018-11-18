import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import "./index.scss";
import NewsImg from "./NewsImg";
import NewsDetail from "./NewsDetail";
import NewsArticle from "./NewsArticle";

class NewsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArticle: false
    };
  }

  handleClickLog = () => {
    const { fetchClickLog, news } = this.props;
    fetchClickLog(news.digest);
  };

  toggleShowArticle = () => {
    const { showArticle } = this.state;
    this.setState({
      showArticle: !showArticle
    });
  };

  render() {
    const { news } = this.props;
    const { showArticle } = this.state;
    return (
      <div className="news-card">
        <div className="news-card__top">
          <NewsImg thumbnailImg={news.urlToImage} />
          <NewsDetail
            news={news}
            showArticle={showArticle}
            handleClickLog={this.handleClickLog}
            toggleShowArticle={this.toggleShowArticle}
          />
        </div>
        <div className="news-card__top">
          {this.state.showArticle && (
            <NewsArticle
              article={news.text}
              toggleShowArticle={this.toggleShowArticle}
            />
          )}
        </div>
      </div>
    );
  }
}

NewsCard.propTypes = {
  news: PropTypes.object
};
export default NewsCard;
