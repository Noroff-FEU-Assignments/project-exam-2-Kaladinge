import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import FormMessage from "../../common/FormMessage";
import { Button } from "react-bootstrap";

const url = "https://kaladinge-pe2.herokuapp.com/api/enquiries";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Your first name must be at least 3 characters"),
  guests: yup.string().required("Number of guests is required"),
  to: yup.string().required("Start date is required"),
  from: yup.string().required("Start date is required"),
});

function EnquiryForm({ title }) {
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [displayMode, setDisplayMode] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function displayModal() {
    setDisplayMode(!displayMode);
  }

  async function onSubmit(data) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    function newDate(date) {
      return new Intl.DateTimeFormat("en-UK", options).format(new Date(date));
    }

    setSubmitting(true);
    setPostError(null);
    try {
      const response = await axios.post(url, {
        data: {
          hotel: title,
          name: data.name,
          to: newDate(data.to),
          from: newDate(data.from),
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
    <>
      <Button onClick={displayModal} className="check-button w-75 text-light">
        Check availability
      </Button>
      <div className={`modal ${displayMode ? "d-block" : "d-none"}`}>
        <span onClick={displayModal} className="modal--close">
          &times;
        </span>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={`modal--content p-3 d-flex flex-column mx-auto text-start`}
          autoComplete="off"
        >
          <fieldset disabled={submitting}>
            <Form.Label htmlFor="name" className="mt-3">
              Name
            </Form.Label>
            <Form.Control
              {...register("name")}
              id="name"
              placeholder="Full name"
            />
            {errors.name && (
              <div className="mb-3 text-danger">{errors.name.message}</div>
            )}

            <Form.Label htmlFor="to" className="mt-3">
              To
            </Form.Label>
            <Controller
              control={control}
              name="to"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                />
              )}
            />
            {errors.to && (
              <div className="mb-3 text-danger">This field is required</div>
            )}

            <Form.Label htmlFor="from" className="mt-3">
              From
            </Form.Label>
            <Controller
              control={control}
              name="from"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                />
              )}
            />
            {errors.from && (
              <div className="mb-3 text-danger">This field is required</div>
            )}

            <Form.Label htmlFor="guests" className="mt-3">
              Number of guests
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
      </div>
    </>
  );
}

export default EnquiryForm;
