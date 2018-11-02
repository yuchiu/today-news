import { combineReducers } from "redux";

import newsReducer from "./news.reducer";
import userReducer from "./user.reducer";
import errorReducer from "./error.reducer";

const rootReducer = combineReducers({
  newsReducer,
  userReducer,
  errorReducer
});

export default rootReducer;
