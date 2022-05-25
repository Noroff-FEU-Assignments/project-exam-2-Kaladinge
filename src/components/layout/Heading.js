import React from "react";
import PropTypes from "prop-types";

export default function Heading({ title }) {
  return (
    <h3 style={{ color: "#808080", fontSize: "40px", fontWeight: "600" }}>
      {title}
    </h3>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};
