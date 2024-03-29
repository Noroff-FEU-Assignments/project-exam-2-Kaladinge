import React, { useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import noImage from "../../images/no-image.jpg";
import PropTypes from "prop-types";
import closeIcon from "../../images/close-icon.png";

export default function AccommodationDetails({
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

  const carouselArray = function () {
    let carousel = [];
    if (mainpic.data) {
      carousel.push(mainpic.data[mainpic.data.length - 1].attributes.url);
    }
    if (subpic.data) {
      subpic.data.forEach((item) => {
        carousel.push(item.attributes.url);
      });
    }
    return carousel;
  };

  function displayModal(index) {
    setDisplayModalImage(!displayModalImage);
    setIndex(index);
  }

  function handleSelect(selectedIndex) {
    setIndex(selectedIndex);
  }

  return (
    <>
      <div className="accommodation--textcontainer">
        <div className="fst-italic">{summary}</div>
        <span>{address}</span> - <span className="text-success">{rating}</span>
        <hr />
      </div>
      <div>
        {facility.map((item) => {
          return (
            <span
              key={item}
              className="accommodation--facility text-white me-1 mb-1 rounded d-inline-block text-center p-1"
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
            src={
              mainpic.data
                ? mainpic.data[mainpic.data.length - 1].attributes.url
                : noImage
            }
            className="w-100 accommodation--image border"
            alt="main accommodation"
            onClick={() => displayModal(0)}
          />
        </Col>
        <Col>
          <Row>
            <Col xs={6} sm={12}>
              <img
                src={
                  !subpic.data
                    ? noImage
                    : subpic.data.length === 1
                    ? subpic.data[subpic.data.length - 1].attributes.url
                    : subpic.data[subpic.data.length - 2].attributes.url
                }
                className="accommodation--image w-100 border"
                alt="sub accommodation"
                onClick={() => displayModal(1)}
              />
            </Col>
            <Col xs={6} sm={12} className="mt-sm-3">
              <img
                src={
                  !subpic.data
                    ? noImage
                    : subpic.data.length === 1
                    ? noImage
                    : subpic.data[subpic.data.length - 1].attributes.url
                }
                className="accommodation--image w-100 border"
                alt="sub accommodation"
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
        <img
          onClick={() => displayModal(0)}
          className="modal--close"
          src={closeIcon}
          alt="close icon"
        />
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="modal--content"
        >
          {carouselArray().map((picture, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={picture}
                alt={`carousel item ${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

AccommodationDetails.propTypes = {
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  airport: PropTypes.number.isRequired,
  bryggen: PropTypes.number.isRequired,
  facility: PropTypes.array,
};
