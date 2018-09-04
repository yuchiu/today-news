import { combineReducers } from "redux";

import textReducer from "./text.reducer";
import newsReducer from "./news.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  textReducer,
  newsReducer,
  userReducer
});

export default rootReducer;
