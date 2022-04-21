import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function AccommodationItem({ title, address, area, facility }) {
  return (
    <Row>
      <Col>hi</Col>
      <Col className="border">
        <h4>{title}</h4>
        <p>{address}</p>
        <hr />
        <p>{area}</p>
        <ul>
          <li>km away from Bergen Airport</li>
          <li>km away from Bergen Brygge</li>
        </ul>
        {facility.map((item) => {
          return <span>{item} </span>;
        })}
      </Col>
      <Col>oh</Col>
    </Row>
  );
}

export default AccommodationItem;
