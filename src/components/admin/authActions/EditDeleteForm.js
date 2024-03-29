import React from "react";
import Heading from "../../layout/Heading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import FormMessage from "../../../common/FormMessage";
import { ACCOMMODATIONS_PATH } from "../../../constants/api";
import { facilitiesCheckbox } from "../../../constants/data";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import noImage from "../../../images/no-image.jpg";
import PropTypes from "prop-types";

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
  area: yup
    .string()
    .required("Please enter an area name")
    .min(2, "Area name must be longer than 2 characters"),
  price: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter distance from accommodation to bryggen in Bergen"),
  category: yup.string().required("Please choose an accommodation type"),
  airport: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter distance from accommodation to Bergen airport"),
  bryggen: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter distance from accommodation to bryggen in Bergen"),
  summary: yup
    .string()
    .required("Please enter a short description")
    .min(10, "Summary must be at least 10 characters long"),
  description: yup
    .string()
    .required("Please enter a description")
    .min(20, "Description must be at least 20 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
});

export default function EditDeleteForm({ accommodation }) {
  const [currentData, setCurrentData] = useState(accommodation);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [checkboxArray, setCheckboxArray] = useState([]);
  const [file, setFile] = useState(false);
  const [subpic1, setSubpic1] = useState(false);
  const [subpic2, setSubpic2] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  const url = ACCOMMODATIONS_PATH + `/${accommodation.id}`;

  async function onSubmit(dat, e) {
    setSubmitting(true);
    setPostError(null);

    try {
      const data = {
        title: dat.title,
        area: dat.area,
        price: dat.price,
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
      formData.append("files.mainpics", file);
      formData.append("files.subpic", subpic1);
      formData.append("files.subpic", subpic2);
      formData.append("data", JSON.stringify(data));

      const response = await http.put(url, formData);

      setPostSuccess(true);
      e.target.reset();
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  function setFacility(event) {
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

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await http.delete(url);
        navigate("/admin");
      } catch (error) {
        setDeleteError(error.toString());
      }
    }
  }

  return (
    <>
      <Heading title="Edit/Delete Accommodation" />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-3 d-flex flex-column mx-auto`}
      >
        <fieldset disabled={submitting}>
          <Row>
            <Col xs={12} lg={6}>
              <Form.Label htmlFor="title" className="mt-3">
                Accommodation name
              </Form.Label>
              <Form.Control
                {...register("title")}
                id="title"
                placeholder="Full Name of Accommodation"
                defaultValue={currentData.attributes.title}
              />
              {errors.title && (
                <div className="mb-3 text-danger">{errors.title.message}</div>
              )}
            </Col>

            <Col xs={12} lg={6}>
              <Form.Label htmlFor="category" className="mt-3">
                Category
              </Form.Label>
              <Form.Select {...register("category")}>
                <option defaultValue={`${currentData.attributes.category}`}>
                  {currentData.attributes.category}
                </option>
                {currentData.attributes.category !== "Hotel" && (
                  <option value="Hotel">Hotel</option>
                )}
                {currentData.attributes.category !== "B & B" && (
                  <option value="B &amp; B">B &amp; B</option>
                )}
                {currentData.attributes.category !== "Guesthouse" && (
                  <option value="Guesthouse">GuestHouse</option>
                )}
              </Form.Select>
              {errors.category && (
                <div className="mb-3 text-danger">
                  {errors.category.message}
                </div>
              )}
            </Col>

            <Col xs={12} lg={6}>
              <Form.Label htmlFor="area" className="mt-3">
                Area
              </Form.Label>
              <Form.Control
                {...register("area")}
                id="area"
                placeholder="Area name"
                defaultValue={currentData.attributes.area}
              />
              {errors.area && (
                <div className="mb-3 text-danger">{errors.area.message}</div>
              )}
            </Col>

            <Col xs={12} lg={6}>
              <Form.Label htmlFor="rating" className="mt-3">
                Rating
              </Form.Label>
              <Form.Select {...register("rating")}>
                <option defaultValue={`${currentData.attributes.rating}`}>
                  {currentData.attributes.rating}
                </option>
                {currentData.attributes.rating !== "Very Good" && (
                  <option value="Very Good">Very good</option>
                )}
                {currentData.attributes.rating !== "Good" && (
                  <option value="Good">Good</option>
                )}
                {currentData.attributes.rating !== "Not Bad" && (
                  <option value="Not Bad">Not Bad</option>
                )}
                {currentData.attributes.rating !== "Bad" && (
                  <option value="Bad">Bad</option>
                )}
              </Form.Select>
              {errors.rating && (
                <div className="mb-3 text-danger">{errors.rating.message}</div>
              )}
            </Col>

            <Col xs={12}>
              <Form.Label htmlFor="address" className="mt-3">
                Address
              </Form.Label>
              <Form.Control
                {...register("address")}
                id="address"
                placeholder="Street name"
                defaultValue={currentData.attributes.address}
              />
              {errors.address && (
                <div className="mb-3 text-danger">{errors.address.message}</div>
              )}
            </Col>

            <Col xs={12} lg={4}>
              <Form.Label htmlFor="price" className="mt-3">
                Price
              </Form.Label>
              <Form.Control
                {...register("price")}
                id="price"
                placeholder="Price for one night"
                defaultValue={currentData.attributes.price}
              />
              {errors.price && (
                <div className="mb-3 text-danger">
                  {errors.price.message.includes("NaN")
                    ? "Value must be a number (integer)"
                    : errors.price.message}
                </div>
              )}
            </Col>

            <Col xs={12} lg={4}>
              <Form.Label htmlFor="airport" className="mt-3">
                Distance to Bergen Airport
              </Form.Label>
              <Form.Control
                {...register("airport")}
                id="airport"
                placeholder="Distance to Bergen airport (km)"
                defaultValue={currentData.attributes.airport}
              />
              {errors.airport && (
                <div className="mb-3 text-danger">
                  {errors.airport.message.includes("NaN")
                    ? "Value must be a number (integer)"
                    : errors.airport.message}
                </div>
              )}
            </Col>

            <Col xs={12} lg={4}>
              <Form.Label htmlFor="bryggen" className="mt-3">
                Distance to bryggen
              </Form.Label>
              <Form.Control
                {...register("bryggen")}
                id="bryggen"
                placeholder="Distance to Bryggen in Bergen (km)"
                defaultValue={currentData.attributes.bryggen}
              />
              {errors.bryggen && (
                <div className="mb-3 text-danger">
                  {errors.bryggen.message.includes("NaN")
                    ? "Value must be a number (integer)"
                    : errors.bryggen.message}
                </div>
              )}
            </Col>

            <Col xs={12} md={4}>
              <Form.Label htmlFor="facility" className="mt-3">
                Facility
              </Form.Label>
              <div className="mb-3">
                {facilitiesCheckbox.map(function (item, index) {
                  return (
                    <Form.Check
                      key={index}
                      onClick={setFacility}
                      type="checkbox"
                      id={`${index}`}
                      label={`${item}`}
                      value={item}
                    />
                  );
                })}
              </div>
            </Col>

            <Col xs={6} lg={4}>
              <Form.Label htmlFor="mainpic" className="mt-3">
                <p>Mainpic</p>
                <div className="bg-light border position-relative mainpic--container overflow-hidden">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : currentData.attributes.mainpics.data
                        ? currentData.attributes.mainpics.data[0].attributes.url
                        : noImage
                    }
                    className="start-50 top-50 w-100 translate-middle position-absolute"
                    alt="main accommodation"
                  />
                </div>
              </Form.Label>
              <Form.Control
                type="file"
                id="mainpic"
                onChange={(event) => setFile(event.target.files[0])}
                className="d-none"
              />
            </Col>

            <Col xs={12} lg={4}>
              <Row>
                <Col xs={5} sm={4} lg={12}>
                  <Form.Label htmlFor="subpic" className="mt-2 mt-lg-3 mb-0">
                    <p>Subpics</p>
                    <div className="bg-light border position-relative subpic--container overflow-hidden">
                      <img
                        src={
                          subpic1
                            ? URL.createObjectURL(subpic1)
                            : !currentData.attributes.subpic.data
                            ? noImage
                            : currentData.attributes.subpic.data.length === 1
                            ? currentData.attributes.subpic.data[
                                currentData.attributes.subpic.data.length - 1
                              ].attributes.url
                            : currentData.attributes.subpic.data[
                                currentData.attributes.subpic.data.length - 2
                              ].attributes.url
                        }
                        className="start-50 top-50 w-100 translate-middle position-absolute"
                        alt="sub accommodation"
                      />
                    </div>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="subpic"
                    onChange={(event) => setSubpic1(event.target.files[0])}
                    className="d-none"
                  />
                </Col>

                <Col xs={5} sm={4} lg={12}>
                  <Form.Label htmlFor="subpic2" className="mt-5 mt-lg-0">
                    <div className="bg-light border position-relative subpic--container overflow-hidden">
                      <img
                        src={
                          subpic2
                            ? URL.createObjectURL(subpic2)
                            : !currentData.attributes.subpic.data
                            ? noImage
                            : currentData.attributes.subpic.data.length === 1
                            ? noImage
                            : currentData.attributes.subpic.data[
                                currentData.attributes.subpic.data.length - 1
                              ].attributes.url
                        }
                        className="start-50 top-50 w-100 translate-middle position-absolute"
                        alt="sub accommodation"
                      />
                    </div>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="subpic2"
                    onChange={(event) => setSubpic2(event.target.files[0])}
                    className="d-none"
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={12}>
              <Form.Label htmlFor="summary" className="mt-3">
                Short description
              </Form.Label>
              <Form.Control
                {...register("summary")}
                id="summary"
                placeholder="A sentence about the accommodation"
                defaultValue={currentData.attributes.summary}
              />
              {errors.summary && (
                <div className="mb-3 text-danger">{errors.summary.message}</div>
              )}
            </Col>

            <Col xs={12}>
              <Form.Label htmlFor="description" className="mt-3">
                About the accommodation
              </Form.Label>
              <Form.Control
                {...register("description")}
                id="descpription"
                as="textarea"
                rows={5}
                placeholder="Introductive text about the accommodation - max 1000 words"
                defaultValue={currentData.attributes.description}
              />
              {errors.description && (
                <div className="mb-3 text-danger">
                  {errors.description.message}
                </div>
              )}
            </Col>

            <Col>
              <button
                type="submit"
                className="button mt-3 bg-primary text-white w-100 border border-none p-2"
              >
                {submitting ? "Working..." : "Edit Accommodation"}
              </button>
            </Col>
          </Row>
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
        <button
          type="button"
          className="delete button mt-3 bg-danger text-white w-100 border border-none p-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        {deleteError && (
          <FormMessage styling="form--error">
            Could not delete post at this time
          </FormMessage>
        )}
      </Form>
    </>
  );
}

EditDeleteForm.propTypes = {
  accommodation: PropTypes.object.isRequired,
};
