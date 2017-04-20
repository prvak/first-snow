import React, { PropTypes } from "react";

import LocationHalf from "./LocationHalf.react";

const LandCard = ({ side, card }) => {
  return (
    <div className="landCard">
      <LocationHalf side="left" resources={card[side].left.resources} />
      <LocationHalf side="right" resources={card[side].right.resources} />
    </div>
  );
};

LandCard.propTypes = {
  side: PropTypes.string.isRequired,
  card: PropTypes.shape({
    index: PropTypes.number.isRequired,
    summer: PropTypes.shape({
      left: PropTypes.shape({
        resources: PropTypes.array.isRequired,
      }).isRequired,
      right: PropTypes.shape({
        resources: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
    winter: PropTypes.shape({
      left: PropTypes.shape({
        resources: PropTypes.array.isRequired,
      }).isRequired,
      right: PropTypes.shape({
        resources: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default LandCard;
