import React from "react";
import AccommodationItem from "./AccommodationItem";
import PropTypes from "prop-types";

export default function AccommodationList({ accommodations }) {
  return (
    <>
      {accommodations.map((item) => {
        const {
          title,
          email,
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
            email={email}
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

AccommodationList.propTypes = {
  accommodations: PropTypes.array.isRequired,
};
