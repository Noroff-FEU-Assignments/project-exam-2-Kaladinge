import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";

function SearchBar() {
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

  console.log(accommodations);

  function showAccommodations() {
    console.log("hi");
  }

  return (
    <>
      <FormControl
        autoComplete="off"
        className="navsearch"
        type="text"
        placeholder="Search accommodation"
        name="search"
        onKeyUp={showAccommodations}
      />
      <div id="navsearch--results"></div>
    </>
  );
}

export default SearchBar;
