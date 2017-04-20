import React, { PropTypes } from "react";

const Resource = ({ resource, item }) => {
  if (item === "") {
    return <div>{resource}</div>;
  } else {
    return <div>{resource} ({item})</div>;
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
