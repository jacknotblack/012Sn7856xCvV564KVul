import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import appReducer from "../App/reducer";

export const history = createHistory();
const routerMiddlewareInstance = routerMiddleware(history);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

const makeRootReducer = asyncReducers =>
  combineReducers({
    ...asyncReducers,
    routing: routerReducer,
    app: appReducer
  });

export const store = createStore(
  makeRootReducer(),
  {},
  composeEnhancers(applyMiddleware(thunk, routerMiddlewareInstance))
);

store.asyncReducers = {};
export const injectReducer = (originStore, { key, reducer }) => {
  /* eslint-disable no-param-reassign */
  originStore.asyncReducers[key] = reducer;
  /* eslint-enable no-param-reassign */
  originStore.replaceReducer(makeRootReducer(originStore.asyncReducers));
};
export default makeRootReducer;
