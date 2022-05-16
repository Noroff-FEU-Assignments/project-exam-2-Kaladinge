import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ListResult from "./ListResult";

function SearchBar() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const [listResult, setListResult] = useState([]);
  const [displayResult, setDisplayResult] = useState("d-none");
  const [terms, setTerms] = useState(null);
  const [listIndex, setListIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  function showAccommodations(event) {
    const url =
      "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

    setDisplayResult("d-block");

    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
        setTerms(autoCompleteMatch(event.target.value, response.data.data));
        if (event.which !== 40 && event.which !== 38) {
          setListIndex(-1);
        }
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
      setDisplayResult("d-none");
      return [];
    }
    const reg = new RegExp(input.toLowerCase());
    return apiArray.filter(function (item) {
      if (item.attributes.title.toLowerCase().match(reg)) {
        return item;
      }
    });
  }

  

  function browseList(e) {
    if (e.code !== "Enter") {
      if (e.which === 40) {
        console.log(terms);
        if (terms.length - 1 === listIndex) {
          setListIndex(0);
        } else {
          setListIndex(listIndex + 1);
        }
      } else if (e.which === 38) {
        if (0 === listIndex) {
          setListIndex(terms.length - 1);
        } else {
          setListIndex(listIndex - 1);
        }
      }
    } else if (e.code === "Enter") {
      navigate(`/accommodation/${terms[listIndex].id}`);
      e.target.value = "";
    }
  }

  function emptyInput() {
    setDisplayResult("d-none");
  }

  return (
    //<Form action={`accommodation/${inputValue}`} className="w-50">
    <div className="w-50">
      <div className="position-relative">
        <FormControl
          autoComplete="off"
          className="navsearch"
          type="text"
          placeholder="Search accommodations"
          action="hoho"
          onKeyUp={showAccommodations}
          onKeyDown={browseList}
        />
        <div
          className={`text-danger navsearch--result position-absolute w-100 ${displayResult}`}
          id="navsearch--results"
        >
          <ListResult
            list={terms}
            error={fetchPagesError}
            loading={loading}
            listIndex={listIndex}
            clickHandle={emptyInput}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
