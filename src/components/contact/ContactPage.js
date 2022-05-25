import React from "react";
import Heading from "../layout/Heading";
import ContactForm from "./ContactForm";

function ContactPage() {
  return (
    <>
      <Heading title="Send Us A Message" />
      <ContactForm />
    </>
  );
}

export default ContactPage;
