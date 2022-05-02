import axios from "axios";
import React, { useEffect, useState } from "react";
import AccommodationItem from "./AccommodationItem";

function AccommodationList({ category }) {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);

  const url =
    "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setAccommodations(response.data.data);
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getAccommodations();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchPagesError) {
    return <div>There was a fetch pages error</div>;
  }

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
          mainpic,
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
            mainpic={mainpic}
            airport={airport}
            bryggen={bryggen}
          />
        );
      })}
    </>
  );
}

export default AccommodationList;
