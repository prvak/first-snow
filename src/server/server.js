import Promise from "bluebird";
import express from "express";
import http from "http";
import path from "path";
import io from "socket.io";
import ioClient from "socket.io-client";

import logger from "./logger";
import Game from "./models/Game";
import GameEvents from "../common/GameEvents";
import apiRouter from "./routers/api.router";
import packageJson from "../../package.json";

// Main game server.
class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.ioServer = io(this.server);

    this.ioServer.on("connection", (socket) => {
      logger.info(`Client connected: ${socket.id}`);
      socket.on("disconnect", () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
      const session = {};
      // Join existing game with given id.
      socket.on("game:join", (data) => {
        session.gameId = data.gameId;
        session.userId = data.userId;
        logger.info(`User '${data.userId}' wants to join game '${data.gameId}'`);
        Game.Query.get(data.gameId)
          .then((game) => {
            session.playerId = game.join(data.userId);
            return Game.Query.save(game);
          })
          .then(() => {
            session.gameRoom = `/game/${session.gameId}`;
            session.playerRoom = `/game/${session.gameId}/player/${session.playerId}`;
            socket.join(session.gameRoom);
            socket.join(session.playerRoom);
            logger.info(`User '${session.userId}' joined game '${session.gameId}' as player '${session.playerId}'`);
            this.ioServer.to(session.gameRoom).emit("game:event", {
              type: GameEvents.USER_JOINED,
              userId: session.userId,
              playerId: session.playerId,
            });
          })
          .catch((error) => {
            logger.info(`User '${session.userId}' cannot join game '${session.gameId}': ${error}`);
            socket.to(socket.id).emit("game:error", { userId: session.userId, gameId: session.gameId, error });
          });
      });
      socket.on("game:bear:choose", (data) => {
        logger.info(`Game ${session.gameId}: Player '${session.playerId}': Chooses bear at '${data.index}'`);
        let bear;
        Game.Query.get(session.gameId)
          .then((game) => {
            bear = game.setBear(session.playerId, data.index);
            return Game.Query.save(game);
          })
          .then(() => {
            this.ioServer.to(session.gameRoom).emit("game:event", {
              type: GameEvents.BEAR_CHOSEN,
              playerId: session.playerId,
              bear: { status: bear.status },
            });
            this.ioServer.to(session.playerRoom).emit("game:event", {
              type: GameEvents.BEAR_CHOSEN,
              playerId: session.playerId,
              bear: { status: bear.status, index: bear.index },
            });
          })
          .catch((error) => {
            logger.info(`Game ${session.gameId}: Player '${session.playerId}': Cannot choose bear at '${data.index}': ${error}`);
            socket.to(socket.id).emit("game:error", { gameId: session.gameId, playerId: session.playerId, error });
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
          resolve();
        }).on("error", (error) => {
          reject(error);
        });
      });
    };
    const connectClientSocket = () => {
      return new Promise((resolve, reject) => {
        this.ioClient = ioClient(`http://${this.config.url}:${this.config.port}`);
        this.ioClient.on("connect", () => {
          resolve();
        });
        this.ioClient.on("error", (error) => {
          reject(error);
        });
      });
    };
    return Promise.resolve()
      .then(startServer)
      .then(connectClientSocket)
      .then(() => { logger.info(`Server listening at 'http://${config.url}:${config.port}'.`); });
  }
}

const server = new Server();

export default server;
