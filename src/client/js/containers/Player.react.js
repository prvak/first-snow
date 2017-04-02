import React, { PropTypes } from "react";

const Player = ({ score }) => {
  return (
    <div>
      { score }
    </div>
  );
};

Player.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Player;
