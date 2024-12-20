import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      ); // Match the backend route
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control rounded-0 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
