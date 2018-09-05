import constants from "../constants";
import { localStore } from "../utils";

const initialState = {
  isUserAuthenticated: false,
  user: {},
  error: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.AUTH_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.AUTO_LOGIN:
      if (action.payload.confirmation) {
        newState.isUserAuthenticated = true;
        newState.user = action.payload.user;
        return newState;
      }
      return newState;

    case constants.LOGIN_USER:
      localStore.authenticateUser(action.payload);
      newState.isUserAuthenticated = true;
      newState.user = action.payload.user;
      newState.error = "";
      return newState;

    case constants.LOGOUT_USER:
      localStore.deauthenticateUser();
      newState.isUserAuthenticated = false;
      newState.user = {};
      newState.error = "";
      return newState;
    default:
      return state;
  }
};
