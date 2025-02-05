import React, { useState, useEffect } from "react";
import axios from "axios";

const PlacementDriveManager = () => {
  const [companies, setCompanies] = useState([]);
  const [placementDrives, setPlacementDrives] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    companies: [],
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const companiesResponse = await axios.get(
        "https://college-6hu8.onrender.com/api/companies"
      );
      setCompanies(companiesResponse.data);
      const placementDrivesResponse = await axios.get(
        "https://college-6hu8.onrender.com/api/placementDrives"
      );
      setPlacementDrives(placementDrivesResponse.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanySelect = (e) => {
    const selectedCompanies = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, companies: selectedCompanies });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://college-6hu8.onrender.com/api/placementDrives",
        formData
      );
      const newDrive = response.data;
      setPlacementDrives([...placementDrives, newDrive]); // Update the placementDrives state with the new placement drive
      setFormData({ eventName: "", date: "", companies: [] }); // Clear the form after submission
      setSuccessMessage("Placement drive created successfully!"); // Set the success message
      setTimeout(() => setSuccessMessage(""), 3000); // Remove the success message after 3 seconds
    } catch (error) {
      console.error("Error creating placement drive:", error);
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
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <select
          multiple
          name="companies"
          value={formData.companies}
          onChange={handleCompanySelect}
          className="mb-4 p-2 w-full border rounded"
        >
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Placement Drive
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Placement Drives</h2>
      <ul>
        {placementDrives.map((drive) => (
          <li key={drive._id} className="mb-2 p-2 border rounded">
            <p>
              <strong>Event Name:</strong> {drive.eventName}
            </p>
            <p>
              <strong>Date:</strong> {new Date(drive.date).toLocaleDateString()}
            </p>
            <strong>Companies:</strong>
            <ul>
              {drive.companies.map((companyId, index) => (
                <li key={index}>
                  {companies.find((c) => c._id === companyId)?.name ||
                    "Unknown Company"}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlacementDriveManager;
