import React, { useEffect, useState } from "react";
import AccommodationItem from "./AccommodationItem";

function AccommodationList() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);

  const url = "https://kaladinge-pe2.herokuapp.com/api/accommodations";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result.data);
        setAccommodations(result.data);
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
        console.log(item.attributes);
        const { title, address, area, facility, price, rating } =
          item.attributes;
        console.log(title);

        return (
          <AccommodationItem
            title={title}
            address={address}
            area={area}
            facility={facility}
            price={price}
            rating={rating}
          />
        );
      })}
    </>
  );
}

export default AccommodationList;
