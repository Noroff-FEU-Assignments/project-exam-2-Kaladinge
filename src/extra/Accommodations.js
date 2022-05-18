import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Heading from "../layout/Heading";
import AccommodationList from "./AccommodationList";

function Accommodations() {
  const [category, setCategory] = useState([]);

  function addCategory(event) {
    setCategory([...category, event.target.innerHTML]);
  }

  return (
    <>
      <Row>
        <Col className="accommodations">
          <Heading title="All accommodations" />
          <div onClick={addCategory}>Hotel</div>
          <div onClick={addCategory}>Guesthouse</div>
          <AccommodationList category={category} />
        </Col>
        <Col xs={2} className="question d-none d-lg-block text-center">
          <div className="position-fixed border bottom-50">
            <p>Have a question?</p>
            <Link className="link" to={`/contact`}>
              Ask us!
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Accommodations;
