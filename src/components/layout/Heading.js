import React from "react";

function Heading({ title }) {
  return (
    <h3 style={{ color: "#808080", fontSize: "40px", fontWeight: "600" }}>
      {title}
    </h3>
  );
}

export default Heading;
