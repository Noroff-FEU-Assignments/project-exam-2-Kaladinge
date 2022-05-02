import React from "react";
import Heading from "../layout/Heading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useState } from "react";
import FormMessage from "../../common/FormMessage";
import {
  ACCOMMODATIONS_PATH,
  facilitiesCheckbox,
  UPLOAD_PATH,
} from "../../constants/api";
import useAxios from "../../hooks/useAxios";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter a accommodation name")
    .min(2, "Accommodation name must be longer than 2 characters"),
  category: yup.string().required("Please choose an accommodation type"),
  address: yup
    .string()
    .required("Please enter an address")
    .min(8, "Address must be longer than 8 characters long"),
  rating: yup.string().required("Please choose a rating"),
  airport: yup
    .number()
    .required("Please enter distance from accommodation to Bergen airport"),
  bryggen: yup
    .number()
    .required("Please enter distance from accommodation to bryggen in Bergen"),
  summary: yup
    .string()
    .required("Please enter a short description")
    .min(2, "Summary must be at least 10 characters long"),
  description: yup
    .string()
    .required("Please enter a description")
    .min(20, "Description must be at least 20 characters long")
    .max(500, "Description must be at most 200 characters long"),
});

function Enquiries() {
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [checkboxArray, setCheckboxArray] = useState([]);
  const [file, setFile] = useState(false);
  const [subpic1, setSubpic1] = useState(false);
  const [subpic2, setSubpic2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  const url = ACCOMMODATIONS_PATH;
  const url2 = UPLOAD_PATH;

  async function onSubmit(dat) {
    setSubmitting(true);
    setPostError(null);

    try {
      const data = {
        title: dat.title,
        address: dat.address,
        rating: dat.rating,
        category: dat.category,
        airport: dat.airport,
        bryggen: dat.bryggen,
        facility: checkboxArray,
        summary: dat.summary,
        description: dat.description,
      };

      let formData = new FormData();
      formData.append("files.mainpic", file);
      formData.append("files.subpic", subpic1);
      formData.append("files.subpic", subpic2);
      formData.append("data", JSON.stringify(data));

      const response = await http.post(url, formData);
      console.log(response);
      setPostSuccess(true);
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  function say(event) {
    const alreadyThere = checkboxArray.filter((item) => {
      if (item === event.target.value) {
        return true;
      }
    });

    if (alreadyThere.length === 0) {
      setCheckboxArray([...checkboxArray, event.target.value]);
    }

    if (alreadyThere.length > 0) {
      const alreadyThere2 = checkboxArray.filter((item) => {
        if (item !== event.target.value) {
          return true;
        }
      });

      setCheckboxArray(alreadyThere2);
    }
  }

  const handleInputChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event);
  };

  const handleInputChange2 = (event) => {
    setSubpic1(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const handleInputChange3 = (event) => {
    setSubpic2(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  console.log(file);
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

          <Form.Label htmlFor="category" className="mt-3">
            Category
          </Form.Label>
          <Form.Select {...register("category")}>
            <option value="">---</option>
            <option value="Hotel">Hotel</option>
            <option value="B & B">B & B</option>
            <option value="Guesthouse">GuestHouse</option>
          </Form.Select>
          {errors.category && (
            <div className="mb-3 text-danger">{errors.category.message}</div>
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

          <Form.Label htmlFor="rating" className="mt-3">
            Rating
          </Form.Label>
          <Form.Select {...register("rating")}>
            <option value="">---</option>
            <option value="Very Good">Very good</option>
            <option value="Good">Good</option>
            <option value="Not Bad">Not bad</option>
            <option value="Bad">Bad</option>
          </Form.Select>
          {errors.rating && (
            <div className="mb-3 text-danger">{errors.rating.message}</div>
          )}

          <Form.Label htmlFor="airport" className="mt-3">
            Distance to Bergen Airport
          </Form.Label>
          <Form.Control
            {...register("airport")}
            id="airport"
            placeholder="Distance to Bergen airport (km)"
          />
          {errors.airport && (
            <div className="mb-3 text-danger">{errors.airport.message}</div>
          )}

          <Form.Label htmlFor="bryggen" className="mt-3">
            Distance to bryggen
          </Form.Label>
          <Form.Control
            {...register("bryggen")}
            id="bryggen"
            placeholder="Distance to Bryggen in Bergen (km)"
          />
          {errors.bryggen && (
            <div className="mb-3 text-danger">{errors.bryggen.message}</div>
          )}

          <div className="mb-3">
            {facilitiesCheckbox.map((item, index) => (
              <Form.Check
                key={index}
                onClick={say}
                type="checkbox"
                id={`${index}`}
                label={`${item}`}
                value={item}
              />
            ))}
          </div>

          <input type="file" onChange={handleInputChange} />
          <input type="file" onChange={handleInputChange2} />
          <input type="file" onChange={handleInputChange3} />

          <Form.Label htmlFor="summary" className="mt-3">
            Short description
          </Form.Label>
          <Form.Control
            {...register("summary")}
            id="summary"
            placeholder="A sentence about the accommodation"
          />
          {errors.summary && (
            <div className="mb-3 text-danger">{errors.summary.message}</div>
          )}

          <Form.Label htmlFor="description" className="mt-3">
            About the accommodation
          </Form.Label>
          <Form.Control
            {...register("description")}
            id="descpription"
            placeholder="Introductive text about the accommodation - max 500 words"
          />
          {errors.description && (
            <div className="mb-3 text-danger">{errors.description.message}</div>
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
