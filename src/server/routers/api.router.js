import express from "express";
import pretty from "express-prettify";

import gameRouter from "./api.game.router";

const router = express.Router();

router.use(pretty({ query: "pretty" }));
router.use("/game", gameRouter);

export default router;
