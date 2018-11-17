import actionTypes from "@/actionTypes";
import { searchService } from "./services";

export default {
  fetchSearchNews: searchTerm => async dispatch => {
    dispatch({
      type: actionTypes.SEARCH_FETCH
    });
    try {
      const response = await searchService.fetchSearchNews(searchTerm);
      const { data } = response;
      dispatch({
        type: actionTypes.SEARCH_FETCH_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_SEARCH,
        payload: data.meta.message
      });
    }
  }
};
