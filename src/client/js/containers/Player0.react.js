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
    score: PropTypes.number.isRequired,
    userId: PropTypes.string,
  }).isRequired,
};

export default Player;
