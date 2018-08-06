import constants from "../constants";
import { API } from "../utils";

export default {
  fetchLogin: credential => async dispatch => {
    const response = await API.loginUser(credential.email, credential.password);
    dispatch({
      type: constants.FETCH_LOGIN,
      payload: response
    });
  }
};
