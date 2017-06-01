import React, { PropTypes } from "react";

const Resource = ({ resource, item }) => {
  if (item === "") {
    return <div className="resource">{resource}</div>;
  } else {
    return <div className="resource">{resource} ({item})</div>;
  }
};

Resource.propTypes = {
  resource: PropTypes.string.isRequired,
  item: PropTypes.string,
};

Resource.defaultProps = {
  item: "",
};

export default Resource;
