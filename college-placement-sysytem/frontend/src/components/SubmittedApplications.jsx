import React, { useState, useEffect } from "react";
import axios from "axios";

const SubmittedApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications"
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Submitted Applications</h2>
      <ul>
        {applications.map((application) => (
          <li key={application._id} className="mb-2 p-2 border rounded">
            <p>
              <strong>Name:</strong>{" "}
              {application.student ? application.student.name : "N/A"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {application.student ? application.student.email : "N/A"}
            </p>
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={application.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                {application.resume}
              </a>
            </p>
            <p>
              <strong>Cover Letter:</strong>{" "}
              <a
                href={application.coverLetter}
                target="_blank"
                rel="noopener noreferrer"
              >
                {application.coverLetter}
              </a>
            </p>
            <p>
              <strong>Grade:</strong>{" "}
              {application.student &&
              application.student.academicRecords.length > 0
                ? application.student.academicRecords[0].grade
                : "N/A"}
            </p>
            <p>
              <strong>Achievements:</strong>{" "}
              {application.student &&
              application.student.academicRecords.length > 0
                ? application.student.academicRecords[0].achievements
                : "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedApplications;
