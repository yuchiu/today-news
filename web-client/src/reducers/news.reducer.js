import actionTypes from "@/actionTypes";

const initialState = {
  newsList: [],
  offsetIndex: 0
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.NEWS_FETCH:
      newState.newsList = newState.newsList.concat(action.payload.news);
      newState.offsetIndex += 10;
      return newState;

    case actionTypes.USER_LOGOUT:
      newState.offsetIndex = 0;
      return newState;

    default:
      return state;
  }
};

/* state selectors */
const getNewsList = state => state.newsReducer.newsList;

const getOffsetIndex = state => state.newsReducer.offsetIndex;

export { getNewsList, getOffsetIndex };
