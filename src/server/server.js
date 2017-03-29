import Promise from "bluebird";
import express from "express";
import Primus from "primus";

import logger from "./logger";
import packageJson from "../../package.json";


// Main game server.
class Server {
  constructor() {
    this.app = express();

    // this.app.use(bodyParser.json());
    // this.app.use(bodyParser.urlencoded({
    //   extended: true,
    // }));

    this.app.get("/", (req, res) => {
      logger.info("/");
      const message = "Hello World!";
      return res.send({ message });
    });

    this.app.get("/version", (req, res) => {
      logger.info("/version");
      const version = packageJson.version;
      return res.send({ version });
    });
  }

  listen(config) {
    this.config = config;
    const startServer = () => {
      return new Promise((resolve, reject) => {
        this.server = this.app.listen(this.config.port, this.config.url, (error) => {
          if (error) reject(error);
          resolve();
        }).on("error", (error) => {
          reject(error);
        });
      });
    };
    const startWebsockets = () => {
      return Promise.resolve(() => {
        this.websockets = new Primus(this.server, { transformer: "websockets" });
      });
    };

    return Promise.resolve()
      .then(startServer)
      .then(startWebsockets)
      .then(() => { logger.info(`Server listening at 'http://${config.url}:${config.port}'.`); });
  }
}

const server = new Server();

export default server;
