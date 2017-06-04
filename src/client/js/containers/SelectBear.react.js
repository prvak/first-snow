import React, { PropTypes } from "react";

import { connect } from "react-redux";
import Actions from "../actions";

const SelectBear = ({ playerId, index, onClick }) => {
  const choose = () => {
    onClick(playerId, index);
  };
  return <button onClick={choose}>{index + 1}</button>;
};

SelectBear.propTypes = {
  onClick: PropTypes.func.isRequired,
  playerId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (playerId, index) => {
      dispatch(Actions.selectBear(playerId, index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectBear);
