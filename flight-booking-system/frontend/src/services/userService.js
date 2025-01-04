import axios from "axios";

const apiUrl = "https://flight-4ll6.onrender.com/api/users"; // Ensure this URL matches your backend

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to register user:", error);
    throw error;
  }
};
