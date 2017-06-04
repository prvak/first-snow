import React, { PropTypes } from "react";

import Player from "./Player.react";
import UnusedLandCards from "./UnusedLandCards.react";

const Game = ({ players, landCards, localUserId }) => {
  if (!players) {
    return <div>Loading</div>;
  }
  const isLocalPlayer = players.map((player) => {
    return player.userId === localUserId;
  });
  return (
    <div className="game">
      <Player player={players[0]} playerId={0} isLocalPlayer={isLocalPlayer[0]} />
      <Player player={players[1]} playerId={1} isLocalPlayer={isLocalPlayer[1]} />
      <UnusedLandCards landCards={landCards} />
    </div>
  );
};

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number,
    bear: PropTypes.object,
    dayCamp: PropTypes.object,
    nightCamp: PropTypes.object,
  })).isRequired,
  landCards: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number,
  })).isRequired,
  localUserId: PropTypes.string.isRequired,
};

export default Game;
