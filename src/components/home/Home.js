import React, { useContext } from "react";
import { categoryImages } from "../../constants/data";
import { Link } from "react-router-dom";
import { FilterContext } from "../../context/AuthContext";

function Home() {
  const [filter, setFilter] = useContext(FilterContext);

  function setCategory(e) {
    setFilter(e.target.nextSibling.innerText);
  }

  return (
    <>
      <div className="hero-banner mb-5">
        <h2 className="hero-banner--text text-center">Bergen welcomes you!</h2>
      </div>
      <Link to={`/accommodations`}>
        <div className="categories-thumbnails d-md-flex justify-content-between">
          {categoryImages.map((item) => (
            <div
              key={item.text}
              className="categories-thumbnails--button mx-end mb-3 position-relative border"
              onClick={setCategory}
            >
              <img
                src={item.image}
                className="categories-thumbnails--image w-100"
              />
              <h3 className="categories-thumbnails--text position-absolute bottom-0 p-4 m-0 bg-secondary w-100 text-white text-center">
                {item.text}
              </h3>
            </div>
          ))}
        </div>
      </Link>
    </>
  );
}

export default Home;
