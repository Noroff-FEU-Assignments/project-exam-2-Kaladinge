import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import FormMessage from "../../common/FormMessage";
import Loader from "../../common/Loader";
import { MESSAGES_PATH } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await http.get(MESSAGES_PATH);
        setMessages(response.data.data);
      } catch (error) {
        setFetchPagesError(error.toString());
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
        There was a fetch messages error
      </FormMessage>
    );
  }

  return (
    <div>
      <div className="position-relative d-inline-block">
        <Heading title="Messages" />
        <span className="position-absolute top-0 start-100 badge rounded-pill bg-secondary">
          {messages.length}
        </span>
      </div>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan={4}>No enquiries at the moment</td>
            </tr>
          ) : (
            messages.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.attributes.email}</td>
                  <td>{item.attributes.subject}</td>
                  <td>{item.attributes.message}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Messages;
