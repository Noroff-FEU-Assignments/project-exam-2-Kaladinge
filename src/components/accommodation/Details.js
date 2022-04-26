import React from "react";
import { Col, Row } from "react-bootstrap";

function Details({
  id,
  title,
  summary,
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
        <Col xs={12}>
          <img src={mainpic.data.attributes.url} className="w-100" />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default Details;
