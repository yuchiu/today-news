import constants from "../constants";
import { API } from "../utils";

export default {
  fetchRegister: credential => async dispatch => {
    const { email, password } = credential;
    const response = await API.registerUser(email, password);
    dispatch({
      type: constants.FETCH_LOGIN,
      payload: response
    });
  },

  fetchLogin: credential => async dispatch => {
    const { email, password } = credential;
    const response = await API.loginUser(email, password);
    dispatch({
      type: constants.FETCH_LOGIN,
      payload: response
    });
  }
};
