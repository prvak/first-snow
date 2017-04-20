import React, { PropTypes } from "react";

import Player from "./Player.react";
import UnusedLandCards from "./UnusedLandCards.react";

const Game = ({ players, landCards }) => {
  if (!players) {
    return <div>Loading</div>;
  }
  return (
    <div className="game">
      <Player player={players[0]} />
      <Player player={players[1]} />
      <UnusedLandCards landCards={landCards} />
    </div>
  );
};

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number,
  })).isRequired,
  landCards: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number,
  })).isRequired,
};

export default Game;
