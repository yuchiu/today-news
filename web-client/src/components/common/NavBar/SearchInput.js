import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ENTER_KEY: 13,
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSearch = () => {
    const { text } = this.state;
    if (text) {
      console.log(text);
      this.setState({ text: "" });
    }
  };

  render() {
    const { ENTER_KEY } = this.state;
    return (
      <div className="searchbox">
        <i className="fa fa-search fa-lg searchbox__icon" />
        <input
          className="searchbox__input"
          placeholder="Search News..."
          name="text"
          onChange={this.handleChange}
          onKeyDown={e => {
            if (e.keyCode === ENTER_KEY) this.handleSearch();
          }}
        />
      </div>
    );
  }
}
SearchInput.propTypes = {};
const dispatchToProps = dispatch => ({});
export default connect(
  null,
  dispatchToProps
)(SearchInput);
