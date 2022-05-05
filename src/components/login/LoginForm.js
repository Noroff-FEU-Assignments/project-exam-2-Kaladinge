import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Form } from "react-bootstrap";

const url = "https://kaladinge-pe2.herokuapp.com/api/auth/local";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

function Loginform() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [token, setToken] = useContext(AuthContext);
  console.log(token);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    console.log(data.username);
    console.log(data.password);

    try {
      const response = await axios.post(url, {
        identifier: data.username,
        password: data.password,
      });

      setToken(response.data.jwt);
      setLoginError(false);
      console.log(response.data.jwt);
      setLoginSuccess(true);
      navigate("/admin");
    } catch (error) {
      setLoginError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={`login-form mx-auto p-3 mt-3`}
        autoComplete="off"
      >
        <fieldset disabled={submitting}>
          <div className="d-flex flex-column">
            <Form.Label htmlFor="name" className="mt-3">
              Username
            </Form.Label>
            <Form.Control
              {...register("username")}
              id="username"
              placeholder="e.g. myname@hoteldaze.com"
            />
            {errors.username && (
              <span className="mb-3 text-danger">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="d-flex flex-column">
            <Form.Label htmlFor="age" className="mt-3">
              Password
            </Form.Label>
            <Form.Control {...register("password")} id="password" />
            {errors.password && (
              <span className="mb-3 text-danger">
                {errors.password.message}
              </span>
            )}
          </div>

          <button className="button mt-3 bg-primary text-white w-100 border border-none p-2">
            Login
          </button>
        </fieldset>
        {loginSuccess && (
          <div className="text-success">You successfully logged in</div>
        )}
        {loginError && (
          <div className="text-danger">UserName or password was incorrect</div>
        )}
      </Form>
    </>
  );
}

export default Loginform;
