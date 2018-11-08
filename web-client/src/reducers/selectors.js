import { getNewsList, getOffsetIndex, getNewsIsLoading } from "./news.reducer";
import {
  getCurrentUser,
  getIsUserLoggedIn,
  getCurrentUsername,
  getUserIsLoading
} from "./user.reducer";
import { getError } from "./error.reducer";

const newsSelector = {
  getNewsList: state => getNewsList(state),
  getOffsetIndex: state => getOffsetIndex(state),
  getNewsIsLoading: state => getNewsIsLoading(state)
};

const userSelector = {
  getCurrentUsername: state => getCurrentUsername(state),
  getIsUserLoggedIn: state => getIsUserLoggedIn(state),
  getCurrentUser: state => getCurrentUser(state),
  getUserIsLoading: state => getUserIsLoading(state)
};

const errorSelector = {
  getError: state => getError(state)
};

export { newsSelector, userSelector, errorSelector };
