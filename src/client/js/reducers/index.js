import { combineReducers } from "redux";

import { Bear } from "../../../common/GameConstants";

const gameId = (state = 0, action) => {
  switch (action.type) {
    case "FETCH_GAME_SUCCESS":
      return action.game.id;
    default:
      return state;
  }
};

const userId = (state = "Me") => {
  return state;
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

const gamePlayerBear = (state = { status: Bear.UNSET }, action) => {
  switch (action.type) {
    case "CHOOSE_BEAR_REQUEST":
      return Object.assign({}, state, {
        index: action.index,
        isChoosing: true,
      });
    case "SET_BEAR": {
      return Object.assign({}, state, {
        status: action.bear.status,
        index: action.bear.index,
        isChoosing: false,
      });
    }
    default:
      return state;
  }
};

const gamePlayers = (
    state = [
      { score: 1, bear: { status: Bear.UNSET } },
      { score: 5, bear: { status: Bear.UNSET } },
    ],
    action) => {
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
    case "CHOOSE_BEAR_REQUEST":
    case "SET_BEAR": {
      const newState = [...state];
      newState[action.playerId] = Object.assign({}, newState[action.playerId], {
        bear: gamePlayerBear(state[action.playerId].bear, action),
      });
      return newState;
    }
    default:
      return state;
  }
};

const gameLandCards = (state = [], action) => {
  switch (action.type) {
    case "FETCH_GAME_SUCCESS":
      return action.game.landCards;
    default:
      return state;
  }
};

const game = combineReducers({
  id: gameId,
  fetchStatus: gameFetchStatus,
  players: gamePlayers,
  users: gameUsers,
  landCards: gameLandCards,
});

const connectionStatus = (state = "disconnected", action) => {
  switch (action.type) {
    case "SET_CONNECTION_STATUS":
      return action.connectionStatus;
    default:
      return state;
  }
};

export default combineReducers({ game, connectionStatus, userId });
