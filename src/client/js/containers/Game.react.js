import React, { PropTypes } from "react";
import Player from "./Player.react";

const Game = ({ players }) => {
  if (!players) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Player player={players[0]} />
      <Player player={players[1]} />
    </div>
  );
};

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number,
  })).isRequired,
};

export default Game;
