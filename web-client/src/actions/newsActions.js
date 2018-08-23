import constants from "../constants";
import { API } from "../utils";

export default {
  fetchNews: () => async dispatch => {
    const response = await API.getNews();
    dispatch({
      type: constants.FETCH_NEWS,
      payload: response
    });
  }
};
