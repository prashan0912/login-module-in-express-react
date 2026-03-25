import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:3030/users/login", loginData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("userData", response.data);
        // console.log("token:", response.data.token);
        console.log(response.data); // Check token value after login
        navigate("/profile");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Validation error:", error.response.data);
          alert(error.response.data.message);
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Please enter your details
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember for 30 days
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
