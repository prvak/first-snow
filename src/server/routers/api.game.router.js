import express from "express";

import Game from "../models/Game";
import logger from "../logger";

const router = express.Router();

// List all games.
router.get("/", (req, res) => {
  Game.Query.getAll()
    .then((games) => {
      res.send(games);
    });
});

// Create new game.
router.post("/", (req, res) => {
  Game.Query.save(new Game())
    .then((game) => {
      res.send(game);
    });
});

// Get game by id.
router.get("/:gameId/", (req, res) => {
  const gameId = req.params.gameId;
  const userId = req.query.userId;
  Game.Query.get(req.params.gameId)
    .then((game) => {
      const privateGame = game.filterPrivateFields(userId);
      res.send(privateGame);
    })
    .catch((error) => {
      logger.info(`User '${userId}' failed to get game '${gameId}': ${error}`);
      res.status(404).send({ error });
    });
});

export default router;
