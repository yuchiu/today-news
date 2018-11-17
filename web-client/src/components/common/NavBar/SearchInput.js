import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { searchAction } from "@/actions";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ENTER_KEY: 13,
      text: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSearch = () => {
    const { text } = this.state;
    const { fetchSearchNews } = this.props;
    if (text) {
      fetchSearchNews(text);
    }
  };

  render() {
    const { ENTER_KEY } = this.state;
    return (
      <div className="searchbox">
        <input
          className="searchbox__input"
          placeholder="Search News..."
          name="text"
          onChange={this.handleChange}
          onKeyDown={e => {
            if (e.keyCode === ENTER_KEY) this.handleSearch();
          }}
        />
        <i
          className="fa fa-search fa-lg searchbox__icon"
          onClick={this.handleSearch}
        />
      </div>
    );
  }
}
SearchInput.propTypes = {};

const dispatchToProps = dispatch => ({
  fetchSearchNews: searchTerm => {
    dispatch(searchAction.fetchSearchNews(searchTerm));
  }
});
export default connect(
  null,
  dispatchToProps
)(SearchInput);
