import React from "react";
import RegistrationForm from "../../Component/Register";
import Login from "../../Component/Login";
import Logout from "../../Component/Logout";
export default function Home() {
  return (
    <div>
      <RegistrationForm />
      <Login />
    </div>
  );
}
