import React, { useState, useEffect } from "react";
import axios from "axios";

const JobListings = () => {
  const [jobListings, setJobListings] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch job listings
    const fetchJobListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/jobListings"
        );
        setJobListings(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    // Fetch companies
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchJobListings();
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/jobListings",
        formData
      );
      setJobListings([...jobListings, response.data.jobListing]);
      setFormData({ company: "", title: "", description: "" }); // Clear the form after submission
    } catch (error) {
      console.error("Error creating job listing:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Job Listings</h2>

      <form onSubmit={handleSubmit} className="mb-6">
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
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="mb-4 p-2 w-full border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Job Listing
        </button>
      </form>

      <ul>
        {jobListings.map((job) => (
          <li key={job._id} className="mb-2 p-2 border rounded">
            <p>
              <strong>Company:</strong> {job.company ? job.company.name : "N/A"}
            </p>
            <p>
              <strong>Title:</strong> {job.title}
            </p>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListings;
