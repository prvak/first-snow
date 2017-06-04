import logger from "./logger";
import GameEvents from "../common/GameEvents";
import { Bear, Camp } from "../common/GameConstants";

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
        case GameEvents.CAMP_CHOSEN:
          this.onCampChosen(data.playerId, data.camp, data.landscapeSide);
          break;
        default:
          logger.info(`AI ignores game event '${type}'`, type);
          break;
      }

      if (this.playerId !== undefined) {
        // User joined the game.
        const player = this.game.players[this.playerId];
        const turn = this.game.landCards.length;
        if (player.bear.status === Bear.UNSET) {
          // Bear is not set yet.
          this.socket.emit("game:bear:choose", {
            playerId: this.playerId,
            index: 2,
          });
        } else if (this.game.playersOrder[turn] === this.playerId) {
          // It is this players turn.
          this.socket.emit("game:camp:choose", {
            playerId: this.playerId,
            index: 3,
            side: "left",
          });
        }
      }
    });
  }

  onUserJoined(userId, playerId) {
    this.game.users[userId] = playerId;
    this.game.players[playerId].userId = userId;
    this.playerId = playerId;
  }

  onBearChosen(playerId, bear) {
    const player = this.game.players[playerId];
    player.bear.status = bear.status;
    if (bear.index !== undefined) {
      player.bear.index = bear.index;
    }
  }

  onCampChosen(playerId, camp, landscapeIndex) {
    // Update player camp.
    const player = this.game.players[playerId];
    if (player.dayCamp.status === Camp.UNSET) {
      player.dayCamp.status = camp.status;
      player.dayCamp.index = camp.index;
      player.dayCamp.side = camp.side;
    } else if (player.nightCamp.status === Camp.UNSET) {
      player.nightCamp.status = camp.status;
      player.nightCamp.index = camp.index;
      player.nightCamp.side = camp.side;
    } else {
      throw new Error(`Player ${playerId} has already placed both camps.`);
    }
    // Update landscape. Move land card from unused landcards into landscape.
    const landCardIndex = this.game.landCard.findIndex((card) => {
      return card.index === camp.index;
    });
    const landCard = this.game.landCards[landCardIndex];
    this.game.landCards.splice(landCardIndex, 1);
    this.game.landscape.splice(landscapeIndex, 0, landCard);
  }
}

export default Ai;
