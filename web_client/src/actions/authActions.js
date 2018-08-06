import constants from "../constants";
import { API } from "../utils";

export default {
  fetchRegister: credential => async dispatch => {
    const response = await API.registerUser(
      credential.email,
      credential.password
    );
    dispatch({
      type: constants.FETCH_REGISTER,
      payload: response
    });
  },

  fetchLogin: credential => async dispatch => {
    const response = await API.loginUser(credential.email, credential.password);
    dispatch({
      type: constants.FETCH_LOGIN,
      payload: response
    });
  }
};
