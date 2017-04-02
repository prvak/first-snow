import { connect } from "react-redux";

import Game from "./Game.react";

const mapStateToProps = (state) => {
  return {
    players: state.game.players,
  };
};

const GameContainer = connect(mapStateToProps)(Game);

export default GameContainer;
