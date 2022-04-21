import React from "react";

function AccommodationItem({ title, address, area, facility }) {
  return (
    <div className="border">
      <h4>{title}</h4>
      <p>{address}</p>
      <hr />
      <p>{area}</p>
      <ul>
        <li>km away from Bergen Airport</li>
        <li>km away from Bergen Brygge</li>
      </ul>
      {facility.map((item) => {
        return <span>{item} </span>;
      })}
    </div>
  );
}

export default AccommodationItem;
