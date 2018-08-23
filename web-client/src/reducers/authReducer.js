import { defineState } from "redux-localstore";

import constants from "../constants";
import { Auth } from "../utils";

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
        Auth.authenticateUser(action.payload.token);
        newState.isUserAuthenticated = Auth.isUserAuthenticated();
        newState.user = action.payload.user;
        newState.error = {};
      } else {
        newState.isUserAuthenticated = Auth.isUserAuthenticated();
        newState.user = {};
        newState.error = action.payload.error;
      }
      return newState;
    case constants.FETCH_LOGOUT:
      Auth.deauthenticateUser();
      newState.isUserAuthenticated = Auth.isUserAuthenticated();
      newState.user = {};
      newState.error = {};
      return newState;
    default:
      return state;
  }
};
