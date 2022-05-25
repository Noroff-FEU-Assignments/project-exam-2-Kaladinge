import React from "react";
import AccommodationItem from "./AccommodationItem";

function AccommodationList({ accommodations }) {
  return (
    <>
      {accommodations.map((item) => {
        const {
          title,
          address,
          area,
          facility,
          price,
          rating,
          mainpics,
          airport,
          bryggen,
        } = item.attributes;

        const { id } = item;

        return (
          <AccommodationItem
            key={id}
            id={id}
            title={title}
            address={address}
            area={area}
            facility={facility}
            price={price}
            rating={rating}
            mainpic={mainpics}
            airport={airport}
            bryggen={bryggen}
          />
        );
      })}
    </>
  );
}

export default AccommodationList;
