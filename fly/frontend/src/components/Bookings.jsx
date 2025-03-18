import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserIdFromToken } from "../utils/auth";
import Footer from "./Footer";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userId = getUserIdFromToken();
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://flight-uxxl.onrender.com/api/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { user: userId },
          }
        );
        console.log("[DEBUG] Bookings fetched:", response.data); // Debugging log
        setBookings(response.data);
      } catch (error) {
        console.error("[ERROR] Fetching bookings failed:", error.message);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateBookingStatus = (bookingId, status) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      await axios.put(
        `https://flight-uxxl.onrender.com/api/bookings/${bookingId}`,
        { status: "Cancelled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateBookingStatus(bookingId, "Cancelled");
    } catch (error) {
      console.error("[ERROR] Failed to cancel booking:", error.message);
    }
  };

  const handleDownloadConfirmation = (booking) => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Booking Reference: ${booking._id}\nFlight: ${
          booking.flight?.flightNumber || "N/A"
        }\nDeparture: ${booking.flight?.departure || "N/A"}\nArrival: ${
          booking.flight?.arrival || "N/A"
        }\nStatus: ${booking.status}`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `Booking_${booking._id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-orange-400">
        <h2 className="text-xl font-bold text-white">Loading your bookings...</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-orange-400">
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        <ul className="w-full max-w-md">
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id} className="mb-4 p-4 bg-white rounded shadow">
                <p>Flight: {booking.flight?.flightNumber || "N/A"}</p>
                <p>Departure: {booking.flight?.departure || "N/A"}</p>
                <p>Arrival: {booking.flight?.arrival || "N/A"}</p>
                <p>Status: {booking.status || "N/A"}</p>
                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Cancel Booking
                  </button>
                )}
                               <button
                  onClick={() => handleDownloadConfirmation(booking)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-2"
                >
                  Download Confirmation
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Bookings;
