import React, { useState, useEffect } from "react";
import axios from "axios";

const UserActivity = () => {
  const [userActivity, setUserActivity] = useState([]);
  const [error, setError] = useState("");

  const fetchUserActivity = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found");
        return;
      }

      const response = await axios.get(
        `https://flight-uxxl.onrender.com/api/reports/user-activity`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserActivity(response.data);
    } catch (err)
     {
      setError("Error fetching user activity");
    }
  };

  useEffect(() => {
    fetchUserActivity();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">User Activity</h2>
      <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
        {error && <p className="text-red-500">{error}</p>}
        {userActivity.length > 0 ? (
          <ul className="space-y-4">
            {userActivity.map((activity) => (
              <li key={activity._id} className="p-4 bg-white rounded shadow">
                <span className="block text-gray-900">
                  User: {activity.name}
                </span>
                <span className="block text-gray-900">
                  Bookings: {activity.bookingCount}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No user activity data available.</p>
        )}
      </div>
    </div>
  );
};

export default UserActivity;
