import { getNewsList, getOffsetIndex, getNewsIsLoading } from "./news.selector";
import {
  getCurrentUser,
  getIsUserLoggedIn,
  getCurrentUsername,
  getUserIsLoading
} from "./user.selector";
import { getError } from "./error.selector";
import {
  getSearchNewsResult,
  getSearchIsLoading,
  getIsSearchNotFound
} from "./search.selector";

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

const searchSelector = {
  getSearchNewsResult: state => getSearchNewsResult(state),
  getIsSearchNotFound: state => getIsSearchNotFound(state),
  getSearchIsLoading: state => getSearchIsLoading(state)
};

const errorSelector = {
  getError: state => getError(state)
};

export { newsSelector, userSelector, searchSelector, errorSelector };
