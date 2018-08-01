import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { textReducer } from "../reducers";

let store = null;
export default {
  configure: () => {
    const rootReducers = combineReducers({
      text: textReducer
    });
    store = createStore(
      rootReducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk, logger)
    );
    return store;
  },

  currentStore: () => store
};
