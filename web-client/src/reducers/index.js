import { combineReducers } from "redux";

import newsReducer from "./news.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  newsReducer,
  userReducer
});

export default rootReducer;
