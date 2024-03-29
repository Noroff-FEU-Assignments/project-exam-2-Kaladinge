import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import { BASE_URL } from "../../constants/api";
import Heading from "../layout/Heading";

function ChoosePost() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);

  const url = BASE_URL + "accommodations/?populate=*";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
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
            <Link
              to={`/edit/${item.id}`}
              className="text-decoration-none text-center"
            >
              <h6 className="posts p-3">{item.attributes.title}</h6>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ChoosePost;
