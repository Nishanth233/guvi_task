import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      setSuccess(true);
      setError(null);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setWelcomeMessage(`Welcome back, ${response.data.name}!`);

      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000); // 2-second delay before redirecting
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && (
            <div className="text-green-500 mb-4">{welcomeMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control rounded-0 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
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
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
