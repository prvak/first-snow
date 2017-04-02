import express from "express";

import Game from "../models/Game";

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
  Game.Query.get(req.params.gameId)
    .then((game) => {
      res.send(game);
    })
    .catch((error) => {
      res.status(404).send({ error });
    });
});

export default router;
