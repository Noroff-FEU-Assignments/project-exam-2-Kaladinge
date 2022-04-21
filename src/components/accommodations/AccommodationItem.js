import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function AccommodationItem({ title, address, area, facility, price, rating }) {
  return (
    <Row>
      <Col md={4} className="border">
        hi
      </Col>
      <Col md={4} className="border">
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
      <Col md={4} className="border">
        <p>
          from <span>{price}</span> NOK
        </p>
        <Button>Check availability</Button>
        <p>{rating}</p>
      </Col>
    </Row>
  );
}

export default AccommodationItem;
