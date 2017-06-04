import Promise from "bluebird";
import server from "./server";
import database from "./database";
import config from "./config.json";
import logger from "./logger";
import Game from "./models/Game";
import Ai from "./Ai";

function connectToDatabase() {
  return database.connect(config.db);
}

function startServer() {
  return server.listen(config.server);
}

function createTestingData() {
  logger.info("Creating a new Game");
  return Game.Query.save(new Game())
    .then((game) => {
      const userId = "AI";
      const ai = new Ai(userId);
      ai.joinGame(game.filterPrivateFields(userId), server.ioClient);
    });
}

Promise.resolve()
  .then(connectToDatabase)
  .then(startServer)
  .then(createTestingData)
  .then(() => { logger.info("Ready."); })
  .catch((error) => { logger.error(`Initialization failed: ${error}.`); });
