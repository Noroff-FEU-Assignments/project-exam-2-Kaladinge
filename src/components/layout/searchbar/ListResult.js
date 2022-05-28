import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FormMessage from "../../../common/FormMessage";

export default function ListResult({ list, loading, error, listIndex }) {
  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return (
      <FormMessage styling="form--error">
        There was something wrong when fetching results
      </FormMessage>
    );
  }

  if (list && list.length > 0) {
    return (
      <ul>
        {list.map((item, index) => {
          return (
            <Link
              to={`/accommodation/${item.id}`}
              key={item.id}
              className="navsearch--item"
            >
              <li
                className={`${index === listIndex ? "bg-secondary" : ""} ps-2`}
              >
                {item.attributes.title}
              </li>
            </Link>
          );
        })}
      </ul>
    );
  } else {
    return <p>There are no results</p>;
  }
}

ListResult.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  listIndex: PropTypes.number.isRequired,
};
