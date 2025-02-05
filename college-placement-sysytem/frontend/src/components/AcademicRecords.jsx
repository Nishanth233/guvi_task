import React, { useState, useEffect } from "react";
import axios from "axios";

const AcademicRecords = () => {
  const [academicRecords, setAcademicRecords] = useState([]);

  useEffect(() => {
    const fetchAcademicRecords = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/academicRecords"
      );
      setAcademicRecords(response.data);
    };
    fetchAcademicRecords();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Academic Records</h2>
      <ul>
        {academicRecords.map((record) => (
          <li key={record._id} className="mb-2 p-2 border rounded">
            <p>
              <strong>Student:</strong> {record.student.name}
            </p>
            <p>
              <strong>Grade:</strong> {record.grade}
            </p>
            <p>
              <strong>Achievements:</strong> {record.achievements}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcademicRecords;
