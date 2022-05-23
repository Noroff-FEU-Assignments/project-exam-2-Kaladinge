import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchBar() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const [listResult, setListResult] = useState(null);
  const [displayResult, setDisplayResult] = useState("d-none");

  function showAccommodations(event) {
    const url =
      "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

    setDisplayResult("d-block");

    const getAccommodations = async () => {
      try {
        setListResult(<p>loading</p>);
        const response = await axios.get(url);

        let terms = autoCompleteMatch(event.target.value, response.data.data);

        const newArray = terms.map((item) => {
          return (
            <Link to={`/accommodation/${item.id}`}>
              <li key={item.id}>{item.attributes.title}</li>
            </Link>
          );
        });
        if (terms.length > 0) {
          setListResult(<ul>{newArray}</ul>);
        } else {
          setListResult(<p>There are no results</p>);
        }
      } catch (error) {
        setFetchPagesError(error.toString());
        setListResult(<p>There was something wrong when fetching results</p>);
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
    <>
      <FormControl
        autoComplete="off"
        className="navsearch"
        type="text"
        placeholder="Search accommodation"
        name="search"
        onKeyUp={showAccommodations}
      />
      <div
        className={`text-danger navsearch--result ${displayResult}`}
        id="navsearch--results"
      >
        {listResult}
      </div>
    </>
  );
}

export default SearchBar;
