import { combineReducers } from "redux";

import textReducer from "./text.reducer";
import newsReducer from "./news.reducer";
import authReducer from "./auth.reducer";

const rootReducer = combineReducers({
  textReducer,
  newsReducer,
  authReducer
});

export default rootReducer;
