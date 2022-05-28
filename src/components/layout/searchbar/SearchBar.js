import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";

import ListResult from "./ListResult";

function SearchBar() {
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const [displayResult, setDisplayResult] = useState("d-none");
  const [terms, setTerms] = useState(null);
  const [listIndex, setListIndex] = useState(-1);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const url = BASE_URL + "accommodations/?populate=*";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
        setResults(response.data.data);
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getAccommodations();
  }, [url]);

  function showAllAccommodations() {
    setTerms(results);
    setDisplayResult("d-block");
  }

  function showAccommodations(event) {
    setDisplayResult("d-block");

    const getAccommodations = async () => {
      setTerms(autoCompleteMatch(event.target.value, results));
      if (event.which !== 40 && event.which !== 38) {
        setListIndex(-1);
      }
    };
    getAccommodations();
  }

  function autoCompleteMatch(input, apiArray) {
    if (input === "") {
      return results;
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
      e.target.blur();
      setDisplayResult("d-none");
    }
  }

  document.onclick = function (e) {
    if (e.target.className !== "navsearch form-control") {
      setDisplayResult("d-none");
    }
  };

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
          onClick={showAllAccommodations}
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
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
