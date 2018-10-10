import { getNewsList, getOffsetIndex } from "./news.reducer";
import {
  getCurrentUser,
  getIsUserLoggedIn,
  getCurrentUsername
} from "./user.reducer";
import { getError } from "./error.reducer";

const newsSelector = {
  getNewsList: state => getNewsList(state),
  getOffsetIndex: state => getOffsetIndex(state)
};

const userSelector = {
  getCurrentUsername: state => getCurrentUsername(state),
  getIsUserLoggedIn: state => getIsUserLoggedIn(state),
  getCurrentUser: state => getCurrentUser(state)
};

const errorSelector = {
  getError: state => getError(state)
};

export { newsSelector, userSelector, errorSelector };
