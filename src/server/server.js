import Promise from "bluebird";
import express from "express";
import http from "http";
import path from "path";
import io from "socket.io";

import logger from "./logger";
import Game from "./models/Game";
import apiRouter from "./routers/api.router";
import packageJson from "../../package.json";

// Main game server.
class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = io(this.server);

    this.io.on("connection", (socket) => {
      logger.info("client connected");
      socket.on("disconnect", () => {
        logger.info("client disconnected");
      });
      // Create new game and a namespace for it. Return the id of the game.
      socket.on("game:create", () => {
        logger.info("Creating game");
        Game.Query.save(new Game())
          .then((game) => {
            socket.emit("game:created", { gameId: game.id });
          });
      });
      // Join existing game with given id.
      socket.on("game:join", (data) => {
        const gameId = data.gameId;
        const userId = data.userId;
        let playerId;
        logger.info(`Player '${userId}' wants to join game '${gameId}'`);
        Game.Query.get(gameId)
          .then((game) => {
            playerId = game.join(userId);
            return Game.Query.save(game);
          })
          .then((game) => {
            const gameRoom = gameId;
            const playerRoom = playerId;
            socket.join(gameRoom);
            socket.join(playerRoom);
            logger.info(`Player '${userId}' joined game '${gameId}' as player '${playerId}'`);
            this.io.to(game.id).emit("game:joined", { playerId, userId });
          })
          .catch((error) => {
            logger.info(`Player '${userId}' cannot join game '${gameId}': ${error}`);
            socket.to(socket.id).emit("game:joined", { error });
          });
      });
    });

    this.app.use(express.static(path.join(__dirname, "..", "client")));
    this.app.use("/api", apiRouter);
    this.app.get("/version", (req, res) => {
      const version = packageJson.version;
      return res.send({ version });
    });
  }

  listen(config) {
    this.config = config;
    const startServer = () => {
      return new Promise((resolve, reject) => {
        this.server.listen(this.config.port, this.config.url, (error) => {
          if (error) reject(error);
          // this.wsClientTest(config);
          resolve();
        }).on("error", (error) => {
          reject(error);
        });
      });
    };

    return Promise.resolve()
      .then(startServer)
      .then(() => { logger.info(`Server listening at 'http://${config.url}:${config.port}'.`); });
  }

  wsClientTest() {
    const ws = new WebSocket(`ws://${this.config.url}:${this.config.port}`);

    ws.on("open", () => {
      logger.info("connected to server");
      ws.send(Date.now());
    });

    ws.on("close", () => {
      logger.info("disconnected");
    });

    ws.on("message", (data, flags) => {
      logger.info(`Roundtrip time: ${Date.now() - data} ms`, flags);

      setTimeout(() => {
        ws.send(Date.now());
      }, 1000);
    });

    ws.on("error", (e) => {
      logger.info("error", e);
    });
  }
}

const server = new Server();

export default server;
