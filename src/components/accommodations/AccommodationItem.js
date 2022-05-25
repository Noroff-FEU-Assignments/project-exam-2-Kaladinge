import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import EnquiryForm from "../accommodation/EnquiryForm";
import noImage from "../../images/no-image.jpg";

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
  console.log(mainpic);
  return (
    <>
      <Row className="my-4">
        <Col md={4} className="p-lg-0">
          <Link to={`/accommodation/${id}`}>
            <img
              src={
                mainpic.data
                  ? mainpic.data[mainpic.data.length - 1].attributes.url
                  : noImage
              }
              className="w-100 accommodations--image"
            />
          </Link>
        </Col>
        <Col md={5}>
          <Link
            to={`/accommodation/${id}`}
            className="d-flex flex-column justify-content-between h-100"
          >
            <div>
              <h4 className="accommodations--title mb-0">{title}</h4>
              <p className="accommodations--address">{address}</p>
              <hr />
            </div>
            <div>
              <p className="mb-0">{area}</p>
              <ul className="accommodations--distance">
                <li>{airport} km away from Bergen Airport</li>
                <li>{bryggen} km away from Bergen Brygge</li>
              </ul>
            </div>
            <div>
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
            </div>
          </Link>
        </Col>
        <Col
          md={3}
          className="d-flex flex-column justify-content-around align-items-end"
        >
          <p>
            from <span className="accommodations--price">{price}</span> NOK
          </p>
          <EnquiryForm title={title} />
          <p className="accommodations--rating text-success">{rating}</p>
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default AccommodationItem;
