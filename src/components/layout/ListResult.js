import React from "react";
import { Link } from "react-router-dom";

function ListResult({ list, error, loading }) {
  console.log(loading);
  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>There was something wrong when fetching results</p>;
  }

  if (list.length > 0) {
    return (
      <ul>
        {list.map((item) => {
          return (
            <Link to={`/accommodation/${item.id}`} key={item.id}>
              <li>{item.attributes.title}</li>
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
