import logger from "./logger";
import GameEvents from "../common/GameEvents";

class Ai {
  constructor(userId) {
    this.userId = userId;
  }

  joinGame(game, socket) {
    this.game = game;
    this.socket = socket;
    this.socket.emit("game:join", { gameId: game.id, userId: this.userId });
    this.socket.on("game:event", (data) => {
      const type = data.type;
      switch (type) {
        case GameEvents.USER_JOINED:
          this.onUserJoined(data.userId, data.playerId);
          break;
        case GameEvents.BEAR_CHOSEN:
          this.onBearChosen(data.playerId, data.bear);
          break;
        default:
          logger.info(`AI ignores game event '${type}'`, type);
          break;
      }
    });
  }

  onUserJoined(userId, playerId) {
    this.game.users[userId] = playerId;
    this.game.players[playerId].userId = userId;
    if (userId === this.userId) {
      // This AI have joined the game.
      this.socket.emit("game:bear:choose", { playerId, index: 2 });
    }
  }

  onBearChosen(playerId, bear) {
    this.game.players[playerId].bear.status = bear.status;
    if (bear.index !== undefined) {
      this.game.players[playerId].bear.index = bear.index;
    }
  }
}

export default Ai;
