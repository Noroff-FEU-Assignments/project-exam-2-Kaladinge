import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../layout/Heading";
import Details from "./Details";
import EnquiryForm from "./EnquiryForm";

function Accommodation() {
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchDataError, setFetchDataError] = useState(null);

  const { id } = useParams("/");
  const url = `https://kaladinge-pe2.herokuapp.com/api/accommodations/${id}?populate=*`;

  useEffect(() => {
    const getAccommodation = async () => {
      try {
        const response = await axios.get(url);

        setAccommodation(response.data.data);
      } catch (error) {
        setFetchDataError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getAccommodation();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchDataError) {
    return <div>There was a fetch data error</div>;
  }

  const {
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
  } = accommodation.attributes;

  return (
    <>
      <Heading title={title} />
      <Row>
        <Col xs={12} lg={8}>
          <Details
            key={id}
            summary={summary}
            description={description}
            id={id}
            title={title}
            address={address}
            area={area}
            facility={facility}
            price={price}
            rating={rating}
            mainpic={mainpic}
            airport={airport}
            bryggen={bryggen}
          />
        </Col>
        <Col>
          <EnquiryForm title={title} />
        </Col>
      </Row>
    </>
  );
}

export default Accommodation;
