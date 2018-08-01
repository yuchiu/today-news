import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../../actions";
import Text from "../Text";

class TextChanger extends React.Component {
  constructor() {
    super();
    this.state = {
      inputVal: ""
    };
  }

  handleChange(e) {
    this.setState({ inputVal: e.target.value });
  }

  displayText() {
    this.props.fetchText(this.state.inputVal);
  }

  render() {
    return (
      <div id="body-container">
        <input onChange={this.handleChange.bind(this)} />
        <button onClick={this.displayText.bind(this)}>
          Change Display Text
        </button>
        <Text text={this.props.text} />
      </div>
    );
  }
}

TextChanger.propTypes = {
  text: PropTypes.string,
  fetchText: PropTypes.func
};

const stateToProps = state => ({ text: state.text.text });

const dispatchToProps = dispatch => ({
  fetchText: text => {
    dispatch(actions.fetchText(text));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(TextChanger);
