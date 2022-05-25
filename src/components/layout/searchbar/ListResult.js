import React from "react";
import { Link } from "react-router-dom";

function ListResult({ list, loading, error, listIndex, clickHandle }) {
  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>There was something wrong when fetching results</p>;
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

export default ListResult;
