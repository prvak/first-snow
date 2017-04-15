import Promise from "bluebird";

class Game {
  constructor() {
    this.users = {};
    this.players = [{ score: 0 }, { score: 0 }];
  }

  clone() {
    return Object.assign(new Game(), this);
  }

  join(userId) {
    if (!userId) {
      throw new Error("Invalid user ID.");
    }
    if (this.users[userId]) {
      // User is already in the game.
      return this.users[userId].playerId;
    }
    const numPlayers = Object.keys(this.users).length;
    if (numPlayers > Game.MAX_PLAYERS) {
      throw new Error("Game is full.");
    }
    const playerId = numPlayers;
    this.users[userId] = { playerId };
    return playerId;
  }
}

Game.MAX_PLAYERS = 2;

// This is instead of a database.
const ACTIVE_GAMES = {};
let lastId = 0;

Game.Query = {
  save: (game) => {
    const clone = game.clone();
    if (!clone.id) {
      lastId += 1;
      clone.id = lastId;
    }
    const gameId = clone.id;
    ACTIVE_GAMES[gameId] = clone;
    return Promise.resolve(clone.clone());
  },

  /** Get game with given ID. */
  get: (gameId) => {
    const game = ACTIVE_GAMES[gameId];
    if (!game) {
      throw new Error("Not found.");
    }
    return Promise.resolve(game);
  },

  /** Get all games*/
  getAll: () => {
    const games = Object.values(ACTIVE_GAMES).map((game) => {
      return game.clone();
    });
    return Promise.resolve(games);
  },
};

export default Game;
