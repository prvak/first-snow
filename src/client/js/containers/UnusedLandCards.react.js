import React, { PropTypes } from "react";

import LandCard from "./LandCard.react";

const UnusedLandCards = ({ landCards }) => {
  const cards = landCards.map((card) => {
    return <LandCard key={card.index} side="summer" card={card} />;
  });
  return (
    <div className="unusedLandCards">
      {cards}
    </div>
  );
};

UnusedLandCards.propTypes = {
  landCards: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      summer: PropTypes.object.isRequired,
      winter: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default UnusedLandCards;
