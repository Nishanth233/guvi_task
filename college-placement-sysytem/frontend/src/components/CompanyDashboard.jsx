import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesResponse = await axios.get(
          "https://college-6hu8.onrender.com/api/companies"
        );
        setCompanies(companiesResponse.data);

        const jobListingsResponse = await axios.get(
          "https://college-6hu8.onrender.com/api/jobListings"
        );
        setJobListings(jobListingsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      const response = await axios.post(
        "https://college-6hu8.onrender.com/api/jobListings",
        formData
      );
      const newJobListing = response.data.jobListing;

      // Find the company details for the new job listing
      const company = companies.find((c) => c._id === newJobListing.company);

      // Add the company details to the new job listing
      newJobListing.company = company;

      setJobListings([...jobListings, newJobListing]);
      setFormData({ company: "", title: "", description: "" }); // Clear the form after submission
      setSuccessMessage("Job listing posted successfully!"); // Set the success message
      setTimeout(() => setSuccessMessage(""), 3000); // Remove the success message after 3 seconds
    } catch (error) {
      console.error("Error posting job listing:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      {successMessage && (
        <div className="mb-4 p-2 text-green-800 bg-green-200 rounded">
          {successMessage}
        </div>
      )}
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
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="mb-4 p-2 w-full border rounded"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Post Job
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Job Listings</h2>
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

export default CompanyDashboard;
