import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import Heading from "../layout/Heading";

function ChoosePost() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);

  const url =
    "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
        setAccommodations(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getAccommodations();
  }, [url]);

  if (loading) {
    return <Loader />;
  }

  if (fetchPagesError) {
    return <div>There was a fetch pages error</div>;
  }

  return (
    <>
      <Heading title="Add/Delete Accommodation Posts" />
      <Row>
        {accommodations.map((item) => (
          <Col xs={12} md={4} lg={3} key={item.id}>
            <Link to={`/edit/${item.id}`}>
              <h6 className="bg-primary p-3">{item.attributes.title}</h6>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ChoosePost;
