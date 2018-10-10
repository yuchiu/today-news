import constants from "@/constants";

const initialState = {
  newsList: [],
  offsetIndex: 0
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case constants.NEWS_FETCH:
      newState.newsList = newState.newsList.concat(action.payload.news);
      newState.offsetIndex += 10;
      return newState;

    case constants.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getNewsList = state => state.newsReducer.newsList;

const getOffsetIndex = state => state.newsReducer.offsetIndex;

export { getNewsList, getOffsetIndex };
