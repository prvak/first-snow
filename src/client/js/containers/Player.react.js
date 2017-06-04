import React, { PropTypes } from "react";

import BearDisplay from "./BearDisplay.react";

const Player = ({ player, playerId, isLocalPlayer }) => {
  return (
    <div className="player">
      <div>User: {player.userId}</div>
      <div>Score: {player.score}</div>
      <BearDisplay
        bear={player.bear}
        playerId={playerId}
        isLocalPlayer={isLocalPlayer}
      />
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number.isRequired,
    userId: PropTypes.string,
    bear: PropTypes.object,
  }).isRequired,
  playerId: PropTypes.number.isRequired,
  isLocalPlayer: PropTypes.bool.isRequired,
};

export default Player;
