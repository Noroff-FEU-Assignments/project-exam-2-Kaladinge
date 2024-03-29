import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import FormMessage from "../../common/FormMessage";
import Loader from "../../common/Loader";
import { ENQUIRIES_PATH } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";

function Messages() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await http.get(ENQUIRIES_PATH);
        setEnquiries(response.data.data);
      } catch (error) {
        setFetchPagesError(error.toString());
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (fetchPagesError) {
    return (
      <FormMessage styling="form--error">
        There was a fetch enquiries error
      </FormMessage>
    );
  }

  return (
    <>
      <div className="position-relative d-inline-block">
        <Heading title="Enquiries" />
        <span className="position-absolute top-0 start-100 badge rounded-pill bg-secondary">
          {enquiries.length}
        </span>
      </div>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Guests</th>
            <th>Customer email</th>
            <th>Accommodation name</th>
            <th>Accommodation email</th>
            <th>Dates</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.length === 0 ? (
            <tr>
              <td colSpan={6}>No enquiries at the moment</td>
            </tr>
          ) : (
            enquiries.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.attributes.name}</td>
                  <td>{item.attributes.guests}</td>
                  <td>{item.attributes.email}</td>
                  <td>{item.attributes.hotel}</td>
                  <td>{item.attributes.emailaccomm}</td>
                  <td>
                    {item.attributes.from} - {item.attributes.to}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Messages;
