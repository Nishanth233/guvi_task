import axios from "axios";

const apiUrl = "https://flight-4ll6.onrender.com/api/users"; // Ensure this URL matches your backend

// Define the loginUser function
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to login user:", error);
    throw error;
  }
};

// Export other functions as needed
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to register user:", error);
    throw error;
  }
};
