import React from "react";
import deleteToken from "./deleteToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  async function logoutHandler() {
    deleteToken();
    const response = await axios
      .post("http://localhost:3030/users/logout", {})
      .then((response) => {
        console.log("Full response:", response);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.message);
        } else {
          console.log("Network error:", error.message);
        }
      });
    alert("user logout successfully");
  }

  return (
    <div>
      <button
        className="bg-blue-600 text-2xl text-white rounded-xl p-4 cursor-pointer"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}
