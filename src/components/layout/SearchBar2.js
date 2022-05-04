import axios from "axios";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

import ListResult from "./ListResult";

function SearchBar() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const [listResult, setListResult] = useState(null);
  const [displayResult, setDisplayResult] = useState("d-none");
  const [terms, setTerms] = useState(null);

  function showAccommodations(event) {
    const url =
      "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

    setDisplayResult("d-block");

    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);

        setTerms(autoCompleteMatch(event.target.value, response.data.data));
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getAccommodations();
  }

  function autoCompleteMatch(input, apiArray) {
    if (input === "") {
      return [];
    }
    const reg = new RegExp(input.toLowerCase());
    return apiArray.filter(function (item) {
      if (item.attributes.title.toLowerCase().match(reg)) {
        return item;
      }
    });
  }

  return (
    <div className="position-relative">
      <FormControl
        autoComplete="off"
        className="navsearch"
        type="text"
        placeholder="Search accommodations"
        name="search"
        onKeyUp={showAccommodations}
      />
      <div
        className={`text-danger navsearch--result position-absolute w-100 ${displayResult}`}
        id="navsearch--results"
      >
        <ListResult list={terms} error={fetchPagesError} loading={loading} />
      </div>
    </div>
  );
}

export default SearchBar;