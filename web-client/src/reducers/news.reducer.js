import actionTypes from "@/actionTypes";

const initialState = {
  newsList: [],
  offsetIndex: 0,
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.NEWS_FETCH:
      newState.isLoading = true;
      return newState;

    case actionTypes.NEWS_FETCH_SUCCESS:
      newState.isLoading = false;
      newState.newsList = newState.newsList.concat(action.payload.news);
      newState.offsetIndex += 10;
      return newState;

    case actionTypes.ERROR_NEWS:
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_LOGOUT:
      newState.offsetIndex = 0;
      return newState;

    default:
      return state;
  }
};
