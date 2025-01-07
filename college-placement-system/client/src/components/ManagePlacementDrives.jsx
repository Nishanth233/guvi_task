import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const ManagePlacementDrives = () => {
  const [placementDrives, setPlacementDrives] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchPlacementDrives();
    fetchCompanies();
  }, []);

  const fetchPlacementDrives = async () => {
    try {
      const response = await fetch("http://localhost:5000/placement-drives");
      const data = await response.json();
      setPlacementDrives(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:5000/companies");
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const placementDriveName = e.target.placementDriveName.value;
    const date = e.target.date.value;
    const selectedCompanies = Array.from(
      e.target.companies.selectedOptions,
      (option) => option.value
    );
    const newPlacementDrive = {
      name: placementDriveName,
      date,
      companies: selectedCompanies,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/placement-drives/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPlacementDrive),
        }
      );
      const data = await response.json();
      setPlacementDrives([...placementDrives, data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header/>
      <h2>Manage Placement Drives</h2>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-100 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-gray-700">Placement Drive Name</label>
          <input
            type="text"
            name="placementDriveName"
            placeholder="Placement Drive Name"
            required
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="datetime-local"
            name="date"
            required
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Companies</label>
          <select
            name="companies"
            multiple
            className="w-full p-2 mt-1 border rounded-lg"
          >
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          Create Placement Drive
        </button>
      </form>
      <ul className="mt-6">
        {placementDrives.map((drive) => (
          <li
            key={drive._id}
            className="p-2 mt-2 bg-white border rounded-lg shadow-sm"
          >
            {drive.name} - {new Date(drive.date).toLocaleString()}
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default ManagePlacementDrives;
