import React from "react";
import PropTypes from "prop-types";

export default function FormMessage({ children, styling }) {
  return <div className={styling}>{children}</div>;
}

FormMessage.propTypes = {
  children: PropTypes.string.isRequired,
  styling: PropTypes.string.isRequired,
};
