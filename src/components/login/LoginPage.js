import React from "react";
import Heading from "../layout/Heading";
import Loginform from "./LoginForm";

function LoginPage() {
  return (
    <>
      <Heading title="Admin Log In" />
      <Loginform />
    </>
  );
}

export default LoginPage;
