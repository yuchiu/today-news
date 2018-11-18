import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import { searchAction } from "@/actions";
import { searchSelector } from "@/selectors";
import SearchResultSummary from "./SearchResultSummary";
import SearchResultNews from "./SearchResultNews";

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentParam: ""
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate() {
    const {
      match: {
        params: { searchTerm }
      }
    } = this.props;
    const { currentParam } = this.state;

    if (currentParam !== searchTerm) this.handleSearch();
  }

  componentWillUnmount() {
    this.setState({ currentParam: "" });
  }

  handleSearch = () => {
    const {
      fetchSearchNews,
      match: {
        params: { searchTerm }
      }
    } = this.props;
    fetchSearchNews(searchTerm);
    this.setState({ currentParam: searchTerm });
  };

  render() {
    const {
      history,
      isLoading,
      searchNewsResult,
      isSearchNotFound
    } = this.props;
    const {
      match: {
        params: { searchTerm }
      }
    } = this.props;
    return (
      <main className="search-result-page">
        <SearchResultSummary
          isLoading={isLoading}
          searchNewsResult={searchNewsResult}
          isSearchNotFound={isSearchNotFound}
          searchTerm={searchTerm}
        />
        <SearchResultNews searchNewsResult={searchNewsResult} />
      </main>
    );
  }
}

SearchResultPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  searchNewsResult: PropTypes.array.isRequired,
  isSearchNotFound: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,

  fetchSearchNews: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isLoading: searchSelector.getSearchIsLoading(state),
  isSearchNotFound: searchSelector.getIsSearchNotFound(state),
  searchNewsResult: searchSelector.getSearchNewsResult(state)
});
const dispatchToProps = dispatch => ({
  fetchSearchNews: searchTerm => {
    dispatch(searchAction.fetchSearchNews(searchTerm));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(SearchResultPage);
