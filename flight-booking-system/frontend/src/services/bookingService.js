import axios from "axios";

const apiUrl = "https://flight-4ll6.onrender.com/api/bookings"; // Ensure this URL is correct

export const getBookings = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error("Failed to delete booking:", error);
    throw error;
  }
};

export const bookFlight = async (bookingData) => {
  try {
    const response = await axios.post(apiUrl, bookingData);
    return response.data;
  } catch (error) {
    console.error("Failed to book flight:", error);
    throw error;
  }
};
