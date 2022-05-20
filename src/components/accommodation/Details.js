import React, { useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";

function Details({
  summary,
  description,
  address,
  area,
  facility,
  rating,
  mainpic,
  subpic,
  airport,
  bryggen,
}) {
  const [displayModalImage, setDisplayModalImage] = useState(false);
  const [index, setIndex] = useState(0);

  const pictures = [
    mainpic.data.attributes.url,
    subpic.data[0].attributes.url,
    subpic.data[1].attributes.url,
  ];

  function displayModal(index) {
    setDisplayModalImage(!displayModalImage);
    setIndex(index);
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div className="accommodation--textcontainer">
        <div>{summary}</div>
        <span>{address}</span> - <span className="text-success">{rating}</span>
        <hr></hr>
      </div>
      <div className="d-flex justify-content-start">
        {facility.map((item) => {
          return (
            <span
              key={item}
              className="accommodation--facility text-white text-center me-4 rounded p-1"
            >
              {item}{" "}
            </span>
          );
        })}
      </div>
      <hr></hr>

      <Row>
        <Col xs={12} sm={8} className="mb-2">
          <img
            src={mainpic.data.attributes.url}
            className="w-100 accommodation--image"
            onClick={() => displayModal(0)}
          />
        </Col>
        <Col>
          <Row>
            <Col xs={6} sm={12}>
              <img
                src={subpic.data[0].attributes.url}
                className="w-100 accommodation--image"
                onClick={() => displayModal(1)}
              />
            </Col>
            <Col xs={6} sm={12} className="mt-sm-3">
              <img
                src={subpic.data[1].attributes.url}
                className="w-100 accommodation--image"
                onClick={() => displayModal(2)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} lg={8}>
          {description}
        </Col>
        <Col>
          <p className="accommodation--area ms-3 mt-3 mt-lg-0 mb-0">
            Area: {area}
          </p>
          <ul className="accommodation--distance">
            <li>{airport} km away from Bergen Airport</li>
            <li>{bryggen} km away from Bergen Brygge</li>
          </ul>
        </Col>
      </Row>

      <div className={`modal ${displayModalImage ? "d-block" : "d-none"}`}>
        <span
          onClick={() => displayModal(0)}
          className="modal--close text-white"
        >
          &times;
        </span>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="modal--content"
        >
          {pictures.map((picture, index) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={picture}
                alt={`slide pic ${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default Details;
