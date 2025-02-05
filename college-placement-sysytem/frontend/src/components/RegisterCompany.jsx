import React, { useState } from "react";
import axios from "axios";

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    industry: "",
    location: "",
    website: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/companies/register",
        formData
      );
      setSuccessMessage("Company registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        industry: "",
        location: "",
        website: "",
      });
    } catch (error) {
      console.error("Error registering company:", error);
      setSuccessMessage("Failed to register the company. Please try again.");
    }
  };

  return (
    <div>
      {successMessage && (
        <div
          className={`mb-4 p-2 ${
            successMessage.startsWith("Failed")
              ? "text-red-800 bg-red-200"
              : "text-green-800 bg-green-200"
          } rounded`}
        >
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Company Name"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="Industry"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="mb-4 p-2 w-full border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;
