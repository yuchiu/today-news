import { combineReducers } from "redux";

import textReducer from "./textReducer";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({
  textReducer,
  newsReducer
});

export default rootReducer;
