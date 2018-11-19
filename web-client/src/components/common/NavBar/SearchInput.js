import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ENTER_KEY: 13,
      text: "",
      PATHPREFIX: "search/"
    };
  }

  componentDidMount() {
    const {
      location: { pathname }
    } = this.props;
    const { PATHPREFIX } = this.state;
    const paramIndex = pathname.indexOf(PATHPREFIX);
    const searchTerm = pathname.substring(paramIndex + PATHPREFIX.length);
    this.setState({
      text: searchTerm
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    setTimeout(this.changeSearchParam, 300);
  };

  changeSearchParam = () => {
    const { text } = this.state;
    const { history, clearSearchNewsResult } = this.props;
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
SearchInput.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  clearSearchNewsResult: PropTypes.func.isRequired
};

export default withRouter(SearchInput);
