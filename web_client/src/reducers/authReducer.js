import constants from "../constants";
import { Auth } from "../utils";

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case constants.FETCH_LOGIN:
      if (action.payload.confirmation) {
        Auth.authenticateUser(action.payload.token, action.payload.user.email);
        newState.user = action.payload.user;
      } else {
        newState.user = null;
      }
      return newState;
    default:
      return state;
  }
};
