import { combineReducers } from "redux";

const gameId = (state = 0, action) => {
  switch (action.type) {
    case "FETCH_GAME_SUCCESS":
      return action.game.id;
    default:
      return state;
  }
};

const gameFetchStatus = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case "FETCH_GAME_REQUEST":
      return Object.assign({}, state, {
        isFetching: true,
        error: undefined,
      });
    case "FETCH_GAME_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
        error: undefined,
      });
    case "FETCH_GAME_ERROR":
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
};

const gameUsers = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_GAME_SUCCESS":
      return action.game.users;
    case "SET_GAME_USER": {
      const newState = Object.assign({}, state);
      newState[action.userId] = action.playerId;
      return newState;
    }
    default:
      return state;
  }
};

const gamePlayers = (state = [{ score: 1 }, { score: 5 }], action) => {
  switch (action.type) {
    case "FETCH_GAME_SUCCESS":
      return action.game.players;
    case "SET_GAME_USER": {
      const newState = [...state];
      newState[action.playerId] = Object.assign({}, newState[action.playerId], {
        userId: action.userId,
      });
      return newState;
    }
    default:
      return state;
  }
};

const game = combineReducers({
  id: gameId,
  fetchStatus: gameFetchStatus,
  players: gamePlayers,
  users: gameUsers,
});

const connectionStatus = (state = "disconnected", action) => {
  switch (action.type) {
    case "SET_CONNECTION_STATUS":
      return action.connectionStatus;
    default:
      return state;
  }
};

export default combineReducers({ game, connectionStatus });
