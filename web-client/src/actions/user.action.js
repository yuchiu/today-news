import constants from "@/constants";
import { userService } from "./services";

export default {
  tryAutoSignIn: () => async dispatch => {
    const response = await userService.tryAutoSignIn();
    const { data } = response;
    dispatch({
      type: constants.USER_FETCH_TRY_AUTO_LOGIN,
      payload: data
    });
  },

  fetchSignUpUser: credentials => async dispatch => {
    try {
      const response = await userService.fetchSignUpUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.USER_FETCH_LOGIN,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.USER_ERROR,
        payload: data.meta.message
      });
    }
  },

  fetchSignInUser: credentials => async dispatch => {
    try {
      const response = await userService.fetchSignInUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.USER_FETCH_LOGIN,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.USER_ERROR,
        payload: data.meta.message
      });
    }
  },

  signOutUser: () => dispatch => {
    dispatch({
      type: constants.USER_LOGOUT
    });
  }
};
