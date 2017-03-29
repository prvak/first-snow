import Promise from "bluebird";
import server from "./server";
import database from "./database";
import config from "./config.json";
import logger from "./logger";

function connectToDatabase() {
  return database.connect(config.db);
}

function startServer() {
  return server.listen(config.server);
}

Promise.resolve()
  .then(connectToDatabase)
  .then(startServer)
  .then(() => { logger.info("Ready."); })
  .catch((error) => { logger.error(`Initialization failed: ${error}.`); });
