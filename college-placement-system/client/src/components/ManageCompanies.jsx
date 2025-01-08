import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        "https://college-sys.onrender.com/companies"
      );
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyName = e.target.companyName.value;
    const newCompany = { name: companyName, jobListings: [] };
    try {
      const response = await fetch(
        "https://college-sys.onrender.com/companies/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCompany),
        }
      );
      const data = await response.json();
      setCompanies([...companies, data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header/>
      <h2>Manage Companies</h2>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-100 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            required
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          Add Company
        </button>
      </form>
      <ul className="mt-6">
        {companies.map((company) => (
          <li
            key={company._id}
            className="p-2 mt-2 bg-white border rounded-lg shadow-sm"
          >
            {company.name}
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default ManageCompanies;
