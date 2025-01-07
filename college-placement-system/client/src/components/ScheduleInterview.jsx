import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ScheduleInterview = () => {
  const [form, setForm] = useState({
    student: "",
    company: "",
    position: "",
    date: "",
    format: "virtual",
  });

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
        "http://localhost:5000/interviews/schedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
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
        <label className="block text-gray-700">Student ID</label>
        <input
          type="text"
          name="student"
          value={form.student}
          onChange={handleChange}
          placeholder="Student ID"
          required
          className="w-full p-2 mt-1 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700">Company</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="w-full p-2 mt-1 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700">Position</label>
        <input
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          required
          className="w-full p-2 mt-1 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700">Date</label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 mt-1 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700">Format</label>
        <select
          name="format"
          value={form.format}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-lg"
        >
          <option value="virtual">Virtual</option>
          <option value="in-person">In-person</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
      >
        Schedule Interview
      </button>
    </form>
    <Footer/>
    </div>
  );
};

export default ScheduleInterview;
