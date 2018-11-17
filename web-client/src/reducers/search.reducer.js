import actionTypes from "@/actionTypes";

const initialState = {
  isLoading: false,
  searchNewsResult: []
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.SEARCH_FETCH:
      newState.isLoading = true;
      return newState;

    case actionTypes.SEARCH_FETCH_SUCCESS:
      newState.isLoading = false;
      newState.searchNewsResult = action.payload;
      return newState;

    case actionTypes.ERROR_SEARCH:
      newState.isLoading = false;
      return newState;

    default:
      return state;
  }
};
