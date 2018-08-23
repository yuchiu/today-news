import { defineState } from "redux-localstore";

import constants from "../constants";
import { auth } from "../utils";

const defaultState = {
  isUserAuthenticated: false,
  user: {},
  error: {}
};

const initialState = defineState(defaultState)("authReducer");

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.FETCH_LOGIN:
      if (action.payload.confirmation) {
        auth.authenticateUser(action.payload.token, action.payload.user);
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = action.payload.user;
        newState.error = {};
      } else {
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = {};
        newState.error = action.payload.error;
      }
      return newState;
    case constants.FETCH_LOGOUT:
      auth.deauthenticateUser();
      newState.isUserAuthenticated = auth.isUserAuthenticated();
      newState.user = {};
      newState.error = {};
      return newState;
    default:
      return state;
  }
};
