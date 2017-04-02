import React, { PropTypes } from "react";
import { connect } from "react-redux";

import ConnectionStatus from "./ConnectionStatus.react";
import Game from "./Game.react";

const App = ({ connectionStatus, game }) => {
  return (
    <div>
      <ConnectionStatus connectionStatus={connectionStatus} />
      <Game players={game.players} />
    </div>
  );
};

App.propTypes = {
  connectionStatus: PropTypes.string.isRequired,
  game: PropTypes.shape({
    players: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    connectionStatus: state.connectionStatus,
    game: state.game,
  };
};

export default connect(mapStateToProps)(App);
