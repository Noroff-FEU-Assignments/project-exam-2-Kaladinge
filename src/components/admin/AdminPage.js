import React from "react";
import AddPostForm from "./authActions/AddPostForm";
import Messages from "./Messages";
import PageLink from "./PageLink";
import Enquiries from "./Enquiries";
import ChoosePost from "./ChoosePost";

function AdminPage() {
  return (
    <>
      <div className="mb-5">
        <PageLink link="#messages">Messages</PageLink>
        <PageLink link="#enquiries">Booking Enquiries</PageLink>
        <PageLink link="#add-accommodation">Add a New Accommodation</PageLink>
        <PageLink link="#edit-delete">Edit/Delete accommodation</PageLink>
      </div>
      <section className="admin-section" id="messages">
        <Messages />
      </section>
      <section className="admin-section" id="enquiries">
        <Enquiries />
      </section>
      <section className="admin-section" id="add-accommodation">
        <AddPostForm />
      </section>
      <section className="admin-section mt-5" id="edit-delete">
        <ChoosePost />
      </section>
    </>
  );
}

export default AdminPage;
