import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        { name, email, password }
      );
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-400">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Register
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleRegister}
            className="w-full py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
