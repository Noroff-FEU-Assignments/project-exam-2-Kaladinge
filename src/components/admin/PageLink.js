import React from "react";
import { HashLink } from "react-router-hash-link";
import PropTypes from "prop-types";

export default function PageLink({ children, link }) {
  return (
    <div>
      <HashLink className="d-inline-block link" to={link} smooth>
        {children}
      </HashLink>
    </div>
  );
}

PageLink.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
