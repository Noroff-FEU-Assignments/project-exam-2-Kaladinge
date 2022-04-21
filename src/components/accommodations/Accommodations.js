import React from "react";
import { Col, Row } from "react-bootstrap";
import Accommodation from "../accommodation/Accommodation";
import Heading from "../layout/Heading";
import AccommodationList from "./AccommodationList";

function Accommodations() {
  return (
    <>
      <Row>
        <Col>
          <Heading title="Accommodations" />
          <AccommodationList />
        </Col>
        <Col>other col</Col>
      </Row>
    </>
  );
}

export default Accommodations;
