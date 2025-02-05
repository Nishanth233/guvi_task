import React, { useState, useEffect } from "react";
import axios from "axios";

const InterviewScheduler = () => {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState({
    student: "",
    company: "",
    date: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(
          "http://localhost:5000/api/students"
        );
        console.log("Fetched students:", studentsResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
      try {
        const companiesResponse = await axios.get(
          "http://localhost:5000/api/companies"
        );
        console.log("Fetched companies:", companiesResponse.data);
        setCompanies(companiesResponse.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
      try {
        const interviewsResponse = await axios.get(
          "http://localhost:5000/api/interviews"
        );
        console.log("Fetched interviews:", interviewsResponse.data);
        setInterviews(interviewsResponse.data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.student || !formData.company) {
        alert("Please select a student and a company");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/interviews",
        formData
      );
      console.log("Interview scheduled:", response.data);

      // Find the student and company details for the new interview
      const student = students.find((s) => s._id === response.data.student);
      const company = companies.find((c) => c._id === response.data.company);

      // Add the details to the new interview
      const newInterview = {
        ...response.data,
        student,
        company,
      };

      setInterviews([...interviews, newInterview]);
      setFormData({ student: "", company: "", date: "" }); // Clear the form after submission
      setSuccessMessage("Interview scheduled successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Remove the success message after 3 seconds
    } catch (error) {
      console.error("Error scheduling interview:", error);
      setErrorMessage("Failed to schedule interview. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000); // Remove the error message after 3 seconds
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      {successMessage && (
        <div className="mb-4 p-2 text-green-800 bg-green-200 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-2 text-red-800 bg-red-200 rounded">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-6">
        <select
          name="student"
          value={formData.student}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        <select
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Schedule Interview
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Scheduled Interviews</h2>
      <ul>
        {interviews.map((interview) => (
          <li key={interview._id} className="mb-2 p-2 border rounded">
            <p>
              <strong>Student:</strong> {interview.student?.name || "N/A"}
            </p>
            <p>
              <strong>Company:</strong> {interview.company?.name || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {new Date(interview.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewScheduler;
