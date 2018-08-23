import { defineState } from "redux-localstore";

import constants from "../constants";
import { auth } from "../utils";

const defaultState = {
  isUserAuthenticated: false,
  user: {},
  message: ""
};

const initialState = defineState(defaultState)("authReducer");

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.LOGIN_USER:
      if (action.payload.confirmation) {
        auth.authenticateUser(action.payload.token, action.payload.user);
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = action.payload.user;
        newState.message = action.payload.message;
      } else {
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = {};
        newState.message = action.payload.message;
      }
      return newState;
    case constants.LOGOUT_USER:
      auth.deauthenticateUser();
      newState.isUserAuthenticated = auth.isUserAuthenticated();
      newState.user = {};
      newState.message = "";
      return newState;
    default:
      return state;
  }
};
