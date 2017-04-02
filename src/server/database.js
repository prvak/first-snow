import Promise from "bluebird";
import database from "sqlite/legacy";

import logger from "./logger";

class Database {
  connect(config) {
    this.config = config;
    const openDatabase = () => {
      logger.info(`Connecting to database at '${config.path}'.`);
      return database.open(config.path, { Promise });
    };
    const migrateDatabase = () => {
      return Promise.resolve(); // Dummy migration
      // logger.info(`Migrating database to '${config.version}'.`);
      // return database.migrate({ force: "last" });
    };
    return Promise.resolve()
      .then(openDatabase)
      .then(migrateDatabase)
      .catch((error) => {
        logger.error(`Database initialization failed: ${error}.`);
        throw error;
      });
  }
}

export default new Database();
