import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import FormMessage from "../../common/FormMessage";

const url = "https://kaladinge-pe2.herokuapp.com/api/messages";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  subject: yup.string().required("A choice is required"),
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
    setSubmitting(true);
    setPostError(null);
    try {
      const response = await axios.post(url, {
        data: {
          email: data.email,
          subject: data.subject,
          message: data.message,
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
      className={`contactform p-3 d-flex flex-column mx-auto`}
      autoComplete="off"
    >
      <fieldset disabled={submitting}>
        <Form.Label htmlFor="email" className="mt-3">
          Name
        </Form.Label>
        <Form.Control
          {...register("email")}
          id="email"
          placeholder="e.g name@hoteldaze.com"
        />
        {errors.email && (
          <div className="mb-3 text-danger">{errors.email.message}</div>
        )}

        <Form.Label htmlFor="subject" className="mt-3">
          Subject
        </Form.Label>
        <Form.Select {...register("subject")}>
          <option value="">Choose a subject</option>
          <option value="booking">Booking</option>
          <option value="cancellation">Cancellation</option>
          <option value="other">Other</option>
        </Form.Select>
        {errors.subject && (
          <div className="mb-3 text-danger">{errors.subject.message}</div>
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

        <button
          type="submit"
          className="button mt-3 bg-primary text-white w-100 border border-none p-2"
        >
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
