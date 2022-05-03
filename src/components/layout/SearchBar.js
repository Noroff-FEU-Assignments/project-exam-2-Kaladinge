import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";

function SearchBar() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const [listResult, setListResult] = useState(null);

  function showAccommodations(event) {
    const url =
      "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
        //setAccommodations(response.data.data);
        let terms = autoCompleteMatch(event.target.value, response.data.data);
        console.log(terms);
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getAccommodations();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (fetchPagesError) {
      return <div>There was a fetch pages error</div>;
    }
  }

  function autoCompleteMatch(input, apiArray) {
    console.log(input);
    if (input === "") {
      console.log("hi");
      return [];
    }
    const reg = new RegExp(input.toLowerCase());
    return apiArray.filter(function (item) {
      console.log(item.attributes.title);
      if (item.attributes.title.toLowerCase().match(reg)) {
        return item;
      }
    });
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
