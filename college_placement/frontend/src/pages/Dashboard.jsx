import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Dashboard = () => {
  // State variables to hold the counts
  const [totalStudents, setTotalStudents] = useState(123);
  const [applications, setApplications] = useState(45);
  const [interviewsScheduled, setInterviewsScheduled] = useState(30);

  // Function to simulate an update to the counts
  const updateCounts = () => {
    setTotalStudents(totalStudents + 1);
    setApplications(applications + 1);
    setInterviewsScheduled(interviewsScheduled + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
          <p className="text-gray-700 mb-4">
            Here you can manage the college placement process.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-600 text-white p-4 rounded-md">
              <h3 className="text-lg font-bold">Total Students</h3>
              <p className="text-4xl">{totalStudents}</p>
            </div>
            <div className="bg-indigo-600 text-white p-4 rounded-md">
              <h3 className="text-lg font-bold">Applications</h3>
              <p className="text-4xl">{applications}</p>
            </div>
            <div className="bg-indigo-600 text-white p-4 rounded-md">
              <h3 className="text-lg font-bold">Interviews Scheduled</h3>
              <p className="text-4xl">{interviewsScheduled}</p>
            </div>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={updateCounts}
          >
            Update Counts
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
