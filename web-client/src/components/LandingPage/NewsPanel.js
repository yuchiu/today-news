import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import "./NewsPanel.scss";
import NewsCard from "./NewsCard";
import { newsAction, userAction } from "@/actions";
import { newsSelector, userSelector } from "@/reducers/selectors";

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
    const { fetchNews, offsetIndex } = this.props;
    fetchNews(offsetIndex);
  };

  render() {
    const { newsList, currentUser, fetchClickLog } = this.props;
    return newsList ? (
      <div className="container-fluid">
        <div className="list-group">
          {newsList.map((news, i) => (
            <NewsCard
              key={i}
              news={news}
              currentUser={currentUser}
              fetchClickLog={fetchClickLog}
            />
          ))}
        </div>
      </div>
    ) : (
      <div id="msg-app-loading">Loading...</div>
    );
  }
}

NewsPanel.propTypes = {
  newsList: PropTypes.array.isRequired,
  offsetIndex: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,

  fetchNews: PropTypes.func.isRequired,
  fetchClickLog: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  newsList: newsSelector.getNewsList(state),
  offsetIndex: newsSelector.getOffsetIndex(state)
});

const dispatchToProps = dispatch => ({
  fetchNews: offsetIndex => {
    dispatch(newsAction.fetchNews(offsetIndex));
  },
  fetchClickLog: clickLogData => {
    dispatch(userAction.fetchClickLog(clickLogData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(NewsPanel);
