import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function AccommodationItem({
  id,
  title,
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
    <Row>
      <Col md={4} className="border">
        <Link to={`/accommodation/${id}`}>
          <img src={mainpic.data.attributes.url} className="w-100" />
        </Link>
      </Col>
      <Col md={4} className="border">
        <Link to={`/accommodation/${id}`}>
          <h4>{title}</h4>
          <p>{address}</p>
          <hr />
          <p>{area}</p>
          <ul>
            <li>{airport} km away from Bergen Airport</li>
            <li>{bryggen} km away from Bergen Brygge</li>
          </ul>
          {facility.map((item) => {
            return <span key={item}>{item} </span>;
          })}
        </Link>
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
