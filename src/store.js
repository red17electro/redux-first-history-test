import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReduxHistoryContext, reachify } from "redux-first-history";
import { createWouterHook } from "redux-first-history/wouter";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = createStore(
  combineReducers({
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware)
  )
);

sagaMiddleware.run(mySaga);

export const history = createReduxHistory(store);
export const reachHistory = reachify(history);
export const wouterUseLocation = createWouterHook(history);
