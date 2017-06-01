import React, { PropTypes } from "react";

import Resource from "./Resource.react";

const LocationHalf = ({ side, resources }) => {
  const r = resources.map((resource, key) => {
    return <Resource key={key} resource={resource.resource} item={resource.item} />;
  });
  return <div className="locationCard__half">{r}</div>;
};

LocationHalf.propTypes = {
  side: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      resource: PropTypes.string.isRequired,
      item: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default LocationHalf;
