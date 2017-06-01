import React, { PropTypes } from "react";

import { Bear } from "../../../common/GameConstants";
import SelectBear from "./SelectBear.react";

const BearDisplay = ({ bear, isLocalPlayer }) => {
  if (isLocalPlayer && bear.status === Bear.UNSET) {
    return (
      <div className="bearSelector">
        <div>Bear: {bear.status}</div>
        <SelectBear />
      </div>
    );
  } else {
    return (
      <div className="bearSelector">
        <div>Bear: {bear.status}</div>
      </div>
    );
  }
};

BearDisplay.propTypes = {
  bear: PropTypes.shape({
    status: PropTypes.oneOf([Bear.SET, Bear.UNSET]).isRequired,
    index: PropTypes.integer,
  }).isRequired,
  isLocalPlayer: PropTypes.bool.isRequired,
};

export default BearDisplay;
