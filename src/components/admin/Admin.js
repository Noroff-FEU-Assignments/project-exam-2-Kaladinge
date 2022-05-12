import React from "react";
import AddPost from "./AddPost";
import Messages from "./Messages";
import PageLink from "./PageLink";
import Enquiries from "./Enquiries";

function Admin() {
  return (
    <>
      <div className="mb-5">
        <PageLink link="#messages">Messages</PageLink>
        <PageLink link="#enquiries">Booking Enquiries</PageLink>
        <PageLink link="#add-accommodation">Add a New Accommodation</PageLink>
      </div>
      <section className="admin-section" id="messages">
        <Messages />
      </section>
      <section className="admin-section" id="enquiries">
        <Enquiries />
      </section>
      <section className="admin-section" id="add-accommodation">
        <AddPost />
      </section>
    </>
  );
}

export default Admin;
