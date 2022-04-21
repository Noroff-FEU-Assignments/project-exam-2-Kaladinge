import React from "react";

function AccommodationItem({ title, address }) {
  return (
    <>
      <h4>{title}</h4>
      <p>{address}</p>
    </>
  );
}

export default AccommodationItem;
