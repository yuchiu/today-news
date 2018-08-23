import constants from "../constants";
import { authService } from "../services";

export default {
  fetchRegister: credentials => async dispatch => {
    const response = await authService.registerUser(credentials);
    dispatch({
      type: constants.FETCH_LOGIN,
      payload: response
    });
  },

  fetchLogin: credentials => async dispatch => {
    const response = await authService.loginUser(credentials);
    dispatch({
      type: constants.FETCH_LOGIN,
      payload: response
    });
  },

  fetchLogout: () => dispatch => {
    dispatch({
      type: constants.FETCH_LOGOUT
    });
  }
};
