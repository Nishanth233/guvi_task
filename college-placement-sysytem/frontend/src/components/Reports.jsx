import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [reportData, setReportData] = useState({
    totalApplications: 0,
    totalInterviews: 0,
    totalPlacementDrives: 0,
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchReportData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/placementReports"
      );
      setReportData(response.data);
    };
    fetchReportData();
  }, []);

  useEffect(() => {
    // Ensure the chart instance is destroyed on unmount or before creating a new one
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const data = {
    labels: ["Applications", "Interviews", "Placement Drives"],
    datasets: [
      {
        label: "Count",
        data: [
          reportData.totalApplications,
          reportData.totalInterviews,
          reportData.totalPlacementDrives,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Placement Reports</h2>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Reports;
