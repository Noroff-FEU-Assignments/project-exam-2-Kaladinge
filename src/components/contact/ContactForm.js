import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "Your first name must be at least 3 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(4, "Your last name must be at least 4 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  subject: yup.string().required("A choice is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Your message must be at least 10 characters"),
});

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-light p-3 d-flex flex-column mx-auto`}
    >
      <Form.Label htmlFor="first-name" className="mt-3">
        First Name
      </Form.Label>
      <Form.Control {...register("firstName")} id="first-name" />
      {errors.firstName && (
        <span className="mb-3 text-danger">{errors.firstName.message}</span>
      )}

      <Form.Label htmlFor="last-name" className="mt-3">
        Last Name
      </Form.Label>
      <Form.Control {...register("lastName")} id="last-name" />
      {errors.lastName && (
        <span className="mb-3 text-danger">{errors.lastName.message}</span>
      )}

      <Form.Label htmlFor="email" className="mt-3">
        Email
      </Form.Label>
      <Form.Control {...register("email")} id="email" />
      {errors.email && (
        <span className="mb-3 text-danger">{errors.email.message}</span>
      )}

      <Form.Label htmlFor="subject" className="mt-3">
        Subject
      </Form.Label>
      <Form.Select {...register("subject")}>
        <option value="">---</option>
        <option value="recipe">Recipe</option>
        <option value="courses">Courses</option>
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
