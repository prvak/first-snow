import React, { PropTypes } from "react";

const Player = ({ player }) => {
  return (
    <div>
      {player.userId} {player.score}
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default Player;
