import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../profile/Profile.jsx";
import getToken from "../.././Component/getToken.js";

export default function ProtectedProfile({ children }) {
  console.log("ProtectedRoute");

  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading

  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate("/"); // no token, redirect immediately
      // return;
    } else {
      sendTokenToBackend();
    }
  }, token);
  async function sendTokenToBackend() {
    await axios
      .post(
        "http://localhost:3030/users/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log("protectedRoute data:", response.data);
        console.log(response.data.success);
        // setLogin(true);
        setIsAuthorized(true);

        if (response.data.success === true) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        return <div>404 Result not Found</div>;
      });
  }

  // ✅ Component actually returns JSX based on state
  if (isAuthorized === null) return <div>Loading...</div>;
  if (isAuthorized === false) return <div>404 Not Found</div>;
  return children; // ✅ renders <Profile /> passed as children
}
