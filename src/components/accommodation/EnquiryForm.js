import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

function EnquiryForm() {
  const [displayMode, setDisplayMode] = useState(false);

  function showForm() {
    console.log(displayMode);
    setDisplayMode(!displayMode);
  }

  return (
    <>
      <Button onClick={showForm}>Check availability</Button>
      <Form
        className={`bg-light p-3 d-flex flex-column mx-auto ${
          displayMode === false ? "d-none" : "d-block"
        }`}
      >
        <div>modal</div>
      </Form>
    </>
  );
}

export default EnquiryForm;
