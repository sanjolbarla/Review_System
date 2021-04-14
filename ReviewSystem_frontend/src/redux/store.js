import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import userReducer from "./users/userReducer";

const loggerMiddleware = createLogger();

const store = createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export default store;
