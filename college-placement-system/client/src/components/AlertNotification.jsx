import React from "react";

const AlertNotification = ({ alerts }) => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">Alerts and Notifications</h2>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`mb-4 p-4 rounded shadow-md ${
            alert.type === "warning" ? "bg-yellow-200 text-yellow-800" : ""
          } ${alert.type === "info" ? "bg-blue-200 text-blue-800" : ""} ${
            alert.type === "success" ? "bg-red-200 text-rose-800" : ""
          }`}
        >
          {alert.message}
        </div>
      ))}
    </div>
  );
};

export default AlertNotification;
