import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../common/Loader";
import Heading from "../../layout/Heading";
import EditDeleteForm from "./EditDeleteForm";
import EditDeleteForm1 from "./EditDeleteForm1";

function EditPostPage() {
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
        console.log(response.data.data);
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
    return <div>There was a fetch data error</div>;
  }

  return <EditDeleteForm accommodation={accommodation} />;
}

export default EditPostPage;
