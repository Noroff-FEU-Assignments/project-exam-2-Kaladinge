import React from "react";
import { HashLink } from "react-router-hash-link";

function PageLink({ children, link }) {
  return (
    <div>
      <HashLink className="d-inline-block link" to={link} smooth>
        {children}
      </HashLink>
    </div>
  );
}

export default PageLink;
