import { combineReducers } from "redux";

import textReducer from "./textReducer";
import newsReducer from "./newsReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  textReducer,
  newsReducer,
  authReducer
});

export default rootReducer;
