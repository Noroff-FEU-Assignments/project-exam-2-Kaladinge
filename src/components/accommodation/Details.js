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
      <div class="container mt-3">
        <div class="row">
          <div class="col-sm-8 border">
            <div class="main-content">
              <img src={mainpic.data.attributes.url} className="w-100" />
            </div>
          </div>
          <div class="col-sm-4 border">
            <div class="row">
              <div class="col-12">
                <div class="sidebar-content">hi</div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="sidebar-content">hi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Row>
        <Col xs={12} lg={6}>
          <img src={mainpic.data.attributes.url} className="w-100" />
        </Col>
        <Col xs={6} lg={6}>
          <img src={mainpic.data.attributes.url} className="w-100" />
        </Col>
        <Col xs={6} lg={6}>
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
