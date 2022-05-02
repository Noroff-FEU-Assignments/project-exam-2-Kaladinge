import React from "react";

import Heading from "../layout/Heading";
import AddPost from "./AddPost";
import Messages from "./Messages";
import PageLink from "./PageLink";
import Enquiries from "./Enquiries";

function Admin() {
  return (
    <>
      <PageLink link="#messages">Messages</PageLink>
      <PageLink link="#enquiries">Booking Enquiries</PageLink>
      <PageLink link="#add-accommodation">Add a New Accommodation</PageLink>

      <section id="messages">
        <Messages />
      </section>
      <section id="enquiries">
        <Enquiries />
      </section>
      <section id="add-accommodation">
        <AddPost />
      </section>
    </>
  );
}

export default Admin;
