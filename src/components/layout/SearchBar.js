import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        setListResult(null);
        const response = await axios.get(url);

        let terms = autoCompleteMatch(event.target.value, response.data.data);

        const newArray = terms.map((item) => {
          return (
            <li>
              <Link to={`/accommodation/${item.id}`}>
                {item.attributes.title}
              </Link>
            </li>
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
      <div className="text-danger" id="navsearch--results">
        {listResult}
      </div>
    </>
  );
}

export default SearchBar;
