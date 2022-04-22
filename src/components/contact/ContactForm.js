import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Your first name must be at least 3 characters"),
  subject: yup.string().required("A choice is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Your message must be at least 10 characters")
    .max(200, "Your message must be no more than 200 characters"),
});

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    try {
    } catch (error) {
    } finally {
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-light p-3 d-flex flex-column mx-auto`}
    >
      <Form.Label htmlFor="name" className="mt-3">
        Name
      </Form.Label>
      <Form.Control {...register("name")} id="name" placeholder="Full name" />
      {errors.name && (
        <span className="mb-3 text-danger">{errors.name.message}</span>
      )}

      <Form.Label htmlFor="subject" className="mt-3">
        Subject
      </Form.Label>
      <Form.Select {...register("subject")}>
        <option value="">---</option>
        <option value="booking">Booking</option>
        <option value="cancellation">Cancellation</option>
        <option value="other">Other</option>
      </Form.Select>
      {errors.subject && (
        <span className="mb-3 text-danger">{errors.subject.message}</span>
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
        <span className="mb-3 text-danger">{errors.message.message}</span>
      )}

      <button type="submit" className="mt-3 bg-primary text-white">
        Submit
      </button>
    </Form>
  );
}

export default ContactForm;