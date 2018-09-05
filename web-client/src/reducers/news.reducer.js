import constants from "../constants";

const initialState = {
  news: [],
  currentIndex: 0
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case constants.FETCH_NEWS_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.FETCH_NEWS:
      newState.news = newState.news.concat(action.payload.news);
      newState.currentIndex += 10;
      return newState;
    default:
      return state;
  }
};
