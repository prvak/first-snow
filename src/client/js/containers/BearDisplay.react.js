import React, { PropTypes } from "react";

import { Bear } from "../../../common/GameConstants";
import SelectBear from "./SelectBear.react";

const BearDisplay = ({ bear, playerId, isLocalPlayer }) => {
  let selectors;
  if (isLocalPlayer && bear.status === Bear.UNSET) {
    selectors = [0, 1, 2, 3, 4, 5].map((index) => {
      return <SelectBear key={index} playerId={playerId} index={index} />;
    });
  }
  let status;
  if ((isLocalPlayer && bear.status === Bear.HIDDEN) || bear.status === Bear.SET) {
    status = <div>Bear: {bear.status} {bear.index + 1}</div>;
  } else {
    status = <div>Bear: {bear.status}</div>;
  }

  if (selectors) {
    return (
      <div className="bearSelector">
        {status} {selectors}
      </div>
    );
  } else {
    return (
      <div className="bearSelector">
        {status}
      </div>
    );
  }
};

BearDisplay.propTypes = {
  bear: PropTypes.shape({
    status: PropTypes.oneOf([Bear.SET, Bear.UNSET, Bear.HIDDEN]).isRequired,
    index: PropTypes.integer,
    isChoosing: PropTypes.bool,
  }).isRequired,
  playerId: PropTypes.number.isRequired,
  isLocalPlayer: PropTypes.bool.isRequired,
};

export default BearDisplay;
