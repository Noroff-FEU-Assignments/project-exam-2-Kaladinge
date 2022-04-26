import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import FormMessage from "../../common/FormMessage";

const url = "https://kaladinge-pe2.herokuapp.com/api/enquiries";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Your first name must be at least 3 characters"),
  guests: yup.string().required("Number of guests is required"),
  to: yup.string().required("Start date is required"),
  from: yup.string().required("End date is required"),
});

function ContactForm() {
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

  async function onSubmit(data) {
    console.log(data);
    setSubmitting(true);
    setPostError(null);
    try {
      const response = await axios.post(url, {
        data: {
          name: data.name,
          to: data.to,
          from: data.from,
          guests: data.guests,
        },
      });
      setPostSuccess(true);
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-light p-3 d-flex flex-column mx-auto`}
    >
      <fieldset disabled={submitting}>
        <Form.Label htmlFor="name" className="mt-3">
          Name
        </Form.Label>
        <Form.Control {...register("name")} id="name" placeholder="Full name" />
        {errors.name && (
          <div className="mb-3 text-danger">{errors.name.message}</div>
        )}

        <Form.Label htmlFor="to" className="mt-3">
          To
        </Form.Label>
        <Form.Control {...register("to")} id="to" placeholder="From date" />
        {errors.to && (
          <div className="mb-3 text-danger">{errors.to.message}</div>
        )}

        <Form.Label htmlFor="from" className="mt-3">
          From
        </Form.Label>
        <Form.Control {...register("from")} id="from" placeholder="To date" />
        {errors.from && (
          <div className="mb-3 text-danger">{errors.from.message}</div>
        )}

        <Form.Label htmlFor="guests" className="mt-3">
          Subject
        </Form.Label>
        <Form.Select {...register("guests")}>
          <option value="">---</option>
          <option value="1 guest">1 guest</option>
          <option value="2 guest">2 guests</option>
          <option value="3 guest">3 guests</option>
          <option value="4 guest">4 guests</option>
        </Form.Select>
        {errors.guests && (
          <div className="mb-3 text-danger">{errors.guests.message}</div>
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
  );
}

export default ContactForm;
