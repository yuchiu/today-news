import constants from "../constants";

const actions = {
  fetchText: text => dispatch => {
    dispatch({
      type: constants.FETCH_TEXT,
      payload: text
    });
  }
};

export default actions;
