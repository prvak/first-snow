import logger from "./logger";
import GameEvents from "../common/GameEvents";

class Ai {
  constructor(userId) {
    this.userId = userId;
  }

  joinGame(game, socket) {
    this.game = game;
    this.socket = socket;
    socket.emit("game:join", { gameId: game.id, userId: this.userId });
    socket.on("game:event", (data) => {
      const type = data.type;
      switch (type) {
        case GameEvents.USER_JOINED:
          this.onUserJoined(data.userId, data.playerId);
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
  }
}

export default Ai;
