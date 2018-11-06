import actionTypes from "@/actionTypes";

const initialState = {
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.NEWS_ERROR:
      newState.error = action.payload;
      return newState;

    case actionTypes.USER_ERROR:
      newState.error = action.payload;
      return newState;

    case actionTypes.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getError = state => state.errorReducer.error;

export { getError };
