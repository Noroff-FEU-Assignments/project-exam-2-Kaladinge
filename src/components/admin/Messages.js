import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Heading from "../layout/Heading";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);

  const url = "https://kaladinge-pe2.herokuapp.com/api/messages";

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setMessages(result.data);
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchPagesError) {
    return <div>There was a fetch messages error</div>;
  }

  return (
    <>
      <div className="d-flex">
        <Heading title="Messages" />
        <p>{messages.length}</p>
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
          {messages.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.attributes.email}</td>
                <td>{item.attributes.subject}</td>
                <td>{item.attributes.message}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Messages;