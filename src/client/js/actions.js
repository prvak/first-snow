import axios from "axios";

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
    return (dispatch) => {
      socket.on("connect", () => {
        dispatch(Actions.setConnectionStatus("connected"));
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

  fetchGameError: (game) => {
    return { type: "FETCH_GAME_ERROR", game };
  },

  joinGame: (gameId) => {
    return (dispatch) => {
      console.log("getting game");
      dispatch(Actions.fetchGameRequest(gameId));
      return axios.get(`/api/game/${gameId}`)
        .then((res) => { dispatch(Actions.fetchGameSuccess(res.data)); })
        .catch((error) => { dispatch(Actions.fetchGameError(error)); });
    };
  },

  ajoinGame: (gameId) => {
    this.socket.emit("game:join", { userId: "Player 1", gameId });
    this.socket.on("game:joined", (data) => {
      console.log("Game joined:", data);
    });
  },

  aleaveGame: (gameId) => {
    this.socket.emit("game:leave", { userId: "Player 1", gameId });
    this.socket.on("game:left", (data) => {
      console.log("Game left:", data);
    });
  },
};

export default Actions;
