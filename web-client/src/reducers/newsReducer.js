import constants from "../constants";

const initialState = {
  news: null
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case constants.FETCH_NEWS:
      newState.news = newState.news
        ? newState.news.concat(action.payload.data)
        : action.payload.data;
      return newState;
    default:
      return state;
  }
};
