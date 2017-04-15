
class Ai {
  constructor(userId) {
    this.userId = userId;
  }

  joinGame(game, socket) {
    this.game = game;
    this.socket = socket;
    socket.emit("game:join", { gameId: game.id, userId: this.userId });
  }
}

export default Ai;
