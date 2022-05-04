import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import EnquiryForm from "../accommodation/EnquiryForm";

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
    <Row className="accommodations">
      <Col md={4} className="border p-0">
        <Link to={`/accommodation/${id}`}>
          <img
            src={mainpic.data.attributes.url}
            className="w-100 accommodations--image"
          />
        </Link>
      </Col>
      <Col md={4} className="border">
        <Link to={`/accommodation/${id}`}>
          <h4 className="accommodations--title mb-0">{title}</h4>
          <p className="accommodations--address">{address}</p>
          <hr />
          <p className="mb-0">{area}</p>
          <ul className="accommodations--distance">
            <li>{airport} km away from Bergen Airport</li>
            <li>{bryggen} km away from Bergen Brygge</li>
          </ul>

          {facility.map((item) => {
            return (
              <span
                key={item}
                className="accommodations--facility text-white me-1 rounded p-1"
              >
                {item}
              </span>
            );
          })}
        </Link>
      </Col>
      <Col md={4} className="border">
        <p>
          from <span>{price}</span> NOK
        </p>
        <EnquiryForm />
        <p>{rating}</p>
      </Col>
    </Row>
  );
}

export default AccommodationItem;
