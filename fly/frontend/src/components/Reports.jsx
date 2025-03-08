import React from "react";
import LiveReports from "./LiveReports";
import SalesPerformance from "./SalesPerformance";
import UserActivity from "./UserActivity";
import Footer from "./Footer";

const Reports = () => {
  return (
    <div>
      <div className="flex flex-col items-center bg-orange-500 justify-center min-h-screen p-10 space-y-10">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <LiveReports />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <SalesPerformance />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <UserActivity />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;
