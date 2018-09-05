import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import "./NewsPanel.scss";
import { NewsCard } from "./presentations";
import { newsAction } from "../../actions";

class NewsPanel extends React.Component {
  componentDidMount() {
    this.loadMoreNews();
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll = () => {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.scrollHeight - 50) {
      this.loadMoreNews();
    }
  };

  loadMoreNews = e => {
    const { fetchNews, currentIndex } = this.props;
    fetchNews(currentIndex);
  };

  render() {
    const { news } = this.props;
    return news ? (
      <div className="container-fluid">
        <div className="list-group">
          {news.map((n, i) => (
            <NewsCard key={i} news={n} />
          ))}
        </div>
      </div>
    ) : (
      <div id="msg-app-loading">Loading...</div>
    );
  }
}

const stateToProps = state => ({
  news: state.newsReducer.news,
  currentIndex: state.newsReducer.currentIndex
});

const dispatchToProps = dispatch => ({
  fetchNews: currentIndex => {
    dispatch(newsAction.fetchNews(currentIndex));
  }
});

NewsPanel.propTypes = {
  news: PropTypes.array,
  fetchNews: PropTypes.func,
  currentIndex: PropTypes.number
};
export default connect(
  stateToProps,
  dispatchToProps
)(NewsPanel);
