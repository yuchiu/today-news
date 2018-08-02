import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NewsCard from "./NewsCard";
import { newsActions } from "../../actions";

class NewsPanel extends React.Component {
  componentDidMount() {
    this.loadMoreNews();
  }

  loadMoreNews = e => {
    const { fetchNews } = this.props;
    fetchNews();
  };

  render() {
    const { news } = this.props;
    console.log(`inside redner: ${news}`);
    return news ? (
      <div className="container-fluid">
        <div className="list-group">
          {news.map(n => <NewsCard key={n.digest} news={n} />)}
        </div>
      </div>
    ) : (
      <div id="msg-app-loading">Loading...</div>
    );
  }
}
const stateToProps = state => ({ news: state.newsReducer.news });

const dispatchToProps = dispatch => ({
  fetchNews: () => {
    dispatch(newsActions.fetchNews());
  }
});

NewsPanel.propTypes = {
  news: PropTypes.array,
  fetchNews: PropTypes.func
};
export default connect(
  stateToProps,
  dispatchToProps
)(NewsPanel);
