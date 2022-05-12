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
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState([]);

  const url =
    "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
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
    console.log(e);
    const filteredArray = dataArray.filter(
      (item) => item.attributes.category === e.target.innerText
    );

    if (accommodations.length === dataArray.length && clicked === false) {
      setAccommodations(filteredArray);
      console.log("first");
      setClicked(true);
    } else {
      const alreadyThere = accommodations.filter(
        (item) => item.attributes.category === e.target.innerText
      );
      console.log(alreadyThere.length);
      console.log(alreadyThere);

      if (alreadyThere.length === 0) {
        console.log("new");
        setAccommodations([...accommodations, ...filteredArray]);
      } else {
        console.log("already");
        const newArray = accommodations.filter(
          (item) => item.attributes.category !== e.target.innerText
        );
        setAccommodations(newArray);
      }
    }
  }

  console.log(accommodations.length);

  return (
    <>
      <Row>
        <Col className="accommodations">
          <Heading title="All accommodations" />
          <div onClick={addCategory} value="Hotel">
            Hotel
          </div>
          <div onClick={addCategory}>Guesthouse</div>
          <div onClick={addCategory}>B &amp; B</div>
          <AccommodationList2
            accommodations={
              accommodations.length > 0 ? accommodations : dataArray
            }
          />
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
