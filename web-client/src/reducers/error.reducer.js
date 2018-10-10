import constants from "@/constants";

const initialState = {
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case constants.NEWS_ERROR:
      newState.error = action.payload;
      return newState;

    case constants.USER_ERROR:
      newState.error = action.payload;
      return newState;

    case constants.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getError = state => state.errorReducer.error;

export { getError };
