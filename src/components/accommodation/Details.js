import React from "react";
import { Col, Row } from "react-bootstrap";

function Details({
  id,
  title,
  summary,
  description,
  address,
  area,
  facility,
  price,
  rating,
  mainpic,
  subpic,
  airport,
  bryggen,
}) {
  return (
    <>
      <div className="accommodation--textcontainer">
        <div>{summary}</div>
        <span>{address}</span> - <span className="text-success">{rating}</span>
        <hr></hr>
      </div>
      <div className="d-flex justify-content-between">
        {facility.map((item) => {
          return (
            <span
              key={item}
              className="accommodation--facility text-white text-center me-1 rounded p-1"
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
          />
        </Col>
        <Col>
          <Row>
            <Col xs={6} sm={12}>
              <img
                src={subpic.data[0].attributes.url}
                className="w-100 accommodation--image"
              />
            </Col>
            <Col xs={6} sm={12} className="mt-sm-3">
              <img
                src={subpic.data[1].attributes.url}
                className="w-100 accommodation--image"
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
    </>
  );
}

export default Details;
