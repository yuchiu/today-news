import constants from "../constants";
import { newsService } from "./services";

export default {
  fetchNews: currentIndex => async dispatch => {
    try {
      const response = await newsService.getNews(currentIndex);
      const { data } = response;
      dispatch({
        type: constants.FETCH_NEWS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.FETCH_NEWS_ERROR,
        payload: data
      });
    }
  }
};
