import Actions from "../actions";

const initialState = {
  connectionStatus: "disconnected",
  game: {
    users: {},
    players: [{ score: 1 }, { score: 5 }],
  },
};

const gameUsers = (state = {}, action) => {
  switch (action.type) {
    case "SET_GAME_USER": {
      const newState = Object.assign({}, state);
      newState[action.userId] = action.playerId;
      return newState;
    }
    default:
      return state;
  }
};

const gamePlayers = (state = {}, action) => {
  switch (action.type) {
    case "SET_GAME_USER": {
      const newState = Object.assign({}, state);
      newState[action.userId] = action.playerId;
      return newState;
    }
    default:
      return state;
  }
};

const game = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_GAME_REQUEST":
      return Object.assign({}, state, {
        isFetching: true,
        id: action.gameId,
      });
    case "FETCH_GAME_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
        id: action.game.id,
        users: gameUsers(action.game.users, action),
        players: gamePlayers(action.game.players, action),
      });
    case "FETCH_GAME_FAILURE":
      return Object.assign({}, state, {
        isFetching: false,
        fetchingError: action.error,
      });
    default:
      return state;
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONNECTION_STATUS":
      return Object.assign({}, state, {
        connectionStatus: action.connectionStatus,
      });
    case "REQUEST_GAME":
    case "RECEIVE_GAME":
      return Object.assign({}, state, {
        game: game(state.game, action),
      });
    default:
      return state;
  }
};
