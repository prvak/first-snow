import React, { PropTypes } from "react";

import BearDisplay from "./BearDisplay.react";

const Player = ({ player, isLocalPlayer }) => {
  return (
    <div className="player">
      <div>ID: {player.userId}</div>
      <div>Score: {player.score}</div>
      <BearDisplay bear={player.bear} isLocalPlayer={isLocalPlayer} />
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number.isRequired,
    userId: PropTypes.string,
    bear: PropTypes.object,
  }).isRequired,
  isLocalPlayer: PropTypes.bool.isRequired,
};

export default Player;
