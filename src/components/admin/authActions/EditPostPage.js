import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormMessage from "../../../common/FormMessage";
import Loader from "../../../common/Loader";
import { BASE_URL } from "../../../constants/api";
import EditDeleteForm from "./EditDeleteForm";

function EditPostPage() {
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
    return <FormMessage>There was a fetch data error</FormMessage>;
  }

  return <EditDeleteForm accommodation={accommodation} />;
}

export default EditPostPage;
