import React from "react";
import Heading from "../layout/Heading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useState } from "react";
import FormMessage from "../../common/FormMessage";
import { ACCOMMODATIONS_PATH } from "../../constants/api";
import useAxios from "../../hooks/useAxios";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter a accommodation name")
    .min(2, "Accommodation name must be longer than 2 characters"),
  address: yup
    .string()
    .required("Please enter an address")
    .min(8, "Address must be longer than 8 characters long"),
});

function Enquiries() {
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  const url = ACCOMMODATIONS_PATH;
  console.log(url);

  async function onSubmit(data) {
    setSubmitting(true);
    setPostError(null);

    try {
      const response = await http.post(url, {
        data: {
          title: data.title,
          address: data.address,
        },
      });
      console.log(response);
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Heading title="Booking Enquiries" />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-light p-3 d-flex flex-column mx-auto`}
      >
        <fieldset disabled={submitting}>
          <Form.Label htmlFor="title" className="mt-3">
            Name
          </Form.Label>
          <Form.Control
            {...register("title")}
            id="title"
            placeholder="Full Name of Accommodation"
          />
          {errors.title && (
            <div className="mb-3 text-danger">{errors.title.message}</div>
          )}

          <Form.Label htmlFor="address" className="mt-3">
            Address
          </Form.Label>
          <Form.Control
            {...register("address")}
            id="address"
            placeholder="Postal code, street name"
          />
          {errors.address && (
            <div className="mb-3 text-danger">{errors.address.message}</div>
          )}

          <button type="submit" className="mt-3 bg-primary text-white">
            {submitting === true ? "Working..." : "Submit"}
          </button>
        </fieldset>
        {postError && (
          <FormMessage styling="form--error">
            Something went wrong when posting data
          </FormMessage>
        )}
        {postSuccess && (
          <FormMessage styling="form--success">
            Message was successfully submitted
          </FormMessage>
        )}
      </Form>
    </>
  );
}

export default Enquiries;
