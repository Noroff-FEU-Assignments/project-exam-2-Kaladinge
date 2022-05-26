import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormMessage from "../../common/FormMessage";
import Loader from "../../common/Loader";
import { BASE_URL } from "../../constants/api";
import Heading from "../layout/Heading";
import AccommodationDetails from "./AccommodationDetails";
import EnquiryForm from "./EnquiryForm";

function AccommodationPage() {
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchDataError, setFetchDataError] = useState(null);

  const { id } = useParams("/");
  const url = BASE_URL + `accommodations/${id}?populate=*`;

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
    return <Loader />;
  }

  if (fetchDataError) {
    return (
      <FormMessage styling="form--error">
        There was a fetch data error
      </FormMessage>
    );
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
    mainpics,
    subpic,
    airport,
    bryggen,
    email,
  } = accommodation.attributes;

  return (
    <>
      <Heading title={title} />

      <Row>
        <Col xs={12} lg={8} className="accommodation">
          <AccommodationDetails
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
            mainpic={mainpics}
            subpic={subpic}
            airport={airport}
            bryggen={bryggen}
            email={email}
          />
        </Col>
        <Col className="enquiryform border-start">
          <div className="enquiryform--container text-center">
            <EnquiryForm title={title} email={email} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default AccommodationPage;
