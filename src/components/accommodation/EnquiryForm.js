import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import FormMessage from "../../common/FormMessage";

//const url = "https://kaladinge-pe2.herokuapp.com/api/messages";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Your first name must be at least 3 characters"),
  guests: yup.string().required("A choice is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Your message must be at least 10 characters")
    .max(200, "Your message must be no more than 200 characters"),
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

        <Form.Label htmlFor="message" className="mt-3">
          Message
        </Form.Label>
        <Form.Control
          {...register("message")}
          id="message"
          as="textarea"
          rows={3}
          placeholder="Max 200 words"
        />
        {errors.message && (
          <div className="mb-3 text-danger">{errors.message.message}</div>
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
