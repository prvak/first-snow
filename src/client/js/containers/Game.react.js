import React, { PropTypes } from "react";
import Player from "./Player.react";

const Game = ({ players }) => {
  if (!players) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Player score={players[0].score} />
      <Player score={players[1].score} />
    </div>
  );
};

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    score: PropTypes.number,
  })).isRequired,
};

export default Game;
