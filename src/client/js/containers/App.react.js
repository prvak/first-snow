import React, { PropTypes } from "react";
import { connect } from "react-redux";

import ConnectionStatus from "./ConnectionStatus.react";
import Game from "./Game.react";

const App = ({ connectionStatus, game, userId }) => {
  return (
    <div className="app">
      <ConnectionStatus connectionStatus={connectionStatus} />
      <Game players={game.players} landCards={game.landCards} localUserId={userId} />
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
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(App);
