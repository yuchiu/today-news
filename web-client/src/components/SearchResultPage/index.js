import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { searchAction } from "@/actions";
import { searchSelector } from "@/selectors";

class LandingPage extends React.Component {
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
    const { history, isLoading, searchNewsResult } = this.props;
    const {
      match: {
        params: { searchTerm }
      }
    } = this.props;
    return (
      <main className="landing-page">
        <div> Search result of {searchTerm}</div>
        <div>
          {searchNewsResult.map((n, i) => (
            <div key={`${n._source.digest}-index-${i}`}>{n._source.title}</div>
          ))}
        </div>
      </main>
    );
  }
}

LandingPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isLoading: searchSelector.getSearchIsLoading(state),
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
)(LandingPage);
