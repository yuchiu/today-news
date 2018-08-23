import constants from "../constants";
import { authService } from "../services";

export default {
  registerUser: credentials => async dispatch => {
    const response = await authService.registerUser(credentials);
    dispatch({
      type: constants.LOGIN_USER,
      payload: response
    });
  },

  loginUser: credentials => async dispatch => {
    const response = await authService.loginUser(credentials);
    dispatch({
      type: constants.LOGIN_USER,
      payload: response
    });
  },

  logoutUser: () => dispatch => {
    dispatch({
      type: constants.LOGOUT_USER
    });
  }
};
