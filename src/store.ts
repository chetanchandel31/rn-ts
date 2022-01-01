import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "./action/action.types";
import rootReducer from "./reducer";

export type AppState = ReturnType<typeof rootReducer>;

const middleware = [thunk as ThunkMiddleware<AppState, AppActions>];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
