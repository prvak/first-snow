import axios from "axios";

import GameEvents from "../../common/GameEvents";

const socket = io();

const Actions = {
  setGame: (game) => {
    return { type: "SET_GAME", game };
  },

  setGameUser: (userId, playerId) => {
    return { type: "SET_GAME_USER", userId, playerId };
  },

  setConnectionStatus: (connectionStatus) => {
    return { type: "SET_CONNECTION_STATUS", connectionStatus };
  },

  connect: () => {
    return (dispatch, getState) => {
      socket.on("connect", () => {
        const state = getState();
        if (state.connectionStatus !== "connected") {
          dispatch(Actions.setConnectionStatus("connected"));
          dispatch(Actions.joinGame(1, state.userId));
        }
      });
      socket.on("disconnect", () => {
        dispatch(Actions.setConnectionStatus("disconnect"));
      });
      socket.on("close", () => {
        dispatch(Actions.setConnectionStatus("disconnected"));
      });
      socket.on("error", (error) => {
        console.log("connection error", error);
        dispatch(Actions.setConnectionStatus("error"));
      });
    };
  },

  fetchGameRequest: (gameId) => {
    return { type: "FETCH_GAME_REQUEST", gameId };
  },

  fetchGameSuccess: (game) => {
    return { type: "FETCH_GAME_SUCCESS", game };
  },

  fetchGameError: (error) => {
    return { type: "FETCH_GAME_ERROR", error };
  },

  joinGame: (gameId, userId) => {
    return (dispatch) => {
      console.log("Joining game");
      dispatch(Actions.fetchGameRequest(gameId));
      return axios.get(`/api/game/${gameId}`)
        .catch((error) => { dispatch(Actions.fetchGameError(error)); })
        .then((response) => {
          dispatch(Actions.fetchGameSuccess(response.data));
          socket.emit("game:join", { gameId, userId });
          socket.on("game:joinError", (data) => {
            console.log("Failed to join game:", data);
          });
          console.log("Register for game events");
          socket.on("game:event", (data) => {
            console.log("Game event:", data);
            switch (data.type) {
              case GameEvents.USER_JOINED:
                dispatch(Actions.setGameUser(data.userId, data.playerId));
                break;
              case GameEvents.BEAR_CHOSEN:
                dispatch(Actions.setBear(data.playerId, data.bear));
                break;
              default:
                break;
            }
          });
        });
    };
  },

  selectBear: (playerId, index) => {
    return (dispatch) => {
      dispatch(Actions.chooseBearRequest(playerId, index));
      socket.emit("game:bear:choose", { playerId, index });
    };
  },

  chooseBearRequest: (playerId, index) => {
    return { type: "CHOOSE_BEAR_REQUEST", playerId, index };
  },

  setBear: (playerId, bear) => {
    return { type: "SET_BEAR", playerId, bear };
  },
};

export default Actions;
