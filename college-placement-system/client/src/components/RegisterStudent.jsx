import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const RegisterStudent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: "",
  });
  const [studentDetails, setStudentDetails] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://college-sys.onrender.com/students/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setStudentDetails(data); // Update studentDetails state
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div>
      <Header/>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-100 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Resume</label>
          <input
            type="text"
            name="resume"
            value={form.resume}
            onChange={handleChange}
            placeholder="Resume Link"
            required
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          Register
        </button>
      </form>
      {studentDetails && (
        <div className="mt-4 p-4 bg-green-100 border border-green-500 rounded-lg">
          <p className="text-green-700">Registration successful!</p>
          <p>
            <strong>Student ID:</strong> {studentDetails._id}
          </p>
          <p>
            <strong>Name:</strong> {studentDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {studentDetails.email}
          </p>
          
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default RegisterStudent;
