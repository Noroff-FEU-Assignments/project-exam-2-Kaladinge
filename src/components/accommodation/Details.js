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
  airport,
  bryggen,
}) {
  return (
    <>
      <div>
        <span>{summary}</span> - <span>{address}</span> -{" "}
        <span>{rating} stars</span>
      </div>
      <hr></hr>
      {facility.map((item) => {
        return <span key={item}>{item} </span>;
      })}
      <hr></hr>
      <Row>
        <Col>
          <img src={mainpic.data.attributes.url} className="w-100" />
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          {description}
        </Col>
        <Col>
          <p>{area}</p>
          <ul>
            <li>{airport} km away from Bergen Airport</li>
            <li>{bryggen} km away from Bergen Brygge</li>
          </ul>
        </Col>
      </Row>
    </>
  );
}

export default Details;
