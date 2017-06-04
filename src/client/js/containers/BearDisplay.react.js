import React, { PropTypes } from "react";

import { Bear } from "../../../common/GameConstants";
import SelectBear from "./SelectBear.react";

const BearDisplay = ({ bear, playerId, isLocalPlayer }) => {
  if (isLocalPlayer && bear.status === Bear.UNSET) {
    const selectors = [0, 1, 2, 3, 4, 5].map((index) => {
      return <SelectBear key={index} playerId={playerId} index={index} />;
    });
    return (
      <div className="bearSelector">
        <div>Bear: {bear.status}</div>
        <div>
          {selectors}
        </div>
      </div>
    );
  } else if (bear.index === undefined) {
    return (
      <div className="bearSelector">
        <div>Bear: {bear.status} unknown</div>
      </div>
    );
  } else {
    return (
      <div className="bearSelector">
        <div>Bear: {bear.status} {bear.index}</div>
      </div>
    );
  }
};

BearDisplay.propTypes = {
  bear: PropTypes.shape({
    status: PropTypes.oneOf([Bear.SET, Bear.UNSET]).isRequired,
    index: PropTypes.integer,
    isChoosing: PropTypes.bool,
  }).isRequired,
  playerId: PropTypes.number.isRequired,
  isLocalPlayer: PropTypes.bool.isRequired,
};

export default BearDisplay;
