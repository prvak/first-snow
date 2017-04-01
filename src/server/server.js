import Promise from "bluebird";
import express from "express";
import path from "path";
import WebSocket from "ws";
import http from "http";

import logger from "./logger";
import packageJson from "../../package.json";

// Main game server.
class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WebSocket.Server({ server: this.server });

    this.wss.on("connection", (ws) => {
      logger.info(`ws client connected: ${ws}`);

      ws.on("message", (message) => {
        logger.info(`ws message received: ${message}`);
        ws.send(Date.now());
      });
      ws.on("close", (code) => {
        logger.info(`ws client disconnected: ${code}`);
      });
    });
    // expressWs(this.app);

    // this.app.ws("/ws", (ws, req) => {
    //   logger.info("connected to client");
    // });

    // this.app.get("/ws", (req, res) => {
    //   logger.info("/ws");
    //   const message = "Not what you wanted.";
    //   return res.send({ message });
    // });

    this.app.get("/version", (req, res) => {
      logger.info("/version");
      const version = packageJson.version;
      return res.send({ version });
    });

    this.app.use(express.static(path.join(__dirname, "..", "client")));
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
