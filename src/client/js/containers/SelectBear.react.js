import React, { PropTypes } from "react";

import { connect } from "react-redux";
import Actions from "../actions";

const SelectBear = ({ dispatch }) => {
  const choose = (index) => {
    return () => {
      dispatch(Actions.selectBear(index));
    };
  };
  const selectors = [1, 2, 3, 4, 5, 6].map((number) => {
    return <button key={number} onClick={choose(number - 1)}>{number}</button>;
  });
  return (
    <div className="bearSelector">
      {selectors}
    </div>
  );
};

SelectBear.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SelectBear);
