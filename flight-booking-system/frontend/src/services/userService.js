import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/users'; // Ensure this URL matches your backend

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
};
