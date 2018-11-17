import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ENTER_KEY: 13,
      text: ""
    };
  }

  componentDidMount() {
    const {
      location: { pathname }
    } = this.props;
    const pathPrefix = "search/";
    const paramIndex = pathname.indexOf(pathPrefix);
    const searchTerm = pathname.substring(paramIndex + pathPrefix.length);
    this.setState({
      text: searchTerm
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    setTimeout(this.changeSearchParam, 500);
  };

  changeSearchParam = () => {
    const { text } = this.state;
    const { fetchSearch, history, clearSearchNewsResult } = this.props;
    if (text) {
      history.push(`/search/${text}`);
    } else {
      history.push(`/`);
      clearSearchNewsResult();
    }
  };

  render() {
    const { ENTER_KEY, text } = this.state;
    return (
      <div className="searchbox">
        <input
          className="searchbox__input"
          placeholder="Search News..."
          name="text"
          value={text}
          onChange={this.handleChange}
          onKeyDown={e => {
            if (e.keyCode === ENTER_KEY) this.changeSearchParam();
          }}
        />
        <i
          className="fa fa-search fa-lg searchbox__icon"
          onClick={this.changeSearchParam}
        />
      </div>
    );
  }
}
SearchInput.propTypes = {};

export default withRouter(SearchInput);
