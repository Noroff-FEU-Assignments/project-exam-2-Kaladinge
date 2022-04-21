import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Heading from "../layout/Heading";
import AccommodationList from "./AccommodationList";

function Accommodations() {
  const [category, setCategory] = useState([]);

  function addCategory(event) {
    console.log(event.target.innerHTML);
    setCategory([...category, event.target.innerHTML]);
    console.log(category);
  }

  return (
    <>
      <Row>
        <Col>
          <Heading title="Accommodations" />
          <div onClick={addCategory}>Hotel</div>
          <div onClick={addCategory}>Guesthouse</div>
          <AccommodationList />
        </Col>
        <Col xs={2} className="d-none d-lg-block">
          <div>other col</div>
        </Col>
      </Row>
    </>
  );
}

export default Accommodations;
