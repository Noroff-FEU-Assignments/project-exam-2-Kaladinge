import React from "react";
import { categoryImages } from "../../constants/data";

function Home() {
  console.log(categoryImages);
  return (
    <>
      <div className="hero-banner mb-5">
        <h2 className="hero-banner--text text-center">Bergen welcomes you!</h2>
      </div>
      <div className="categories-thumbnails d-md-flex justify-content-between">
        {categoryImages.map((item) => (
          <div
            key={item.text}
            className="categories-thumbnails--button mx-end mb-3 position-relative border"
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
    </>
  );
}

export default Home;
