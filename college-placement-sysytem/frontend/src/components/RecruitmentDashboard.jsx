import React, { useState, useEffect } from "react";
import axios from "axios";

const RecruitmentDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalApplications: 0,
    totalInterviews: 0,
    totalPlacementDrives: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/recruitmentStatus"
      );
      setMetrics(response.data);
    };
    fetchMetrics();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recruitment Dashboard</h2>
      <ul>
        <li className="mb-2 p-2 border rounded">
          <strong>Total Students:</strong> {metrics.totalStudents}
        </li>
        <li className="mb-2 p-2 border rounded">
          <strong>Total Applications:</strong> {metrics.totalApplications}
        </li>
        <li className="mb-2 p-2 border rounded">
          <strong>Total Interviews:</strong> {metrics.totalInterviews}
        </li>
        <li className="mb-2 p-2 border rounded">
          <strong>Total Placement Drives:</strong>{" "}
          {metrics.totalPlacementDrives}
        </li>
      </ul>
    </div>
  );
};

export default RecruitmentDashboard;
