import React, { useState } from "react";
import axios from "axios";

const CompanyDataIntegration = () => {
  const [companies, setCompanies] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://college-6hu8.onrender.com/api/importCompanyData",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error importing company data:", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(
        "http://college-6hu8.onrender.com/api/exportCompanyData"
      );
      setCompanies(response.data);
    } catch (error) {
      console.error("Error exporting company data:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Company Data Integration</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 w-full border rounded"
      />
      <button
        onClick={handleImport}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Import Companies
      </button>
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Export Companies
      </button>
      <ul>
        {companies.map((company) => (
          <li key={company._id} className="mb-2 p-2 border rounded">
            {company.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDataIntegration;
