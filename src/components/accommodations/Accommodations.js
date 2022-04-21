import React from "react";
import Accommodation from "../accommodation/Accommodation";
import Heading from "../layout/Heading";
import AccommodationList from "./AccommodationList";

function Accommodations() {
  return (
    <>
      <Heading title="Accommodations" />
      <AccommodationList />
    </>
  );
}

export default Accommodations;
