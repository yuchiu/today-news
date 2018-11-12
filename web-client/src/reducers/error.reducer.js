import actionTypes from "@/actionTypes";

const initialState = {
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.ERROR_NEWS:
      newState.error = action.payload;
      return newState;

    case actionTypes.ERROR_USER:
      newState.error = action.payload;
      return newState;

    case actionTypes.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
