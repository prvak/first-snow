import Promise from "bluebird";

import { LandCards, Bear, Camp } from "../../common/GameConstants";

class Game {
  constructor() {
    this.users = {};
    // Public player information.
    this.players = [
      {
        score: 0,
        inventory: [],
        bear: {
          status: Bear.UNSET,
          index: 0,
        },
        dayCamp: {
          status: Camp.UNSET,
          index: 0,
          side: "left",
        },
        nightCamp: {
          status: Camp.UNSET,
          index: 0,
          side: "right",
        },
      },
      {
        score: 0,
        inventory: [],
        bear: {
          status: Bear.UNSET,
          index: 0,
        },
        dayCamp: {
          status: Camp.UNSET,
          index: 0,
        },
        nightCamp: {
          status: Camp.UNSET,
          index: 0,
        },
      },
    ];
    // Information available only to the respective player.
    this.secrets = [{}, {}];
    // All land cards.
    this.landCards = LandCards;
    // Placed land cards.
    this.landscape = [];
    // Order in which will players play.
    this.playersOrder = [0, 1, 1, 0];
  }

  clone() {
    return Object.assign(new Game(), JSON.parse(JSON.stringify(this)));
  }

  filterPrivateFields(userId) {
    const privateGame = this.clone();
    privateGame.players = privateGame.players.map((player) => {
      if (player.userId !== userId && player.bear.status === Bear.HIDDEN) {
        return Object.assign({}, player, {
          bear: {
            status: player.bear.status,
          },
        });
      }
      return player;
    });
    return privateGame;
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
    if (numPlayers >= Game.MAX_PLAYERS) {
      throw new Error("Game is full.");
    }
    const playerId = numPlayers;
    this.users[userId] = { playerId };
    this.players[playerId].userId = userId;
    return playerId;
  }

  setBear(playerId, index) {
    if (!(playerId >= 0 && playerId < 2)) {
      throw new Error("Invalid player ID.");
    }
    if (!(index >= 0 && index < 6)) {
      throw new Error("Invalid bear index.");
    }
    const bear = this.players[playerId].bear;
    if (bear.status !== Bear.UNSET) {
      throw new Error("Bear already set.");
    }
    bear.status = Bear.HIDDEN;
    bear.index = index;
    return bear;
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
      return Promise.reject(new Error(`Not found: ${gameId}`));
    }
    return Promise.resolve(game.clone());
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
