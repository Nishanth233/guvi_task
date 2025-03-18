import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import jwt_decode from "jwt-decode";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://flight-uxxl.onrender.com/api/users/login`,
        { email, password }
      );

      const token = response.data.token;

      // Decode token to check expiration
      const decodedToken = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        setError("Token has expired. Please log in again.");
        return;
      }

      localStorage.setItem("token", token);
      onLogin();
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials. Please check your email and password.");
      } else if (err.response) {
        setError(
          `Server error: ${err.response.data.message || "Try again later."}`
        );
      } else {
        setError("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-400">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Login
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            } text-white font-bold rounded-lg transition duration-300 ease-in-out`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
