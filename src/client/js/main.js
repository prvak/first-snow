import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./containers/App.react";
import reducers from "./reducers";

// Grab the state from a global injected into server-generated HTML.
const initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state.
const store = createStore(reducers, initialState);

// Create websocket connection.
const ws = new WebSocket("ws://localhost:3000");
ws.onopen = (event) => {
  console.log("ws connected to server", event);
  ws.send(Date.now());
};
ws.onmessage = (event) => {
  console.log("ws message received", event.data);
  setTimeout(() => {
    ws.send(Date.now());
  }, 1000);
};
ws.onclose = (event) => {
  console.log("ws disconnected", event);
}
ws.onerror = (event) => {
  console.log("ws error", event);
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
