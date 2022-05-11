import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Heading from "../layout/Heading";
import AccommodationList2 from "./AccommodationList2";

function Accommodations2() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [category, setCategory] = useState([]);

  const url =
    "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setDataArray(response.data.data);
        setAccommodations(response.data.data);
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getAccommodations();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchPagesError) {
    return <div>There was a fetch pages error</div>;
  }

  function addCategory(e) {
    //setCategory([...category, event.target.innerHTML]);
    console.log(e.target.innerHTML);

    const filteredArray = dataArray.filter(
      (item) => item.attributes.category === e.target.innerHTML
    );

    if (accommodations.length === dataArray.length) {
      console.log([...accommodations, ...filteredArray]);
      setAccommodations(filteredArray);
    } else {
      setAccommodations([...accommodations, ...filteredArray]);
    }
  }

  return (
    <>
      <Row>
        <Col className="accommodations">
          <Heading title="All accommodations" />
          <div onClick={addCategory}>Hotel</div>
          <div onClick={addCategory}>Guesthouse</div>
          <div onClick={addCategory}>B &amp; B</div>
          <AccommodationList2 accommodations={accommodations} />
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

export default Accommodations2;
