import actionTypes from "@/actionTypes";
import { newsService } from "./services";

export default {
  fetchNews: currentIndex => async dispatch => {
    dispatch({
      type: actionTypes.NEWS_FETCH
    });
    try {
      const response = await newsService.fetchNews(currentIndex);
      const { data } = response;
      dispatch({
        type: actionTypes.NEWS_FETCH_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_NEWS,
        payload: data.meta.message
      });
    }
  }
};
