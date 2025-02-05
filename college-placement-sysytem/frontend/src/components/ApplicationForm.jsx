import React, { useState } from "react";
import axios from "axios";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: "",
    grade: "",
    achievements: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications",
        formData
      );
      setSuccessMessage("Application submitted successfully!");
      // Clear the form data
      setFormData({
        name: "",
        email: "",
        resume: "",
        coverLetter: "",
        grade: "",
        achievements: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      setSuccessMessage("Failed to submit the application. Please try again.");
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
          placeholder="Name"
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
          type="text"
          name="resume"
          value={formData.resume}
          onChange={handleChange}
          placeholder="Resume Link"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder="Cover Letter Link"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Grade"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="Achievements"
          className="mb-4 p-2 w-full border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
