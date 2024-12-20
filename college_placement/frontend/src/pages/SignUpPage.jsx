import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      setSuccess(true);
      setError(null);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      console.log("Registration successful:", response.data);
      // Redirect to home or login page
      navigate("/login");
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
      setSuccess(false);
      console.log("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && (
            <div className="text-green-500 mb-4">Successfully registered!</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control rounded-0 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control rounded-0 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control rounded-0 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
