import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import axios from "axios";

import App from "./containers/App.react";
import reducers from "./reducers";

// Grab the state from a global injected into server-generated HTML.
const initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state.
const store = createStore(reducers, initialState);

// Create websocket connection.
const socket = io();

// Initiate new game.
socket.emit("game:create");
socket.on("game:created", (data) => {
  console.log("Game created:", data);
  socket.off("game:created");
  socket.emit("game:join", { userId: "Player 1", gameId: data.gameId });
});
socket.on("game:joined", (data) => {
  console.log("Game joined:", data);
  axios.get("/api/game/1?pretty")
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    });
});

socket.on("close", () => {
  console.log("disconnected from server");
});
socket.on("error", (error) => {
  console.log("ws error", error);
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
