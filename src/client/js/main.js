import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import App from "./containers/App.react";
import reducers from "./reducers";
import Actions from "./actions";

// Grab the state from a global injected into server-generated HTML.
const initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state.
const loggerMiddleware = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware),
  initialState);
store.dispatch(Actions.connect());

// Create websocket connection.
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
