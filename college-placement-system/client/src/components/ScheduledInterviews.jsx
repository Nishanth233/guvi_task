import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ScheduledInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/interviews");
      if (!response.ok) {
        throw new Error("Failed to fetch interviews");
      }
      const data = await response.json();
      setInterviews(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header/>
      <h2>Scheduled Interviews</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {interviews.map((interview) => (
          <li
            key={interview._id}
            className="p-2 mt-2 bg-white border rounded-lg shadow-sm"
          >
            <p>Student: {interview.student.name}</p>
            <p>Company: {interview.company}</p>
            <p>Position: {interview.position}</p>
            <p>Date: {new Date(interview.date).toLocaleString()}</p>
            <p>Format: {interview.format}</p>
            <p>Status: {interview.status}</p>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default ScheduledInterviews;
