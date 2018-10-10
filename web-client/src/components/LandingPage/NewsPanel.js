import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import "./NewsPanel.scss";
import { NewsCard } from "./presentations";
import { newsAction } from "@/actions";
import { newsSelector } from "@/reducers/selectors";

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
    const { newsList } = this.props;
    return newsList ? (
      <div className="container-fluid">
        <div className="list-group">
          {newsList.map((news, i) => (
            <NewsCard key={i} news={news} />
          ))}
        </div>
      </div>
    ) : (
      <div id="msg-app-loading">Loading...</div>
    );
  }
}

NewsPanel.propTypes = {
  newsList: PropTypes.array,
  offsetIndex: PropTypes.number,

  fetchNews: PropTypes.func
};

const stateToProps = state => ({
  newsList: newsSelector.getNewsList(state),
  offsetIndex: newsSelector.getOffsetIndex(state)
});

const dispatchToProps = dispatch => ({
  fetchNews: offsetIndex => {
    dispatch(newsAction.fetchNews(offsetIndex));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(NewsPanel);
