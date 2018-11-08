import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import NewsCard from "./NewsCard";
import { newsAction, userAction } from "@/actions";
import { newsSelector } from "@/reducers/selectors";

class NewsBoard extends React.Component {
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
    const { fetchNews, offsetIndex } = this.props;
    fetchNews(offsetIndex);
  };

  render() {
    const { newsList, fetchClickLog } = this.props;
    return newsList ? (
      <div className="news-board">
        {newsList.map((news, i) => (
          <NewsCard key={i} news={news} fetchClickLog={fetchClickLog} />
        ))}
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

NewsBoard.propTypes = {
  newsList: PropTypes.array.isRequired,
  offsetIndex: PropTypes.number.isRequired,

  fetchNews: PropTypes.func.isRequired,
  fetchClickLog: PropTypes.func.isRequired
};

const stateToProps = state => ({
  newsList: newsSelector.getNewsList(state),
  offsetIndex: newsSelector.getOffsetIndex(state)
});

const dispatchToProps = dispatch => ({
  fetchNews: offsetIndex => {
    dispatch(newsAction.fetchNews(offsetIndex));
  },
  fetchClickLog: newsDigestId => {
    dispatch(userAction.fetchClickLog(newsDigestId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(NewsBoard);
