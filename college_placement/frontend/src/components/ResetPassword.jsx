import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/reset-password",
        {
          resetToken: token,
          newPassword: password,
        }
      );
      if (response.data.message === "Password reset successfully") {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
