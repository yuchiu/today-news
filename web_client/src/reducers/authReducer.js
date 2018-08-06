import constants from "../constants";

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case constants.FETCH_LOGIN:
      newState.user = action.payload.data;
      return newState;
    default:
      return state;
  }
};
