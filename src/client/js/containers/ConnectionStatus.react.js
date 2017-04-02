import React, { PropTypes } from "react";

const ConnectionStatus = ({ connectionStatus }) => {
  return (
    <div>{connectionStatus}</div>
  );
};

ConnectionStatus.propTypes = {
  connectionStatus: PropTypes.string.isRequired,
};

export default ConnectionStatus;
