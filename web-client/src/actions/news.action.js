import actionTypes from "@/actionTypes";
import { newsService } from "./services";

export default {
  fetchNews: currentIndex => async dispatch => {
    try {
      const response = await newsService.fetchNews(currentIndex);
      const { data } = response;
      dispatch({
        type: actionTypes.NEWS_FETCH,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.NEWS_ERROR,
        payload: data.meta.message
      });
    }
  }
};
