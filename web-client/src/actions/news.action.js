import constants from "../constants";
import { newsService } from "../services";

export default {
  fetchNews: () => async dispatch => {
    const response = await newsService.getNews();
    dispatch({
      type: constants.FETCH_NEWS,
      payload: response
    });
  }
};
