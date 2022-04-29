import React from "react";
import { HashLink } from "react-router-hash-link";

function PageLink({ children, link }) {
  return (
    <HashLink className="d-block" to={link} smooth>
      {children}
    </HashLink>
  );
}

export default PageLink;