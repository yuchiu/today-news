import { combineReducers } from "redux";

import newsReducer from "./news.reducer";
import userReducer from "./user.reducer";
import errorReducer from "./error.reducer";
import searchReducer from "./search.reducer";

const rootReducer = combineReducers({
  newsReducer,
  userReducer,
  searchReducer,
  errorReducer
});

export default rootReducer;
